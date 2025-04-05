import React from 'react'
import Navbar from './Navbar';
import SNavbar from './SNavbar';
import Carousel from './Carousel';
import './Home.css'
import Topselling from './Topselling';
import Footer from './Footer';
import Bss from './Bss';




function Home() {

  return (
    <>
      <Navbar></Navbar>
      <Carousel></Carousel>
      <SNavbar></SNavbar>
      <Bss />
      <Topselling></Topselling>
      <Footer></Footer>
    </>
  );
}

export default Home;



