import { View, Text, Button } from 'react-native'
import React from 'react'

export default function Contact({navigation}) {
  return (
    <View>
      <Text>Contact</Text>
      <Button
        title={'Go back'}
        onPress={() => { navigation.goBack()}}
      />
      <Button
        title={'Go home'}
        onPress={() => { navigation.popToTop()}}
      />
    </View>
  )
}