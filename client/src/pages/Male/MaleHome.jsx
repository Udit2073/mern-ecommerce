import HomeSlider from "../../components/Male/Slider/Slider";
import ProductSlider from "../../components/Male/Slider/ProductSlider";
import NewArrivals from "../../components/Male/NewArrivals/NewArrivals";
import Categories from "../../components/Male/Categories/Categories";
import Infobar from "../../components/Infobar/Infobar";

const MaleHome = () => {
  return (
    <div>
      {/* <HomeSlider /> */}
      <HomeSlider />

      {/* InfoBar */}
      <Infobar />

      {/* Latest Drops */}
      <ProductSlider />

      {/* New Arrivals */}
      <NewArrivals />

      {/* Categories */}
      <Categories />
    </div>
  );
};

export default MaleHome;
