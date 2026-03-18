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
      <div className='container signin-form'>

        <h2 className='form-title'>Create Account</h2>
        <p className='form-subtitle'>Get started with your free account</p>

        <form onSubmit={handlesubmit}>

          {/* NAME */}
          <div className="form-item d-flex align-items-center">
            <label className=" lable-logos">
              <i className="fa fa-user"></i>
            </label>
            <input type="text" className="form-control" placeholder="Full Name"
              value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          {/* EMAIL */}
          <div className="form-item d-flex align-items-center">
            <label className=" lable-logos">
              <i className="fa fa-envelope"></i>
            </label>
            <input type="email" className="form-control" placeholder="Enter Your Email"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          {/* MOBILE */}
          <div className="form-item d-flex align-items-center">
            <label className="lable-logos">
              <i className="fa fa-phone"></i>
            </label>
            <input type="text" className="form-control" placeholder="Mobile Number"
              value={mobile} onChange={(e) => setMobile(e.target.value)}
              pattern='[0-9]{10}' maxLength={10} required />
          </div>

          {/* DOB + GENDER */}
          <div className='d-flex gap-2 flex-wrap'>

            <div className="d-flex align-items-center dob">
              <label className=" lable-logos" onClick={handleclick}>
                <i className="fa fa-calendar"></i>
              </label>
              <input type="date" className='form-control'
                value={dob} onChange={(e) => setDob(e.target.value)}
                ref={dobRef} required />
            </div>

            <div className='d-flex align-items-center gender'>
              <label className=" lable-logos">
                <i className="fa fa-venus-mars"></i>
              </label>
              <select className='form-control'
                value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

          </div>

          {/* PROFILE */}
          <div className='d-flex align-items-center profile-wrapper'
            onClick={() => WidgetRef.current.open()}>
            <label className=" lable-logos">
              <i className="fa fa-camera"></i>
            </label>
            <div className='profile-upload'>Upload Profile Image</div>
          </div>

          {/* PASSWORD */}
          <div>
            <div className="d-flex align-items-center">
              <label className="lable-logos">
                <i className="fa fa-lock"></i>
              </label>

              <div className='d-flex gap-2 w-100 password-group'>
                <input type={showpassword ? "text" : "password"}
                  className="form-control"
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />

                <input type={showpassword ? "text" : "password"}
                  className="form-control"
                  placeholder='Confirm password'
                  value={confirmpassword}
                  onChange={(e) => setConfirmpassword(e.target.value)} />
              </div>
            </div>

            <div className="show-password">
              <input type="checkbox" checked={showpassword} onChange={handleshowpassword} />
              <label>Show Password</label>
            </div>
          </div>

          {/* BUTTON */}
          <button className='btn-signup' type='submit' disabled={isLoading}>
            {isLoading ? <FaSpinner className="spin-loader" /> : "Create Account"}
          </button>

        </form>

        {/* LOGIN */}
        <div className='text-center login-link'>
          Already have an account?
          <Link to="/Login">Login</Link>
        </div>

      </div>
    </div>
  );
}


export default Register;
