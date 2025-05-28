import multer from "multer";
import path from "path";
import fs from "fs";

// path.resolve() that give root path and path.join() give rootpath/upload
const uploadPath = path.join(path.resolve(), "uploads"); // commonly plural "uploads"

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.originalname.replace(ext, "");
    cb(null, name + Date.now() + ext);
  },
});

const validateImg = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const uploadImg = multer({
  storage,
  fileFilter: validateImg,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

export default uploadImg;
