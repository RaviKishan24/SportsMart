
import SNavbar from './SNavbar';
import Carousel from './Carousel';
import './Home.css'
import Topselling from './Topselling';
import Bss from "./Bss"
import OurGoal from './OurGoal';
import Subscribe from './Subscribe';
import WhyChooseUs from './WhyChooseUs';




function Home() {

  return (
    <>
      <Carousel></Carousel>
      <SNavbar></SNavbar>
      <Bss />
      <Topselling></Topselling>
      <OurGoal/>
      <WhyChooseUs/>
      <Subscribe/>
    </>
  );
}

export default Home;



