import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen'
import VideoPlayScreen from './src/screens/VideoPlayScreen'
import ShortsVideoScreen from './src/screens/ShortsVideoScreen'
import LibraryScreen from './src/screens/LibraryScreen'
import { withAuthenticator } from "aws-amplify-react-native";
import VideoUploadScreen from './src/screens/VideoUploadScreen'
import { Auth, DataStore } from 'aws-amplify'
import { User } from './src/models'

const App = () => {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const saveUserToDB = async () => {
      const userInfo = await Auth.currentAuthenticatedUser()
      if (!userInfo) return
      const userId = userInfo.attributes?.sub
      const isUserInDB = (await DataStore.query(User)).find((u) => u?.sub === userId)

      if (!isUserInDB) {
        await DataStore.save(new User({
          name: userInfo.attributes?.email,
          image: "",
          sub: userId,
          subscribers: 0,
        }))
        console.log("user save done");
      } else return false
    }
    saveUserToDB()

  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='VideoPlay' component={VideoPlayScreen} />
        <Stack.Screen name='VideoUpload' component={VideoUploadScreen} />
        <Stack.Screen name='ShortsVideo' component={ShortsVideoScreen} />
        <Stack.Screen name='Library' component={LibraryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default withAuthenticator(App)