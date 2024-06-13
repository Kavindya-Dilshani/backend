import multer from "multer";
import fileController from "../controllers/file.controller.js";
import verifyToken from "../middlewares/common.js";

export default function fileRoutes(app) {
  // Configure multer to handle multipart/form-data
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

  // Upload file
  app.post(
    "/api/files/upload-files",
    [verifyToken, upload.single("file")],
    fileController.uploadFile
  );
  // Get files
  app.get("/api/files/get-files", [verifyToken], fileController.getFiles);
  // Get file
  app.get("/api/files/get-file", [verifyToken], fileController.getFile);
}
