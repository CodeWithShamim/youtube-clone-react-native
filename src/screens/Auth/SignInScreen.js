
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import { Colors } from '../../styles'

const SignInScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    console.log("Email", email)
    console.log("Password", password)
    
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView>
                <CustomInput
                    title="Email"
                    // value=""
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                />
                <CustomInput
                    title="Password"
                    // value=""
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    secureTextEntry={true}
                />
            </KeyboardAvoidingView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondary
    }
})

export default SignInScreen