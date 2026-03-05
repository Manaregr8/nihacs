import Image from "next/image";
import Hero from "../Homesections/Hero.jsx"
import Carouselsection from "../Homesections/carouselsection.jsx"
import Gallery from "../Homesections/gallery.jsx";
import Testimonial from "../Homesections/testimonial.jsx";
import CyberPlacements from "../Homesections/placement.jsx";
import Choose from "../Homesections/Choose.jsx";
import Faq from "../Homesections/Faq.jsx";
import Trainer from "../Homesections/Trainer.jsx";
import Company from "../Homesections/company.jsx";
import Recommend from "../Homesections/Recommend.jsx";
import Banner from "../Homesections/banner.jsx";
import Certification from "../Homesections/certification.jsx";
import Career from "../Homesections/career.jsx";

export default function Home() {
  return (
    <div className=" max-w-[1350px] mx-auto bg-black">
    
        <Hero/>
        <Carouselsection/>
        <Recommend/>
        <Testimonial/>
        <Certification/>
        <Gallery/>
        <Career/>
        <CyberPlacements/>
        <Company/>
        <Choose/>
        <Trainer/>
        <Banner/>
        <Faq/>
      
    </div>
  );
}