import mongoose from "mongoose";
const pdfuserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    client: {
      type: String,
    },
    brand: {
      type: String,
    },
    work: {
      type: String,
    },
    avatar: {
      type: String,
    },
    pdf: {
      type: String,
    },
    cloudinary_id_img: {
      type: String,
    },

    cloudinary_id_pdf: {
      type: String,
    },
  },
  { timestamps: true }
);

const Pdfuser = mongoose.model("Pdfuser", pdfuserSchema);
export default Pdfuser;
