import { View, StyleSheet, Button, ActivityIndicator } from 'react-native'
import React, { useState, useRef } from 'react'
import Video from 'react-native-video'

const VideoPlayer = ({ url, height, controls }) => {

  const videoRef = useRef([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View>
      <Video
        ref={videoRef}
        style={[styles.video, height && { height: height }]}
        source={{
          uri: url || "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        }}
        onLoad={() => setIsLoading(false)}
        resizeMode="cover"
        controls={controls}
      />
      {isLoading && <ActivityIndicator style={styles.loading} size="large" color="red" />}
    </View>
  )
}

const styles = StyleSheet.create({
  video: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "black",
  },
  loading: {
    position: "absolute",
    top: 80,
    left: 0,
    right: 0,
  },
})

export default VideoPlayer