import React, { useContext } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Button, Card, TextInput } from 'react-native-paper'

import { useFilterContext } from '../../contexts/FilterContext'
import { ListProduct } from '../../contexts/ListProduct';

import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FormatPrice from '../../components/FormatPrice';
import Slider from '@react-native-community/slider';
import colors from '../../colors';

let condition = ['Fair', 'Good', 'Excellent']
let sortValue = ['lowest', 'highest', 'a-z', 'z-a']
let province = ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Gilgit Baltistan']
let categorytype = ['Vehicles', 'Properties', 'Electronics', 'Human Workers', 'Household Goods',
  'Other Necessities']

export default function Products({ navigation }) {

  const { filterProducts, sorting, filters: { price, maxPrice, minPrice },
    updateFilter, clearFilter } = useFilterContext();
  const { changeSelectOptionHandler, options, changeSelectLocationHandler,
    locationOptions } = useContext(ListProduct)

  return (
    <>

      <ScrollView showsVerticalScrollIndicator={false} style={{ marginVertical: 20 }}>

        <View style={{ marginHorizontal: 20 }}>

          <Text style={styles.text}>Products</Text>


          <Text style={styles.h3}>Sort</Text>
          <Text style={[styles.h5, { marginBottom: 14, textAlign: 'center' }]}>{filterProducts.length} products available</Text>

          <SelectDropdown
            data={sortValue}
            defaultButtonText='Sort with Price & Title Name'
            dropdownStyle={{ width: 150 }}
            buttonStyle={[styles.dropDown, { width: '100%' }]}
            buttonTextStyle={{ textAlign: 'left' }}
            onSelect={(selectedItem) => { sorting(selectedItem) }}
            renderDropdownIcon={isOpened => {
              return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} />;
            }}
          />

          <Text style={[styles.h3, { marginTop: 15 }]}>Filters</Text>
          <TextInput style={styles.textInput}
            mode='outlined'
            placeholder='Search with Title Name'
            onChangeText={val => updateFilter('text', val)}
          />

          <View style={styles.column}>
            <SelectDropdown
              data={categorytype}
              defaultButtonText='Type'
              searchPlaceHolder='Choose Category Type'
              buttonStyle={[styles.dropDown, { width: '49%' }]}
              buttonTextStyle={{ textAlign: 'left' }}
              onSelect={(selectedItem) => {
                changeSelectOptionHandler(selectedItem);
                updateFilter('categoryType', selectedItem)
              }}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} />;
              }}
            />

            <SelectDropdown
              data={options}
              defaultButtonText='Name'
              searchPlaceHolder='Choose Category Name'
              buttonStyle={[styles.dropDown, { width: '49%' }]}
              buttonTextStyle={{ textAlign: 'left' }}
              onSelect={(selectedItem) => { updateFilter('categoryName', selectedItem) }}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} />;
              }}
            />
          </View>

          <View style={styles.column}>
            <SelectDropdown
              data={province}
              defaultButtonText='Province'
              searchPlaceHolder='Choose Province Name'
              buttonStyle={[styles.dropDown, { width: '49%' }]}
              buttonTextStyle={{ textAlign: 'left' }}
              onSelect={(selectedItem) => {
                changeSelectLocationHandler(selectedItem);
                updateFilter('province', selectedItem)
              }}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} />;
              }}
            />

            <SelectDropdown
              data={locationOptions}
              defaultButtonText='City'
              searchPlaceHolder='Choose City Name'
              buttonStyle={[styles.dropDown, { width: '49%' }]}
              buttonTextStyle={{ textAlign: 'left' }}
              onSelect={(selectedItem) => { updateFilter('city', selectedItem) }}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} />;
              }}
            />
          </View>

          <SelectDropdown
            data={condition}
            defaultButtonText='Product Condition'
            dropdownStyle={{ width: 150 }}
            buttonStyle={[styles.dropDown, { width: '100%' }]}
            buttonTextStyle={{ textAlign: 'left' }}
            onSelect={(selectedItem) => { updateFilter('condition', selectedItem) }}
            renderDropdownIcon={isOpened => {
              return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} />;
            }}
          />

          <Text style={styles.h4}>Price</Text>
          <Text style={[styles.h5, { marginBottom: 20 }]}>{<FormatPrice price={price} />}</Text>
          <Slider
            value={price}
            minimumValue={minPrice}
            maximumValue={maxPrice}
            minimumTrackTintColor={colors.info}
            maximumTrackTintColor={colors.info}
            thumbTintColor= {colors.info}
            onValueChange={val => { updateFilter('price', parseInt(val)) }}
          />

          <Button icon="delete" mode="contained" onPress={clearFilter}
            style={styles.button}>Clear Filters</Button>

        </View>


        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 5, marginVertical: 40 }}>

          {
            filterProducts.map((curElem, i) => {
              return (
                <Card style={{ width: '48%', marginHorizontal: 3, marginTop: 5 }} mode='elevated' key={i}
                  onPress={() => { navigation.navigate('SingalProduct', curElem) }}>
                  <Card.Cover style={{ height: 150, }} source={{ uri: curElem.productImage }} />
                  <Card.Content style={{ marginTop: 5 }}>
                    <Text variant="titleLarge" style={{ marginVertical: 10, fontWeight: 'bold' }}>{curElem.titleName}</Text>
                    <Text variant="bodyMedium">{<FormatPrice price={curElem.price} />}</Text>
                  </Card.Content>
                  <Card.Content style={{ marginTop: 25 }}>
                    <Text variant="titleLarge">{curElem.city}</Text>
                  </Card.Content>
                </Card>
              )
            })
          }

        </View>


      </ScrollView>

    </>
  )
}

const styles = StyleSheet.create({

  text: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: colors.info
  },
  textInput: {
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dropDown: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  h3: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10
  },
  h4: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5
  },
  h5: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    marginHorizontal: 20,
    backgroundColor: colors.info,
    borderRadius: 10,
    marginTop: 25
  }

})