const FilterReducer = (state, action) => {

    switch (action.type) {

        case 'LOAD_FILTER_PRODUCTS':

            let priceArr = action.payload.map((curElem) => curElem.price);

            let maxPrice = priceArr.reduce(
                (initialVal, curVal) => Math.max(initialVal, curVal),
                0
            )

            return {
                ...state,
                filterProducts: [...action.payload],
                allProducts: [...action.payload],
                filters: {
                    ...state.filters, maxPrice, price: maxPrice
                }
            }

        case 'GET_SORT_VALUE':

            return {
                ...state,
                sortingValue: action.payload
            }

        case 'SORTING_PRODUCTS':

            let newSortData;
            const { filterProducts, sortingValue } = state
            let tempSortData = [...filterProducts];

            newSortData = tempSortData.sort((a, b) => {
                if (sortingValue === 'lowest') {
                    return a.price - b.price
                }
                if (sortingValue === 'highest') {
                    return b.price - a.price
                }
                if (sortingValue === 'a-z') {
                    return a.titleName.localeCompare(b.titleName)
                }
                if (sortingValue === 'z-a') {
                    return b.titleName.localeCompare(a.titleName)
                }
            })

            return {
                ...state,
                filterProducts: newSortData
            }

        case "UPDATE_FILTER_VALUE":
            const { productName, productValue } = action.payload;

            return {
                ...state,
                filters: {
                    ...state.filters,
                    [productName]: productValue,
                },
            }

        case 'FILTER_PRODUCTS':


            let { allProducts } = state;
            let tempFilterProduct = [...allProducts];

            const { text, price, categoryName, categoryType, province, city, condition } = state.filters;

            if (text) {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.titleName.toLowerCase().includes(text.toLowerCase());
                });
            }

            if (categoryName !== 'all') {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.categoryName === categoryName;
                });
            }

            if (categoryType !== 'all') {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.categoryType === categoryType
                });
            }

            if (province !== 'all') {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.province === province
                });
            }

            if (city !== 'all') {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.city === city
                });
            }

            if (condition !== 'all') {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.condition === condition
                });
            }

            if (price) {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.price <= parseInt(price)
                });
            }

            return {
                ...state,
                filterProducts: tempFilterProduct,
            }

        case 'CLEAR_FILTER':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: '',
                    city: 'all',
                    province: 'all',
                    condition: 'all',
                    categoryName: 'all',
                    categoryType: 'all',
                    maxPrice: state.filters.maxPrice,
                    price: state.filters.maxPrice,
                    minPrice: 0,
                }
            }


        default:
            return state;

    }

}

export default FilterReducer;