import { View, FlatList, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import VideoItem from '../../components/VideoItem'
import CustomHeader from '../../components/CustomHeader'
import CustomFooter from '../../components/CustomFooter'
import { DataStore } from 'aws-amplify'
import { Video } from '../../models'
import { Colors } from '../../styles'

const HomeScreen = () => {
    const [videos, setVideos] = useState([]);

    const { height } = Dimensions.get("window")

    useEffect(() => {
        const fetchVideos = async () => {
            const result = await DataStore.query(Video)
            if (result.length <= 0 ) {
                fetchVideos()
                // return false
            }
            console.log("Load homeScreen data");
            setVideos(result)
        }
        fetchVideos()
    }, [])

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
                    ListEmptyComponent={() => <ActivityIndicator style={{ marginTop: height / 3 }} size="large" color={Colors.primary} />}
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