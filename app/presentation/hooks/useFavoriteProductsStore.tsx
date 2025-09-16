import { Product } from '@/app/core/entities/product.entity';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
//import { createJSONStorage, persist } from 'zustand/middleware';
import { createJSONStorage, persist } from 'expo-zustand-persist';


interface IFavProductStore {
    userProductList: Product[];
    addUserProduct: (product: Product) => void;
    removeUserProduct: (id:number) => void;
}

export const useProductUserPersistStore = create<IFavProductStore>()(
    persist((set) => ({
        userProductList: [],
        addUserProduct: (product) => set((state) => ({ 
            userProductList: [...state.userProductList, product] 
        })),
        removeUserProduct: (id) => set((state)=> ({
            userProductList: state.userProductList.filter((product)=> product.id!==id)
        }))
    }), {
        name: 'favorite-product-storage',
        storage: createJSONStorage(() => AsyncStorage)
}));