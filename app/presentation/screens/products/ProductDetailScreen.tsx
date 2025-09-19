/* eslint-disable @typescript-eslint/no-empty-object-type */

import { RootStackParams } from '@/app/_layout';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { globalStyles } from '@/app/config/app-theme';
import { Product } from '@/app/core/entities/product.entity';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect, useNavigation } from 'expo-router';
import { AddProductButton } from '../../components/productDetail/AddProductButton';
import { CarouselImg } from '../../components/productDetail/CarouselImg';
import { ReviewsList } from '../../components/productDetail/ReviewsList';
import { useProducts } from '../../hooks/useProducts';

//interface Props extends NativeStackScreenProps<HomeStackParams, 'ProductDetail'> {};
interface Props extends NativeStackScreenProps<RootStackParams, 'ProductDetail'> {};

export const ProductDetailScreen = ({ route }: Props) => {
  const {id} = route.params
  const {products} = useProducts()
  const [product, setProduct] = useState<Product>();

  const navigator = useNavigation();
  useFocusEffect(
    useCallback(() => {
      navigator.setOptions({
        headerShown: true
      })
    }, [])
  );

  useEffect(() => {
    //navigator.setOptions({ headerShown: true });
    setProduct(products.find(product => id === product.id))
  },[])

  if (product!==undefined) {
    return (
      <ScrollView>
        <View style={ styles.container }>
          {/* <Image
            style={ styles.image }
            source={{ uri: product.images[0] }}
          /> */}
          <CarouselImg imageList={product.images}/>
          <View style={ styles.priceContainer }>
            <Text style={ globalStyles.header }>{ product.title }</Text>
            <Text style={ globalStyles.description }>Category: { product.category }</Text>
          </View>
          <Text style={ globalStyles.price}>{ product.price }</Text>
          <View style={ globalStyles.line } />
          <Text style={ globalStyles.description}>{ product.description }</Text>
          <View style={ globalStyles.line } />
          <ReviewsList reviews={ product.reviews } />
          <AddProductButton product={product}/>      
        </View>
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    paddingBottom: 40
  },
  priceContainer: {
    flexDirection: 'column',
    paddingBottom: 10
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 8,
  },
  column: {
    justifyContent: 'space-between',
    padding: 10
  }
})