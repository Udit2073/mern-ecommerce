import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        {/* 404 */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-red-500">
          404
        </h1>

        {/* TEXT */}
        <h2 className="text-3xl md:text-4xl font-bold mt-6">Page Not Found</h2>

        <p className="text-gray-500 mt-4 text-lg">
          The page you are looking for does not exist.
        </p>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="mt-8 bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 duration-300"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
