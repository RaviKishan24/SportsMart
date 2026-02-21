import {
    FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_FAILURE,
    SEARCH_PRODUCT_REQUEST,
    SEARCH_PRODUCT_SUCCESS,
    SEARCH_PRODUCT_FAILURE,
   
} from "../constants/product";

const initialstate = {
    success: "",
    failure: "",
    loading: false,
    data: [],
    error: null,
    searchResults: [],


};

export const productReducer = (state = initialstate, action) => {
    switch (action.type) {
      
        case FETCH_PRODUCT_REQUEST:
           
            return {
                ...state,
                loading: true,
            }
        case FETCH_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            }
        case FETCH_PRODUCT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
  case SEARCH_PRODUCT_REQUEST:
    return{
        ...state,
        loading: true,
        error: null,
    }
    case SEARCH_PRODUCT_SUCCESS:
        return{
            ...state,
        loading: false,
        searchResults: action.payload,
        }
    case SEARCH_PRODUCT_FAILURE:
        return{
            ...state,
        loading: false,
        error: action.payload,
        }
        default:
            return state;



    };
}
