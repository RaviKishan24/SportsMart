import {
    ADD_TO_WISHLIST_FAILURE, ADD_TO_WISHLIST_REQUEST, ADD_TO_WISHLIST_SUCCESS,
    FETCH_WISHLIST_PRODUCT_REQUEST, FETCH_WISHLIST_PRODUCT_SUCCESS, FETCH_CART_PRODUCT_FAILURE

} from "../constants/cart";
import {
    REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
    OTP_VERIFICATION_REQUEST, OTP_VERIFICATION_SUCCESS, OTP_VERIFICATION_FAILURE,
    LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, RESET_USER_FLAGS,
    VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE,
    UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAILURE,
    SEND_OTP_SUCCESS, SEND_OTP_FAILURE, SEND_OTP_REQUEST,
    LOGOUT_USER_REQUEST, LOGOUT_USER_FAILURE, LOGOUT_USER_SUCCESS,
    GET_USER_REQUEST, GET_USER_FAILURE, GET_USER_SUCCESS,
    ADD_ADDRESS_REQUEST, ADD_ADDRESS_SUCCESS, ADD_ADDRESS_FAILURE,
    GET_ADDRESS_REQUEST, GET_ADDRESS_FAILURE, GET_ADDRESS_SUCCESS,
    PLACE_ORDER_REQUEST, PLACE_ORDER_FAILURE, PLACE_ORDER_SUCCESS
} from "../constants/user";

const userInitialState = {
    user: null,
    success: "",
    failure: "",
    isLoading: false,
    error: null,
};


export const userReducer = (state = userInitialState, action) => {
    switch (action.type) {

        case REGISTER_USER_REQUEST:
        case OTP_VERIFICATION_REQUEST:
        case LOGIN_USER_REQUEST:
        case SEND_OTP_REQUEST:
        case VERIFY_OTP_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case LOGOUT_USER_REQUEST:
        case GET_USER_REQUEST:
        case ADD_ADDRESS_REQUEST:
        case GET_ADDRESS_REQUEST:
        case PLACE_ORDER_REQUEST:
        case ADD_TO_WISHLIST_REQUEST:
        case FETCH_WISHLIST_PRODUCT_REQUEST:

            return {
                ...state,
                isLoading: true,
                success: "", //clear
                failure: "", //clear
            };
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                success: "user register successfully",

            };
        case OTP_VERIFICATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: "OTP Verified Successfully",

            }

        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                success: "Login Successfull"
            };
        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: null,
                success: "Logout Successfull"

            }
        case SEND_OTP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: "OTP Sent Successfully"
            }

        case VERIFY_OTP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: "OTP Verified Successfully"
            }

        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                success: "Password Changed Successfully"
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload || {},
            }

        case ADD_ADDRESS_SUCCESS:
        case GET_ADDRESS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: {
                    ...state.user,
                    address: action.payload
                }
            }
        case PLACE_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: {
                    ...state.user,
                    orders: [...(state.user?.orders || []), action.payload]
                }
            }
        case ADD_TO_WISHLIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: {
                    ...state.user,
                    wishlist: action.payload,
                }
            }
        case FETCH_WISHLIST_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: {
                    ...state.user,
                    wishlist: action.payload
                }
            }


        case REGISTER_USER_FAILURE:
        case ADD_TO_WISHLIST_FAILURE:
        case OTP_VERIFICATION_FAILURE:
        case LOGIN_USER_FAILURE:
        case SEND_OTP_FAILURE:
        case VERIFY_OTP_FAILURE:
        case UPDATE_PASSWORD_FAILURE:
        case LOGOUT_USER_FAILURE:
        case GET_USER_FAILURE:
        case ADD_ADDRESS_FAILURE:
        case GET_ADDRESS_FAILURE:
        case PLACE_ORDER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                failure: action.payload,
            };

        case RESET_USER_FLAGS:
            return {
                ...state,
                success: "",
                failure: "",
                isLoading: false
            };
        default:
            return state;
    };


}