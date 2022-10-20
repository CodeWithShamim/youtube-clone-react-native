import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import AntDesignIcon from "react-native-vector-icons/AntDesign"
import { Colors, GlobalStyle } from '../styles';
import { FlatList } from 'react-native-gesture-handler';
import comments from "../assets/data/comments.json";
import Comments from './Comments';

const BottomSheets = ({ commentsSheetRef }) => {
  const globalStyle = GlobalStyle.useGlobalStyle()

  const handleClosePress = () => {
    commentsSheetRef.current?.close()
  }

  return (
    <BottomSheet
      ref={commentsSheetRef}
      index={-1}
      snapPoints={["25%", "70.8%", "100%"]}
      enablePanDownToClose={true}
    >
      <View style={[globalStyle.rowCenterBetween, globalStyle.mh]}>
        <Text style={globalStyle.textBold}>Comments</Text>
        <AntDesignIcon onPress={handleClosePress} name='close' size={25} color={Colors.primary} />
      </View>

      {/* comments  */}
      <FlatList
        style={styles.commentsBox}
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Comments item={item} />}
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  commentsBox:{
    marginVertical:10,
    borderTopWidth:1,
    borderTopColor:"#3d3d3d",
  }
});

export default BottomSheets