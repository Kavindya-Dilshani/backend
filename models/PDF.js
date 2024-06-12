import mongoose, { mongo } from "mongoose";

const PDFSchema = new mongoose.Schema(
  {
    pdf: String,
    title: String,
  },
  { collection: "PDFDetails" }
);

const PDFDetails = mongoose.model("PDFDetails", PDFSchema);
export default PDFDetails;
