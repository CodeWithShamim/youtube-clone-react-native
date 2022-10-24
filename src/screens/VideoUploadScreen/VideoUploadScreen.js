import { View, Text, StyleSheet, Button, TouchableOpacity, TextInput, Platform, PermissionsAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomFooter from '../../components/CustomFooter'
import { Colors, GlobalStyle } from '../../styles'
import FeatherIcon from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { launchImageLibrary } from 'react-native-image-picker';
import VideoPlayer from '../../components/VideoPlayer'

const VideoUploadScreen = () => {
  const globalStyle = GlobalStyle.useGlobalStyle()
  const [videoUrl, setVideoUrl] = useState("")
  const [videoTitle, setVideoTitle] = useState("")

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
      console.log(result);

      if (result.assets[0]?.uri) {
        setVideoUrl(result.assets[0]?.uri)
      }
    }
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={handleSelectVideo} style={[styles.selectBtnContainer, globalStyle.rowCenterCenter, globalStyle.mv]}>
        <FontAwesome5 style={globalStyle.mh} name='photo-video' size={20} color={Colors.secondary} />
        <Text style={styles.selectBtnText}>Select a video</Text>
      </TouchableOpacity>
      {/* get selected video  */}
      <View style={styles.videoBox}>
        <VideoPlayer url={videoUrl} />
      </View>
      {/* video title  */}
      <View>
        <TextInput
          style={styles.videoTitle}
          placeholder='video title'
          value={videoTitle}
          onChangeText={setVideoTitle}
        />
      </View>
      {/* upload video  */}
      <TouchableOpacity style={[styles.selectBtnContainer, globalStyle.rowCenterCenter, globalStyle.mv]}>
        <FeatherIcon style={globalStyle.mh} name='upload-cloud' size={25} color={Colors.secondary} />
        <Text style={styles.selectBtnText}>Upload</Text>
      </TouchableOpacity>

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
    height: "28.2%",
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
    borderRadius:4,
    fontWeight: "500"
  },
})

export default VideoUploadScreen