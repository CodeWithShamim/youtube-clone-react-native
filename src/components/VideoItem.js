import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Colors, GlobalStyle } from '../styles';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useNavigation } from '@react-navigation/native';

const VideoItem = ({ item }) => {

    const globalStyle = GlobalStyle.useGlobalStyle();
    const navigation = useNavigation()

    const handlePlayVideo = (id) => {
        navigation.navigate("VideoPlay", { id: id })
    }

    return (
        <View style={styles.root}>
            {/* thumbnail */}
            <Pressable onPress={() => handlePlayVideo(item.id)}>
                <Image style={styles.thumbnail} source={{ uri: item?.thumbnail }}></Image>
                <Text style={styles.time}>15:08</Text>
            </Pressable>

            {/* video details  */}
            <View style={[globalStyle.rowCenterCenter, globalStyle.mv, globalStyle.mh]}>
                <Image style={globalStyle.avatar} source={{ uri: item?.User?.image }}></Image>

                <Pressable onPress={() => handlePlayVideo(item.id)} style={styles.titleContainer}>
                    <Text style={styles.title}>{item?.title}</Text>
                    <Text style={styles.subtitle}>{item?.User?.name} - 200k views - 4 days ago</Text>
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