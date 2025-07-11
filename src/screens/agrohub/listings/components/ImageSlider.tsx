"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider = ({ images }: ImageSliderProps) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={10}
      slidesPerView={1}
      className="rounded-xl"
    >
      {images.map((url, index) => (
        <SwiperSlide key={index}>
          <img
            src={url}
            alt={`Image ${index + 1}`}
            className="w-full h-64 object-cover rounded-xl"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
