import { globalStyles } from '@/app/config/app-theme';
import { useUserContext } from '@/app/core/context/auth.provider';
import React, { useRef } from 'react';
import { Animated, Easing, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ProductsList } from '../../components/products/ProductsList';
import { useProductUserPersistStore } from '../../hooks/useFavoriteProductsStore';

export const ProfileScreen = () => {
  const { user } = useUserContext();
  const {userProductList} = useProductUserPersistStore();
  const shake = useRef( new Animated.Value(0)).current;

  const animatedStyle = {
    transform: [{ translateX: shake }]
  }

  const doShaking = () => {
    shake.setValue(0);
    Animated.sequence([
      Animated.timing(shake, {
        toValue: 10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shake, {
        toValue: -10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shake, {
        toValue: 10,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shake, {
        toValue: 0,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={ globalStyles.header }>Welcome to your profile!</Text>
      <View style={ styles.mainContainer }>
        <Pressable 
          style={{ flex: 1 }}
          onPress={ doShaking }
        >
          <Animated.View style={[ animatedStyle ]}>
            <Image style={ styles.image } source={{ uri: user?.image }} />
          </Animated.View>
        </Pressable>
        <View style={ styles.infoContainer }>
          <Text style={ globalStyles.titleBold }>{ user?.name }</Text>
          <Text style={ globalStyles.title }>{ user?.username }</Text>
          <Text style={ globalStyles.title }>{ user?.email }</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <Text>My favorites</Text>
        <ProductsList products={userProductList} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({ 
  mainContainer: {
    flex: 1,
    margin: 15,
    flexDirection: 'row'
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10
  },
  image: {
    borderRadius: 10,
    height: 300
  },
  listContainer: {
    display: 'flex',
    flex: 1,
    height: 'auto'
  }
})