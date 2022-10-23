import React, { forwardRef, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import AntDesignIcon from "react-native-vector-icons/AntDesign"
import { Colors, GlobalStyle } from '../styles';

const BottomSheets = ({ children, snapPoints, sheetTitle, commentsSheetRef }, ref) => {
  const globalStyle = GlobalStyle.useGlobalStyle()

  const handleClosePress = useCallback(() => {
    commentsSheetRef.current?.close()
  }, [])

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints || ["25%", "70.8%"]}
      enablePanDownToClose={true}
    >
      <View style={[globalStyle.rowCenterBetween, globalStyle.mh]}>
        <Text style={globalStyle.textBold}>{sheetTitle && sheetTitle}</Text>
        <AntDesignIcon onPress={handleClosePress} name='close' size={25} color={Colors.primary} />
      </View>

      {children && children}
    </BottomSheet>
  );
};

const forwardedBottomSheets = forwardRef(BottomSheets)

const styles = StyleSheet.create({});

export default forwardedBottomSheets