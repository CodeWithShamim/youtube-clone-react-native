
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import { Colors, GlobalStyle } from '../../styles'
import CustomButton from '../../components/CustomButton'
import SignInImage from '../../assets/images/signIn.jpg'

const SignInScreen = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const globalStyle = GlobalStyle.useGlobalStyle()

    console.log("Email", email)
    console.log("Password", password)

    const handleSignIn = () => {
        console.log("Sign in");
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContent}>
                <Image style={styles.image} source={SignInImage} resizeMode="cover" />
            </View>

            <View style={[styles.bottomContent, globalStyle.shadow]}>
                <KeyboardAvoidingView>
                    <CustomInput
                        title="Username"
                        // value=""
                        onChangeText={setEmail}
                        placeholder="Enter your username"
                    />
                    <CustomInput
                        title="Password"
                        // value=""
                        onChangeText={setPassword}
                        placeholder="Enter your password"
                        secureTextEntry={true}
                    />
                    <CustomButton
                        title="Sign In"
                        bgColor="red"
                        onPress={handleSignIn}
                    />
                </KeyboardAvoidingView>

                <View style={[globalStyle.rowCenterBetween, { padding: 30 }]}>
                    <Text
                        style={{ color: "purple" }} >
                        Forgot password?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                        <Text style={{ color: "purple", fontWeight: "600" }}>Sign Up?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary
    },
    topContent: {
        flex: 1,
        alignItems: "center",
    },
    bottomContent: {
        height: "50%",
        backgroundColor: Colors.secondary,
        marginTop: "auto",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: "10%",
    },
    image: {
        flex: 1,
        height: "100%",
        width: "100%",
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    }
})

export default SignInScreen