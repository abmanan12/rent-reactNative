import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { useProductContext } from '../../contexts/ProductContext'
import { useAuthContext } from '../../contexts/AuthContext'
import { Card } from 'react-native-paper'
import FormatPrice from '../../components/FormatPrice'

export default function MyAds({ navigation }) {

  const { products } = useProductContext()
  const { user } = useAuthContext()

  const myAds = products.filter(curElem => {
    return curElem.uid === user?.uid
  })


  return (

    <ScrollView style={{ marginVertical: 30 }}>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 5 }}>

        {!myAds.length
          ? <Text style={{ padding: 120 }}>No Product Exist</Text>
          : myAds.map((curElem, i) => {
            return (
              <Card style={{ width: '48%', marginHorizontal: 3, marginTop: 5 }} mode='elevated' key={i}
                onPress={() => { navigation.navigate('SingalProduct', curElem) }}>
                <Card.Cover style={{ height: 150, }} source={{ uri: curElem.productImage }} />
                <Card.Content style={{ marginTop: 5 }}>
                  <Text variant="titleLarge" style={{ marginVertical: 10, fontWeight: 'bold' }}>{curElem.titleName}</Text>
                  <Text variant="bodyMedium">{<FormatPrice price={curElem.price} />}</Text>
                </Card.Content>
                <Card.Content style={{ marginTop: 40, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text variant="titleLarge">{curElem.city}</Text>
                  <Text variant="bodyMedium">08 May</Text>
                </Card.Content>
              </Card>
            )
          })

        }

      </View>


    </ScrollView>

  )
}