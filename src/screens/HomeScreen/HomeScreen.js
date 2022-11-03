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

    useEffect(() => {
        setIsLoading(true)
        const fetchVideos = async () => {
            const result = await DataStore.query(Video)
            if (result.length <= 0) {
                fetchVideos()
                // return false
            }
            console.log("Load homeScreen data");
            setVideos(result)
            setIsLoading(false)
        }
        fetchVideos()
    }, [])

    return (
        <InnerLayer header={true} footer={true} loading={isLoading}>
            <View>
                <FlatList
                    style={{ marginBottom: "25%" }}
                    data={videos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <VideoItem item={item} />}
                    showsVerticalScrollIndicator={false}
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