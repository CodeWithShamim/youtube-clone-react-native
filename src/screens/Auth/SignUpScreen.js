
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import { Colors, GlobalStyle } from '../../styles'
import CustomButton from '../../components/CustomButton'
import SignInImage from '../../assets/images/signUp.jpg'
import { Auth } from 'aws-amplify'

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const globalStyle = GlobalStyle.useGlobalStyle()

  const handleSignUp = async () => {
    if (!username || !email || !password) return Alert.alert("Warning!", "Please provide all information.")
    try {
      setLoading(true)
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email
        }
      })
      setLoading(false)
      if (user) navigation.navigate("ConfirmSignUp", { username })
    } catch (error) {
      setLoading(false)
      Alert.alert("Error", error.message)

    }
    setUsername("")
    setEmail("")
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
            title="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
          />
          <CustomInput
            title="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry={true}
          />
          <CustomButton
            title={loading ? "Signing Up..." : "Sign Up"}
            bgColor="red"
            onPress={loading ? null : handleSignUp}
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