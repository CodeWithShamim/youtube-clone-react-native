import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TextInput, Alert, Pressable, ActivityIndicator } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import AntDesignIcon from "react-native-vector-icons/AntDesign"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { Colors, GlobalStyle } from '../styles';
import { DataStore } from 'aws-amplify';
import { Comments } from '../models'
import CommentItem from './CommentItem';

const BottomSheets = ({ commentsSheetRef }, ref) => {
  const globalStyle = GlobalStyle.useGlobalStyle()
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // close botom sheet 
  const handleClosePress = useCallback(() => {
    commentsSheetRef.current?.close()
  }, [])

  // get comments 
  useEffect(() => {
    setIsLoading(true)
    DataStore.query(Comments).then((data) => {
      setComments(data.reverse())
      setIsLoading(false)
    })
  }, [])

  // send comment 
  const handleSendComment = async () => {
    if (!newComment) return Alert.alert("Please!", "Add a comment")
    setIsLoading(true)
    setNewComment("")

    try {
      const res = await DataStore.save(new Comments({
        comment: newComment,
        likes: "0",
        dislikes: "0",
        replies: "0",
      }))
      if (res?.comment) {
        setComments((preComments) => [{ comment: res.comment }, ...preComments])
        setIsLoading(false)
      }
    } catch (error) {
      setIsLoading(false)
      console.warn(error.message)
    }
  }

  console.log("ok222222222222");

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={["25%", "70.8%"]}
      enablePanDownToClose={true}
    >
      <View style={[globalStyle.rowCenterBetween, globalStyle.mh]}>
        <Text style={globalStyle.textBold}>Comments</Text>
        <AntDesignIcon onPress={handleClosePress} name='close' size={25} color={Colors.primary} />
      </View>

      <View style={[globalStyle.rowCenterBetween, styles.commentsBox]}>
        <TextInput
          placeholder='Add a comments...'
          placeholderTextColor="gray"
          value={newComment}
          onChangeText={(value) => setNewComment(value)}
        />
        <Pressable onPress={handleSendComment}>
          <MaterialCommunityIcons name='send' size={20} color={Colors.primary} />
        </Pressable>
      </View>

      {/* comments  */}
      {isLoading ?
        <View style={{ paddingTop: 30 }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View> :
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CommentItem item={item} />}
          showsVerticalScrollIndicator={false}
        />}
    </BottomSheet>
  );
};

const forwardedBottomSheets = forwardRef(BottomSheets)

const styles = StyleSheet.create({
  commentsBox: {
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#3d3d3d",
  }
});

export default forwardedBottomSheets