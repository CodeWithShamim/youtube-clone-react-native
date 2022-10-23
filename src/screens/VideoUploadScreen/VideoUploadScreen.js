import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomFooter from '../../components/CustomFooter'

const VideoUploadScreen = () => {
  return (
    <View style={styles.container}>
      <Text>VideoUploadScreen</Text>
      <CustomFooter/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        height:"100%"
    }
})

export default VideoUploadScreen