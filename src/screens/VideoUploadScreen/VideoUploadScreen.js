import { View, Text, StyleSheet, Button, TouchableOpacity, TextInput, Platform, PermissionsAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomFooter from '../../components/CustomFooter'
import { Colors, GlobalStyle } from '../../styles'
import FeatherIcon from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { launchImageLibrary } from 'react-native-image-picker';
import VideoPlayer from '../../components/VideoPlayer'
import "react-native-get-random-values"
import { v4 as uuidv4 } from 'uuid';
import { Storage } from 'aws-amplify'

const VideoUploadScreen = () => {
  const globalStyle = GlobalStyle.useGlobalStyle()
  const [videoUrl, setVideoUrl] = useState("")
  const [videoDuration, setVideoDuration] = useState(0)
  const [videoTitle, setVideoTitle] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)

  // request external permission 
  const handleRequestPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "External storage write permission!",
            message: "Need external storage permission for received video"
          }
        )

        return granted === PermissionsAndroid.RESULTS.GRANTED
      } catch (error) {
        Alert.alert("Error", error.message)
      }
      return false
    }
  }

  // pick video 
  const handleSelectVideo = async () => {
    const permission = await handleRequestPermission()
    // if(!permission) await handleRequestPermission()

    if (permission) {
      const result = await launchImageLibrary({
        mediaType: "video",
        videoQuality: "medium",
        quality: 1,
      })

      if (result.didCancel) return false

      if (!result.didCancel && result.assets[0]) {
        setVideoDuration(result.assets[0]?.duration)
        setVideoUrl(result.assets[0]?.uri)
      }
    }
  }

  // upload video 
  const handleUploadVideo = async () => {
    if (!videoUrl) {
      return Alert.alert("Warning!", "Please select a video")
    }

    if (videoDuration > 120) return Alert.alert("Sorry!", "This video is too long. video duration can't be up 120s")

    try {
      const response = await fetch(videoUrl)
      const blob = await response.blob()
      const fileKey = `${uuidv4()}.mp4`
      const result = await Storage.put(fileKey, blob,
        {
          progressCallback: (p) => {
            const progress = (p.loaded / p.total) * 100
            setUploadProgress(progress)
          },
        }
      );
      console.log("Result", result);
      return fileKey
    } catch (error) {
      console.log("Upload error", error)
      Alert.alert("Error!", error.message)
    }
  }

  // upload post 
  const handleUploadPost = async () => {
    const fileKey = await handleUploadVideo()
    console.log(fileKey);
    setUploadProgress(0)

  }

  return (
    <View style={styles.container}>

      <TouchableOpacity
        onPress={handleSelectVideo}
        style={[styles.selectBtnContainer, globalStyle.rowCenterCenter, globalStyle.mv]}
      >
        <FontAwesome5 style={globalStyle.mh} name='photo-video' size={20} color={Colors.secondary} />
        <Text style={styles.selectBtnText}>Select a video</Text>
      </TouchableOpacity>

      {/* get selected video  */}
      <View style={styles.videoBox}>
        <VideoPlayer controls={true} url={videoUrl} />
      </View>

      {/* video title  */}
      <View style={{ marginTop: "15%" }}>
        <TextInput
          style={styles.videoTitle}
          placeholder='video title'
          value={videoTitle}
          onChangeText={setVideoTitle}
        />
      </View>

      {/* upload video  */}
      <TouchableOpacity
        onPress={uploadProgress > 0 ? null : handleUploadPost}
        style={[styles.selectBtnContainer, globalStyle.rowCenterCenter, globalStyle.mv]}
      >
        <FeatherIcon style={globalStyle.mh} name='upload-cloud' size={25} color={Colors.secondary} />
        <Text style={styles.selectBtnText}>{uploadProgress > 0 ? `Uploading...${uploadProgress.toFixed(2)}%` : "Upload"}</Text>
      </TouchableOpacity>

      {/* progress  */}
      <View style={[styles.progress, { width: `${uploadProgress}%` }]}></View>

      <CustomFooter />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%"
  },
  selectBtnContainer: {
    backgroundColor: Colors.primary,
    width: "100%",
    height: "5%",
  },
  selectBtnText: {
    color: Colors.secondary,
    fontWeight: "600",
  },
  videoBox: {
    width: "95%",
    height: "28%",
    borderWidth: 2,
    borderColor: Colors.primary,
    alignSelf: "center",
    borderRadius: 5,
  },
  videoTitle: {
    width: "95%",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: Colors.primary,
    marginTop: "7%",
    paddingVertical: 2,
    paddingLeft: 7,
    borderRadius: 4,
    fontWeight: "500"
  },
  progress: {
    // width: "100%",
    height: "1%",
    backgroundColor: "#3c763d",
    borderRadius: 2,
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
  }
})

export default VideoUploadScreen