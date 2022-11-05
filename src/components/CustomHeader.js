import { View, Text, Image, StyleSheet, Switch, Alert, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import logo from '../assets/images/logo.png'
import { Colors, GlobalStyle } from '../styles'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Auth } from 'aws-amplify'
import { ThemeContext } from '../store/context'
import { useNavigation } from '@react-navigation/native'

const CustomHeader = () => {
    const { theme, handleTheme } = useContext(ThemeContext)
    const globalStyle = GlobalStyle.useGlobalStyle()
    const navigation = useNavigation()

    const handleSignOut = async () => {
        try {
            await Auth.signOut()
            navigation.navigate("SignIn")
        } catch (error) {
            Alert.alert("Error", error.message)
        }
    }

    return (
        <View style={[styles.container, globalStyle.shadow, globalStyle.rowCenterBetween]}>
            <Image style={styles.logo} source={logo} />

            <View style={[globalStyle.rowCenterBetween, { width: "60%" }]}>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={theme ? "#45ff30" : "#f4f3f4"}
                    onValueChange={() => handleTheme(!theme)}
                    value={theme}
                />
                <Feather name='cast' size={20} color={Colors.secondary} />
                <AntDesign name='bells' size={20} color={Colors.secondary} />
                <Feather name='search' size={20} color={Colors.secondary} />
                <FontAwesome name='user' size={20} color={Colors.secondary} />
                <TouchableOpacity onPress={handleSignOut}>
                    <FontAwesome name='sign-out' size={17} color={Colors.secondary} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        padding: 10,
    },
    logo: {
        resizeMode: "contain",
        width: 100,
        height: 20,
    }
})

export default CustomHeader