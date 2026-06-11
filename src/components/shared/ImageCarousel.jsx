"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";


const ImageCarousel = () => {
  const slides = [
    {
      src: "/images/home/1.jpg",
      alt: "Yourself Pilates Studio - Slide 1",
    },
    {
      src: "/images/home/2.jpg",
      alt: "Yourself Pilates Studio - Slide 2",
    },
    {
      src: "/images/home/3.jpg",
      alt: "Yourself Pilates Studio - Slide 3",
    },
    {
      src: "/images/home/4.jpg",
      alt: "Yourself Pilates Studio - Slide 4",
    },
    {
      src: "/images/home/5.jpg",
      alt: "Yourself Pilates Studio - Slide 5",
    },
  ];

  return (
    <section className="bg-white py-0">
      <div className="relative w-full overflow-hidden rounded-tr-[50px] rounded-br-[50px] pr-4 lg:pr-16">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          slidesPerView={1}
          spaceBetween={0}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          speed={900}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination-custom",
          }}
          className="w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative flex w-full items-center justify-center overflow-hidden rounded-tr-[50px] rounded-br-[50px]">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={2000}
                  height={1000}
                  className="h-auto w-full object-contain"
                  sizes="100vw"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}

          <div className="swiper-button-prev-custom absolute bottom-8 left-1/2 z-10 flex h-10 w-10 -translate-x-[60px] cursor-pointer items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-white md:bottom-16 md:h-12 md:w-12">
            <svg
              className="h-5 w-5 text-[#003b5c] md:h-6 md:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>

          <div className="swiper-button-next-custom absolute bottom-8 left-1/2 z-10 flex h-10 w-10 translate-x-[60px] cursor-pointer items-center justify-center rounded-full bg-white/80 shadow-lg backdrop-blur-sm transition-all duration-200 hover:bg-white md:bottom-16 md:h-12 md:w-12">
            <svg
              className="h-5 w-5 text-[#003b5c] md:h-6 md:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Swiper>

        <style jsx global>{`
          .yoursel-pilates-carousel {
            border-radius: 0 50px 50px 0;
            overflow: hidden;
          }

          .swiper-pagination-custom .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: white;
            opacity: 0.5;
            transition: all 0.3s;
          }

          .swiper-pagination-custom .swiper-pagination-bullet-active {
            opacity: 1;
            width: 30px;
            border-radius: 5px;
          }

          @media (max-width: 768px) {
            .yoursel-pilates-carousel {
              border-radius: 0;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default ImageCarousel;
