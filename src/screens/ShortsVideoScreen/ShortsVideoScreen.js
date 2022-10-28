import { View, Text, StyleSheet, Image, Dimensions, Alert } from 'react-native'
import React, { memo, useState } from 'react'
import CustomFooter from '../../components/CustomFooter'
import VideoPlayer from '../../components/VideoPlayer'
import { Colors, GlobalStyle } from '../../styles'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import VideoActionItem from '../../components/VideoActionItem'
import LinearGradient from 'react-native-linear-gradient'
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const ShortsVideoScreen = () => {
    const globalStyle = GlobalStyle.useGlobalStyle()
    const { width, height } = Dimensions.get("window")
    const [currentIndex, setCurrentIndex] = useState(0)

    const shorts = [
        {
            "sources": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            "thumb": "images/ForBiggerBlazes.jpg",
            "title": "For Bigger Blazes"
        },
        {
            "sources": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            "thumb": "images/ForBiggerBlazes.jpg",
            "title": "For Bigger Blazes"
        },
        {
            "sources": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            "thumb": "images/ForBiggerBlazes.jpg",
            "title": "For Bigger Blazes"
        }
    ]

    const actionItems = [
        { name: '30k', icon: 'like1' },
        { name: 'Dislike', icon: 'dislike1' },
        { name: '82', icon: 'comments' },
        { name: 'Share', icon: 'share' },
        { name: '', icon: 'ellipsis1' },
    ]

    console.log(currentIndex);

    return (
        <View style={styles.container}>
            <SwiperFlatList
                // index={0}
                vertical={true}
                data={shorts}
                onChangeIndex={(i) => setCurrentIndex(i)}
                renderAll={true}
                renderItem={({ item, index }) => (
                    <>
                        <View style={styles.videoPlayer}>
                            <VideoPlayer
                                url={item.sources}
                                height="96%"
                                controls={true}
                                paused={index !== currentIndex.index ? true : false} />
                        </View>

                        <LinearGradient
                            colors={["rgba(0,0,0,0.1)", "rgba(0,0,0, 0.5)"]}
                            style={{ width: width, height: height }}
                        >
                            {/* header icon  */}
                            <View style={styles.headerIcon}>
                                <AntDesignIcon
                                    style={{ marginRight: "8%" }}
                                    name='search1' size={25}
                                    color={Colors.secondary} />
                                <AntDesignIcon
                                    name='camerao'
                                    size={25}
                                    color={Colors.secondary} />
                            </View>

                            <View style={styles.userInfoContainer}>
                                <Text style={styles.title}>Using the styles from above, set start and end like this to make the gradient</Text>
                                {/* use info  */}
                                <View style={[globalStyle.row, { alignItems: "center", marginTop: 10 }]}>
                                    <Image
                                        source={{ uri: "https://image.shutterstock.com/image-photo/head-shot-portrait-close-smiling-260nw-1714666150.jpg" }}
                                        resizeMode="cover"
                                        style={globalStyle.avatar}
                                    />
                                    <Text style={styles.username}>John smith</Text>
                                    <Text style={styles.subscribeBtn}>Subscribe</Text>
                                </View>
                            </View>

                            {/* video action items  */}
                            <View style={styles.actionContainer}>
                                {actionItems.map((item, index) =>
                                    <VideoActionItem
                                        key={index}
                                        icon={item.icon}
                                        name={item.name}
                                        size={28}
                                        color={Colors.secondary}
                                        mp={{ marginVertical: 10 }}
                                    />
                                )}
                            </View>
                        </LinearGradient>
                    </>
                )}
            />

            <CustomFooter />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    videoPlayer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    headerIcon: {
        flexDirection: "row",
        justifyContent: "flex-end",
        margin: "6%",
    },
    userInfoContainer: {
        width: "80%",
        height: "80%",
        marginHorizontal: 10,
        justifyContent: "flex-end"
    },
    title: {
        color: Colors.secondary,
        fontWeight: "600",
        fontSize: 16,
    },
    username: {
        color: Colors.secondary,
        textTransform: "uppercase",
        fontWeight: "700",
        fontSize: 15,
        marginHorizontal: 10,
    },
    subscribeBtn: {
        width: "30%",
        textAlign: "center",
        borderRadius: 3,
        paddingVertical: 4,
        textTransform: "uppercase",
        color: Colors.secondary,
        backgroundColor: "red",
        fontWeight: "700",
    },
    actionContainer: {
        position: "absolute",
        right: 15,
        bottom: 100,
    },
    IconSubtitle: {
        fontSize: 14,
        marginTop: 5,
    },
})

export default memo(ShortsVideoScreen)