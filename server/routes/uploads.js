import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { nanoid } from "nanoid";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(__dirname, "..", "uploads");

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_BYTES = 8 * 1024 * 1024; // 8MB

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
    cb(null, `${nanoid(16)}${ext}`);
  },
});

const upload = multer({
  storage,
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
  upload.single("photo")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message || "Upload failed." });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No photo was received." });
    }
    res.json({ url: `/uploads/${req.file.filename}` });
  });
});
