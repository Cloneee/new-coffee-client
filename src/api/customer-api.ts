import { ListResponse } from 'models';
import { Customer } from 'models';
import axiosClient from './axios-client';

const CustomerAPi = {
  getAll(): Promise<ListResponse<Customer>> {
    const url = '/customers';
    return axiosClient.get(url);
  },
  add(data: Customer): Promise<Customer> {
    const url = '/customers';
    return axiosClient.post(url, data);
  },
  update(id:string , data: Customer): Promise<Customer> {
    const url = '/customers/'+id;
    return axiosClient.put(url, data);
  },

  getById(id: string): Promise<Customer> {
    const url = `/customers/${id}`;
    return axiosClient.get(url);
  },
  search(query: string): Promise<ListResponse<Customer>> {
    const url = `/customers/search`;
    return axiosClient.post(url, {"text" : query});
  },
  remove(id: string): Promise<any> {
    const url = `/customers/${id}`;
    return axiosClient.delete(url);
  },
};

export default CustomerAPi;
