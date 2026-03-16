

import './Navbar.css'
import logo from '../assets/logo/smlogo.png'
import { Link, useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { useState } from 'react';




function Navbar() {
  const user = useSelector((store) => store.userGS.user);
  let userdata;
  const routes = {
    bat: "/bat",
    ball: "/ball",
    carromboard: "/carromboard",
    badminton: "/badminton",
    basketball: "/basket",
    vollyball: "/volly",
    tabletennis: "/table",
    chess: "/chess",
    football: "/football"
  };
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSearch = () => {
    const key = searchTerm.trim().toLowerCase();

    if (routes[key]) {
      navigate(routes[key]);
    } else {
      alert("No product found!");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };


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
        <Link to="/" className='d-flex  justify-content-center align-items-center'>
          <img src={logo} alt="" className='smlogo' />
          <h4>SPORTSMART</h4>
        </Link>
        <div className="search-container">
          <input type="text" className="search-bar" placeholder="Search Your Product Here...."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <i className="fas fa-search search-icon" onClick={handleSearch} />
          {/*     
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
    
          {searchResults.length > 0 && (
            <ul>
              {searchResults.map((product) => (
                <li key={product._id}>{product.title}</li>
              ))}
            </ul>
          )} */}



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