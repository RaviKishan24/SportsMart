import React, { useState, useEffect } from 'react'
import './Otpverification.css'
import { useDispatch, useSelector } from 'react-redux';
import { otpVerifiactionAction, resendOtpAction } from "../redux/actions/user"
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { RESET_USER_FLAGS } from '../redux/constants/user';
import { FaSpinner } from 'react-icons/fa'



function OtpVerification() {

    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(0);
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const isLoading = useSelector((store) => store.userGS.isLoading)
    const success = useSelector((store) => store.userGS.success)
    const failure = useSelector((store) => store.userGS.failure)

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        console.log("Stored Email:", storedEmail);
        if (storedEmail) setEmail(storedEmail)
    }, []);
    // ✅ OTP Timer Logic (Prevent Unnecessary Updates)
    useEffect(() => {
        const otpExpirationTime = localStorage.getItem('otpExpirationTime');
        if (otpExpirationTime) {
            const remainingTime = Math.floor((otpExpirationTime - Date.now()) / 1000);
            setTimer(remainingTime > 0 ? remainingTime : 0)
        }

        const interval = setInterval(() => {
            const otpExpirationTime = localStorage.getItem('otpExpirationTime');
            if (otpExpirationTime) {
                const timeRemaining = Math.floor((otpExpirationTime - Date.now()) / 1000);
                setTimer(timeRemaining > 0 ? timeRemaining : 0);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);



    const resendOtp = () => {

        if (timer > 0) return; // Prevent resending before time expire
        console.log("Email before dispatch:", email); // Debugging
        dispatch(resendOtpAction(email));

        // Reset OTP expiration time for 5 minutes
        const newExpirationTime = new Date().getTime() + 5 * 60 * 1000;
        localStorage.setItem('otpExpirationTime', newExpirationTime);
        setTimer(300);
    }


    const handlesubmit = async (e) => {
        e.preventDefault();
        if (!otp) {
            toast.error('Please enter  an otp');
            return;
        }

        dispatch(otpVerifiactionAction({ email, otp: Number(otp) },navigate));

    }
    useEffect(() => {
        return () => {
            dispatch({ type: RESET_USER_FLAGS });
        };
    }, [dispatch]);

    if(failure){
        toast.error(failure)
        dispatch({type:RESET_USER_FLAGS})
    }



    return (
        <div className='otp-main '>

            <form className='border otp ' onSubmit={handlesubmit} >
                <h4 className='text-center '>Account Verification</h4>
                <label htmlFor="otp" className="form-label text-center" >Enter Your OTP</label>
                <input type="text" className="form-control" id="otp" value={otp} onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value) && value.length <= 4) {
                        setOtp(value);
                    }
                }} maxLength={4}></input>

                <p className='text-dark  resend-otp my-1' onClick={resendOtp}>{timer > 0 ?
                    `Resend OTP in ${Math.floor(timer / 60)} : ${String(timer % 60).padStart(2, '0')}` : "Send OTP Again"}

                </p>


                <button type="submit" className="btn btn-danger my-5">{isLoading ? <FaSpinner className='spin-loader' /> : "Submit"}</button>
            </form>

        </div>
    )
}

export default OtpVerification;
