import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, ToastAndroid, TouchableOpacity, ActivityIndicator } from 'react-native'

import { TextInput, Button } from 'react-native-paper'
import SelectDropdown from 'react-native-select-dropdown'

import { launchImageLibrary } from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { ListProduct } from '../../contexts/ListProduct'
import { useAuthContext } from '../../contexts/AuthContext';
import colors from '../../colors';
import { useProductContext } from '../../contexts/ProductContext';

let condition = ['Fair', 'Good', 'Excellent']
let province = ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Gilgit Baltistan']
let categorytype = ['Vehicles', 'Properties', 'Electronics', 'Human Workers', 'Household Goods',
  'Other Necessities']

const initialState = {
  categoryName: '',
  titleName: '',
  price: '',
  phoneNumber: '',
  condition: '',
  city: '',
  description: '',
}

export default function ListItems({ navigation }) {

  const { user } = useAuthContext()
  const [image, setImage] = useState()
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState(initialState)
  const {setUpdateUi} = useProductContext()
  const { changeSelectOptionHandler, options, selected, changeSelectLocationHandler,
    locationOptions, locationSelected } = useContext(ListProduct)


  const handleChange = (name, value) => {
    setState(s => ({ ...s, [name]: value }))
  }

  const showToast = msg => {
    ToastAndroid.showWithGravityAndOffset(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
  }

  const selectFile = () => {

    let options = {

      storageOptions: {
        skipBackup: true,
        path: 'images',
      },

    }

    launchImageLibrary(options, (res) => {

      if (res.didCancel) {
        showToast("User cancelled image picker")

      } else if (res.error) {
        showToast(res.error)

      } else if (res.customButton) {
        showToast(res.customButton)

        alert(res.customButton);
      } else {
        if (res.assets[0].fileSize > 1000124) {
          return showToast("Max image size should contain 1 MB")
        }
        setImage(res.assets[0].uri)
      }

    })

  }

  const handleUpload = () => {

    state.categoryType = selected
    state.province = locationSelected

    const { categoryName, titleName, price, city, phoneNumber, condition, description } = state

    if (titleName.length <= 4) {
      return showToast("Title Name min length must 5")
    }

    if (!categoryName) {
      return showToast("Please Select Category Name")
    }

    if (!city) {
      return showToast("Please Select City")
    }

    if (!price) {
      return showToast("Please Enter Price")
    }

    if (!phoneNumber) {
      return showToast("Please Enter Mobile Numbe")
    }

    if (!condition) {
      return showToast("Please Select Condition")
    }

    if (!image) {
      return showToast("Please Choose Product Image")
    }

    if (description.length <= 9) {
      return showToast("Description should contain at least 10 characters")
    }

    handleSubmit()

  }

  const handleSubmit = async () => {

    let randomId = Math.random().toString(36).slice(2)

    setLoading(true)

    const imagesRef = storage().ref(`profileImages/${randomId}`)
    await imagesRef.putFile(image)

    const downloadURL = await imagesRef.getDownloadURL();

    state.productImage = downloadURL
    state.uploadTime = moment().format('YYYY-MM-D, h:mm:ss a')
    state.productId = randomId
    state.uid = user.uid

    firestore()
      .collection('ListProducts')
      .doc(state.productId)
      .set(state)
      .then(() => {
        showToast("Product has been added !")
      });

    setUpdateUi(prevState => !prevState)

    setLoading(false)
    navigation.navigate('Hero')

  }

  return (
    <>

      <ScrollView showsVerticalScrollIndicator={false} style={{ margin: 20 }}>

        <Text style={styles.text}>Fill Form to list your Product</Text>

        <View style={styles.column}>
          <SelectDropdown
            data={categorytype}
            defaultButtonText='Type'
            searchPlaceHolder='Choose Category Type'
            buttonStyle={[styles.dropDown, { width: '49%' }]}
            buttonTextStyle={{ textAlign: 'left' }}
            onSelect={(selectedItem) => { changeSelectOptionHandler(selectedItem) }}
            renderDropdownIcon={isOpened => {
              return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} />;
            }}
          />

          <SelectDropdown
            // search
            data={options}
            defaultButtonText='Name'
            searchPlaceHolder='Choose Category Name'
            // dropdownStyle={{ width: 'auto' }}
            buttonStyle={[styles.dropDown, { width: '49%' }]}
            buttonTextStyle={{ textAlign: 'left' }}
            onSelect={(selectedItem) => { handleChange('categoryName', selectedItem) }}
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
            onSelect={(selectedItem) => { changeSelectLocationHandler(selectedItem) }}
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
            onSelect={(selectedItem) => { handleChange('city', selectedItem) }}
            renderDropdownIcon={isOpened => {
              return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} />;
            }}
          />
        </View>

        <TextInput style={styles.textInput}
          mode='outlined'
          placeholder='Title Name'
          maxLength={30}
          onChangeText={val => handleChange('titleName', val)}
          right={<TextInput.Affix text="/30" />}
        />

        <TextInput style={[styles.textInput, { marginBottom: 15 }]}
          mode='outlined'
          placeholder='Price'
          onChangeText={val => handleChange('price', val)}
        />

        <SelectDropdown
          data={condition}
          defaultButtonText='Product Condition'
          searchPlaceHolder='Choose Product Condition'
          dropdownStyle={{ width: 150 }}
          buttonStyle={[styles.dropDown, { width: '100%' }]}
          buttonTextStyle={{ textAlign: 'left' }}
          onSelect={(selectedItem) => { handleChange('condition', selectedItem) }}
          renderDropdownIcon={isOpened => {
            return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} />;
          }}
        />

        <TextInput style={styles.textInput}
          mode='outlined'
          placeholder='Phone Number'
          onChangeText={val => handleChange('phoneNumber', val)}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Button style={{ alignItems: 'flex-start', marginRight: 20 }}
            icon="camera" mode="text" onPress={selectFile}>Choose Image</Button>

          {image && <Image source={{ uri: image }} style={{ width: 50, height: 50, marginTop: 10 }} />}
        </View>

        <TextInput style={styles.textInput}
          mode='outlined'
          placeholder='Description'
          multiline={true}
          numberOfLines={4}
          maxLength={100}
          onChangeText={val => handleChange('description', val)}
          right={<TextInput.Affix text="/100" />}
        />

        {/* <Button mode="contained" onPress={handleUpload}
          style={styles.button}>Add Product</Button> */}

        <TouchableOpacity style={styles.button} disabled={loading} onPress={handleUpload}>
          {loading
            ? <ActivityIndicator size="small" color="white" />
            : <Text style={{ color: 'white', textAlign: 'center' }}>
              {"Add Product"}
            </Text>}
        </TouchableOpacity>

      </ScrollView>

    </>
  )
}


const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: colors.info
  },
  textInput: {
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 25,
    backgroundColor: colors.info
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
  }
})