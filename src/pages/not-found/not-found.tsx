import { Link } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <FiAlertTriangle className="text-7xl text-black mb-4" />

      <h1 className="text-6xl font-extrabold text-blac mb-4">404</h1>

      <p className="text-2xl md:text-3xl font-light mb-8 text-gray-700">
        Oops! The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="px-8 py-4 bg-black text-white text-md font-medium rounded-full shadow-lg hover:bg-black hover:text-white transition-all duration-300 flex items-center"
      >
        <FiAlertTriangle className="mr-2" />
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
