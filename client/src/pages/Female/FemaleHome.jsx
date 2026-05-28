import HomeSlider from "../../components/Female/Slider/Slider";
import NewArrivals from "../../components/Female/NewArrivals/NewArrivals";
import Categories from "../../components/Female/Categories/Categories";
import Infobar from "../../components/Infobar/Infobar";
import FemaleCollections from "../../components/Female/FemaleCollections/FemaleCollections";

const MaleHome = () => {
  return (
    <div>
      {/* <HomeSlider /> */}
      <HomeSlider />

      {/* InfoBar */}
      <Infobar />

      {/* New Arrivals */}
      <NewArrivals />

      {/* Categories */}
      <Categories />

      {/* Female Collection */}
      <FemaleCollections />
    </div>
  );
};

export default MaleHome;
