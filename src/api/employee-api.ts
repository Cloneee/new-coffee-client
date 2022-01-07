import { Employee, ListResponse } from 'models';
import axiosClient from './axios-client';

const EmployeeAPi = {
  getAll(): Promise<ListResponse<Employee>> {
    const url = '/employees';
    return axiosClient.get(url);
  },
  add(data: Employee): Promise<Employee> {
    const url = '/employees';
    return axiosClient.post(url, data);
  },
  changePassword(newPassword: string): Promise<any> {
    const url = '/employees/changepassword';
    return axiosClient.post(url,{"password": newPassword});
  },
  update(id : string ,data: Employee): Promise<Employee> {
    const url = '/employees/'+id;
    return axiosClient.put(url, data);
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

export default EmployeeAPi;
