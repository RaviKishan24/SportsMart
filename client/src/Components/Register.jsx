import React, { useState, useEffect, useRef } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUserAction } from '../redux/actions/user'
import { toast } from 'sonner'
import { RESET_USER_FLAGS } from '../redux/constants/user'
import { FaSpinner } from "react-icons/fa"; // Import spinner icon
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const cloudinaryRef = useRef();
  const WidgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    WidgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: 'dz1q2cvvc',
      uploadPreset: 'iwhry85z',
    }, function (error, result) {
      if (!error && result && result.event === "success") {
        if (result.info && result.info.url) {
          setProfilePic(result.info.secure_url);
        }
      }
    })
    
  }, []);


  const dispatch = useDispatch();
  const navigate = useNavigate()

  const isLoading = useSelector((state) => state.userGS.isLoading)
  const success = useSelector((state) => state.userGS.success)
  const failure = useSelector((state) => state.userGS.failure)


  const dobRef = useRef(null);
  const handleclick = () => {
    if (dobRef.current) {
      dobRef.current.showPicker();
    }
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error('Password does not match!')
      return;
    }
    localStorage.setItem('email', email)

    const otpExpirationTime = new Date().getTime() + 5 * 60 * 1000;
    localStorage.setItem('otpExpirationTime', otpExpirationTime);
    dispatch(registerUserAction({ name, email, mobile: Number(mobile), password, dob, gender, profilePic }, navigate));


  }
  const [showpassword, setShowpassword] = useState(false)
  const handleshowpassword = () => {
    setShowpassword((prevState) => !prevState)
  }
  useEffect(() => {

    if (success) {
      toast.success('Registration Successful!');
      dispatch({ type: RESET_USER_FLAGS })
    }

    if (failure) {
      toast.error(failure);
      dispatch({ type: RESET_USER_FLAGS })
    }
    // Ensure loading resets when component mounts
    return () => {
      dispatch({ type: RESET_USER_FLAGS });
    };

  }, [success, failure, dispatch]);


  return (

    <div className='register-main'>
      <div className='container signin-form '>
        <h2 className='text-center text-dark'>Create Account</h2>
        <p className='text-center' >Get Started with your free account</p>
        <form onSubmit={handlesubmit}>
          <div className="form-item   d-flex   align-items-center ">
            <label htmlFor="first-name" className="form-label   lable-logos ">   <i className="fa fa-user"></i></label>
            <input type="text" className="form-control " id='first-name' placeholder="Full Name" aria-label=" name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className=" d-flex form-item align-items-center">
            <label htmlFor="formGroupExampleInput" className="form-label lable-logos"><i className="fa fa-envelope"></i></label>
            <input type="email" className="form-control" id="formGroupExampleInput" placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="d-flex form-item align-items-center">
            <label htmlFor="formGroupExampleInput2" className="form-label lable-logos"><i className="fa fa-phone"></i></label>
            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter Your Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} pattern='[0-9]{10}' maxLength={10} required />
          </div>

          <div className='d-flex align-items-center gap-1'>

            <div className="d-flex align-items-center mx-1 dob">
              <label htmlFor="dob" className="form-label lable-logos" onClick={handleclick}>
                <i className="fa fa-calendar"></i>
              </label>
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} onClick={handleclick} required id='dob' ref={dobRef} className='form-control' />
            </div>


            <div className='d-flex align-items-center gender gap-1'>
              <label htmlFor="gender" className="form-label lable-logos">
                <i className="fa fa-venus-mars"></i>
              </label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} required className='form-control' id='gender'>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

          </div>

          <div className='d-flex ' onClick={() => WidgetRef.current.open()} >
            <label htmlFor="profilePic" className="form-label lable-logos">  <i className="fa fa-camera"></i>  </label>
            <div className='d-flex form-item align-items-center profile-upload' id='profilePic' onClick={() => WidgetRef.current.open()} >Upload profilePic</div>
          </div>



          <div >
            <div className=" d-flex  align-items-center  ">
              <label htmlFor="inputPassword6" className="lable-logos"><i className="fa fa-lock"></i></label>
              <div className=' d-flex gap-2'>

                <input type={showpassword ? "text" : "password"} id="inputPassword6" className="form-control" aria-describedby="passwordHelpInline" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type={showpassword ? "text" : "password"} id="inputPassword4" className="form-control" aria-describedby="passwordHelpInline" placeholder='Confirm Password' value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} />
              </div>
            </div>
            <div className="show-password mt-1 mx-2 gap-4">
              <input type="checkbox" id='Password' checked={showpassword} onChange={handleshowpassword} />
              <label htmlFor="Password">Show Password</label>
            </div>
          </div>
          <button className='btn-signup mt-2' type='submit' disabled={isLoading} >  {isLoading ? <FaSpinner className="spin-loader" /> : "Create Account"}</button>
        </form>
        <div className=' text-secondary mt-2 text-center '>
          have an account?
          <Link to="/Login" className='fw-medimum   mx-2 text-decoration-underline text-danger-emphasis'>Login</Link>
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
  );
}


export default Register;
