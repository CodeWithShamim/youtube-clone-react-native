import {StyleSheet, Platform} from "react-native";

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

        shadow: Platform.OS === "android" ? {
            shadowColor: "#ddd",
            shadowOpacity:0.25,
            shadowRadius:25,
            elevation:15,
            shadowOffset: {
                height:0,
                width:0,
            },
        } : {
            shadowColor: '#aaa',
            shadowOpacity: 0.2,
            shadowRadius: 15,
    
            shadowOffset:{
                height:3,
                width:1
            }
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