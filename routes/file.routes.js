import authController from '../controllers/auth.controller.js';
// import PDF from "./models/PDF.js";
// import multer from "multer";

/** Multer setUp*/
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./files");
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now();
//       cb(null, uniqueSuffix + file.originalname);
//     },
//   });
  
//   const PDFSchema = mongoose.model("PDFDetails");
//   const upload = multer({ storage: storage });

// app.use("/files", express.static("files"));

export default function fileRoutes(app) {
// app.post("/upload-files", upload.single("file"), async (req, res) => {
//   console.log(req.file);
//   const title = req.body.title;
//   const fileName = req.body.fileName;
//   try {
//     await PDFSchema.create({ title: title, pdf: fileName });
//     res.send({ status: "Upload file Successfully" });
//   } catch (error) {
//     res.json({ status: error });
//   }
// });

app.post("/upload-files", upload.single("file"), async (req, res) => {
    try {
      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      // Extract title and fileName from the request body
      const { title, fileName } = req.body;
  
      // Check if title and fileName are provided
      if (!title || !fileName) {
        return res.status(400).json({ error: "Title or fileName is missing" });
      }
  
      // Create a new document in the PDFDetails collection
      await PDFSchema.create({ title, pdf: fileName });
  
      // Send success response
      res.json({ status: "File uploaded successfully" });
    } catch (error) {
      // Handle errors
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  app.get("/get-files", async (req, res) => {
    try {
      PDFSchema.find({}).then((data) => {
        res.send({ status: "SUCCESS" });
      });
    } catch (error) {
      res.json({ status: error });
    }
  });
}



