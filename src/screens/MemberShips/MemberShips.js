import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import InnerLayer from '../../components/InnerLayer'
import { CardField, useStripe } from '@stripe/stripe-react-native'
import { Colors } from '../../styles'

const MemberShips = () => {
    const { confirmPayment } = useStripe()

    return (
        <InnerLayer header={true} footer={true}>
            <View style={styles.container}>
                <CardField
                    postalCodeEnabled={true}
                    placeholders={{
                        number: '4242 4242 4242 4242',
                    }}
                    cardStyle={{
                        backgroundColor: Colors.secondary,
                        textColor: '#000000',
                    }}
                    style={{
                        width: '100%',
                        height: 50,
                        marginVertical: 30,
                    }}
                    onCardChange={(cardDetails) => {
                        console.log('cardDetails', cardDetails);
                    }}
                    onFocus={(focusedField) => {
                        console.log('focusField', focusedField);
                    }}
                />
            </View>
        </InnerLayer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "green"
    }
})

export default MemberShips