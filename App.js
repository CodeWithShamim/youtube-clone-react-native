import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen'
import VideoPlayScreen from './src/screens/VideoPlayScreen'
import { withAuthenticator } from "aws-amplify-react-native";
import VideoUploadScreen from './src/screens/VideoUploadScreen'

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='VideoPlay' component={VideoPlayScreen} />
        <Stack.Screen name='VideoUpload' component={VideoUploadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default withAuthenticator(App)