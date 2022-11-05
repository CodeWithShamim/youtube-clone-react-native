import { Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../styles'

const CustomButton = ({ title, onPress, transparent, bgColor, color }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, !transparent ? { backgroundColor: bgColor || "purple" } : { borderWidth: 1 }]}>
            <Text style={[styles.title, { color: color || Colors.secondary }]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "96%",
        alignSelf: "center",
        paddingVertical: 10,
        marginTop: 20,
        borderRadius: 20,
        borderColor: Colors.primary,
    },
    title: {
        fontWeight: "800",
        fontSize: 15,
        textTransform: "uppercase",
        textAlign: "center",
    }
})

export default CustomButton