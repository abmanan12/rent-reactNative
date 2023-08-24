import React from 'react'

import { StatusBar } from 'react-native'
import AppNavigator from './src/navigation/AppNavigator'
import AuthContextProvider from './src/contexts/AuthContext'
import ProductContextProvider from './src/contexts/ProductContext'
import FilterContextProvider from './src/contexts/FilterContext'
import ListProductProvider from './src/contexts/ListProduct'
import CartContextProvider from './src/contexts/CartContext'
import colors from './src/colors'

export default function App() {
  return (
    <>

      <StatusBar barStyle='default' backgroundColor= {colors.warning} />
      <AuthContextProvider>
        <ProductContextProvider>
          <FilterContextProvider>
            <ListProductProvider>
              <CartContextProvider>
                <AppNavigator />
              </CartContextProvider>
            </ListProductProvider>
          </FilterContextProvider>
        </ProductContextProvider>
      </AuthContextProvider>

    </>
  )
}