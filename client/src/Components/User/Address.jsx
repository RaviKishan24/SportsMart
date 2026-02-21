import React, { useEffect, useState } from 'react'
import "./Address.css"
import { addAddressAction, getAddressAction } from "../../redux/actions/user"
import { useDispatch, useSelector } from "react-redux"
import { FaSpinner } from 'react-icons/fa'

function Address() {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.userGS.isLoading)
    const failure = useSelector((state) => state.userGS.failure)
    const user = useSelector((state) => state.userGS.user)

    const [address, setAddress] = useState(null) // Initially no address
 

    const [showForm, setShowForm] = useState(false); // Controls form visibility
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        house: "",
        landmark: "",
        pincode: "",
    });

    useEffect(() => {   
        dispatch(getAddressAction())
    }, [dispatch])

    useEffect(() => {
        if (user && user.address) {
            setAddress(user.address[0]);
        }
    }, [user])


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addAddressAction(formData));
        setShowForm(false);
    }




    return (
        <div className='address-main'>
            {!showForm ? (
                <>

                    <div className='address-data'>
                        <h3 className='text-center'>Your Address </h3>
                        {address ? (
                            <>
                                <p className="address"><strong>Full Name:</strong> {address.name}</p>
                                <p className="address"><strong>Phone Number:</strong> {address.mobile}</p>
                                <p className="address"><strong>Email:</strong> {address.email}</p>
                                <p className="address"><strong>House/Flat & Street:</strong> {address.house}</p>
                                <p className="address"><strong>Landmark:</strong> {address.landmark || "N/A"}</p>
                                <p className="address"><strong>Pincode:</strong> {address.pincode}</p>
                            </>
                        ) : (
                            <p className='empty-address'>No Address found.Please add a address.</p>
                        )}
                        <button className='add-address-btn' onClick={() => setShowForm(true)}> {address ? "Edit Address" : "Add Address"}</button>
                    </div>
                </>
            ) : (
                <div className='address-form-overlay'>
                    <div className='address-form'>
                        <h3 className=''>{address ? "Edit Address" : "Add new Address"}</h3>
                        <form onSubmit={handleSubmit} >
                            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                            <input type="text" name="mobile" placeholder="Phone Number" value={formData.mobile} onChange={handleChange} required />
                            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                            <input type="text" name="house" placeholder="House/Flat & Street" value={formData.house} onChange={handleChange} required />
                            <input type="text" name="landmark" placeholder="Landmark (Optional)" value={formData.landmark} onChange={handleChange} />
                            <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} required />
                            <div className='d-flex gap-5'>
                                <button type="button" className="cancel-btn bg-danger " onClick={() => setShowForm(false)}>Cancel</button>
                                <button type="submit" className='bg-success'>Add Address</button>

                            </div>
                        </form>

                    </div>

                </div>
            )
            }



        </div >
    )
}

export default Address
