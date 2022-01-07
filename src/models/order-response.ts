import { Customer } from './customer';
import { Employee } from './employee';
import { OrderItem } from './order-item';

export interface OrderResponse {
  _id: string;
  orderItems: OrderItem[];
  customer: Customer;
  employee: Employee;
  totalPrice: number;
  status: string;
  dateOrdered: string;
}
