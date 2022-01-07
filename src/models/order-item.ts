import { Product } from "./product";

export interface OrderItem {
    _id?: number;
    product: Product,
    quantity: number,

}