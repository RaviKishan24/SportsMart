import {
    REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
    OTP_VERIFICATION_REQUEST, OTP_VERIFICATION_SUCCESS, OTP_VERIFICATION_FAILURE,
    LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
    VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE,
    UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAILURE,
    SEND_OTP_REQUEST, SEND_OTP_SUCCESS, SEND_OTP_FAILURE,
    LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE, LOGOUT_USER_REQUEST,
    GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE,
    ADD_ADDRESS_REQUEST, ADD_ADDRESS_SUCCESS, ADD_ADDRESS_FAILURE,
    GET_ADDRESS_REQUEST, GET_ADDRESS_SUCCESS, GET_ADDRESS_FAILURE,
    PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS, PLACE_ORDER_FAILURE
} from '../constants/user';

import axios from "axios"
axios.defaults.withCredentials = true;
import { toast } from 'sonner';




export const registerUserAction = (formData, navigate) => async (dispatch) => {
    dispatch({ type: REGISTER_USER_REQUEST })
    try {
        const response = await axios.post("http://localhost:7000/Auth/SignUp", formData);
        if (response.data.success) {
            dispatch({ type: REGISTER_USER_SUCCESS, payload: response.data.data });
            navigate("/otp-verification")

        }
        else {
            dispatch({ type: REGISTER_USER_FAILURE, payload: response.data.message })
        }

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAILURE,
            payload: error.response?.data.message || error.message,
        })

    }

};


export const otpVerifiactionAction = (formData, navigate) => async (dispatch) => {
    dispatch({ type: OTP_VERIFICATION_REQUEST })
    try {
        const response = await axios.post("http://localhost:7000/Auth/otpVerification", formData);
        if (response.data.success) {
            dispatch({ type: OTP_VERIFICATION_SUCCESS, payload: response.data.data });
            navigate("/Login")
            toast.success('OTP verification Successfull');

        }
        else {
            dispatch({ type: OTP_VERIFICATION_FAILURE, payload: response.data.message })

        }

    } catch (error) {
        dispatch({
            type: OTP_VERIFICATION_FAILURE,
            payload: error.response?.data.message || error.response.data.message,
        })
    }
};


export const resendOtpAction = (email) => async (dispatch) => {
    dispatch({ type: NEW_OTP_GENERATE_REQUEST })
    try {
        const response = await axios.post("http://localhost:7000/Auth/resend-otp", { email });
        console.log("response is ", response)
        if (response.data.success) {
            dispatch({ type: NEW_OTP_GENERATE_SUCCESS, payload: response.data.data })
            toast.success("New OTP Sent Successfully")
            dispatch({ type: RESET_USER_FLAGS });
        }
        else {
            dispatch({ type: NEW_OTP_GENERATE_FAILURE, payload: response.data.message })
            toast.error('New OTP Generation Failed')
        }
    } catch (error) {
        dispatch({ type: NEW_OTP_GENERATE_FAILURE, payload: error.response?.data?.message || "Something went wrong, please try again." })
    }
};



export const LoginAction = (formData, navigate) => async (dispatch) => {
    dispatch({ type: LOGIN_USER_REQUEST })
    try {
        const response = await axios.post("http://localhost:7000/Auth/login", formData);
        if (response.data.success) {
            dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data.data });

            console.log(response.data.data.role)
            const data = response.data.data
            localStorage.setItem("role", data.role)
            navigate(data.role === "admin" ? "/admin/home" : "/")
        }
        else {
            dispatch({ type: LOGIN_USER_FAILURE, payload: response.data.message })
        }
    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAILURE,
            payload: error.response?.data?.message
        })
    }
};

    export const logoutAction = (navigate) => async (dispatch) => {
        dispatch({ type: LOGOUT_USER_REQUEST })
        try {
            const response = await axios.post("http://localhost:7000/Auth/logout");
            if (response.data.success) {
                dispatch({ type: LOGOUT_USER_SUCCESS, payload: response.data.data })
                toast.success(response.data.message)
                localStorage.removeItem('role')
                navigate('/')

            } else {
                dispatch({ type: LOGOUT_USER_FAILURE, payload: response.data.message })
            }
        } catch (error) {
            dispatch({
                type: LOGOUT_USER_FAILURE,
                payload: error.response?.data?.message
            })
        }

    }

