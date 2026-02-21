import { toast } from 'sonner';
import {
    ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE, FETCH_CART_PRODUCT_REQUEST, FETCH_CART_PRODUCT_SUCCESS,
    FETCH_CART_PRODUCT_FAILURE, ADD_TO_WISHLIST_REQUEST, ADD_TO_WISHLIST_FAILURE, ADD_TO_WISHLIST_SUCCESS,
    INCREASE_QUANTITY_REQUEST, INCREASE_QUANTITY_SUCCESS, INCREASE_QUANTITY_FAILURE,
    DECREASE_QUANTITY_REQUEST, DECREASE_QUANTITY_SUCCESS, DECREASE_QUANTITY_FAILURE,
    REMOVE_TO_CART_REQUEST,
    REMOVE_TO_CART_SUCCESS,
    REMOVE_TO_CART_FAILURE,
    FETCH_WISHLIST_PRODUCT_REQUEST,
    FETCH_WISHLIST_PRODUCT_SUCCESS,
    FETCH_WISHLIST_PRODUCT_FAILURE,
} from '../constants/cart'
import axios from "axios";
axios.defaults.withCredentials = true;


export const addtocartAction = (productId) => async (dispatch) => {
    console.log("Dispatched product ID:", productId);

    dispatch({ type: ADD_TO_CART_REQUEST })
    try {
        const response = await axios.get(`http://localhost:7000/Cart/addtocart/${productId}`);
        console.log("Backend Response:", response.data);

        if (response.data.success) {
            dispatch({ type: ADD_TO_CART_SUCCESS, payload: response.data.data })
            toast.success('Product added successfully in Cart!');

        }

        else {
            dispatch({ type: ADD_TO_CART_FAILURE, payload: response.data.message })
        }
    } catch (error) {
        dispatch({
            type: ADD_TO_CART_FAILURE,
            payload: error.response?.data?.message || error.message,
        })
    }
}

export const fetchcartproductAction = () => async (dispatch) => {
    dispatch({ type: FETCH_CART_PRODUCT_REQUEST })
    try {
        const response = await axios.get("http://localhost:7000/Cart/fetch-cartproducts")
        if (response.data.success) {
            dispatch({ type: FETCH_CART_PRODUCT_SUCCESS, payload: response.data.data })
        }
        else { dispatch({ type: FETCH_CART_PRODUCT_FAILURE, payload: response.data.message }) }
    } catch (error) {
        console.error("Error in fetchProductAction:", error);
        dispatch({ type: FETCH_CART_PRODUCT_FAILURE, payload: error.response?.data?.message })
    }
}

export const removeproductfromcartAction = (productId) => async (dispatch) => {
    console.log("dispached product id for remove from cart :", productId)
    dispatch({ type: REMOVE_TO_CART_REQUEST })
    try {
        const response = await axios.delete(`http://localhost:7000/Cart/remove-productfrom-cart/${productId}`)
        console.log("backend response product remove from cart", response.data)
        if (response.data.success) {
            dispatch({ type: REMOVE_TO_CART_SUCCESS, payload: response.data.data })
        }
        else { dispatch({ type: REMOVE_TO_CART_FAILURE, payload: response.data.message }) }

    } catch (error) {
        console.log("Product is not remove from cart due to error ", error)
        dispatch({ type: REMOVE_TO_CART_FAILURE, payload: error.response.data.message })

    }

}

export const togglewishlistAction = (productId) => async (dispatch) => {
    console.log("Dispatched wishlistproduct ID is:", productId);

    dispatch({ type: ADD_TO_WISHLIST_REQUEST })
    try {
        const response = await axios.patch(`http://localhost:7000/Cart/togglewishlist/${productId}`);
        console.log("Backend Response:", response.data);

        if (response.data.success) {
            dispatch({ type: ADD_TO_WISHLIST_SUCCESS, payload: response.data.data })

            if (response.data.message.includes("Prouduct added to wishlist ")) {
                toast.success("Product added to wishlist successfully!")
            } else if (response.data.message.includes("Product removed from wishlist")) {
                toast.success("Prouduct removed from wishlist!")
            }
        }
        else {
            dispatch({ type: ADD_TO_WISHLIST_FAILURE, payload: response.data.message })

        }
    } catch (error) {
        dispatch({
            type: ADD_TO_WISHLIST_FAILURE,
            payload: error.response?.data?.message || error.message,
        })
    }
}


export const fetchwishlistproductAction = () => async (dispatch) => {
    dispatch({ type: FETCH_WISHLIST_PRODUCT_REQUEST })
    try {
        const response = await axios.get("http://localhost:7000/Cart/fetch-wishlistproducts")
        if (response.data.success) {
            dispatch({ type: FETCH_WISHLIST_PRODUCT_SUCCESS, payload: response.data.data })
        }
        else { dispatch({ type: FETCH_WISHLIST_PRODUCT_FAILURE, payload: response.data.message }) }
    } catch (error) {

        dispatch({ type: FETCH_WISHLIST_PRODUCT_FAILURE, payload: error.response?.data?.message })
    }
}



export const increaseQuantityAction = (productId) => async (dispatch) => {
    console.log("Dispatched product ID is for increasequantity:", productId);

    dispatch({ type: INCREASE_QUANTITY_REQUEST })
    try {
        const response = await axios.put(`http://localhost:7000/Cart/increase-quantity/${productId}`);
        console.log("Backend Response data is :", response.data);

        if (response.data.success) {
            dispatch({ type: INCREASE_QUANTITY_SUCCESS, payload: { productId, quantity: response.data.quantity } })
        }
        else {
            dispatch({ type: INCREASE_QUANTITY_FAILURE, payload: response.data.message })
        }
    } catch (error) {
        dispatch({
            type: INCREASE_QUANTITY_FAILURE,
            payload: error.response?.data?.message || error.message,
        })
    }
}


export const decreaseQuantityAction = (productId) => async (dispatch) => {
    console.log("Dispatched product ID is for decreasequantity:", productId);

    dispatch({ type: DECREASE_QUANTITY_REQUEST })
    try {
        const response = await axios.put(`http://localhost:7000/Cart/decrease-quantity/${productId}`);
        console.log("Backend Response data is:", response.data);

        if (response.data.success) {
            dispatch({ type: DECREASE_QUANTITY_SUCCESS, payload: { productId, quantity: response.data.quantity } })
        }
        else {
            dispatch({ type: DECREASE_QUANTITY_FAILURE, payload: response.data.message })
        }
    } catch (error) {
        dispatch({
            type: DECREASE_QUANTITY_FAILURE,
            payload: error.response?.data?.message || error.message,
        })
    }
};




/*
momentum infotech,
promatics
flymedia 
auribises
technosus

Yeh kuch ludhiana ki companies hai Interview try kr lo 
vaise as a fresher thoda difficult phir bhi try krlo . And kisi ko batana mat maine tumko vahan jaane ke liye bola hai. 

*/