import React from 'react'
import { View, Text } from 'react-native'
import { Card } from 'react-native-paper'

export default function Product() {
    
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 5 }}>
            <Card style={{ width: '48%', marginHorizontal: 3, marginTop: 5 }} mode='elevated'>
                <Card.Cover style={{ height: 150, }} source={require('../assets/images/logo1.png')} />
                <Card.Content style={{ marginTop: 5 }}>
                    <Text variant="titleLarge" style={{ marginVertical: 10 }}>Lorem ipsum dolor sit, amet</Text>
                    <Text variant="bodyMedium">10000</Text>
                </Card.Content>
                <Card.Content style={{ marginTop: 40, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text variant="titleLarge">Lahore</Text>
                    <Text variant="bodyMedium">08 May</Text>
                </Card.Content>
            </Card>
        </View>
    )
}