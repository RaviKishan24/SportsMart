import React from 'react';
import './Footer.css';
import { Link} from "react-router-dom"
import appstore from '../assets/cnn/appstore.png';
import googleplay from '../assets/cnn/googleplay.png';

function Footer() {
    return (
        <div className="footer-container">
            <div className="footer-section footer-logo-section">
                <div className="footer-logo">SPORTSMART</div>
                <div className="footer-download-links">
                    <img className="footer-download-icon" src={appstore} alt="App Store" />
                    <img className="footer-download-icon" src={googleplay} alt="Google Play" />
                </div>
            </div>
            <div className="footer-section">
                <h4 className="footer-title">ABOUT US</h4>
                <ul className="footer-list">
                    <li className="footer-item"><Link to="/our-story">Our Story</Link></li>
                    <li className="footer-item"><Link to="/term">Terms Of Use</Link></li>
                    <li className="footer-item"><Link to="/privacy">Privacy Policy</Link></li>
                    <li className="footer-item"><Link to="/return">Returns & Exchanges</Link></li>
                    <li className="footer-item"><Link to="/shipping">Shipping Policy</Link></li>
                </ul>
            </div>
            <div className="footer-section">
                <h4 className="footer-title">TOP BRANDS</h4>
                <ul className="footer-list">
                    <li className="footer-item"><Link to="/pumas">Puma</Link></li>
                    <li className="footer-item"><Link to="/addidas">Adidas</Link></li>
                    {/* <li className="footer-item"><Link to="/our-story">Our Story</Link></li> */}
                    <li className="footer-item"><Link to="/nike">Nike</Link></li>
                </ul>
            </div>
            <div className="footer-section">
                <h4 className="footer-title">TRENDING SPORTS</h4>
                <ul className="footer-list">
                    <li className="footer-item"><Link to="/criket">Cricket</Link></li>
                    <li className="footer-item"><Link to="/foot">Football</Link></li>
                    <li className="footer-item"><Link to="/archery">Archery</Link></li>
                    <li className="footer-item"><Link to="/tennis">Tennis</Link></li>
                </ul>
            </div>
            <div className="footer-section footer-contact-section align-items-start">
                <h4 className="footer-title">CONTACT US</h4>
                <div className="footer-contact-item">
                    <i className="fa-regular fa-envelope"></i> sportsmart@gmail.com
                </div>
                <div className="footer-contact-item">
                    <i className="fa-brands fa-whatsapp"></i> (+91)7970613165
                    <a href="https://wa.me/918539859375" target="_blank" rel="noopener noreferrer">
  
  </a>
                 
                </div>
                <div className="footer-social-icons ">
                    {/* <i className="fa-brands fa-instagram"></i> */}
                    <a href="_" target="_blank" rel="noopener noreferrer">
    <i className="fa-brands fa-instagram"></i>
  </a>
                    <i className="fa-brands fa-facebook"></i>
                    <i className="fa-brands fa-twitter"></i>
                </div>
            </div>
            <div className=' copyright text-center'>
                SportsMart © 2024-2025
                <br />
                All Rights Reserved.
           </div>
        </div>
    );
}

export default Footer;

