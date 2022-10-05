import {View,Text} from 'react-native'
import React from 'react'
import VideoItem from '../../components/VideoItem'
import data from "../../assets/data/videos.json"

const HomeScreen=() => {
    return (
        <View>
            <VideoItem data={data} />
        </View>
    )
}

export default HomeScreen