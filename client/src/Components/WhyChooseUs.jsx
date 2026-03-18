import React from 'react'
import "./WhyChooseUs.css"

function WhyChooseUs() {

    const features = [
        {
            icon: "fa-truck",
            title: "Free Delivery",
            desc: "Get free delivery on all orders across India."
        },
        {
            icon: "fa-lock",
            title: "Secure Payment",
            desc: "100% secure payment with trusted gateways."
        },
        {
            icon: "fa-rotate-left",
            title: "Easy Returns",
            desc: "Hassle-free returns within 7 days."
        },
        {
            icon: "fa-star",
            title: "Quality Products",
            desc: "Top quality sports gear from trusted brands."
        }
    ]

    return (
        <section className="why-section">

            <h2 className="why-title">Why Choose SportsMart?</h2>

            <div className="why-container">

                {features.map((item, index) => (
                    <div key={index} className="why-card">

                        <div className="why-icon">
                            <i className={`fa-solid ${item.icon}`}></i>
                        </div>

                        <h3>{item.title}</h3>

                        <p>{item.desc}</p>

                    </div>
                ))}

            </div>

        </section>
    )
}

export default WhyChooseUs;