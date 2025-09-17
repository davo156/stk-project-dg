
import { Product } from '@/app/core/entities/product.entity';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ProductCard } from './ProductCard';

interface Props {
  products: Product[];
  fromProfile?: boolean;
}

export const ProductsList = ({ products, fromProfile = false }: Props) => {
  return (
    <FlatList 
      data = { products }
      renderItem={ ({ item }) => (
        <ProductCard fromProfile={ fromProfile } product={ item } />
      )}
      keyExtractor={ item => item.id.toString() }
      numColumns={ fromProfile ? 3 : 2 }
      columnWrapperStyle={ styles.column}
      scrollEnabled= { !fromProfile }
    />
  )
}

const styles = StyleSheet.create({
  column: {
    justifyContent: 'space-between',
    padding: 10
  }
})