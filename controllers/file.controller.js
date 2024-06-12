import PDF from "../models/PDF.js";

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

    // Extract title from the request body
    const { title } = req.body;
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
    });
    // Save pdf document in the PDFDetails collection
    await newPDF.save();

    // Send success response
    res.status(201).json({ message: "PDF file uploaded successfully!" });
  } catch (error) {
    // Handle errors
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const fileController = { uploadFile };

export default fileController;
