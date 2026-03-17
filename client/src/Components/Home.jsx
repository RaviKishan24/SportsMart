import React from 'react'
import Navbar from './Navbar';
import SNavbar from './SNavbar';
import Carousel from './Carousel';
import './Home.css'
import Topselling from './Topselling';
import Footer from './Footer';
import Bss from './Bss';
import OurGoal from './OurGoal';




function Home() {

  return (
    <>
      <Carousel></Carousel>
      <SNavbar></SNavbar>
      <Bss />
      <Topselling></Topselling>
      <OurGoal/>
    </>
  );
}

export default Home;



