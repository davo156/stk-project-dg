
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader'
import { ProductsList } from '../../components/products/ProductsList'
import { useProducts } from '../../hooks/useProducts'

export const HomeScreen = () => {

  const { isLoading, products } = useProducts();
  const navigator = useNavigation();

  // useEffect(() => {
  //   navigator.getParent()?.setOptions({
  //     headerShown: false
  //   });
  // })

  useFocusEffect(
    useCallback(() => {
      navigator.getParent()?.setOptions({
        headerShown: true
      });
    }, [])
  );

  if (isLoading) {
    return (
      <FullScreenLoader />
    )
  }

  return (
    <View style={{ flex: 1, marginTop: 10, paddingBottom: 10 }}>
      <ProductsList products={ products } />
    </View>
  )
}