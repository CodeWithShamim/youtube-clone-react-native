import { View, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import VideoItem from '../../components/VideoItem'
import { DataStore } from 'aws-amplify'
import { Video } from '../../models'
import { Colors } from '../../styles'
import InnerLayer from '../../components/InnerLayer'

const HomeScreen = () => {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { height } = Dimensions.get("window")

    // fetch video 
    const fetchVideos = async () => {
        setIsLoading(true)
        try {
            const result = await DataStore.query(Video)
            if (result.length <= 0) {
                fetchVideos()
                // return false
            }

            setVideos(result.reverse())
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log("Error from HomeScreen", error.message);
        }


    }

    useEffect(() => {
        fetchVideos()
    }, [])

    // pull to refresh 
    const handleLoadData = async () => {
        await fetchVideos()
    }

    console.log("Load homeScreen data");

    return (
        <InnerLayer header={true} footer={true} loading={isLoading}>
            <View>
                <FlatList
                    style={{ marginBottom: "25%" }}
                    data={videos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <VideoItem item={item} />}
                    showsVerticalScrollIndicator={false}
                    refreshing={isLoading}
                    onRefresh={handleLoadData}
                />
            </View>
        </InnerLayer>
    )
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
// })


export default HomeScreen