import React from 'react'
import { Link } from 'react-router-dom'
import './AllCategories.css'

// IMPORT SAME IMAGES
import cricketbat1 from '../assets/snavbar/cricketbat1.jpg'
import crickball1 from '../assets/snavbar/crickball1.jpg'
import football1 from '../assets/snavbar/football1.jpg'
import badminton from '../assets/snavbar/badminton.jpg'
import carromboard from '../assets/snavbar/Carromboard.jpg'
import volleyball from '../assets/snavbar/Volleyballs.webp'
import shuttle from '../assets/snavbar/shuttle.webp'
import chess from '../assets/snavbar/chess.jpg'
import trophy from '../assets/snavbar/trophy.webp'
import apparels from '../assets/snavbar/apparels.png'
import tennis from '../assets/snavbar/tennis.png'
import basketball from '../assets/snavbar/basketball.jpg'

function AllCategories() {

    const categories = [
        { img: cricketbat1, label: "Cricket Bats", link: "/Bat" },
        { img: crickball1, label: "Cricket Balls", link: "/Ball" },
        { img: football1, label: "Footballs", link: "/Football" },
        { img: badminton, label: "Badminton", link: "/badminton" },
        { img: carromboard, label: "Carromboards", link: "/carromboard" },
        { img: volleyball, label: "Volleyballs", link: "/volly" },
        { img: basketball, label: "Basketballs", link: "/basket" },
        { img: shuttle, label: "Shuttles", link: "/shuttle" },
        { img: chess, label: "Chess", link: "/chess" },
        { img: tennis, label: "Table Tennis", link: "/table" },
        { img: apparels, label: "Apparels", link: "/apparels" },
        { img: trophy, label: "Trophy", link: "/trophy" },
    ];

    return (
        <div className="allcat-container">
            <h1>All Categories</h1>

            <div className="allcat-grid">
                {categories.map((item, index) => (
                    <Link to={item.link} key={index} className="allcat-card">

                        <img src={item.img} alt={item.label} />

                        <p>{item.label}</p>

                    </Link>
                ))}
            </div>
        </div>
    )
}

export default AllCategories