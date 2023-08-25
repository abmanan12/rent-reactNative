import React, { createContext, useContext, useEffect, useReducer, useState, useCallback } from 'react'
import { ToastAndroid } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AuthContext = createContext()

const initialState = { isAuthenticated: false }

const reducer = (state, { type }) => {
    switch (type) {
        case 'SET_LOGGED_IN':
            return { ...state, isAuthenticated: true }
        case 'SET_LOGGED_OUT':
            return { ...state, isAuthenticated: false }
        case 'SET_PROFILE':
            return { ...state }
        default:
            return state;
    }
}

export default function AuthContextProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [user, setUser] = useState()
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [refreshing, setRefreshing] = useState(false)

    const showToast = msg => {
        ToastAndroid.showWithGravityAndOffset(msg, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    }

    const onAuthStateChanged = (user) => {
        if (user) {
            setUser(user)
            fetchDocument(user)
            dispatch({ type: 'SET_LOGGED_IN' })
        }
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, [refreshing]);

    const fetchDocument = async (user) => {

        firestore()
            .collection('Users').where("uid", "==", user.uid)
            .get()
            .then(querySnapshot => {

                querySnapshot.forEach(documentSnapshot => {
                    let data = documentSnapshot.data();
                    setImage(data.image)
                    setName(data.firstName + ' ' + data.lastName)
                })
            })
    }

    const handleLogout = () => {
        auth()
            .signOut()
            .then(() => {
                dispatch({ type: 'SET_LOGGED_OUT' })
                showToast('User signed out!')
            })
            .catch(error => {
                if (error.code == 'auth/no-current-user') {
                    showToast('User already signed out!')
                }
                else {
                    showToast('Something went wrong')
                }
            })
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 800);
    }, [])

    return (
        <>
            <AuthContext.Provider value={{
                ...state, dispatch, user, name, image,
                handleLogout, showToast, refreshing, onRefresh
            }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}
