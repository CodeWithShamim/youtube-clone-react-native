import { View, Text, Pressable, StyleSheet, ScrollView, Image, FlatList, Alert, TextInput, ActivityIndicator } from 'react-native'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import VideoPlayer from '../../components/VideoPlayer'
import { Colors, GlobalStyle } from '../../styles'
import VideoActionItem from '../../components/VideoActionItem'
import FeatherIcon from "react-native-vector-icons/Feather"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import VideoItem from '../../components/VideoItem'
import BottomSheets from '../../components/BottomSheets'
import { DataStore, Storage } from 'aws-amplify'
import { Comments, Video } from '../../models'
import CommentItem from '../../components/CommentItem'

const VideoPlayScreen = ({ route }) => {
    const globalStyle = GlobalStyle.useGlobalStyle()
    const videoId = route.params.id
    const userInfo = route.params.userInfo
    const commentsSheetRef = useRef(null)

    const [videoInfo, setVideoInfo] = useState({});
    const [videos, setVideos] = useState([]);
    const [videoURL, setVideoURL] = useState("");
    const [newComment, setNewComment] = useState("")
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    // fetch videos 
    useEffect(() => {
        DataStore.query(Video).then(setVideos)
        DataStore.query(Video, videoId).then(setVideoInfo)
    }, [videoId])

    const { thumbnail, duration, videoUrl, userID, title, views, likes, createdAt } = videoInfo

    useEffect(() => {
        Storage.get(videoUrl).then(setVideoURL)
    }, [videoUrl])

    const actionItems = [
        { name: 'Like', icon: 'like1' },
        { name: 'Dislike', icon: 'dislike2' },
        { name: 'Share', icon: 'sharealt' },
        { name: 'Download', icon: 'download' },
        { name: 'Clip', icon: 'tool' },
        { name: 'Save', icon: 'save' },
    ]

    // open comments bottom sheet 
    const handleShowComments = useCallback((index) => {
        commentsSheetRef.current?.snapToIndex(index)
    }, [])

    // get comments 
    useEffect(() => {
        setIsLoading(true)
        DataStore.query(Comments).then((data) => {
            setComments(data.reverse())
            setIsLoading(false)
        })
    }, [])

    // send comment 
    const handleSendComment = async () => {
        if (!newComment) return Alert.alert("Please!", "Add a comment")
        setIsLoading(true)
        setNewComment("")

        try {
            const res = await DataStore.save(new Comments({
                comment: newComment,
                likes: "0",
                dislikes: "0",
                replies: "0",
            }))
            if (res?.comment) {
                setComments((preComments) => [{ comment: res.comment }, ...preComments])
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
            console.warn(error.message)
        }
    }

    console.log("videoplay screen");
    
    return (
        <View style={styles.container}>
            <VideoPlayer
                url={videoURL}
                controls={true}
                posterURL={thumbnail}
            />

            {/* recommended videos  */}
            <FlatList
                ListHeaderComponent={() =>
                    <>
                        {/* title  */}
                        <View style={[styles.titleContainer, { paddingVertical: 12 }]}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.subtitle}>{views} views - {createdAt}</Text>
                        </View>

                        {/* video action list  */}
                        <View>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {actionItems.map((item, index) =>
                                    <VideoActionItem
                                        key={index}
                                        icon={item.icon}
                                        name={item.name}
                                        likes={likes}
                                        mp={{ marginHorizontal: 18 }}
                                    />
                                )}
                            </ScrollView>
                        </View>

                        {/* user info  */}
                        <View style={[styles.userInfoConainer, globalStyle.rowCenterBetween]}>
                            <View style={globalStyle.rowCenterBetween}>
                                <Image style={globalStyle.avatar} source={{ uri: userInfo?.image }}></Image>
                                <Pressable style={styles.titleContainer}>
                                    <Text style={styles.title}>{userInfo.name}</Text>
                                    <Text style={styles.subtitle}>{userInfo.subscribers} subscribers</Text>
                                </Pressable>
                            </View>

                            <Text style={styles.subscribe}>Subscribe</Text>
                        </View>

                        {/* comments */}
                        <Pressable onPress={() => handleShowComments(1)} style={{ paddingBottom: 12 }}>
                            <View style={[globalStyle.rowCenterBetween, globalStyle.mh]}>
                                <Text>Comments {comments?.length}</Text>
                                <FeatherIcon name='chevrons-down' size={16} color={Colors.primary} />
                            </View>
                            <View style={[globalStyle.rowCenterBetween, globalStyle.mh, { marginTop: 10 }]}>
                                <Image style={[globalStyle.miniAvatar]} source={{ uri: userInfo?.image }}></Image>
                                <Text style={{ width: "90%", marginLeft: 8 }}>{comments[0]?.comment}</Text>
                            </View>
                        </Pressable>
                    </>
                }
                data={videos?.reverse()}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <VideoItem item={item} />}
                showsVerticalScrollIndicator={false}
            />

            {/* bottom sheet  */}
            <BottomSheets ref={commentsSheetRef} sheetTitle="Comments" commentsSheetRef={commentsSheetRef}>
                {/* comment box  */}
                <View style={[globalStyle.rowCenterBetween, styles.commentsBox]}>
                    <TextInput
                        placeholder='Add a comments...'
                        placeholderTextColor="gray"
                        value={newComment}
                        onChangeText={(value) => setNewComment(value)}
                    />
                    <Pressable onPress={handleSendComment}>
                        <MaterialCommunityIcons name='send' size={20} color={Colors.primary} />
                    </Pressable>
                </View>

                {/* comments  */}
                {isLoading ?
                    <View style={{ paddingTop: 30 }}>
                        <ActivityIndicator size="large" color={Colors.primary} />
                    </View> :
                    <FlatList
                        data={comments}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <CommentItem userInfo={userInfo} item={item} />}
                        showsVerticalScrollIndicator={false}
                    />}
            </BottomSheets>
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
        marginVertical: 12,
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

    commentsBox: {
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#3d3d3d",
    }
})

export default memo(VideoPlayScreen)