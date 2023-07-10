import express from "express";
import dotenv from "dotenv";

import cloudinary from "cloudinary";
import multer from "multer";
import { v4 as uuid } from "uuid";
import path from "path";
import Pdfuser from "../Models/pdfuser.js";

const pdfuserRoutes = express.Router();
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const id = uuid();
    const filename = `${id}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .pdf format allowed!"));
    }
  },
  storage: storage,
});

pdfuserRoutes.post("/", upload.single("pdf"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
    });
    const user = new Pdfuser({
      name: req.body.name,
      client: req.body.client,
      brand: req.body.brand,
      work: req.body.work,
      avatar:
        "https://res.cloudinary.com/dquitirgk/image/upload/v1680966153/PDF_file_icon.svg_pvsyna.png",
      pdf: result.secure_url,
      cloudinary_id_pdf: result.public_id,
    });
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

pdfuserRoutes.get("/", async (req, res) => {
  try {
    const users = await Pdfuser.find();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});

pdfuserRoutes.delete("/del/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pdf = await Pdfuser.findById(id);

    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    await cloudinary.uploader.destroy(pdf.cloudinary_id_pdf);
    await pdf.remove();

    res.json({ message: "PDF deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default pdfuserRoutes;
