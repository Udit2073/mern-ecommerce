import WomenTshirts from "../pages/Female/WomenTshirts";
import WomenTops from "../pages/Female/WomenTops";
import WomenDresses from "../pages/Female/WomenDresses";
import WomenJoggers from "../pages/Female/WomenJoggers";
import WomenPants from "../pages/Female/WomenPants";
import WomenShirts from "../pages/Female/WomenShirts";
import WomenDenims from "../pages/Female/WomenDenims";
import WomenSneakers from "../pages/Female/WomenSneakers";
import WomenPerfumes from "../pages/Female/WomenPerfumes";

const femaleRoutes = [
  {
    path: "/women/tshirts",
    element: <WomenTshirts />,
  },

  {
    path: "/women/tops",
    element: <WomenTops />,
  },

  {
    path: "/women/dresses",
    element: <WomenDresses />,
  },

  {
    path: "/women/joggers",
    element: <WomenJoggers />,
  },

  {
    path: "/women/pants",
    element: <WomenPants />,
  },

  {
    path: "/women/shirts",
    element: <WomenShirts />,
  },

  {
    path: "/women/denims",
    element: <WomenDenims />,
  },

  {
    path: "/women/sneakers",
    element: <WomenSneakers />,
  },

  {
    path: "/women/perfumes",
    element: <WomenPerfumes />,
  },
];

export default femaleRoutes;
