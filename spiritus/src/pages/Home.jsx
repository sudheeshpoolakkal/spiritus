import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import SpecialityMenu from "@/components/SpecialityMenu";
import TopDoctors from "@/components/TopDoctors";
import Banner from "@/components/Banner";
import PromoVideo from "@/components/PromoVideo";

function Home() {
  return (
    <>
      <Header />
      <SpecialityMenu />
      {/* <PromoVideo /> */}
      <TopDoctors />
      <Banner />
      

      {/* Add the More Details */}
    </>
  );
}

export default Home;
