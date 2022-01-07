import { ListResponse, ProductResponse } from 'models';
import { Product } from 'models';
import axiosClient from './axios-client';

const productAPi = {
  getAll(): Promise<ListResponse<Product>> {
    const url = '/products';
    return axiosClient.get(url);
  },
  add(data: ProductResponse): Promise<Product> {
    const url = '/products';
    return axiosClient.post(url, data);
  },
  update(id: string, data: Product): Promise<Product> {
    const url = '/products/'+id;
    return axiosClient.put(url, data);
  },

  getById(id: string | undefined): Promise<ProductResponse> {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  remove(id: string): Promise<any> {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
};

export default productAPi;
