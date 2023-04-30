import type { Response, NextFunction } from "express";
import { ErrorService } from "../services";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const uniqueName = `${file.filename}-${suffix}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueName);
  },
});

let upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 5MB
}).single("image");

class ProductController {
  async add(req: any, res: Response, next: NextFunction) {
    // validate the data
    console.log(req.body);
    const { title, price, description, keywords, category } = req.body;

    if (!title || !price || !description || !keywords || !category) {
      return next(ErrorService.validation("All fields are required"));
    }

    upload(req, res, (err) => {
      if (err) {
        console.log(err);

        return next(ErrorService.serverError(err.message));
      }
      const filePath = req.file.path;
      console.log(req.file);

      res.status(200).json({ message: "all good" });
    });
  }
}

export default new ProductController();
