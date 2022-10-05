import {StyleSheet} from "react-native";

export const useGlobalStyle=() => {
    return StyleSheet.create({
        avatar: {
            width: 40,
            height: 40,
            borderRadius: 20,
        },

        mh: {
            marginHorizontal: 10
        },

        mv: {
            marginVertical: 10
        },

        row: {
            flexDirection: "row",
        },

        rowCenterCenter: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },

        rowCenterBetween: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },

        rowCenterAround: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around"
        },
    })
}