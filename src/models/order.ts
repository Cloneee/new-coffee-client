import { OrderItem } from './order-item';

export interface OrderItemForAdd {
  product?: string;
  quantity: number;
}
export interface Order {
  orderItems: OrderItemForAdd[];
  customer: string | undefined;
}
