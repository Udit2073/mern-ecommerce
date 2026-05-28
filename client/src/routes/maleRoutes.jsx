import MenTshirts from "../pages/Male/MenTshirts";
import MenShoes from "../pages/Male/MenShoes";
import MenShirt from "../pages/Male/MaleShirt";
import MenPolos from "../pages/Male/MalePolos";
import MenJoggers from "../pages/Male/MenJoggers";
import MenJeans from "../pages/Male/MenJeans";
import MenPants from "../pages/Male/MenPants";
import MenBackpacks from "../pages/Male/MenBackpacks";
import MenPerfumes from "../pages/Male/MenPerfumes";

const maleRoutes = [
  {
    path: "/men/tshirts",
    element: <MenTshirts />,
  },

  {
    path: "/men/sneakers",
    element: <MenShoes />,
  },

  {
    path: "/men/shirts",
    element: <MenShirt />,
  },

  {
    path: "/men/polos",
    element: <MenPolos />,
  },

  {
    path: "/men/joggers",
    element: <MenJoggers />,
  },

  {
    path: "/men/jeans",
    element: <MenJeans />,
  },

  {
    path: "/men/pants",
    element: <MenPants />,
  },

  {
    path: "/men/backpacks",
    element: <MenBackpacks />,
  },

  {
    path: "/men/perfumes",
    element: <MenPerfumes />,
  },
];

export default maleRoutes;
