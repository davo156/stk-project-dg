import axios from 'axios';
import { HttpClient } from './HttpClient';

const axiosInstance = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (request) => {
    return request;
  },
  (error: any) => {
    return Promise.reject(error.response || error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: any) => {
    return Promise.reject(error.response || error);
  }
);

export const axiosClient: HttpClient = {
  get: async <T>(url: string, config?: any): Promise<T> => {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  },
  post: async <T>(url: string, data?: any, config?: any): Promise<T> => {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
  },
  put: async <T>(url: string, data?: any, config?: any): Promise<T> => {
    const response = await axiosInstance.put<T>(url, data, config);
    return response.data;
  },
  delete: async <T>(url: string, config?: any): Promise<T> => {
    const response = await axiosInstance.delete<T>(url, config);
    return response.data;
  },
}