import React from 'react'
import HeroSection from '../sections/HeroSection'
import FeaturesSection from '../sections/features'
import Feedback from '../sections/feedback'
import AboutUs from './Aboutus'
import SuccessStories from '../sections/SuccessStories'


const Home = () => {
  return (
    <div className="w-full h-full flex flex-col bg-background text-text overflow-x-hidden ">
    
    <HeroSection/>
    <FeaturesSection/>
    <SuccessStories />
    
    <AboutUs/>
  
  <Feedback/>
   
    
    </div>
  )
}

export default Home