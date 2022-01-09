import { LoginPayLoad } from 'features/auth/authSlice';
import { Employee, ListParams, ListResponse, LoginResponseType } from 'models';
import axiosClient from './axios-client';

const employeeAPi = {
  getAll(params: ListParams): Promise<ListResponse<Employee>> {
    const url = '/employees';
    return axiosClient.get(url, { params });
  },
  login(data: LoginPayLoad): Promise<LoginResponseType> {
    const url = '/employees/login';
    return axiosClient.post(url, data);
  },
  add(data: Employee): Promise<Employee> {
    const url = '/employees';
    return axiosClient.post(url, data);
  },
  update(data: Employee): Promise<Employee> {
    const url = '/employees';
    return axiosClient.patch(url, data);
  },

  getById(id: string): Promise<Employee> {
    const url = `/employees/${id}`;
    return axiosClient.get(url);
  },
  remove(id: string): Promise<any> {
    const url = `/employees/${id}`;
    return axiosClient.delete(url);
    
  },
};

export default employeeAPi;