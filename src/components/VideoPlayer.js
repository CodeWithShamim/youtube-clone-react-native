import { View, StyleSheet, Button, ActivityIndicator, Dimensions, Image } from 'react-native'
import React, { useState, useRef, useEffect, memo } from 'react'
import Video from 'react-native-video'
import { createThumbnail } from "react-native-create-thumbnail";

const VideoPlayer = ({ url, height, controls, index, paused, posterURL }) => {
  const { width } = Dimensions.get("window")

  const videoRef = useRef([]);
  const [isLoading, setIsLoading] = useState(true);
  const [generatePoster, setGeneratePoster] = useState("")

  useEffect(() => {
    if (!videoRef.current) {
      videoRef.current.seek(0)
    }
    console.log("seek");
  }, [index])

  // generate thumbnail 
  useEffect(() => {
    createThumbnail({ url: url })
      .then(res => setGeneratePoster(res.path))
      .catch(err => console.log(err.messsage));
  }, [url])

  // generate thumbnail 


  console.log(generatePoster);

  return (
    <View>
      <Video
        ref={videoRef}
        style={[styles.video, height ? { height: height } : { aspectRatio: 16 / 9 }]}
        source={{
          uri: url || "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        }}
        onLoad={() => setIsLoading(false)}
        repeat={true}
        poster={posterURL ? posterURL : generatePoster}
        ignoreSilentSwitch="ignore"
        posterResizeMode="cover"
        resizeMode="cover"
        paused={paused ? true : false}
        controls={controls ? true : false}
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

export default memo(VideoPlayer)