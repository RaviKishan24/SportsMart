import { GET_ADMIN_REQUEST, GET_ADMIN_SUCCESS, GET_ADMIN_FAILURE, GET_USERS_REQUEST, GET_USERS_FAILURE, GET_USERS_SUCCESS } from "../constants/admin"



const adminInitialState = {
    admin: null,
    data: [],
    success: "",
    failure: "",
    isLoading: false,
    error: null
}

export const adminReducer = (state = adminInitialState, action) => {
    switch (action.type) {
        case GET_ADMIN_REQUEST:
        case GET_USERS_REQUEST:
            return {
                ...state,
                isLoading: true,
                success: "",
                failure: "",
            }


        case GET_ADMIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                admin: action.payload
            }
        case GET_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload
            }

        case GET_ADMIN_FAILURE:
        case GET_USERS_FAILURE:
            return {
                ...state,
                success: "",
                failure: action.payload,
                isLoading: false
            }
        default:
            return state;
    }
};