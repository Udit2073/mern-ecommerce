import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

import { useEffect, useState } from "react";

import newArrivals from "../../../Data/Female/newArrivals.js";

const NewArrivals = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div className="w-full px-1 lg:px-4 my-10 md:my-14">
      {/* Heading */}
      <h1 className="text-2xl md:text-3xl mb-3 font-bold text-center md:mb-12 tracking-wide">
        NEW ARRIVALS
      </h1>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={!isMobile}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={10}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
        className="pb-4"
      >
        {newArrivals.map((product) => (
          <SwiperSlide key={product.id}>
            <Link
              to={`/${product.gender}/product/${product.category}/${product.slug}`}
              className="block h-full"
            >
              <div className="group cursor-pointer flex flex-col h-full">
                {/* Image Wrapper with Responsive Aspect Ratio */}
                <div className="overflow-hidden aspect-3/4 bg-gray-100">
                  <picture>
                    <source
                      media="(max-width: 768px)"
                      srcSet={product.mobileImg}
                    />
                    <img
                      src={product.desktopImg}
                      alt={product.name}
                      className="w-full rounded-sm h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                      loading="lazy"
                    />
                  </picture>
                </div>

                {/* Content */}
                <div className="mt-2 md:mt-4 flex flex-col grow px-1">
                  <h2 className="text-sm md:text-lg font-medium text-gray-800 line-clamp-1">
                    {product.name}
                  </h2>

                  <p className="text-xs md:text-sm text-gray-500">
                    Easy Fit Vests
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm md:text-base font-semibold">
                      ₹{product.price}
                    </span>

                    {product.oldPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{product.oldPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewArrivals;
