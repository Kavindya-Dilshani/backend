import PDF from "../models/PDF.js";
import User from "../models/User.js";

/**
 * This function use to save uploaded pdf file in database
 * @param {Http Request} req
 * @param {Http Response} res
 * @param {NextFunction} next
 * @returns
 */
const uploadFile = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req?.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Extract title userId from the request body
    const { title, userId } = req.body;

    // Check user ID
    if (!userId) {
      return res.status(400).json({ error: "User ID  is missing" });
    }
    // Check User
    const user = await User.findOne({ _id: userId });

    if (user) {
      // Check if title are provided
      if (!title) {
        return res.status(400).json({ error: "File title  is missing" });
      }

      // Extract pdf file details from the request body
      const { originalname, buffer, mimetype } = req.file;
      // Create PDF object
      const newPDF = new PDF({
        title,
        pdf: buffer,
        contentType: mimetype,
        userId,
      });
      // Save pdf document in the PDFDetails collection
      await newPDF.save();

      // Send success response
      res.status(201).json({ message: "PDF file uploaded successfully!" });
    } else {
      return res.status(400).json({ error: "User not found!" });
    }
  } catch (error) {
    // Handle errors
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * This function use to get all uploaded pdf files of current user
 * @param {Http Request} req
 * @param {Http Response} res
 * @param {NextFunction} next
 * @returns
 */
const getFiles = async (req, res) => {
  try {
    const userId = req.query.userId;
    // Check user ID
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    // Check User
    const user = await User.findOne({ _id: userId });

    if (user) {
      const pdfDocuments = await PDF.find({ userId }, "title"); // Fetch all PDF documents

      if (!pdfDocuments || pdfDocuments.length === 0) {
        return res.status(200).json({ error: "No PDF files found" });
      }

      // Create response
      res.status(200).json({
        status: "success",
        files: pdfDocuments,
      });
    } else {
      return res.status(400).json({ error: "User not found!" });
    }
  } catch (err) {
    console.error("Error retrieving PDFs:", err);
    res.status(500).json({ error: "Failed to retrieve PDF files" });
  }
};

/**
 * This function use to get the selected pdf file from database
 * @param {Http Request} req
 * @param {Http Response} res
 * @param {NextFunction} next
 * @returns
 */
const getFile = async (req, res) => {
  try {
    const documentId = req.query.documentId;
    // Check document ID
    if (!documentId) {
      return res.status(400).json({ error: "Document ID is required" });
    }

    // Fetch selected PDF file
    const pdfDocument = await PDF.findById(documentId);

    if (!pdfDocument) {
      return res.status(404).json({ error: "No PDF files found" });
    }

    // Set the Content-Type header
    res.setHeader("Content-Type", pdfDocument.contentType);
    // Set Content-Disposition header to inline to display in the browser
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${pdfDocument.title}.pdf"`
    );
    // Send the PDF buffer as the response
    res.send(pdfDocument.pdf);
  } catch (err) {
    console.error("Error retrieving PDFs:", err);
    res.status(500).json({ error: "Failed to retrieve PDF file" });
  }
};

const fileController = { uploadFile, getFiles, getFile };

export default fileController;
