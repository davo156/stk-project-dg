import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { create } from 'zustand';

export interface LoginState {
  token: string;
  setToken: (token: string) => void;
}

export const useLoginStore = create<LoginState>((set) => ({
  token: '',
  setToken: (token: string) => {
    set({ token });
  },
}));


export const useSecureStore = () => {
  const [data, setData] = useState<string>();

  const onSave = async(key: string, value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
      setData(value)
    } catch(error) {
      console.log(error)
    }
  }

  const onGet = async(key: string) => {
    try {
      const val = await AsyncStorage.getItem(key);
      if (val !== null) {
        setData(val)
      }
      return val
    } catch(error) {
      console.log(error)
    }
  }

  const onRemove = async(key: string) => {
    try {
      await AsyncStorage.removeItem(key);

      const dat = await onGet('token')
      console.log('deleted item, validating get: ',dat)
      setData('')
    } catch(error) {
      console.log(error)
    }
  }

  return {
    data,

    onSave,
    onGet,
    onRemove
  }
}