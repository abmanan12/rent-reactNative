const ProductReducer = (state, action) => {

    switch (action.type) {

        case 'SET_DATA':

            let recentItems = [...action.payload].sort((a, b) => a.uploadTime - b.uploadTime)
            let limitedRecentItems = recentItems?.slice(0, 4);


            return {
                ...state,
                products: action.payload,
                recentProducts: limitedRecentItems
            }

        case 'SET_ERROR':
            return {
                ...state,
                isError: true
            }

        default:
            return state;
    }

}

export default ProductReducer; 