import productModel from "../models/product-model";
import { IProduct } from "../interfaces";

class ProductService {
  async addProduct(data: IProduct) {
    const product = await productModel.create(data);
    return product;
  }
}

export default new ProductService();
