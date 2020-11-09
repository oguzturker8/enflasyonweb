import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
} from "swiper";
import "swiper/swiper-bundle.min.css";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);

export default function Slider() {
  const slider = [
    "https://images.pexels.com/photos/573130/pexels-photo-573130.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/751373/pexels-photo-751373.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/733174/pexels-photo-733174.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/1242348/pexels-photo-1242348.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/1040474/pexels-photo-1040474.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  ];

  return (
    <div className="slider">
      <Swiper
        pagination={{
          dynamicBullets: true,
          clickable: false,
        }}
        spaceBetween={20}
        slidesPerView={1}
        effect="fade"
      >
        {slider.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={item} alt="star" width="900" height="460" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
