import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { Colors } from '../styles'

const CustomInput = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props?.title}</Text>
            <TextInput {...props} style={styles.inputBox}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        marginHorizontal: 10,
        marginTop: 20,
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 20,
    },
    inputBox: {
        flex: 1,
        fontSize: 14,
        borderRadius: 20,
        paddingLeft:15,
    },
    title: {
        fontSize: 15,
        fontWeight: "500",
        color: Colors.primary,
        position: "absolute",
        left: 30,
        top: -12,
        backgroundColor: Colors.secondary,
        paddingHorizontal: 3,
    }
})

export default CustomInput