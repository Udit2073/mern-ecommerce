import { Outlet, useLocation } from "react-router-dom";
import BackButton from "../BackButton/BackButton";

const RouteWrapper = () => {
  const location = useLocation();

  const showBackButton =
    location.pathname.startsWith("/men/") ||
    location.pathname.startsWith("/women/") ||
    location.pathname.includes("/product/");

  return (
    <>
      {showBackButton && <BackButton />}
      <Outlet />
    </>
  );
};

export default RouteWrapper;
