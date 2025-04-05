import React from 'react';
import './Footer.css';

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
                    <li className="footer-item">Our Story</li>
                    <li className="footer-item">Terms Of Use</li>
                    <li className="footer-item">Privacy Policy</li>
                    <li className="footer-item">Returns & Exchanges</li>
                    <li className="footer-item">Shipping Policy</li>
                </ul>
            </div>
            <div className="footer-section">
                <h4 className="footer-title">TOP BRANDS</h4>
                <ul className="footer-list">
                    <li className="footer-item">Puma</li>
                    <li className="footer-item">Adidas</li>
                    <li className="footer-item">Under Armour</li>
                    <li className="footer-item">Nike</li>
                </ul>
            </div>
            <div className="footer-section">
                <h4 className="footer-title">TRENDING SPORTS</h4>
                <ul className="footer-list">
                    <li className="footer-item">Cricket</li>
                    <li className="footer-item">Football</li>
                    <li className="footer-item">Archery</li>
                    <li className="footer-item">Tennis</li>
                </ul>
            </div>
            <div className="footer-section footer-contact-section align-items-start">
                <h4 className="footer-title">CONTACT US</h4>
                <div className="footer-contact-item">
                    <i className="fa-regular fa-envelope"></i> sportsmart@gmail.com
                </div>
                <div className="footer-contact-item">
                    <i className="fa-brands fa-whatsapp"></i> (+91)7970613165
                </div>
                <div className="footer-social-icons ">
                    <i className="fa-brands fa-instagram"></i>
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

