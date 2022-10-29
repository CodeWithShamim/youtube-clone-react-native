import { View, Text, Image, StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { Colors, GlobalStyle } from '../styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

const CommentItem = ({ item, userInfo }) => {
    // const { user, createdAt, comment, likes } = item
    const {comment, likes } = item
    const globalStyle = GlobalStyle.useGlobalStyle()

    return (
        <View style={styles.container}>
            <View style={[globalStyle.rowCenterBetween, globalStyle.mh, { flex: 1 }]}>

                <View style={[globalStyle.rowBetween, { flex: 1 }]}>
                    <Image style={globalStyle.miniAvatar} source={{ uri: userInfo?.image }} />
                    <View style={{ marginLeft: 10, flex: 1 }}>
                        <Text style={globalStyle.textSmall}>{userInfo?.name} - 1d ago</Text>
                        <Text style={[globalStyle.textRegular, { marginTop: 5 }]}>{comment}</Text>

                        <View style={[globalStyle.rowCenterBetween, globalStyle.mv, { width: "30%" }]}>
                            <View style={globalStyle.row}>
                                <AntDesignIcon name="like1" size={12} color={Colors.primary} />
                                <Text style={[globalStyle.textSmall, {marginLeft:2}]}>{likes}</Text>
                            </View>
                            <AntDesignIcon name="dislike2" size={12} color={Colors.primary} />
                            <FontAwesomeIcon name="comments-o" size={12} color={Colors.primary} />
                        </View>
                    </View>
                </View>

                <MaterialCommunityIcons name='dots-vertical' size={16} color={Colors.primary} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },
});

export default memo(CommentItem)