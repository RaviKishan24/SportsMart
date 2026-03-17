import React from 'react'
import goal from "../assets/goal.jpg"
import "./ourGoal.css"
import { useNavigate } from 'react-router'

function OurGoal() {

    const navigate=useNavigate();
    return (
        <section className='goal-container'>
            <h1 className="goal-title">Our Goal</h1>

            <div className="goal-content">

                {/* LEFT SIDE IMAGE */}
                <div className="goal-image">
                    <img src={goal} alt="Our Goal" />
                </div>

                {/* RIGHT SIDE TEXT */}
                <div className="goal-text">
                    <h2>Empowering Every Athlete</h2>
                    <p>
                        At <strong>SportsMart</strong>, our mission is to provide high-quality
                        sports products that inspire people to stay active, healthy,
                        and confident. We aim to make sports accessible to everyone,
                        from beginners to professionals.
                    </p>

                    <p>
                        We believe that sports can change lives. That’s why we are
                        committed to delivering the best equipment, latest trends,
                        and unbeatable value to our customers.
                    </p>

                    <button  onClick={()=>navigate("/all-categories")} className="goal-btn">Explore Products</button>
                </div>

            </div>
        </section>
    )
}

export default OurGoal