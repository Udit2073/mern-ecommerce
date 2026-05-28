import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Slider = () => {
  const desktopImages = [
    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Shirts_homepage.jpg?w=1500&dpr=2",

    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_5_FN53kDd.jpg?w=1500&dpr=2",

    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Final_Shirts_homepage_copy_enLPK4e.jpg?w=1500&dpr=2",

    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Summer_26_-_-_Homepage_banner_copy_2_3TZMqEC.jpg?w=1500&dpr=2",

    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/mens_sneaker__homepage_uYn8Bcj.jpg?w=1500&dpr=2",

    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/homepage_6_aJ8RA12.jpg?w=1500&dpr=2",
  ];

  const mobileImages = [
    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Summer_Shirts_26_app_voyf0e1.jpg?w=768&dpr=2",

    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Men-OST_uNdXa3K.jpg?w=768&dpr=2",

    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Polos_-_App_Banner_copy_qs4F9df.jpg?w=768&dpr=2",

    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/Mens_-_Summer_26_-_App_banner_copy_x06DpW7.jpg?w=768&dpr=2",

    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/summer_sneakers_app_2UorNbN.jpg?w=768&dpr=2",

    "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/banner-images/AB1_bNPSJoL.jpg?w=768&dpr=2",
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
        className="homeSwiper w-full h-125 sm:h-125 md:h-150 lg:h-123"
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
