import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { Colors, GlobalStyle } from '../styles'
import { useNavigation, useRoute } from '@react-navigation/native'

const CustomFooter = () => {

    const globalStyle = GlobalStyle.useGlobalStyle()
    const navigation = useNavigation()
    const router = useRoute()

    const tabs = [
        {name: 'Home', screen: 'Home', icon: 'home' },
        {name: 'Shorts', screen: 'ShortsVideo', icon: 'youtube' },
        {name: 'Plus', screen: 'VideoUpload', icon: 'plus-circle' },
        {name: 'MemberShips', screen: 'MemberShips', icon: 'package' },
        {name: 'Library', screen: 'Library', icon: 'video' },
    ]

    const handleNavigate = (tab) => {
        navigation.push(tab.screen || "Home")
    }

    return (
        <View style={[styles.tabContainer, globalStyle.rowCenterBetween]}>
            {tabs.map((tab, index) =>
                <Pressable style={{ alignItems: "center" }} onPress={() => handleNavigate(tab)} key={index}>

                    <FeatherIcon name={tab.icon} size={tab.name === "Plus" ? 30 : 20} color={tab.screen === router.name ? "green" : Colors.secondary} />

                    {tab.name !== "Plus" && <Text style={[tab.screen === router.name ? {color:"green"} : {color: Colors.secondary},styles.tabIconName]}>{tab.name}</Text>}
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

    tabPressContainer: {
        backgroundColor: "red"
    },

    tabIconName: {
        fontWeight: "600",
        fontSize: 10,
        paddingTop: 2,
    }
})

export default CustomFooter