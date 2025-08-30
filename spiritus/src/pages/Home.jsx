import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import SpecialityMenu from "@/components/SpecialityMenu";
import TopDoctors from "@/components/TopDoctors";
import Banner from "@/components/Banner";

import PromoVideo from "../components/PromoVideo";
import TopHospitals from "@/components/TopHospitals";

function Home() {
  return (
    <>
      <Header />
      <SpecialityMenu />

      {/* <PromoVideo /> */}

      <TopDoctors />
      <TopHospitals />
      <Banner />
      

      {/* Add the More Details */}

      {/* Crisis Warning Section */}
      <section className="pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-700 mb-2">
            <strong>If you or someone else is in crisis or immediate danger,</strong>
          </p>
          <p className="text-gray-600">
            <a href="/gethelpnow" className="text-blue-600 hover:underline font-medium">These resources</a> offer immediate support.
          </p>
        </div>
      </section>
    </>
  );
}

export default Home;
