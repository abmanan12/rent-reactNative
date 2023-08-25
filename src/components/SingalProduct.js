import React, { useState, useEffect, useContext } from 'react'
import { View, Text, ScrollView, Image, StyleSheet, ToastAndroid, Modal, Alert } from 'react-native'
import { Button, TextInput } from 'react-native-paper'

import { useAuthContext } from '../contexts/AuthContext'
import { useProductContext } from '../contexts/ProductContext'
import { ListProduct } from '../contexts/ListProduct'
import UserProfile from './UserProfile'
import FormatPrice from './FormatPrice'

import moment from 'moment'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import firestore from '@react-native-firebase/firestore';
import SelectDropdown from 'react-native-select-dropdown'
import { useCartContext } from '../contexts/CartContext'
import colors from '../colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

let conditionData = ['Fair', 'Good', 'Excellent']
let provinceData = ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Gilgit Baltistan']
let categorytypeData = ['Vehicles', 'Properties', 'Electronics', 'Human Workers', 'Household Goods',
    'Other Necessities']

export default function SingalProduct({ navigation, route }) {

    const { user } = useAuthContext()
    const { addCart } = useCartContext()
    const [singleProductData, setSingleProductData] = useState(route.params)
    const { userProfile, profileName, profileImage } = useProductContext()
    const { changeSelectOptionHandler, options, changeSelectLocationHandler,
        locationOptions } = useContext(ListProduct)

    const [modalVisible, setModalVisible] = useState(false)

    const showToast = msg => {
        ToastAndroid.showWithGravityAndOffset(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    }

    const {
        // id: abc,
        uid,
        price,
        city,
        province,
        titleName,
        categoryName,
        categoryType,
        description,
        productImage,
        condition,
        productId,
        phoneNumber,
        uploadTime
    } = singleProductData


    useEffect(() => {
        userProfile(uid)
    }, [uid])

    const handleDelete = async () => {

        firestore()
            .collection('ListProducts')
            .doc(productId)
            .delete()
            .then(() => {
                navigation.navigate('Root')
                showToast('Product deleted!')
            })

    }

    const handleChange = (name, value) => {
        setSingleProductData(s => ({ ...s, [name]: value }))
    }

    const handleUpdate = async () => {

        let editData = { ...singleProductData }

        editData.uploadTime = editData.uploadTime
        editData.dateModified = moment().format('YYYY-MM-D, h:mm:ss a')

        firestore()
            .collection('ListProducts')
            .doc(editData.productId)
            .update(editData)
            .then(() => {
                showToast('Product updated!')
            });

    }

    const addToCart = async (uid, productId) => {


        // let storage = await AsyncStorage.removeItem('rentCart') || []
        const cartData = { uid, price, titleName, productId, productImage }

        let storage = JSON.parse(await AsyncStorage.getItem('rentCart')) || []

        let existing = storage.find((curElem) => {
            return curElem.productId === productId
        })

        !existing && storage.push(cartData)

        await AsyncStorage.setItem('rentCart', JSON.stringify(storage))

        addCart(storage)
    }


    return (
        <>

            <ScrollView showsVerticalScrollIndicator={false} style={{ margin: 20 }}>

                <Text style={[{ fontSize: 16, paddingVertical: 20 }]}>
                    <Text onPress={() => { navigation.navigate('Root') }} style={{ color: colors.info }}>
                        Home</Text> / {titleName}</Text>

                <Image style={{ width: '100%', height: 250 }}
                    source={{ uri: productImage }} />
                <Text style={[styles.text, { textAlign: 'center', paddingTop: 5 }]}>{categoryType}</Text>

                <Text style={styles.price}>{<FormatPrice price={price} />}</Text>
                <Text style={styles.text}><Text style={styles.name}>Name: </Text>{titleName}</Text>
                <Text style={styles.text}><Text style={styles.name}>Category: </Text>{categoryName}</Text>

                <Text style={[styles.text, { marginTop: 20 }]}><Text style={styles.name}>Condition: </Text>{condition}</Text>
                <Text style={styles.text}><Text style={styles.name}>Product Id: </Text>{productId}</Text>

                <View style={{ marginTop: 24, borderTopWidth: 1, borderBottomWidth: 1, paddingVertical: 20 }}>
                    <Text><Text style={styles.name}>Description: </Text>{uploadTime}</Text>
                    <Text>{city}, {province}</Text>
                    <Text style={[styles.text, { marginTop: 12, textAlign: 'justify' }]}>{description}</Text>

                    {
                        uid !== user.uid && <Button mode='contained' style={styles.button}
                            onPress={() => { addToCart(user.uid, productId); navigation.navigate('Cart') }}>
                            Add to Favourite</Button>
                    }
                </View>

                <Text style={styles.owner}>Product Owner</Text>

                <Text onPress={() => { navigation.navigate('ListAds') }}>
                    <UserProfile />
                </Text>

                {uid == user.uid
                    ? <View style={styles.ownerStyle}>
                        <Button mode='contained' style={[styles.ownerButton, { backgroundColor: 'green' }]}
                            onPress={() => setModalVisible(true)}>Edit Product</Button>
                        <Button mode='contained' style={[styles.ownerButton, { backgroundColor: 'red' }]}
                            onPress={handleDelete}>Delete Product</Button>
                    </View>

                    : <View style={styles.ownerStyle}>
                        <Text>+92{phoneNumber}</Text>
                        <Button mode='contained' style={[styles.ownerButton, { backgroundColor: colors.info }]}
                            onPress={() => {
                                navigation.navigate('Chat', { uid: uid, userName: profileName, userImage: profileImage, phone: phoneNumber })
                            }}
                        >Chat with Owner</Button>
                    </View>}

            </ScrollView>


            {/* Modal for Update Product*/}
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <Text style={{ marginBottom: 30 }}>Update your Product</Text>

                            <View style={styles.column}>
                                <SelectDropdown
                                    data={categorytypeData}
                                    defaultValue={categoryType}
                                    defaultButtonText='Type'
                                    searchPlaceHolder='Choose Category Type'
                                    buttonStyle={[styles.dropDown, { width: '49%' }]}
                                    buttonTextStyle={{ textAlign: 'left' }}
                                    onSelect={(selectedItem) => {
                                        changeSelectOptionHandler(selectedItem);
                                        handleChange('categoryType', selectedItem)
                                    }}
                                    renderDropdownIcon={isOpened => {
                                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} />;
                                    }}
                                />

                                <SelectDropdown
                                    data={options}
                                    defaultValue={categoryName}
                                    defaultButtonText='Name'
                                    searchPlaceHolder='Choose Category Name'
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
                                    data={provinceData}
                                    defaultValue={province}
                                    defaultButtonText='Province'
                                    searchPlaceHolder='Choose Province Name'
                                    buttonStyle={[styles.dropDown, { width: '49%' }]}
                                    buttonTextStyle={{ textAlign: 'left' }}
                                    onSelect={(selectedItem) => {
                                        changeSelectLocationHandler(selectedItem);
                                        handleChange('categoryName', selectedItem)
                                    }}
                                    renderDropdownIcon={isOpened => {
                                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={12} />;
                                    }}
                                />

                                <SelectDropdown
                                    data={locationOptions}
                                    defaultValue={city}
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
                                defaultValue={titleName}
                                maxLength={30}
                                onChangeText={val => handleChange('titleName', val)}
                            />

                            <TextInput style={[styles.textInput, { marginBottom: 15 }]}
                                mode='outlined'
                                placeholder='Price'
                                defaultValue={price}
                                onChangeText={val => handleChange('price', val)}
                            />

                            <SelectDropdown
                                data={conditionData}
                                defaultValue={condition}
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
                                defaultValue={phoneNumber}
                                onChangeText={val => handleChange('phoneNumber', val)}
                            />

                            <TextInput style={styles.textInput}
                                mode='outlined'
                                placeholder='Description'
                                defaultValue={description}
                                multiline={true}
                                numberOfLines={3}
                                maxLength={100}
                                onChangeText={val => handleChange('description', val)}
                            />


                            <View style={styles.modalButtons}>
                                <Button mode='contained' style={[styles.ownerButton, { backgroundColor: 'red', width: 100 }]}
                                    onPress={() => setModalVisible(!modalVisible)}>Cancel</Button>
                                <Button mode='contained' style={[styles.ownerButton, { backgroundColor: 'green', marginStart: 6 }]}
                                    onPress={handleUpdate}>Save Changes</Button>
                            </View>

                        </View>
                    </View>
                </Modal>
            </View>

        </>
    )
}



const styles = StyleSheet.create({

    price: {
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 25,
        marginBottom: 15,
        color: colors.info
    },
    text: {
        fontSize: 16,
        marginBottom: 5
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18
    },
    button: {
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: colors.info,
    },
    owner: {
        fontSize: 25,
        marginVertical: 20,
        fontWeight: 'bold',
        color: colors.info
    },
    ownerStyle: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    ownerButton: {
        width: 150,
        borderRadius: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        paddingVertical: 60,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 15,
        elevation: 5,
    },
    modalButtons: {
        flexDirection: 'row',
        paddingTop: 20,
        justifyContent: 'flex-end'
    },
    column: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textInput: {
        marginBottom: 10,
        backgroundColor: 'transparent',
    },
    dropDown: {
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: 'transparent',
    }
})