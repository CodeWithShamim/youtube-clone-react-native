import { View, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Colors } from '../styles'
import Logo from '../assets/images/logo.png'

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={Logo}
                resizeMode="cover"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondary,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 130,
        height: 130,
    },
})

export default SplashScreen