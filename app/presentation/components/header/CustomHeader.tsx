
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { IonIcon } from '../shared/IonIcon'

interface Props {
  image: keyof typeof Ionicons.glyphMap,
}

export const CustomHeader = ({ image }: Props) => {
  const { top } = useSafeAreaInsets();
  const topSpace = Platform.OS === 'ios' ? 20 : 0

  return (
    <View style={{ ...styles.container, height: top + 55 } }>
      <View style={{ top: topSpace }}>
        <IonIcon name={image} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  }
})