export const sendotpAction = (email) => async (dispatch) => {
    dispatch({ type: SEND_OTP_REQUEST })
    try {
        const response = await axios.post("http://localhost:7000/Auth/password-Change", { email })
        console.log("Received response", response);
        if (response.data.success) {
            dispatch({ type: SEND_OTP_SUCCESS, payload: response.data.data })
            toast.success("OTP has sent successfully")
        }
        else {
            dispatch({ type: SEND_OTP_FAILURE, payload: response.data.message })

        }
    } catch (error) {
        console.error("error:", error);
        dispatch({ type: SEND_OTP_FAILURE, payload: error.response.data.message })
    }

};
export const verifyOTPAction = (otp) => async (dispatch) => {
    dispatch({ type: VERIFY_OTP_REQUEST })

    try {
        const response = await axios.post("http://localhost:7000/Auth/otp-verify", { otp })

        if (response.data.success) {
            dispatch({ type: VERIFY_OTP_SUCCESS, payload: response.data.data })
            toast.success("OTP Verified Successfully")
        }
        else {
            dispatch({ type: VERIFY_OTP_FAILURE, payload: response.data.message })
        }
    } catch (error) {
        dispatch({ type: VERIFY_OTP_FAILURE, payload: error.response.data.message })
    }

}


export const updatepasswordAction = (password) => async (dispatch) => {
    dispatch({ type: UPDATE_PASSWORD_REQUEST })

    try {
        const response = await axios.patch("http://localhost:7000/Auth/update-password", { password })
        console.log(response)
        if (response.data.success) {
            dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: response.data.data })
            toast.success("Password Changed Successfully")
        }
        else {
            dispatch({ type: UPDATE_PASSWORD_FAILURE, payload: response.data.message })
        }
    } catch (error) {
        dispatch({ type: UPDATE_PASSWORD_FAILURE, payload: error.response?.data?.message })
    }

};

export const getUserAction = () => async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST })
    try {
        const response = await axios.get("http://localhost:7000/Auth/getuser")
        if (response.data.success) {
            dispatch({ type: GET_USER_SUCCESS, payload: response.data.data })
        }
    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error.response?.data?.message });
    }
};

export const addAddressAction = (formData) => async (dispatch) => {
    dispatch({ type: ADD_ADDRESS_REQUEST })
    try {
        const response = await axios.post("http://localhost:7000/Auth/addAddress", formData)
        if (response.data.success) {
            dispatch({ type: ADD_ADDRESS_SUCCESS, payload: response.data.data })
            toast.success(response.data.data)
        }
        else { dispatch({ type: ADD_ADDRESS_FAILURE, payload: response.data.message }) }
    } catch (error) {
        dispatch({ type: ADD_ADDRESS_FAILURE, payload: error.response?.data?.message })
    }

}

export const getAddressAction = () => async (dispatch) => {
    dispatch({ type: GET_ADDRESS_REQUEST })
    try {
        const response = await axios.get("http://localhost:7000/Auth/getAddress")
        if (response.data.success) {
            dispatch({ type: GET_ADDRESS_SUCCESS, payload: response.data.data })
        } else {
            dispatch({ type: GET_ADDRESS_FAILURE, payload: response.data.message })
        }
    } catch (error) {
        dispatch({ type: GET_ADDRESS_FAILURE, payload: error?.response?.data.message || "failed to fetch address" })
    }
}

export const placeOrderAction = (navigate) => async (dispatch) => {
    
    dispatch({ type: PLACE_ORDER_REQUEST });
    try {
        const response = await axios.post("http://localhost:7000/orders");
       


        if (response.data.success) {
            dispatch({ type: PLACE_ORDER_SUCCESS, payload: response.data.order})
            toast.success("Product Placed Successfully")
            navigate("/")
        }
        else {
            dispatch({ type: PLACE_ORDER_FAILURE, payload: response.data.message })  
            toast.error(response.message)   
           
        }
    } catch (error) {
        dispatch({
            type: PLACE_ORDER_FAILURE,
            payload: error.response?.data?.message || error.message,
        })
    }

}

