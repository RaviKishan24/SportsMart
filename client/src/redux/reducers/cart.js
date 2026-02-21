import {
    ADD_TO_CART_REQUEST,
    ADD_TO_CART_SUCCESS,
    ADD_TO_CART_FAILURE,
    FETCH_CART_PRODUCT_REQUEST,
    FETCH_CART_PRODUCT_SUCCESS,
    FETCH_CART_PRODUCT_FAILURE,
    INCREASE_QUANTITY_REQUEST,
    INCREASE_QUANTITY_SUCCESS,
    INCREASE_QUANTITY_FAILURE,
    DECREASE_QUANTITY_REQUEST,
    DECREASE_QUANTITY_SUCCESS,
    DECREASE_QUANTITY_FAILURE,
    REMOVE_TO_CART_REQUEST,
    REMOVE_TO_CART_FAILURE,
    REMOVE_TO_CART_SUCCESS,
} from "../constants/cart";

const initialState = {
    data: [],
    success: "",
    failure: "",
    isLoading: false,
    error: null,
};


const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART_REQUEST:
        case FETCH_CART_PRODUCT_REQUEST:
        case INCREASE_QUANTITY_REQUEST:
        case DECREASE_QUANTITY_REQUEST:
        case REMOVE_TO_CART_REQUEST:
            return { ...state, isLoading: true, success: "", failure: "" };

        case ADD_TO_CART_SUCCESS:
            return { ...state, isLoading: false, success: "Product added successfully", data: action.payload };
        case FETCH_CART_PRODUCT_SUCCESS:
            return { ...state, isLoading: false, success: "Cart products fetched successfully", data: action.payload };
        case INCREASE_QUANTITY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: "Product quantity increased successfully",
                data: state.data.map((product) =>
                    product.productId === action.payload.productId
                        ? { ...product, quantity: action.payload.quantity }
                        : product
                ),
            };
        case DECREASE_QUANTITY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: "Product quantity decreased successfully",
                data: state.data.map((product) =>
                    product.productId === action.payload.productId
                        ? { ...product, quantity: action.payload.quantity }
                        : product
                ),
            };
        case REMOVE_TO_CART_SUCCESS:
            return { ...state, isLoading: false, success: "Product remove from cart successfuly", data: action.payload }

        case ADD_TO_CART_FAILURE:
        case FETCH_CART_PRODUCT_FAILURE:
        case INCREASE_QUANTITY_FAILURE:
        case DECREASE_QUANTITY_FAILURE:
        case REMOVE_TO_CART_FAILURE:
            return { ...state, isLoading: false, failure: action.payload, error: action.payload };
        default:
            return state;
    }
};



export default cartReducer;
