import React from 'react'
import { View, ScrollView, StyleSheet, Image } from 'react-native'
import { Button, DataTable, Text } from 'react-native-paper'

import Icon from 'react-native-vector-icons/dist/AntDesign';

import { useCartContext } from '../../contexts/CartContext'
import { useAuthContext } from '../../contexts/AuthContext'
import colors from '../../colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cart() {

  const { cart, clearCart, removeItem } = useCartContext()
  const { user } = useAuthContext()

  let uidCart = cart?.filter((curElem) => {
    return curElem.uid === user?.uid
  })

  if (uidCart.length === 0) {
    return <Text style={{ textAlign: 'center', paddingVertical: 50 }}>No Item in Cart</Text>
  }

  const removeCart = async (id) => {

    let storage = JSON.parse(await AsyncStorage.getItem('rentCart')) || []

    let updateCart = storage?.filter((curElem) => {
      return curElem.productId !== id
    })

    await AsyncStorage.setItem('rentCart', JSON.stringify(updateCart))

    removeItem(id);

  }


  return (

    <ScrollView showsVerticalScrollIndicator>

      {uidCart.map((curElem, i) => {
        return (
          <View style={{ paddingVertical: 10, paddingHorizontal: 10, borderBottomWidth: 1 }} key={i}>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell>Product Image</DataTable.Cell>
                <DataTable.Cell style={styles.itemsCenter}>
                  <Image style={{ width: 60, height: 60}}
                    source={{ uri: curElem.productImage }} />
                </DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Product Name</DataTable.Cell>
                <DataTable.Cell style={styles.itemsCenter}>{curElem.titleName}</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Price</DataTable.Cell>
                <DataTable.Cell style={styles.itemsCenter}>{curElem.price}</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Remove</DataTable.Cell>
                <DataTable.Cell style={styles.itemsCenter}><Text style={{ color: colors.info }}
                  onPress={() => { removeCart(curElem.productId);}}>{<Icon name='delete' />}</Text>
                </DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </View>
        )
      })}

      <Button icon="delete" mode="contained" onPress={clearCart}
        style={styles.button}>Clear Cart</Button>

    </ScrollView>

  )
}

const styles = StyleSheet.create({
  itemsCenter: {
    justifyContent: 'center',
  },
  button: {
    marginHorizontal: 20,
    backgroundColor: colors.info,
    borderRadius: 10,
    marginTop: 25
  }
})