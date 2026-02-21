import React from 'react'
import { useState } from 'react';
import './Products.css'
import { Package, IndianRupee, Percent, Tag, Image, Star } from "lucide-react"
import AdminHome from './AdminNavbar';


function Products() {


    const [formData, setFormData] = useState({
        title: '',
        price: '',
        discount: '',
        category: '',
        thumbnail: '',
        ratings: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form submitted:', formData);
    };

    const categories = [
        'bat',
        'ball',
        'football',
        'chess',
        'carromboard',
        'trophy',
        'badminton',
        'volleyball'
    ];
    return (
        <div>
            <AdminHome></AdminHome>
            <div className="admin-container">
                <div className="admin-container">
                    <div className="header"><Package size={28} /><h1>ADDS NEW PRODUCTS</h1></div>
                    <form onSubmit={handleSubmit} className="product-form">
                        <div className="form-group"><label><Package size={18} /><span>Product Title</span></label><input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter product title" required /></div>
                        <div className="form-row">
                            <div className="form-group"><label><IndianRupee size={18} /><span>Price</span></label><input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0.00" min="0" step="0.01" required /></div>
                            <div className="form-group"><label><Percent size={18} /><span>Discount (%)</span></label><input type="number" name="discount" value={formData.discount} onChange={handleChange} placeholder="0" min="0" max="100" /></div>
                        </div>
                        <div className="form-group"><label><Tag size={18} /><span>Category</span></label><select name="category" value={formData.category} onChange={handleChange} required><option value="">Select a category</option>{categories.map(category => (<option key={category} value={category}>{category}</option>))}</select></div>
                        <div className="form-group"><label><Image size={18} /><span>Thumbnail URL</span></label><input type="url" name="thumbnail" value={formData.thumbnail} onChange={handleChange} placeholder="Enter image URL" required /></div>
                        <div className="form-group"><label><Star size={18} /><span>Ratings</span></label><input type="number" name="ratings" value={formData.ratings} onChange={handleChange} placeholder="0.0" min="0" max="5" step="0.1" /></div>
                        <button type="submit" className="submit-button">Add Product</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Products
