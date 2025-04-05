import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './passwordchange.css'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import { sendotpAction, updatepasswordAction, verifyOTPAction } from '../../redux/actions/user'
import { FaSpinner } from 'react-icons/fa'


function Passwordchange() {

  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')
  const [step, setStep] = useState(1); // To track the steps: 1 - Email, 2 - OTP, 3 - New Password


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector((state) => state.userGS.isLoading)
  const success = useSelector((state) => state.userGS.success)
  const failure = useSelector((state) => state.userGS.failure)


  const handleSendOTP = () => {
    if (!email) {
      toast.error("Please enter your email")
      return;
    }
    dispatch(sendotpAction(email))
  };

  const handleVerifyOTP = () => {
    if (!otp) {
      toast.error("OTP Is Required")
      return;
    }
    dispatch(verifyOTPAction(otp))
  }

  const handleChangePassword = () => {
    if (!password && !confirmpassword) {
      toast.error("Fill the Password and Confirm Password ")
      return
    }
    else if (!password) {
      toast.error("Fill the Password")
      return;
    } else if (!confirmpassword) {
      toast.error("Fill the Confirm Password")
      return;
    }
    if (password !== confirmpassword) {
      toast.error("password do not match");
      return;
    }
    dispatch(updatepasswordAction(password))
  }

  useEffect(() => {
    if (success==="OTP Sent Successfully") {
      setStep(2)
    }

    if(success==="OTP Verified Successfully"){
      setStep(3)
    }

    if(success==="Password Changed Successfully"){
      navigate('/login')
    }
  }, [success])

  useEffect(() => {
    if (failure) {
      toast.error(failure)
    }

  }, [failure])






  return (

    <div className='password-change-container '>
      {step === 1 && (
        <div className='password-change-form'>
          <h4 className='password-change-form-title text-center'>Enter your registered email</h4>
          <div className='d-flex  align-items-center'>
            <label htmlFor="email" className="password-change-lable">  <i className="fa fa-envelope"></i> </label>
            <input type="email " id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" className='password-change-input form-control' required />
          </div>
          <button className='password-change-sendotp-button ' onClick={handleSendOTP} >{isLoading ? <FaSpinner className="spin-loader" /> : "Send OTP"}</button>
        </div>
      )}

      {step === 2 && (
        <div className='password-change-form'>
          <h4 className='password-change-form-title text-center'>Enter the OTP</h4>
          <div className='d-flex align-items-center'>
            <label htmlFor="otp" className='password-change-lable'><i className="fas fa-keyboard"></i></label>
            <input type="text" id='otp' className='form-control password-change-input' value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter Your OTP" />
          </div>
          <button onClick={handleVerifyOTP} className='password-change-sendotp-button'>{isLoading ? <FaSpinner className="spin-loader" /> : "Verify OTP"}</button>
        </div>

      )}
      {step === 3 && (
        <div className='password-change-form'>
          <h4 className='text-center password-change-form-title'>Enter a new password</h4>

          <div className='d-flex  align-items-center'>
            <label htmlFor="password" className='password-change-lable'> <i class="fas fa-lock"></i></label>
            <input type="password" id='password' className='form-control password-change-input' value={password} onChange={(e) =>setPassword(e.target.value)} placeholder="New Password" />
          </div>
          <div className='d-flex align-items-center'>
            <label htmlFor="confirmpassword" className='password-change-lable'> <i class="fas fa-lock"></i></label>
            <input type="password" id='confirmpassword' className='form-control password-change-input' value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} placeholder="Confirm Password" />
          </div>
          <button onClick={handleChangePassword} className='password-change-sendotp-button' >{isLoading ? <FaSpinner className="spin-loader" /> : "Update Password"}</button>
        </div>
      )}



    </div>
  );
}

export default Passwordchange;



