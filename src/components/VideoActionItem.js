import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { Colors, GlobalStyle } from '../styles'

const VideoActionItem = ({ icon, name }) => {
    const globalStyle = GlobalStyle.useGlobalStyle()

    return (
        <View style={styles.container}>
            <AntDesignIcon name={icon} size={22} color={Colors.primary} />
            <Text style={styles.IconSubtitle}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 23,
        alignItems: "center",
    },
    IconSubtitle: {
        fontSize: 14,
        marginTop: 5,
    },
})


export default VideoActionItem