import React from 'react'
import "./PlaceOrder.css"
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Navbar';
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router';
import {placeOrderAction} from "../../redux/actions/user"

import { FaMoneyBillWave, FaCreditCard, FaUniversity, FaMobileAlt } from "react-icons/fa";

function PlaceOrder() {
    const user = useSelector((state) => state.userGS.user) || [];
    const addressData = user?.address || [];


   const dispatch=useDispatch()
   const navigate=useNavigate()

    const placeOrder=()=>{
        dispatch(placeOrderAction(navigate))
    }



    return (
        <div>
            <Navbar></Navbar>
            <div className="place-order-main">
                <div className=' place-order-container'>
                    <div className="address-section">
                        <h3>Shipping Address</h3>
                        {addressData.map((address) => {
                            return (
                                <div key={address._id}>
                                    <p><strong>Name:</strong> {address.name}</p>
                                    <p><strong>Mobile:</strong> {address.mobile}</p>
                                    <p><strong>Email:</strong> {address.email}</p>
                                    <p><strong>House:</strong> {address.house}</p>
                                    <p><strong>Landmark:</strong> {address.landmark}</p>
                                    <p><strong>Pincode:</strong> {address.pincode}</p>
                                </div>

                            )
                        })}
                    </div>

                    <div className="payment-section">
                        <h2 className="title">Select Payment Method</h2>
                        <div className="options-container">
                            <label className="option">
                                <input type="radio" name="payment" />
                                <span className="circle"></span>
                                <FaMoneyBillWave className="icon cash" />
                                Cash on Delivery
                            </label>

                            <label className="option">
                                <input type="radio" name="payment" />
                                <span className="circle"></span>
                                <FaMobileAlt className="icon upi" />
                                UPI
                            </label>

                            <label className="option">
                                <input type="radio" name="payment" />
                                <span className="circle"></span>
                                <FaUniversity className="icon banking" />
                                Net Banking
                            </label>

                            <label className="option">
                                <input type="radio" name="payment" />
                                <span className="circle"></span>
                                <FaCreditCard className="icon card-option" />
                                Credit/Debit Cards
                            </label>
                        </div>
                    </div></div>
                <div className="place-order-button">
                    <Link to="/Cart">
                        <button className="cancel-btn">Cancel</button>
                    </Link>
                    <button className="place-order-btn" onClick={placeOrder} >Place Order</button>
                </div>

            </div>
        </div>

    )
}

export default PlaceOrder;
