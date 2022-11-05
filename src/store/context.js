import { createContext, useEffect, useState } from "react";
import { StatusBar } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext()

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState()
    const [user, setUser] = useState("")

    useEffect(() => {
        const getAsyncValue = async () => {
            const asyncValue = await AsyncStorage.getItem("theme")
            setTheme(JSON.parse(asyncValue))
        }
        getAsyncValue()
    }, [])

    const handleTheme = async (value) => {
        // for dark theme 
        if (value) {
            setTheme(true)
            await AsyncStorage.setItem("theme", JSON.stringify(true))
            StatusBar.setBarStyle("light-content")
            StatusBar.setBackgroundColor("#000000")
        }
        // for light theme 
        else {
            setTheme(false)
            await AsyncStorage.setItem("theme", JSON.stringify(false))
            StatusBar.setBarStyle("dark-content")
            StatusBar.setBackgroundColor("#ffffff")
        }
    }

    console.log("Theme", theme);

    return (
        <ThemeContext.Provider value={{ theme, handleTheme, user, setUser }}>
            {children}
        </ThemeContext.Provider>
    )

}

export default ThemeProvider