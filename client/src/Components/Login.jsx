import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import './Login.css'
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from '../redux/actions/user';
import { toast } from 'sonner';
import { RESET_USER_FLAGS } from '../redux/constants/user';
import { FaSpinner } from 'react-icons/fa'

function Login() {
  const [showpassword, setShowpassword] = useState(false);
  const handleshowpassword = () => {
    setShowpassword((prevState) => !prevState)
  }
  const isLoading = useSelector((store) => store.userGS.isLoading)
  const success = useSelector((store) => store.userGS.success)
  const failure = useSelector((store) => store.userGS.failure)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handlesubmit = async (e) => {
    e.preventDefault();
    dispatch(LoginAction({ email, password }, navigate))

  }
  useEffect(() => {
    if (success === "Login Successfull") {
      toast.success('Login Successfully')
      dispatch({ type: RESET_USER_FLAGS })
    }
    if (failure) {
      toast.error(failure)
      dispatch({ type: RESET_USER_FLAGS })
    }
  }, [success, failure, dispatch, toast])

  useEffect(() => {
    return () => {
      dispatch({ type: RESET_USER_FLAGS })
    }
  }, [dispatch])
  return (

    <div className='register-main'>
      <div className='container login-form '> 
        <h2 className='text-center'>Login</h2>
        <h1 className='text-center'>Welcome Back</h1>
        <form onSubmit={handlesubmit} >
          <div className=" d-flex form-item align-items-center">
            <label htmlFor="formGroupExampleInput" className="form-label lable-logos"><i className="fa fa-envelope"></i></label>
            <input type="email" className="form-control" id="formGroupExampleInput" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className=" d-flex  align-items-center  mt-3 ">
            <label htmlFor="password" className="lable-logos"><i className="fa fa-lock"></i></label>
            <input type={showpassword ? "text" : "password"} id="password" className="form-control" autoComplete='username' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="d-flex justify-content-end">
            <Link className="fw-medium text-dark cursor-pointer" to="/changepassword" >Forgotten your password?</Link>
          </div>

         
          <div className="show-password mx-2">
            <input type="checkbox" id='Password' checked={showpassword} onChange={handleshowpassword} />
            <label htmlFor="Password">Show Password</label>
          </div>
      
          <button className='btn-signup  mt-3' type='submit' disabled={isLoading} >  {isLoading ? <FaSpinner className="spin-loader" /> : "Login"}</button>
        </form>
        <div className=' text-secondary mt-2 text-center '>
          Don't have an account?
          <Link to="/Register" className='fw-medimum   mx-2 text-decoration-underline text-danger-emphasis'>Register</Link>
        </div>
        <div>
          <p className='text-center'>or SignUp via</p>
          <div className='d-flex gap-3'>
            <button className='orsignup google-btn d-flex align-items-center justify-content-center gap-2 border '>
              <i className="fa-brands fa-google " />
              <p className='mb-0'>Google</p>
            </button>
            <button className='orsignup facebook-btn d-flex align-items-center justify-content-center gap-2 border '>
              <i className='fa-brands fa-facebook' />
              <p className='mb-0'>facebook</p>
            </button>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Login

