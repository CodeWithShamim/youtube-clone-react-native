import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { Colors, GlobalStyle } from '../styles'

const CustomFooter = () => {

    const globalStyle = GlobalStyle.useGlobalStyle()

    const tabs = [
        { name: 'Home', screen: 'Home', icon: 'home' },
        { name: 'Shorts', screen: '', icon: 'youtube' },
        { name: 'Plus', screen: '', icon: 'plus-circle' },
        { name: 'Subscriptions', screen: '', icon: 'package' },
        { name: 'Library', screen: '', icon: 'video' },
    ]

    return (
        <View style={[styles.tabContainer, globalStyle.rowCenterBetween]}>
            {tabs.map((tab, index) =>
                <Pressable key={index} style={{alignItems:"center"}}>

                    <FeatherIcon name={tab.icon} size={tab.name === "Plus" ? 30 : 20} color={Colors.secondary} />
                    {tab.name !== "Plus" && <Text style={styles.tabIconName}>{tab.name}</Text>}
                </Pressable>
            )}
        </View>
    )
}

const styles = StyleSheet.create({

    tabContainer: {
        height: 60,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 8,
        backgroundColor: Colors.primary,
    },
    tabIconName: {
        fontWeight: "600",
        color: Colors.secondary,
        fontSize: 10,
        paddingTop:2,
    }
})

export default CustomFooter