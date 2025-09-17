/* eslint-disable @typescript-eslint/no-empty-object-type */

import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { HomeStackParams } from '../../routes/HomeStackNavigator';

import { globalStyles } from '@/app/config/app-theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ReviewsList } from '../../components/productDetail/ReviewsList';

interface Props extends NativeStackScreenProps<HomeStackParams, 'ProductDetail'> {};

export const ProductDetailScreen = ({ route }: Props) => {
  const { product } = route.params;
  const navigator = useNavigation();
  
  useEffect(() => {
    navigator.setOptions({ headerShown: true });
    navigator.getParent()?.setOptions({
      headerShown: false
    });
  })

  return (
    <ScrollView>
      <View style={ styles.container }>
        <Image
          style={ styles.image }
          source={{ uri: product.images[0] }}
        />
        <View style={ styles.priceContainer }>
          <Text style={ globalStyles.header }>{ product.title }</Text>
          <Text style={ globalStyles.description }>Category: { product.category }</Text>
        </View>
        <Text style={ globalStyles.price}>{ product.price }</Text>
        <View style={ globalStyles.line } />
        <Text style={ globalStyles.description}>{ product.description }</Text>
        <View style={ globalStyles.line } />
        <ReviewsList reviews={ product.reviews } />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
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