import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { Button, Card } from 'react-native-paper';
import { useProductContext } from '../contexts/ProductContext';
import FormatPrice from './FormatPrice';
import colors from '../colors';

export default function ProductsCategory({ navigation, route }) {

    const { categoryType } = route.params
    const { products } = useProductContext()

    let categoryProducts = products.filter((curElem) => {
        return curElem.categoryType === categoryType
    })

    if (categoryProducts.length === 0) {
        return <Text style={{ textAlign: 'center', paddingVertical: 50 }}>No Product available of {categoryType}</Text>
    }

    return (
        <ScrollView style={{ paddingTop: 20 }}>

            <Text style={styles.text}>Products with Category Type {categoryType}</Text>

            <View style={styles.productCategory}>

                {
                    categoryProducts.map((curElem, i) => {
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

            <Button mode="contained" onPress={() => { navigation.navigate('Products') }}
                style={styles.button}>Other Products</Button>

        </ScrollView>
    )
}

const styles = StyleSheet.create({

    text: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    productCategory: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 5,
    },
    button: {
        marginHorizontal: 20,
        backgroundColor: colors.info,
        borderRadius: 10,
        marginVertical: 30
    }

})