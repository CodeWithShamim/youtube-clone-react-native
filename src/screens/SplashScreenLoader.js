import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../styles'
import Logo from '../assets/lottie/splash.json'
import Lottie from 'lottie-react-native'

const SplashScreenLoader = () => {
    return (
        <View style={styles.container}>
            <Lottie
                style={{ width: 120, height: 120 }}
                source={Logo}
                autoPlay
                loop
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
})

export default SplashScreenLoader