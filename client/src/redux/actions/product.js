import { FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_FAILURE,} from "../constants/product"
import axios from "axios"
axios.defaults.withCredentials = true;
export const fetchProductAction = () => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCT_REQUEST });
    try {
        const response = await axios.get("https://sportsmart-j5oj.onrender.com/Product/fetch-allproduct");

        if (response.data.success) {
            dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: response.data.data })
        }
        else { dispatch({ type: FETCH_PRODUCT_FAILURE, payload: response.data.message }) }
    } catch (error) {
        dispatch({ type: FETCH_PRODUCT_FAILURE, payload: error.message })
    }

};

