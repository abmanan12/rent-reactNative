import React, { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react'

import reducer from '../reducers/ProductReducer'

import firestore from '@react-native-firebase/firestore';

const ProductContext = createContext()

const initialState = {
    isError: false,
    products: [],
    recentProducts: [],
}

export default function ProductContextProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [userId, setUserId] = useState('')
    const [profileName, setProfileName] = useState('')
    const [profileTime, setProfileTime] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [refreshing, setRefreshing] = useState(false)
    const [updateUi, setUpdateUi] = useState(false)

    const fetchDocument = async () => {

        firestore()
            .collection('ListProducts')
            .get()
            .then(querySnapshot => {

                let products = []

                querySnapshot.forEach(documentSnapshot => {
                    let data = documentSnapshot.data();
                    products.push(data)
                })

                if (!products.length) {
                    dispatch({ type: 'SET_ERROR' })
                }
                else {
                    dispatch({ type: 'SET_DATA', payload: products })
                }

            })

    }

    const userProfile = async (id) => {

        firestore()
            .collection('Users')
            .get()
            .then(querySnapshot => {

                let profileData = []

                querySnapshot.forEach(documentSnapshot => {
                    let data = documentSnapshot.data();
                    profileData.push(data)
                })

                if (profileData) {
                    let userProfileData = profileData.filter(curElem => {
                        return curElem.uid === id
                    })
                    if (userProfileData.length) {
                        var singleObj = Object.assign({}, ...userProfileData)
                        const { firstName, lastName, image, createdAt } = singleObj
                        setProfileName(`${firstName} ${lastName}`)
                        setUserId(id)
                        setProfileImage(image)
                        setProfileTime(createdAt)
                    }
                }

            })

    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    }, [])

    useEffect(() => {
        fetchDocument()
    }, [refreshing, updateUi])

    return (
        <>
            <ProductContext.Provider value={{
                ...state, userId, userProfile, profileName, setUpdateUi,
                profileTime, profileImage, onRefresh, refreshing
            }}>
                {children}
            </ProductContext.Provider>
        </>
    )
}

export const useProductContext = () => {
    return useContext(ProductContext)
}
