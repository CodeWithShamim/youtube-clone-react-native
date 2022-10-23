import { View, Text, StyleSheet, Button, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import CustomFooter from '../../components/CustomFooter'
import { Colors, GlobalStyle } from '../../styles'
import FeatherIcon from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const VideoUploadScreen = () => {
  const globalStyle = GlobalStyle.useGlobalStyle()
  const [videoTitle, setVideoTitle] = useState("")

  return (
    <View style={styles.container}>

      <TouchableOpacity style={[styles.selectBtnContainer, globalStyle.rowCenterCenter, globalStyle.mv]}>
        <FontAwesome5 style={globalStyle.mh} name='photo-video' size={20} color={Colors.secondary} />
        <Text style={styles.selectBtnText}>Select a video</Text>
      </TouchableOpacity>

      {/* get selected video  */}
      <View style={styles.videoBox}>
      </View>

      {/* video title  */}
      <TextInput
        style={styles.videoTitle}
        placeholder='video title'
        value={videoTitle}
        onChangeText={setVideoTitle}
      />


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
    width: "98%",
    height: "25%",
    borderWidth: 2,
    borderColor: Colors.primary,
    alignSelf: "center",
    borderRadius: 5,
  },
  videoTitle: {
    width: "98%",
    alignSelf: "center",
    borderWidth: 2,
    borderColor: Colors.primary,
    marginTop: 15,
    paddingVertical: 2,
    paddingLeft: 7,
    fontWeight: "500"
  },
})

export default VideoUploadScreen