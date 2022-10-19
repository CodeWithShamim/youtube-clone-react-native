import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import VideoItem from '../../components/VideoItem'
import data from "../../assets/data/videos.json"
import CustomHeader from '../../components/CustomHeader'
import CustomFooter from '../../components/CustomFooter'

const HomeScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <CustomHeader></CustomHeader>
                    <FlatList
                        style={{ marginBottom: "25%" }}
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <VideoItem item={item} />}
                        showsVerticalScrollIndicator={false}
                    />
                <CustomFooter></CustomFooter>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
})


export default HomeScreen