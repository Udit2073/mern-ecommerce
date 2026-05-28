import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Autoplay } from "swiper/modules";

import { Link } from "react-router-dom";

import "swiper/css";

import "swiper/css/navigation";

import products from "../../../Data/Male/products.js";

const ProductSlider = () => {
  return (
    <div className="mx-0 md:mx-6 lg:mx-4 my-10 md:my-10">
      {/* HEADING */}
      <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold text-center mb-3 md:mb-8">
        LATEST DROPS
      </h1>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{
          delay: 3000,
        }}
        loop={true}
        className="overflow-hidden"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Link to={`/product/${product.id}`}>
              <div className="relative cursor-pointer overflow-hidden">
                {/* IMAGE */}
                <picture>
                  <source
                    media="(max-width: 768px)"
                    srcSet={product.mobileImg}
                  />

                  <img
                    src={product.desktopImg}
                    alt={product.category}
                    className="w-full h-80 sm:h-125 md:h-162.5 lg:h-130 object-cover hover:scale-105 duration-500"
                  />
                </picture>

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 sm:p-8 md:p-12 text-white"></div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
