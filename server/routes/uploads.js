import { Router } from "express";
import multer from "multer";
import { uploadBufferToCloudinary } from "../cloudinary.js";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_BYTES = 8 * 1024 * 1024; // 8MB

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_SIZE_BYTES },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      return cb(new Error("Only JPG, PNG, WEBP, or GIF images are allowed."));
    }
    cb(null, true);
  },
});

export const uploadsRouter = Router();

uploadsRouter.post("/", (req, res) => {
  upload.single("photo")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message || "Upload failed." });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No photo was received." });
    }
    try {
      const url = await uploadBufferToCloudinary(req.file.buffer, "uploads");
      res.json({ url });
    } catch (uploadErr) {
      console.error("Cloudinary upload failed:", uploadErr.message);
      res.status(500).json({ error: "Could not save the uploaded photo." });
    }
  });
});
