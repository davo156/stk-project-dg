
import { RootStackParams } from '@/app/_layout';
import { globalColors, globalStyles } from '@/app/config/app-theme';
import { Product } from '@/app/core/entities/product.entity';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { IonIcon } from '../shared/IonIcon';

import { useProductUserPersistStore } from '../../hooks/useFavoriteProductsStore';


interface Props {
  product: Product;
  fromProfile?: boolean;
}

export const ProductCard = ({ product, fromProfile = false }: Props) => {

  //const navigation = useNavigation<NavigationProp<HomeStackParams>>();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const route = useRoute();
  const {userProductList} = useProductUserPersistStore();
  const [id,setID] = useState(0);
  const [showFavIcon, setFavIcon] = useState(false);

  useEffect(() =>{
    setID(product.id)
  },[]);

  useEffect(() => {
    const checkFavorites:boolean = userProductList.some(favProduct => favProduct.id === product.id);
    setFavIcon(checkFavorites);
  },[userProductList]);

  return (
    <Pressable
      onPress={ () => navigation.navigate('ProductDetail', {id}) }
      style={ ({ pressed }) => ({
        width: fromProfile ? '32%' : '48%',
        height: fromProfile ? 150 : 350,
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <View style={ styles.imageContainer }>
        <View style={{ flex: 1 }}>
          {
            route.name!=='Profile' ? <IonIcon name={ showFavIcon ? 'bookmark' : 'bookmark-outline' } color={ globalColors.accent } /> : null
          }
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

