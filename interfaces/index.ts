import { Schema } from "mongoose";

export interface IProduct {
  title: string;
  imageUrl: string;
  price: number;
  description: string;
  keywords: string[];
  category: string[];
  artist: Schema.Types.ObjectId;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  isArtist?: boolean;
}

export interface IErrorData {
  message: string;
  originalError?: string;
}

export interface IPayload {
  _id: object;
  isArtist: boolean;
}

export interface IUserFilter {
  _id?: object;
  name?: string;
  email?: string;
}
