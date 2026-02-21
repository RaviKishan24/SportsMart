import axios from "axios";
axios.defaults.withCredentials = true;
import { GET_ADMIN_REQUEST, GET_ADMIN_SUCCESS, GET_ADMIN_FAILURE, GET_USERS_REQUEST, GET_USERS_FAILURE, GET_USERS_SUCCESS } from "../constants/admin"


export const getAdminAction = () => async (dispatch) => {
    dispatch({ type: GET_ADMIN_REQUEST })
    try {
        const response = await axios.get("https://sportsmart-j5oj.onrender.com/Admin/getAdmin")
        if (response.data.success) {
            dispatch({ type: GET_ADMIN_SUCCESS, payload: response.data.data })
        }
        else {
            dispatch({ type: GET_ADMIN_FAILURE, payload: response.data.message })
        }

    } catch (error) {
        dispatch({ type: GET_ADMIN_FAILURE, payload: error.response?.data?.message })
    }

};


export const getUsersAction = () => async (dispatch) => {
    dispatch({ type: GET_USERS_REQUEST })
    try {
        const response = await axios.get("https://sportsmart-j5oj.onrender.com/admin/getUsers")
        if (response.data.success) {
            dispatch({ type: GET_USERS_SUCCESS, payload: response.data.data })
            console.log(" reponse customers is",response.data.data)
        }
        else {
            dispatch({ type: GET_USERS_FAILURE, payload: response.data.message })
        }

    } catch (error) {
        dispatch({ type: GET_USERS_FAILURE, payload: error.response?.data?.message })
    }

};