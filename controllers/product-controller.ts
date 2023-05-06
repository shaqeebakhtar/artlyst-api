import type { Response, NextFunction } from "express";
import { ErrorService } from "../services";

class ProductController {
  async add(req: any, res: Response, next: NextFunction) {
    // validate the data
    const { title, price, description, keywords, category } = req.body;

    if (!title || !price || !description || !keywords || !category) {
      return next(ErrorService.validation("All fields are required"));
    }

    console.log(req.file);

    res.status(200).json({ message: "all good" });
  }
}

export default new ProductController();
