import React, { useEffect, useState } from 'react'
import './Account.css'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAction, logoutAction } from '../../redux/actions/user'
import Navbar from '../Navbar'
import Wishlist from './Wishlist'
import Address from './Address'
import Orders from './Orders'

import { useNavigate } from 'react-router'



function  Account () {
  const [activeSection, setActiveSection] = useState('profile');
  const [showLogoutModal, setShowLogoutModal] = useState(false); //logout modal state (hide)
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const user = useSelector((store) => store.userGS.user);

  const getProfilePic = (imageURL) => {
    if (!imageURL) return "";
    return imageURL.replace(
      "/upload", "/upload/w_200,h_200,c_thumb,g_face"
    )
  }


    const formattedDOB = new Date (user?.dob).toLocaleDateString("en-GB")
    
 

  const handleLogout = () => {
    dispatch(logoutAction(Navigate)); //call logout action
    setShowLogoutModal(false); // set logout action false(hide)
  }


  useEffect(() => {
    dispatch(getUserAction())
  }, [dispatch])

  return (
    <div>
      <Navbar></Navbar>
      <div className='side-bar  col-3 '>
        <ul>
          <li onClick={() => setActiveSection('profile')}><i className="fas fa-user-circle"></i>Profile</li>
          <li onClick={()=>setActiveSection('Orders')}><i className="fas fa-box-open"></i>Your Orders</li>
          <li onClick={() => setActiveSection('wishlist')}><i className="fas fa-heart"></i>Wishlist/Favorites</li>
          <li onClick={()=>setActiveSection('Address')}><i className="fas fa-map-marker-alt"></i>Addresses</li>
          <li onClick={() => setShowLogoutModal(true)}><i className="fas fa-sign-out-alt"></i>Logout</li>
        </ul>

      </div>
      <div className='col-9 main-display-area profile-main'>
        {activeSection === 'profile' && (
          <div className="user_data">
            <h4 className="text-center ">User Profile</h4>
            <img src={getProfilePic(user?.profilePic)} alt="profile" className='profilePIC' />
            <p>Name: {user?.name}</p>
            <p>Email ID: {user?.email}</p>
            <p>Mobile No: {user?.mobile}</p>
            <p>Date Of Birth: {formattedDOB}</p>
            <p>Gender: {user?.gender}</p>
            <button className="btn btn-danger">Edit Profile</button>
          </div>
        )}
        {activeSection === 'wishlist' && <Wishlist />}
        {activeSection === 'logout' && <Logout />}
        {activeSection==='Address' &&<Address/>}
        {activeSection==="Orders" && <Orders/>}

      </div>
      {showLogoutModal && (<div className='logout-main'>
        <div className='logout-content'>
          <p className='fw-bold '>Are you sure want to logout?</p>
          <div className='d-flex gap-4 mt-5'>
            <button className='btn btn-secondary ' onClick={() => setShowLogoutModal(false)}>Cancle</button>
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>)}
    </div>
  )
}

export default Account;
