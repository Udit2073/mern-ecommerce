import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="px-2 py-1 md:hidden flex items-center"
    >
      <IoArrowBack size={22} />
    </button>
  );
};

export default BackButton;
