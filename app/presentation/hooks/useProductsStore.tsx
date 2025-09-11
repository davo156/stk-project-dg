import { Product } from '@/app/core/entities/product.entity';
import { create } from 'zustand';

export interface ProductsState {
  products: Product[];
  setProducts: ( products: Product[]) => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  setProducts: ( products: Product[]) => {
    set({ products })
  }
}));