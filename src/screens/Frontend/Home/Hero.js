import React from 'react'
import { View, Text, ScrollView, StyleSheet, RefreshControl, Image } from 'react-native'
import { Card, Button } from 'react-native-paper'

import { useProductContext } from '../../../contexts/ProductContext'
import FormatPrice from '../../../components/FormatPrice'
import colors from '../../../colors'

export default function Hero({ navigation }) {

  const { recentProducts, onRefresh, refreshing } = useProductContext()

  const LogoImage = () => {
    return <Image style={styles.img} source={require('../../../assets/images/rent.png')} />
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 20 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

      <Text style={[styles.text, { marginTop: 5, marginBottom: 10 }]}>Find Perfect Rental Solution</Text>
      <Text style={styles.p}>Welcome to our comprehensive rental platform, where you can find everything you need
        in one place. We have a wide range of options available for you to rent so, Browse our extensive collection and
        make renting a convenient and hassle-free experience for all your needs.</Text>

      <View style={{ marginHorizontal: 20, marginBottom: 30 }}>
        <LogoImage />
      </View>


      <Text style={styles.text}>Products Categories</Text>

      <View style={styles.productCategory}>

        <Button onPress={() => { navigation.navigate('ProductsCategory', { categoryType: 'Vehicles' }) }}>Vehicles</Button>
        <Button onPress={() => { navigation.navigate('ProductsCategory', { categoryType: 'Properties' }) }}>Properties</Button>
        <Button onPress={() => { navigation.navigate('ProductsCategory', { categoryType: 'Electronics' }) }}>Electronics</Button>
        <Button onPress={() => { navigation.navigate('ProductsCategory', { categoryType: 'Human Workers' }) }}>Human Workers</Button>
        <Button onPress={() => { navigation.navigate('ProductsCategory', { categoryType: 'Household Goods' }) }}>Household Goods</Button>
        <Button onPress={() => { navigation.navigate('ProductsCategory', { categoryType: 'Other Necessities' }) }}>Other Necessities</Button>

      </View>


      <Text style={styles.text}>Feature Products</Text>

      <View style={styles.recentProducts}>

        {
          recentProducts.map((curElem, i) => {
            return (
              <Card style={{ width: '48%', marginHorizontal: 3, marginTop: 5 }} mode='elevated' key={i}
                onPress={() => { navigation.navigate('SingalProduct', curElem) }}>
                <Card.Cover style={{ height: 150, backgroundColor: 'transparent' }} source={{ uri: curElem.productImage }} />
                <Card.Content style={{ marginTop: 5 }}>
                  <Text variant="titleLarge" style={{ marginVertical: 10, fontWeight: 'bold' }}>{curElem.titleName}</Text>
                  <Text variant="bodyMedium">{<FormatPrice price={curElem.price} />}</Text>
                </Card.Content>
                <Card.Content style={{ marginTop: 40 }}>
                  <Text variant="titleLarge">{curElem.city}</Text>
                </Card.Content>
              </Card>
            )
          })
        }

      </View>

      <Button mode="contained" onPress={() => { navigation.navigate('Products') }}
        style={styles.button}>More Products</Button>

    </ScrollView>
  )
}

const styles = StyleSheet.create({

  p: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: 'justify',
    paddingHorizontal: 20
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.info,
    paddingHorizontal: 20
  },
  productCategory: {
    flexDirection: 'row',
    marginStart: 20,
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  recentProducts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 5,
  },
  button: {
    marginHorizontal: 20,
    backgroundColor: colors.info,
    borderRadius: 10,
    marginTop: 40,
    marginBottom: 50
  },
  img: {
    width: '100%',
    height: 200,
  }

})