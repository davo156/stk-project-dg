
import { Product } from '@/app/core/entities/product.entity';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ProductCard } from './ProductCard';

interface Props {
  products: Product[];
}

export const ProductsList = ({ products }: Props) => {
  return (
    <FlatList 
      data = { products }
      renderItem={ ({ item }) => (
        <ProductCard product={ item } />
      )}
      keyExtractor={ item => item.id.toString() }
      numColumns={ 2 }
      columnWrapperStyle={ styles.column}
    />
  )
}

const styles = StyleSheet.create({
  column: {
    justifyContent: 'space-between',
    padding: 10
  }
})