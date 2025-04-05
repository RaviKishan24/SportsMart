import React, { useState } from 'react'
import { Link } from 'react-router'
import "./AdminNavbar.css"

function AdminNavbar() {
  const [isopen, setIsopen] = useState(false);
  const toggleMenu = () => {
    setIsopen(!isopen)
  };
  return (
    <div>
      <div>
        <div className="admin-navbar">
          <div className="logo">
            <Link to="/admin/home"> <h1 >SportsMart Admin</h1></Link>
          </div>
          <div className="menu-icon" onClick={toggleMenu}>
            {isopen ? '✖' : '☰'}
          </div>
          <ul className={`nav-links ${isopen ? 'open' : ''}`} >
            <li><Link to="/admin/home">Home</Link></li>
            <li><Link to="/admin/products">Products</Link></li>
            <li><Link to="/admin/orders">Orders</Link></li>
            <li><Link to="/admin/customers">Customers</Link></li>
            <li><Link to="/admin/reports">Reports</Link></li>
            <li><Link to="/admin/setting">Settings</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminNavbar
