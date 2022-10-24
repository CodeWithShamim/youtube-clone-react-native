import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native'
import React, { useState, useRef } from 'react'
import Video from 'react-native-video'

const VideoPlayer = ({ url, height }) => {

  const video = useRef(null);
  const [isBuffer, setIsBuffer] = useState(false);

  if (isBuffer) {
    return <ActivityIndicator size="large" color="red" />
  }

  return (
    <View>
      <Video
        ref={video}
        style={[styles.video, height && {height: height}]}
        source={{
          uri: url || "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        }}
        onBuffer={() => isBuffer(!isBuffer)}
        resizeMode="cover"
        controls
      />
    </View>
  )
}

const styles = StyleSheet.create({
  video: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "black",
  }
})

export default VideoPlayer