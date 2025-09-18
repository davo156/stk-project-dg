/* eslint-disable react-hooks/exhaustive-deps */
import { globalColors, globalStyles } from '@/app/config/app-theme';
import { useUserContext } from '@/app/core/context/auth.provider';
import { StackActions, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ProductsList } from '../../components/products/ProductsList';
import { useProductUserPersistStore } from '../../hooks/useFavoriteProductsStore';
import { useSecureStore } from '../../hooks/useLoginStore';
import { useProfileImageStore } from '../../hooks/useProfileImageStore';

export const ProfileScreen = () => {
  const { user, setUser } = useUserContext();
  const {userProductList} = useProductUserPersistStore();
  const shake = useRef( new Animated.Value(0)).current;

  const { onRemove } = useSecureStore()
  const navigator = useNavigation();

  const [permission, setPermission] = useState<boolean>(false);

  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const { profileImage, addProfileImage } = useProfileImageStore();

  const animatedStyle = {
    transform: [{ translateX: shake }]
  }

  useEffect(() => {
    if (status?.granted) {
      pickImage();
    }
  }, [permission])

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
    ]).start((completion) => {
      if( completion.finished ) {

        if ( status?.granted ) {
          pickImage()
        } else if (status?.canAskAgain) {
          requestPermission().finally(() => {
            setPermission(true)
          })
        }
      }
    });
  }

  const pickImage = async() => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      aspect: [4,3],
      quality: 1
    })

    if ( !result.canceled ) {
      addProfileImage(result.assets[0])
      setUser({
        name: user?.name ?? '', 
        username: user?.username ?? '', 
        email: user?.email ?? '', 
        image: result.assets[0].uri
      })
    }
  }

  const onLogout = async() => {
    try {
      await onRemove('token')
      navigator.dispatch( StackActions.popToTop );
    } catch {
      console.log('Logout failed')
    }
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 10 }}>
        <Text style={ globalStyles.header }>Welcome to your profile!</Text>
        <View style={ styles.mainContainer }>
          <Pressable 
            style={{ flex: 1 }}
            onPress={ doShaking }
          >
            <Animated.View style={[ animatedStyle, { overflow: 'hidden'} ]}>
              <Image style={ styles.image } source={{ uri: profileImage ? profileImage.uri : user?.image }} />
            </Animated.View>
          </Pressable>
          <View style={ styles.infoContainer }>
            <Text style={ globalStyles.titleBold }>{ user?.name }</Text>
            <Text style={ globalStyles.title }>{ user?.username }</Text>
            <Text style={ globalStyles.title }>{ user?.email }</Text>
            <Pressable
              style={ styles.logout }
              onPress={ onLogout }
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Logout</Text>
            </Pressable>
          </View>
        </View>
        <View style={ globalStyles.line } />
        <View style={styles.listContainer}>
          <Text style={ [globalStyles.header2, { paddingLeft: 10 }] }>Favorite products</Text>
          <ProductsList fromProfile={ true } products={userProductList} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({ 
  mainContainer: {
    //flex: 1,
    margin: 10,
    flexDirection: 'row',
    gap: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbcbcbff'
  },
  infoContainer: {
    // flex: 1,
    flexDirection: 'column',
    gap: 5,
    margin: 8
  },
  image: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: 180,
  },
  logout: {
    height: 30,
    width: '100%',
    borderRadius: 15,
    backgroundColor: globalColors.destructive,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
  },
  listContainer: {
    flex: 1,
    display: 'flex',
    height: 'auto'
  }
})