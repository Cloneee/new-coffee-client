

export interface ProductResponse {
  _id: string,
  name: string;
  description: string;
  images?: [string] | [];
  price: number;
  category: string;
  isFeatured?: boolean;
  dateCreated?: string;
  __v: number;
}
