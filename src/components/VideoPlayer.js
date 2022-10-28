import { View, StyleSheet, Button, ActivityIndicator } from 'react-native'
import React, { useState, useRef } from 'react'
import Video from 'react-native-video'

const VideoPlayer = ({ url, height, controls, paused }) => {

  const videoRef = useRef([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View>
      <Video
        ref={videoRef}
        style={[styles.video, height ? { height: height } : { aspectRatio: 16 / 9 }]}
        source={{
          uri: url || "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        }}
        onLoad={() => setIsLoading(false)}
        resizeMode="cover"
        paused={paused || false}
      // controls={controls}
      />
      {isLoading && <ActivityIndicator style={styles.loading} size="large" color="red" />}
    </View>
  )
}

const styles = StyleSheet.create({
  video: {
    width: "100%",
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