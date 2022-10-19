import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import logo from '../assets/images/logo.png'
import { Colors, GlobalStyle } from '../styles'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const CustomHeader = () => {
    const globalStyle = GlobalStyle.useGlobalStyle();

    return (
        <View style={[styles.container, globalStyle.shadow, globalStyle.rowCenterBetween]}>
            <Image style={styles.logo} source={logo} />

            <View style={[globalStyle.rowCenterBetween, {width:"35%"}]}>
                <Feather name='cast' size={20} color={Colors.secondary}/>
                <AntDesign name='bells' size={20} color={Colors.secondary}/>
                <Feather name='search' size={20} color={Colors.secondary}/>
                <FontAwesome name='user' size={20} color={Colors.secondary}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.primary,
        padding:10,
    },
    logo:{
        resizeMode:"contain",
        width:100,
        height:20,
    }
})

export default CustomHeader