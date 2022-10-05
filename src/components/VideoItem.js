import {View,Text,Image,StyleSheet} from 'react-native'
import React from 'react'
import {Colors,GlobalStyle} from '../styles';

const VideoItem=({data}) => {

    const {thumbnail,user}=data[0];
    const globalStyle=GlobalStyle.useGlobalStyle();

    return (
        <View style={styles.root}>
            {/* thumbnail */}
            <View>
                <Image style={styles.thumbnail} source={{uri: thumbnail}}></Image>
                <Text style={styles.time}>15:08</Text>
            </View>

            {/* video details  */}
            <View>
                <Image style={globalStyle.avatar} source={{uri: user.Image}}></Image>
            </View>

        </View>
    )
};

const styles=StyleSheet.create({
    root: {
        // flex: 1,
    },
    thumbnail: {
        width: "100%",
        aspectRatio: 16/9,
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
    }
});

export default VideoItem;