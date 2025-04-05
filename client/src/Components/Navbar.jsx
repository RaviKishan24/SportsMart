import './Navbar.css'
import logo from '../assets/logo/smlogo.png'
import { Link } from 'react-router-dom'
import {  useSelector } from 'react-redux'



function Navbar() {
  const user = useSelector((store) => store.userGS.user);
  let userdata;

  const getProfilePic = (imageURL) => {
    if (!imageURL) return "";


    return imageURL.replace(
      "/upload", "/upload/w_200,h_200,c_thumb,g_face"
    )
  };


  if (user && user) {
    userdata = (
      <Link className="icons user align-items-center" to={'/Account'}>
        <img src={getProfilePic(user.profilePic)} alt="" className='profilePic' />
        <p className='text-white text-center'>{user.name}</p>
      </Link>
    )
  }
  else {
    userdata = (
      <Link to="/Login" className='icons loginn'>
        <i className="icn fa-solid fa-user"></i>
        <p className='text-white'>Login</p>
      </Link>
    )
  }

  return (

    <nav className="navbar navbar-expand-lg Nav">
      <div className="container-fluid">
        <Link  to="/" className='d-flex  justify-content-center align-items-center'>
          <img src={logo} alt="" className='smlogo' />
          <h4>SPORTSMART</h4>
        </Link>
        <div className="search-container">
          <input type="text" className="search-bar" placeholder="Search Your Product Here...." />
          <i className="fas fa-search search-icon" />
        </div>
        <div className="Icons  mt-3   d-flex gap-5" >

          <Link className='icons cart' to={"/cart"}>
            <i className="icn fa-solid fa-cart-shopping" ></i>
            <p>Cart</p>
          </Link>
          {userdata}
        </div>

      </div>
    </nav>
  )
}

export default Navbar;
