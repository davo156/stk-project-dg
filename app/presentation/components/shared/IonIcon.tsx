
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';

interface Props {
  name: keyof typeof Ionicons.glyphMap,
  size?: number,
  color?: string
}

export const IonIcon = ({ name, size = 25, color = 'black' }: Props) => {
  return (
    <Ionicons name={ name } size={ size } color={ color } />
  )
}