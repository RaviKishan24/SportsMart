import React from 'react'
import AdminHome from './AdminNavbar'
import { useDispatch, useSelector } from "react-redux"
import { logoutAction } from "../../redux/actions/user"
import { useNavigate } from 'react-router'

function Setting() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logout = () => {
        dispatch(logoutAction())
        navigate("/")
    }
    const admin = useSelector((state) => state.adminGS.admin)
    return (
        <div>
            <AdminHome />
            <h2 className=" text-center">Settings</h2>

            <div className="card p-5">

                <div className=''>
                    <div className="mb-4">
                        <h5>User Profile</h5>
                        <p>Name: {admin?.name}</p>
                        <p>Email: {admin?.email}</p>
                        <p>Role: {admin?.role}</p>
                    </div>
                    <div className="d-flex gap-3">
                        <button className="btn btn-secondary">Cancel</button>
                        <button className="btn btn-danger" onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Setting
