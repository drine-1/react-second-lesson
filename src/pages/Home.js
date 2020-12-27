import React, { Component } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeSlider from "../components/HomeSlider";

export default class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <HomeSlider />
        <Footer />
      </>
    );
  }
}
