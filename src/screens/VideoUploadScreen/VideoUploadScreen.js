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

      if (!result.didCancel && result.assets[0]?.uri) {
        setVideoUrl(result.assets[0]?.uri)
      }
    }
  }

  // upload video 
  const handleUploadVideo = async () => {
    if (!videoUrl) return Alert.alert("Warning!", "Please select a video")

    try {
      console.log(videoUrl);
      const response = await fetch(videoUrl)
      const blob = await response.blob()
      console.log("Blobbbbbbb", res)
      const fileKey = `${uuidv4()}.mp4`
      const result = await Storage.put(fileKey, blob,
        {
          progressCallback: (p) => {
            const averageProgress = p.loaded / p.total
            setUploadProgress(averageProgress)
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

      <TouchableOpacity onPress={handleSelectVideo} style={[styles.selectBtnContainer, globalStyle.rowCenterCenter, globalStyle.mv]}>
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
      <TouchableOpacity onPress={handleUploadPost} style={[styles.selectBtnContainer, globalStyle.rowCenterCenter, globalStyle.mv]}>
        <FeatherIcon style={globalStyle.mh} name='upload-cloud' size={25} color={Colors.secondary} />
        <Text style={styles.selectBtnText}>Upload</Text>
      </TouchableOpacity>

      {/* progress  */}
      <View style={[styles.progress, { width: `${uploadProgress * 100}%` }]}></View>

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