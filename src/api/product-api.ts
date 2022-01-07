import { ListResponse } from 'models';
import { Product } from 'models';
import axiosClient from './axios-client';

const productAPi = {
  getAll(): Promise<ListResponse<Product>> {
    const url = '/products';
    return axiosClient.get(url);
  },
  add(data: Product): Promise<Product> {
    const url = '/products';
    return axiosClient.post(url, data);
  },
  update(data: Product): Promise<Product> {
    const url = '/products';
    return axiosClient.patch(url, data);
  },

  getById(id: string): Promise<Product> {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  remove(id: string): Promise<any> {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};

export default productAPi;
