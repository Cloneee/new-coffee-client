import { Category, ListResponse } from 'models';
import axiosClient from './axios-client';

const categoryAPi = {
  getAll(): Promise<ListResponse<Category>> {
    const url = '/categories';
    return axiosClient.get(url);
  },
  add(data: Category): Promise<Category> {
    const url = '/categories';
    return axiosClient.post(url, data);
  },
  update(data: Category): Promise<Category> {
    const url = '/categories';
    return axiosClient.patch(url, data);
  },

  getById(id: string): Promise<Category> {
    const url = `/categories/${id}`;
    return axiosClient.get(url);
  },
  remove(id: string): Promise<any> {
    const url = `/categories/${id}`;
    return axiosClient.delete(url);
  },
};

export default categoryAPi;
