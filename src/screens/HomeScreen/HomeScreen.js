import { View, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import VideoItem from '../../components/VideoItem'
import CustomHeader from '../../components/CustomHeader'
import CustomFooter from '../../components/CustomFooter'
import { DataStore } from 'aws-amplify'
import { Video } from '../../models'

const HomeScreen = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        DataStore.query(Video).then(setVideos)
    }, [Video])

    return (
        <View style={styles.container}>
            <CustomHeader></CustomHeader>
            <View>
                <FlatList
                    style={{ marginBottom: "25%" }}
                    data={videos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <VideoItem item={item} />}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <CustomFooter></CustomFooter>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})


export default HomeScreen