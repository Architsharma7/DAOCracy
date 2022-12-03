import Navbar from "../components/navbar";
import React from "react";
import About from "../components/about";
import Features from "../components/features";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className="">
      <Navbar/>
      <About/>
      <Features/>
      <Footer/>
    </div>
  )
}
