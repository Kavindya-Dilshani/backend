import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    pdf: { type: Buffer, required: true }, // Store the PDF file as a Buffer
    contentType: { type: String }, // Store content type
    userId: { type: String, required: true },
  },
  { collection: "PDFDetails" }
);

const PDF = mongoose.model("PDFDetails", pdfSchema);

export default PDF;
