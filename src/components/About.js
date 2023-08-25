import { View, Text, Button } from 'react-native'
import React from 'react'

export default function About({ navigation }) {
  return (
    <View>
      <Text>About</Text>
      <Button
        title={'Go to Contact'}
        onPress={() => { navigation.navigate('Contact') }}
      />
    </View>
  )
}