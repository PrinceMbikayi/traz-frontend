import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import COLORS from '../constants/colors'

const Button = (props) => {

    const filledBgColor = props.color || COLORS.primary;
    const outlinedBgColor = COLORS.white;
    const bgColor = props.filled ? filledBgColor : outlinedBgColor;
    const textColor = props.filled ? COLORS.white : COLORS.primary;

  return (
    <TouchableOpacity
        activeOpacity={0.4}
        onPress={props.onPress}
        style={{
            ...styles.button,
            ...{ backgroundColor: bgColor },
            ...props.style
        }}
    >
        <Text style={{ fontSize: 18, ...{color: textColor } }}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        paddingBottom: 16,
        paddingVertical: 16,
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default Button