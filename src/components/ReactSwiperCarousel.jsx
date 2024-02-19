import React, { useEffect } from 'react';
import Swiper from 'swiper';
//import 'swiper/swiper-bundle.min.css';

const ReactSwiperCarousel = ({ slides }) => {
  useEffect(() => {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });

    return () => {
      // Cleanup Swiper instance on unmount
      swiper.destroy();
    };
  }, []);

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        {slides.map((slide) => (
          <div key={slide.id} className="swiper-slide">
            <img src={slide.image} alt={slide.alt} />
          </div>
        ))}
      </div>
      <div className="swiper-pagination"></div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
  );
};

export default ReactSwiperCarousel;
