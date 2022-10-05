import {StyleSheet} from "react-native";

export const useGlobalStyle=() => {
    return StyleSheet.create({
        avatar: {
            width: 80,
            height: 80,
            borderRadius: 40,
        }
    })
}