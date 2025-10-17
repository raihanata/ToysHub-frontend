'use client'

import React from 'react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const Banner = () => {

   const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const images = [
    
    '/banner2.jpg',
    '/banner4.png',
    '/banner-one.png',
  ];

  return (
    <div className="w-full h-screen relative">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Banner ${index + 1}`}
              className="w-full h-screen object-cover shadow-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Banner