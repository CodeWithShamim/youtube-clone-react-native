import { View, Text, Pressable, StyleSheet, ScrollView, Image } from 'react-native'
import React from 'react'
import VideoPlayer from '../../components/VideoPlayer'
import { Colors, GlobalStyle } from '../../styles'
import VideoActionItem from '../../components/VideoActionItem'
import data from '../../assets/data/videos.json'

const VideoPlayScreen = ({ route }) => {
    const globalStyle = GlobalStyle.useGlobalStyle()
    const videoId = route.params.id

    const videoInfo = data.find((v) => v.id === videoId)

    const actionItems = [
        { name: 'Like', icon: 'like1' },
        { name: 'Dislike', icon: 'dislike2' },
        { name: 'Share', icon: 'sharealt' },
        { name: 'Download', icon: 'download' },
        { name: 'Clip', icon: 'tool' },
        { name: 'Save', icon: 'save' },
    ]

    return (
        <View style={styles.container}>
            <VideoPlayer />

            <View style={[styles.titleContainer, {paddingVertical:12}]}>
                <Text style={styles.title}>{videoInfo?.title}</Text>
                <Text style={styles.subtitle}>200k views - 1mo ago</Text>
            </View>

            {/* video action list  */}
            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {actionItems.map((item, index) =>
                        <VideoActionItem icon={item.icon} name={item.name}></VideoActionItem>
                    )}
                </ScrollView>
            </View>

            {/* user info  */}
            <View style={[styles.userInfoConainer, globalStyle.rowCenterBetween]}>
                <View style={globalStyle.rowCenterBetween}>
                    <Image style={globalStyle.avatar} source={{ uri: videoInfo?.user.image }}></Image>
                    <Pressable style={styles.titleContainer}>
                        <Text style={styles.title}>{videoInfo?.user.name}</Text>
                        <Text style={styles.subtitle}>2M subscribers</Text>
                    </Pressable>
                </View>

                <Text style={styles.subscribe}>Subscribe</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    titleContainer: {
        paddingHorizontal: 8,
    },

    title: {
        fontWeight: "600",
        color: Colors.primary,
        fontSize: 15
    },

    subtitle: {
        marginVertical: 3,
        fontSize: 14,
        color: "gray",
    },

    userInfoConainer: {
        marginVertical:16,
        paddingHorizontal: 10,
        borderTopColor: "#3d3d3d",
        borderTopWidth: 1,
        borderBottomColor: "#3d3d3d",
        borderBottomWidth: 1,
        paddingVertical: 4,
    },

    subscribe: {
        textTransform: "uppercase",
        color: "red",
        fontSize: 16,
        fontWeight: "700",
    },
})

export default VideoPlayScreen