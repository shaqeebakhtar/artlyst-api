import type { Response, NextFunction, Request } from "express";
import { ErrorService, productService } from "../services";
import { ProductDto } from "../dtos";
import { IProduct } from "../interfaces";

class ProductController {
  async add(req: any, res: Response, next: NextFunction) {
    const { title, price, description, keywords, category }: IProduct =
      req.body;

    // validate the data
    if (!title || !price || !description || !keywords || !category) {
      return next(ErrorService.validation("All fields are required"));
    }

    let product;
    try {
      product = await productService.addProduct({
        title,
        price,
        imageUrl: req.file.path,
        category,
        description,
        keywords,
        artist: req.user._id,
      });
    } catch (error) {
      return next(error);
    }

    const productDto = new ProductDto(product);

    res.status(200).json(productDto);
  }
}

export default new ProductController();
