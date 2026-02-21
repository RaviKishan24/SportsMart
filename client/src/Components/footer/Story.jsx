import React from 'react'
import './story.css'; 
const Story = () => {
  return (
    <div>
          <div className="page-container">
      <h2 className="page-title">Our Story</h2>
      
      <p className="page-text">
        Founded in 2024, <strong>SportsMart</strong> was born out of a simple idea — to make high-quality sports gear 
        accessible and affordable for everyone. Whether you're a budding cricketer in a local park or a runner chasing your next marathon goal, 
        we’re here to support your journey.
      </p>

      <p className="page-text">
        Our founders, passionate athletes themselves, saw a gap in the market — a place where premium brands were overpriced and 
        local options lacked reliability. So, SportsMart was launched with one mission: <em>empower every sportsperson, no matter where they come from.</em>
      </p>

      <h3 className="page-subtitle">Our Mission</h3>
      <p className="page-text">
        To create a reliable, community-driven platform where athletes of all levels can find the right gear at the right price. 
        From cricket bats to gym shoes, every product we offer is handpicked for performance, durability, and value.
      </p>

      <h3 className="page-subtitle">What Makes Us Different?</h3>
      <ul className="page-list">
        <li>🚚 Fast & Free Delivery on orders above ₹999</li>
        <li>💯 Genuine Products from top global brands</li>
        <li>🤝 Hassle-free returns and responsive support</li>
        <li>📱 Seamless mobile shopping via our app</li>
      </ul>

      <h3 className="page-subtitle">Thank You for Being a Part of Our Journey</h3>
      <p className="page-text">
        Every athlete has a story. And we’re honored to be a part of yours. Whether you're training, competing, or just staying fit — 
        SportsMart is here to help you achieve more.
      </p>
    </div>
    </div>
  )
}

export default Story
