import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors, GlobalStyle } from '../styles'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from '@react-navigation/native'
import { Storage, DataStore } from 'aws-amplify'
import { User } from '../models'

const VideoItem = ({ item }) => {

    const globalStyle = GlobalStyle.useGlobalStyle();
    const navigation = useNavigation()
    const [thumbnailURL, setThumbnailURL] = useState("")
    const [userInfo, setUserInfo] = useState({})

    const handlePlayVideo = (id) => {
        navigation.navigate("VideoPlay", { id: id })
    }

    const { thumbnail, duration, userID, title, views, createdAt } = item

    useEffect(() => {
        Storage.get(thumbnail).then(setThumbnailURL)
        DataStore.query(User, userID).then(setUserInfo)
    }, [thumbnail])

    console.log("userInfo", userInfo);

    return (
        <View style={styles.root}>
            {/* thumbnail */}
            <Pressable onPress={() => handlePlayVideo(item.id)}>
                <Image style={styles.thumbnail} source={{ uri: thumbnailURL }}></Image>
                <Text style={styles.time}>{duration}</Text>
            </Pressable>

            {/* video details  */}
            <View style={[globalStyle.rowCenterCenter, globalStyle.mv, globalStyle.mh]}>

                {!userInfo?.image
                    ?
                    <Image style={globalStyle.avatar} source={require("../assets/images/placeholder.jpeg")}></Image>
                    :
                    <Image style={globalStyle.avatar} source={{ uri: userInfo?.image }}></Image>
                }

                <Pressable onPress={() => handlePlayVideo(item.id)} style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{userInfo?.name || "No name"} - {views} views - {createdAt}</Text>
                </Pressable>
                <MaterialCommunityIcons name="dots-vertical" size={20} color={Colors.primary} />
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    root: {
        // flex: 1,
    },

    thumbnail: {
        width: "100%",
        aspectRatio: 16 / 9,
    },

    time: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: Colors.primary,
        color: Colors.secondary,
        fontSize: 12,
        fontWeight: "bold",
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 3,
    },

    titleContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },

    title: {
        fontWeight: "500",
        color: Colors.primary,
        fontSize: 14
    },

    subtitle: {
        fontSize: 14,
        color: "gray",
    },
});

export default VideoItem;