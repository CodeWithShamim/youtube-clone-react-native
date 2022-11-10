import React, { useContext, useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen'
import VideoPlayScreen from './src/screens/VideoPlayScreen'
import ShortsVideoScreen from './src/screens/ShortsVideoScreen'
import LibraryScreen from './src/screens/LibraryScreen'
import VideoUploadScreen from './src/screens/VideoUploadScreen'
import { Auth, DataStore } from 'aws-amplify'
import { User } from './src/models'
import { StripeProvider } from '@stripe/stripe-react-native'
import { P_K } from '@env'
import MemberShips from './src/screens/MemberShips'
import { ThemeContext } from './src/store/context'
import { SignInScreen, SignUpScreen, ConfirmationScreen } from './src/screens/Auth'
import SplashScreenLoader from './src/screens/SplashScreenLoader'
import SplashScreen from 'react-native-splash-screen'

const App = () => {
  const Stack = createNativeStackNavigator();
  const [initialyAppLoaded, setInitialyAppLoaded] = useState(true)
  const { user, setUser } = useContext(ThemeContext)

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  useEffect(() => {
    const saveUserToDB = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser()
        if (!userInfo) {
          setInitialyAppLoaded(false)
          return false
        }
        const userId = userInfo.attributes?.sub
        setUser(userId)
        setInitialyAppLoaded(false)
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
      } catch (error) {
        setInitialyAppLoaded(false)
        console.log("Error from app.js", error.message);
      }
    }
    saveUserToDB()

  }, [])

  console.log("User", user)

  return (
    <StripeProvider publishableKey={P_K}>

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
          {initialyAppLoaded &&
            <>
              <Stack.Screen name='Splash' component={SplashScreenLoader} />
            </>
          }

          {user ?
            <>
              {/* content */}
              <Stack.Screen name='Home' component={HomeScreen} />
              <Stack.Screen name='VideoPlay' component={VideoPlayScreen} />
              <Stack.Screen name='ShortsVideo' component={ShortsVideoScreen} />
              <Stack.Screen name='VideoUpload' component={VideoUploadScreen} />
              <Stack.Screen name='MemberShips' component={MemberShips} />
              <Stack.Screen name='Library' component={LibraryScreen} />
            </>
            :
            <>
              {/* ------auth----- */}
              <Stack.Screen name='SignIn' component={SignInScreen} />
              <Stack.Screen name='SignUp' component={SignUpScreen} />
              <Stack.Screen name='ConfirmSignUp' component={ConfirmationScreen} />
            </>
          }

        </Stack.Navigator>
      </NavigationContainer >
    </StripeProvider>

  )
}

export default App