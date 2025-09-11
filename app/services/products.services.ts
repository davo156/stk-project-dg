import { axiosClient } from "../config/adapters/AxiosClient";
import { ProductsResponse } from "../infrastructure/interfaces/products.response";

export const getAllProducts = (): Promise<ProductsResponse> => {
  return axiosClient.get('products/category/smartphones');
}