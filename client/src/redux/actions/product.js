import { FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_FAILURE, SEARCH_PRODUCT_REQUEST, SEARCH_PRODUCT_SUCCESS, SEARCH_PRODUCT_FAILURE,} from "../constants/product"
import axios from "axios"
axios.defaults.withCredentials = true;
export const fetchProductAction = () => async (dispatch) => {
    dispatch({ type: FETCH_PRODUCT_REQUEST });
    try {
        const response = await axios.get("https://sportsmart-ag6m.onrender.com/Product/fetch-allproduct");

        if (response.data.success) {
            dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: response.data.data })
        }
        else { dispatch({ type: FETCH_PRODUCT_FAILURE, payload: response.data.message }) }
    } catch (error) {
        dispatch({ type: FETCH_PRODUCT_FAILURE, payload: error.message })
    }

};

  
  // 🔍 New search action
  export const searchProductAction = (keyword) => async (dispatch) => {
    dispatch({ type: SEARCH_PRODUCT_REQUEST});
    try {
      const response = await axios.get("https://sportsmart-ag6m.onrender.com/Product/search", {
        keyword,
      });
  
      if (response.data.success) {
        dispatch({ type: SEARCH_PRODUCT_SUCCESS, payload: response.data.data });
      } else {
        dispatch({ type: SEARCH_PRODUCT_FAILURE, payload: response.data.message });
      }
    } catch (error) {
      dispatch({ type: SEARCH_PRODUCT_FAILURE, payload: error.message });
    }
  }

