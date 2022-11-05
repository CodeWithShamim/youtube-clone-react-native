import { View, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { Auth } from 'aws-amplify'
import { Colors } from '../../styles'

const ConfirmationScreen = ({ navigation, route }) => {
    const [confirmCode, setConfirmCode] = useState(0)
    const [loading, setLoading] = useState(false)
    const username = route.params.username

    const handleConfirmSignUp = async () => {
        if (!confirmCode || !username) return Alert.alert("Warning!", "Code or username is missing.")
        try {
            setLoading(true)
            await Auth.confirmSignUp(username, confirmCode)
            setLoading(false)
            navigation.navigate("SignIn")
        } catch (error) {
            setLoading(false)
            Alert.alert("Error", error.message)
        }
    }
    return (
        <View style={{ backgroundColor: Colors.secondary, paddingTop: 20 }}>
            <CustomInput
                title="Confirm Code"
                value={confirmCode}
                onChangeText={setConfirmCode}
                placeholder="Enter your verify code"
            />
            <CustomButton
                title={loading ? "Confirming..." : "Confirm Now"}
                bgColor="green"
                onPress={loading ? null : handleConfirmSignUp}
            />
        </View>
    )
}

export default ConfirmationScreen