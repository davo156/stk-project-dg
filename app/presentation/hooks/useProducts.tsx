import { ProductMapper } from '@/app/infrastructure/mappers/product.mapper';
import { getAllProducts } from '@/app/services/products.services';
import { useEffect, useState } from 'react';
import { useProductsStore } from './useProductsStore';

export const useProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  //const [products, setProducts] = useState<Product[]>([]);

  const products = useProductsStore( state => state.products);
  const productsStore = useProductsStore( state => state.setProducts);

  useEffect(() => {
    initialLoad();
    setIsLoading(true);
  }, [])
  
  const initialLoad = async () => {
    getAllProducts().then((response) => {
      const productList = response.products.map( result => ProductMapper.fromProductResponseResultToEntity(result) )
      productsStore(productList)
      //setProducts(productList);
      setIsLoading(false);
    }).catch((error) => {
      //setProducts([]);
      productsStore([])
      setIsLoading(false);
    });
  }

  return {
    products,
    isLoading,
  }
}