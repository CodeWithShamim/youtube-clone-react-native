import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Colors, GlobalStyle } from '../styles'

const VideoActionItem = ({ icon, name, size, color, likes, mp }) => {
    const globalStyle = GlobalStyle.useGlobalStyle()

    return (
        <View style={[styles.container, mp]}>
            {icon === "comments" && <FontAwesome name={icon} size={size || 22} color={color || Colors.primary} />}
            {icon === "share" && <FontAwesome name={icon} size={size || 22} color={color || Colors.primary} />}
            {icon !== "comments" && icon !== "share" ? <AntDesignIcon name={icon} size={size || 22} color={color || Colors.primary} /> : null}

            <Text style={[styles.IconSubtitle, { color: color || Colors.primary }]}>{name === "Like" ? likes : name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    IconSubtitle: {
        fontSize: 14,
        fontWeight: "700",
        marginTop: 5,
    },
})


export default VideoActionItem