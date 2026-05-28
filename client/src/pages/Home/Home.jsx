import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden bg-white">
      {/* IMAGE */}
      <picture>
        {/* Mobile Image */}
        <source
          media="(max-width: 768px)"
          srcSet="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/home-landing-web/_-Men-women-banner-.jpg?w=400&dpr=2"
        />

        {/* Desktop Image */}
        <img
          src="https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/home-landing-web/homepage_9.jpg?w=1500&dpr=2"
          alt="Fashion Banner"
          className="w-full h-132.5 sm:h-87 md:h-125 lg:h-145 object-cover"
        />
      </picture>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* WOMEN */}
      <div
        onClick={() => navigate("/men")}
        className="absolute left-0 top-0 w-1/2 h-full cursor-pointer group"
      >
        <div className="w-full h-full bg-transparent group-hover:bg-black/20 transition duration-500"></div>
      </div>

      {/* MEN */}
      <div
        onClick={() => navigate("/women")}
        className="absolute right-0 top-0 w-1/2 h-full cursor-pointer group"
      >
        <div className="w-full h-full bg-transparent group-hover:bg-black/20 transition duration-500"></div>
      </div>
    </section>
  );
};

export default HeroSection;
