
import { globalColors, globalStyles } from '@/app/config/app-theme';
import { Product } from '@/app/core/entities/product.entity';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { HomeStackParams } from '../../routes/HomeStackNavigator';
import { IonIcon } from '../shared/IonIcon';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {

  const navigation = useNavigation<NavigationProp<HomeStackParams>>();

  return (
    <Pressable
      onPress={ () => navigation.navigate('ProductDetail', { product }) }
      style={ ({ pressed }) => ({
        width: '48%',
        height: 350,
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <View style={ styles.imageContainer }>
        <View style={{ flex: 1 }}>
          <IonIcon name={ product.isFavorite ? 'bookmark' : 'bookmark-outline' } color={ globalColors.accent } />
          <Image style={ styles.image } source={{ uri: product.thumbnail }} />
        </View>
        <Text style={ globalStyles.title }>{ product.title }</Text>
        <Text style={ globalStyles.price }>${ product.price }</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create( {
  image: {
    flex: 1,
    borderRadius: 8,
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#f7f7f7ff',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    paddingHorizontal: 8,
    paddingVertical: 10
  }
})

