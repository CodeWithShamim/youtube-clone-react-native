import { View, Text, Dimensions } from 'react-native'
import React, { forwardRef } from 'react'
import _ from 'lodash'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { ScrollView } from 'react-native-gesture-handler'
import { GlobalStyle } from '../styles'

const SkullLayer = ({ loading, children, count, padding }, ref) => {
    const { height, width } = Dimensions.get("window")
    const globalStyle = GlobalStyle.useGlobalStyle()

    return (
        <>
            {
                loading
                    ?
                    <ScrollView style={{ paddingHorizontal: padding }} showsVerticalScrollIndicator={false}>
                        <SkeletonPlaceholder>
                            {_.times((count ? count : 5)).map((index) =>
                                <View key={index}>
                                    <View style={{ height: 180, borderRadius: 4, marginVertical: 2 }} />

                                    <View style={[globalStyle.rowCenterCenter, { marginVertical: 10 }]}>
                                        <View style={globalStyle.avatar}></View>
                                        <View style={{ width: width - 60, paddingLeft: 10 }}>
                                            <View style={{ height: 20, marginVertical: 4 }} />
                                            <View style={{ height: 20, marginVertical: 4 }} />
                                            <View style={{ height: 20, width: "50%", marginVertical: 4 }} />
                                        </View>
                                    </View>
                                </View>
                            )}
                        </SkeletonPlaceholder>
                    </ScrollView>
                    :
                    <>{children}</>
            }
        </>
    )
}

export default forwardRef(SkullLayer)