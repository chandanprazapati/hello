import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider({ children, slideToShow }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1 || slideToShow,
    slidesToScroll: 1,
    // autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
  };
  return (
    <div  >
      <Slider   {...settings}>{children}</Slider>
    </div>
  );
}
