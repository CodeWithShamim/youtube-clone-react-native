import { View } from 'react-native'
import React from 'react'
import CustomHeader from './CustomHeader'
import CustomFooter from './CustomFooter'
import SkullLayer from './SkullLayer'

const InnerLayer = ({ header, footer, children, loading }) => {
    return (
        <View style={{ flex: 1 }}>
            {header ? <CustomHeader /> : null}
            <SkullLayer loading={loading}>{children}</SkullLayer>
            {footer ? <CustomFooter /> : null}
        </View>
    )
}

export default InnerLayer