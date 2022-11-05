
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import { Colors, GlobalStyle } from '../../styles'
import CustomButton from '../../components/CustomButton'
import SignInImage from '../../assets/images/signIn.jpg'
import { Auth } from 'aws-amplify'

const SignInScreen = ({ navigation }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)


    const globalStyle = GlobalStyle.useGlobalStyle()

    const handleSignIn = async () => {
        if (!username || !password) return Alert.alert("Warning!", "username or password missing.")
        try {
            setLoading(true)
            const user = await Auth.signIn(username, password)
            setLoading(false)
            if (user) navigation.navigate("Home")
        } catch (error) {
            setLoading(false)
            Alert.alert("Error", error.message)
        }
        setUsername("")
        setPassword("")
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
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Enter your username"
                    />
                    <CustomInput
                        title="Password"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter your password"
                        secureTextEntry={true}
                    />
                    <CustomButton
                       title={loading ? "Signing In..." : "Sign In"}
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