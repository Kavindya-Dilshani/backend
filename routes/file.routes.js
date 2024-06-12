import multer from "multer";
import fileController from "../controllers/file.controller.js";

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
  // Get files
  app.get("/api/files/get-files", [], fileController.getFiles);
  // Get file
  app.get("/api/files/get-file", [], fileController.getFile);
}
