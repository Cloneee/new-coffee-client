import { ListParams, ListResponse, Order, OrderResponse } from 'models';
import axiosClient from './axios-client';

const orderAPi = {
  getAll(currentPage: number): Promise<ListResponse<OrderResponse>> {
    const url = '/orders?limit=15&page='+currentPage;
    return axiosClient.get(url);
  },
  add(data: Order): Promise<Order> {
    const url = '/orders';
    return axiosClient.post(url, data);
  },
  toogle(data: any): Promise<any> {
    const url = '/orders/toggle';
    return axiosClient.post(url, data);
  },

  getById(id: string): Promise<Order> {
    const url = `/orders/${id}`;
    return axiosClient.get(url);
  },
  getTotalSales(body: any): Promise<any> {
    const url = `/orders/totalsales`;
    return axiosClient.post(url, body);
  },
  getByCustomer(params: ListParams): Promise<ListResponse<OrderResponse>> {
    const url = `/orders/customer/${params.id}?limit=5&page=${params.page}`;
    return axiosClient.get(url);
  },
  remove(id: string): Promise<any> {
    const url = `/orders/${id}`;
    return axiosClient.delete(url);
  },
};

export default orderAPi;
