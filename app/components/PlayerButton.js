import React from 'react'
import {AntDesign} from '@expo/vector-icons'
import colors from '../colors/colors'

export default function PlayerButton(props) {
    const { iconType, size = 40, color = colors.FONT, onPress} = props
    const getIconName = (type) => {
        switch (type) {
          case "PLAY":
            return 'pausecircleo';
          case "PAUSE":
            return 'playcircleo';
          case "NEXT":
            return 'forward';
          case "PREVIOUS":
            return 'banckward';
        }
    }
  return (
      <AntDesign onPress={onPress} name={getIconName(iconType)} size={size} color={color} {...props} />
  )
}
