import {View,Text,FlatList,StyleSheet} from 'react-native'
import React from 'react'
import VideoItem from '../../components/VideoItem'
import data from "../../assets/data/videos.json"

const HomeScreen=() => {
    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <VideoItem item={item} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles=StyleSheet.create({
})


export default HomeScreen