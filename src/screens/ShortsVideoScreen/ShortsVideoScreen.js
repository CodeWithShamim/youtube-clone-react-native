import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomFooter from '../../components/CustomFooter'

const ShortsVideoScreen = () => {
    return (
        <View style={styles.container}>
            <Text>ShortsVideoScreen</Text>

            <CustomFooter />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
})

export default ShortsVideoScreen