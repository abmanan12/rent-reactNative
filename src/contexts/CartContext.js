import React, { createContext, useContext, useReducer, useEffect } from 'react'

import reducer from '../reducers/cartReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CartContext = createContext()


export default function CartContextProvider({ children }) {

    const initialState = {
        cart: [],
        error: false
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const addCart = (cartData) => {
        dispatch({ type: 'ADD_TO_CART', payload: cartData })
    }

    const removeItem = productId => {
        dispatch({ type: 'REMOVE_ITEM', payload: productId })
    }

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' })
    }

    useEffect(() => {

        const getCart = async () => {
            const storage = JSON.parse(await AsyncStorage.getItem('rentCart')) || [];
            addCart(storage);
        };

        getCart();
        
    }, []);

    return (
        <>
            <CartContext.Provider value={{ ...state, addCart, removeItem, clearCart }}>
                {children}
            </CartContext.Provider>
        </>
    )
}

export const useCartContext = () => {
    return useContext(CartContext)
} 
