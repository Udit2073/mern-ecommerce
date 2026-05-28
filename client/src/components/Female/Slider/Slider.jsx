import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Slider = () => {
  const desktopImages = [
    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_5.45.07PM.jpg?w=1500&dpr=2",

    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Womens_-_Homepage__banner_-_summer_26_copy_XIi9e3H.jpg?w=1500&dpr=2",

    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/women-bottemwear-HP_761sfHx.jpg?w=1500&dpr=2",

    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_1_5.45.07PM.jpg?w=1500&dpr=2",

    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/home_5.45.07PM.jpg?w=1500&dpr=2",
  ];

  const mobileImages = [
    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Summer_Women_OST_26_app_3b2q4OG.jpg?w=768&dpr=2",

    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Womens-app_banner-_Summer_26_copy_VMmNLo2.jpg?w=768&dpr=2",

    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/App-Banner_5.45.07PM.jpg?w=768&dpr=2",

    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Summer-dress_yWvHhoW.jpg?w=768&dpr=2",

    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/summer_top_9ReWLbN.jpg?w=768&dpr=2",
  ];

  return (
    <div className="w-full md:px-2 lg:px-4 mb-8">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="homeSwiper w-full h-130 sm:h-125 md:h-150 lg:h-123"
      >
        {desktopImages.map((img, index) => (
          <SwiperSlide key={index}>
            <picture>
              {/* Mobile Image */}
              <source media="(max-width: 768px)" srcSet={mobileImages[index]} />

              {/* Desktop Image */}
              <img
                src={img}
                alt="slider"
                className="w-full h-full object-cover"
              />
            </picture>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
