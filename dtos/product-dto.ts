import { Schema } from "mongoose";

interface IProduct {
  _id: object;
  title: string;
  imageUrl: string;
  price: number;
  description: string;
  keywords: string[];
  category: string[];
  artist: object;
}

class ProductDto {
  _id;
  title;
  price;
  description;
  imageUrl;

  constructor(product: IProduct) {
    this._id = product._id;
    this.title = product.title;
    this.price = product.price;
    this.description = product.description;
    this.imageUrl = product.imageUrl;
  }
}

export default ProductDto;
