import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { useProductContext } from './ProductContext'
import reducer from '../reducers/FilterReducer'

const FilterContext = createContext()

const initialState = {
    filterProducts: [],
    allProducts: [],
    gridView: true,
    sortingValue: "lowest",
    filters: {
        text: '',
        city: 'all',
        province: 'all',
        condition: 'all',
        categoryName: "all",
        categoryType: "all",
        price: 0,
        maxPrice: 0,
        minPrice: 0,
    }
}

export default function FilterContextProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)
    const { products } = useProductContext()

    const sorting = async (seletValue) => {
        await dispatch({ type: 'GET_SORT_VALUE', payload: seletValue })
        dispatch({ type: 'SORTING_PRODUCTS' })
    }

    const updateFilter = async (productName, productValue) => {
        await dispatch({ type: 'UPDATE_FILTER_VALUE', payload: { productName, productValue } })
        dispatch({ type: 'FILTER_PRODUCTS' })
    }
    
    const clearFilter = async () => {
        await dispatch({ type: 'CLEAR_FILTER' })
        dispatch({ type: 'FILTER_PRODUCTS' })
    }

    useEffect(() => {
        dispatch({ type: 'LOAD_FILTER_PRODUCTS', payload: products })
    }, [products])

    return (
        <>
            <FilterContext.Provider value={{ ...state, updateFilter, products, sorting, clearFilter }}>
                {children}
            </FilterContext.Provider>
        </>
    )
}

export const useFilterContext = () => {
    return useContext(FilterContext)
}