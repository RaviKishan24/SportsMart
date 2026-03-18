import React from 'react'
import "./Subscribe.css"

function Subscribe() {
    return (
        <section className="subscribe-section">

            <div className="subscribe-container">

                <h2 className="subscribe-title">
                    Stay Updated with SportsMart
                </h2>

                <p className="subscribe-subtitle">
                    Get updates on new arrivals, offers, and exclusive deals.
                </p>

                <form className="subscribe-form">

                    <div className="subscribe-input-box">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                        />

                        <button type="submit">
                            Subscribe
                        </button>
                    </div>

                </form>

            </div>

        </section>
    )
}

export default Subscribe;