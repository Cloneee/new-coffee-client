import { Category } from "./category";

export interface Product {
  _id?: string,
  name: string;
  description: string;
  images?: [string];
  price: number;
  category: Category;
  isFeatured?: boolean;
  dateCreated?: string;
  __v: number;
}
