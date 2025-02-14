import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import SpecialityMenu from '@/components/SpecialityMenu';
import TopDoctors from '@/components/TopDoctors';
import Banner from '@/components/Banner';






function Home() {
  return (
    <>
      <Header/>
      <SpecialityMenu/>
      <TopDoctors/>
      <Banner/>  
    </>
  );
}

export default Home;
