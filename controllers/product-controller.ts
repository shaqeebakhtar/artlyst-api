import type { Request, Response, NextFunction } from "express";

class ProductController {
  async add(req: Request, res: Response, next: NextFunction) {
    // validate the data
  }
}

export default new ProductController();
