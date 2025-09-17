 

import { RootStackParams } from '@/app/_layout';
import { globalColors, globalStyles } from '@/app/config/app-theme';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader';
import { useLogin } from '../../hooks/useLogin';
import { useUsername } from '../../hooks/useUsername';



export const LoginScreen = () => {

  const [ password, setPassword ] = useState<string>();
  const { username, onChangeUsername } = useUsername();
  const { isLoading, data, hasError, onLoginSubmit, onGet, onSaveUserData } = useLogin(username!, password!);

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  useFocusEffect(
    useCallback(() => {
      console.log('useCallback: ', data)
      onGet('token').then((val) => {
        if (val === null || val === undefined) return;
        if (val.length > 0) {
          onSaveUserData();
          navigation.navigate('Home');
        }
      })
    }, [data])
  );

  if (isLoading) {
    return (
      <FullScreenLoader />
    )
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
    >  
      <View style={ globalStyles.container }>
        <Text style={ globalStyles.header }>Welcome, please login!</Text>
        <TextInput 
          style={ styles.input }
          value={ username }
          onChangeText={ onChangeUsername }
          placeholder='Enter your username'
          placeholderTextColor={ globalColors.tertiary }
          autoCorrect={ false }
          autoCapitalize='none'
        />
        <TextInput 
          style={ styles.input }
          value={ password }
          onChangeText={ setPassword }
          placeholder='Enter your password'
          placeholderTextColor={ globalColors.tertiary }
          autoCorrect={ false }
          secureTextEntry={ true }
        />
        {
          hasError && <Text style={ styles.error }>Wrong credentials, try again!</Text>
        }

        <Pressable 
          style={ globalStyles.accentButton }
          onPress={ onLoginSubmit }
        >
          <Text style={ globalStyles.accentButtonText }>Login</Text>
        </Pressable>  
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 45,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: globalColors.primary,
    padding: 5,
    fontSize: 16,
  },
  error: {
    fontSize: 14,
    color: globalColors.error
  }
})