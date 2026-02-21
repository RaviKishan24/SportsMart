import React, { useEffect } from 'react'
import AdminNavbar from './AdminNavbar'
import { Package, Users, ShoppingCart, BarChart, Bell, Settings, LogOut, Percent, Tag, Star, Image, IndianRupee } from "lucide-react"
import { useDispatch, useSelector } from 'react-redux'
import { getAdminAction, getUsersAction } from '../../redux/actions/admin'
import { fetchProductAction } from '../../redux/actions/product'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router'


function AdminHome() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsersAction())
        dispatch(getAdminAction())
        dispatch(fetchProductAction())

    }, [dispatch])


    const navigate = useNavigate()
    const logout = () => {
        dispatch(logoutAction())
        navigate("/")
    }

    const admin = useSelector((state) => state.adminGS.admin)

    const users = useSelector((state) => state.adminGS.data)
    const products = useSelector((state) => state.productGS.data)
    console.log("users is", users)


    const calculatetotalRevenue = () => {
        if (!users) return 0;
        let totalrevenue = 0
        users.forEach((user) => {
            if (user?.orders && Array.isArray(user.orders)) {
                user.orders.forEach((order) => {
                    totalrevenue += order.totalAmount
                });
            }
        });
        return totalrevenue;
    }

    const calculatetotalorder = () => {
        if (!users) return 0;
        let totalorders = 0;
        users.forEach((user) => {
            if (user.orders && Array.isArray(user.orders)) {
                totalorders += user.orders.length;
            }
        })
        return totalorders;
    }

    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();


    return (
        <div>
            <AdminNavbar></AdminNavbar>
            <div className="admin-dashboard">

                <div className="welcome-panel">
                    <h2>Welcome, {admin?.name} </h2>
                    <p>Date: {currentDate} | Time: {currentTime}</p>
                    <p>Total Orders Today: 150 | Revenue: ₹50,000</p>
                </div>


                <div className="metrics">
                    <div className="metric-card"><Package size={24} /><p>Total Products: {products ? products.length : 0}</p></div>
                    <div className="metric-card"><ShoppingCart size={24} /><p>Total Orders: {calculatetotalorder().toLocaleString()}</p></div>
                    <div className="metric-card"><Users size={24} /><p>Total Users:{users ? users.length : 0}</p></div>
                    <div className="metric-card"><BarChart size={24} /><p> Revenue: ₹{calculatetotalRevenue().toLocaleString()}</p></div>
                </div>
                <div className="recent-activities">
                    <h3>Recent Orders</h3>
                    <ul>
                        <li>Order #12345 - John Doe - ₹2,000 - Delivered</li>
                        <li>Order #12346 - Jane Smith - ₹1,500 - Pending</li>
                    </ul>
                </div>


                <div className="quick-actions">
                    <Link to={'/admin/products'}>   <button><Package size={18} /> Add New Product</button></Link>
                    <button><Tag size={18} /> Manage Categories</button>
                    <button><ShoppingCart size={18} /> Manage Orders</button>
                    <button><BarChart size={18} /> View Sales Report</button>
                </div>


                <div className="stock-alerts">
                    <p><strong>Low Stock:</strong> Nike Football Shoes - Only 5 left!</p>
                </div>
             
            </div>
        </div>
    )
}

export default AdminHome;
