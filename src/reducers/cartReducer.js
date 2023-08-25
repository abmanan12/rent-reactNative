const cartReducer = (state, { type, payload }) => {

    if (type === 'ADD_TO_CART') {

        let cartData = payload;

        return {
            ...state,
            cart: cartData,
            error: true
        }


    }


    if (type === 'REMOVE_ITEM') {

        let updateCart = state?.cart.filter((curElem) => {
            return curElem.productId !== payload
        })

        return {
            ...state,
            cart: updateCart
        }
    }


    if (type === 'CLEAR_CART') {
        return {
            cart: []
        }
    }

    return state;

}

export default cartReducer
