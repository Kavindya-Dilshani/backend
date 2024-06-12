import multer from "multer";
import fileController from "../controllers/file.controller.js";

// app.use("/files", express.static("files"));

export default function fileRoutes(app) {
  // Configure multer to handle multipart/form-data
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

  // Upload file
  app.post(
    "/api/files/upload-files",
    upload.single("file"),
    fileController.uploadFile
  );

  // app.get("/get-files", async (req, res) => {
  //   try {
  //     PDFSchema.find({}).then((data) => {
  //       res.send({ status: "SUCCESS" });
  //     });
  //   } catch (error) {
  //     res.json({ status: error });
  //   }
  // });
}
