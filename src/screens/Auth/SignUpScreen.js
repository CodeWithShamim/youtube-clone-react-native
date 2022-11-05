
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import { Colors, GlobalStyle } from '../../styles'
import CustomButton from '../../components/CustomButton'
import SignInImage from '../../assets/images/signUp.jpg'

const SignUpScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const globalStyle = GlobalStyle.useGlobalStyle()

  console.log("Email", email)
  console.log("Password", password)
  console.log("userName", userName)

  const handleSignUp = () => {
    console.log("Sign up");
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
            onChangeText={setUserName}
            placeholder="Enter your username"
          />
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
          <CustomButton
            title="Sign Up"
            bgColor="red"
            onPress={handleSignUp}
          />
        </KeyboardAvoidingView>

        <View style={[globalStyle.rowCenterBetween, { padding: 30 }]}>
          <Text
            style={{ color: "purple" }} >
            Forgot password?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={{ color: "purple", fontWeight: "500" }}>Sign In?</Text>
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
  },
  bottomContent: {
    height: "70%",
    backgroundColor: Colors.secondary,
    marginTop: "auto",
    paddingTop: "10%",
  },
  image: {
    flex: 1,
    height: "100%",
    width: "100%",
  }
})

export default SignUpScreen