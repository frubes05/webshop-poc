import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { FaStore } from "react-icons/fa"; 
import useCartContext from "@/hooks/cart/use-cart-context";
import { useAuthContext } from "@/hooks/auth/use-auth-context"; 
import { FaUserAlt } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { Button } from "../ui/button";

const Header = () => {
  const { quantity, resetProducts } = useCartContext();
  const { credentials, handleLogout } = useAuthContext();
  const navigate = useNavigate();

  const storedCart = localStorage.getItem("cart");
  const storedUser = storedCart ? JSON.parse(storedCart).id : null;

  const hasUser = credentials ?? storedUser ?? false;

  const logout = () => {
    handleLogout();
    resetProducts();
    location.replace("/")
  };

  return (
    <header className="fixed top-0 z-75 left-0 right-0 bg-white border-b border-gray-200 shadow-md">
      <div className="container mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
        <Button onClick={() => navigate("/")} className="flex items-center space-x-2 bg-transparent border-0 focus:outline-none hover:bg-transparent hover:border-0">
          <FaStore className="h-8 w-8 text-blue-500" />
          <span className="font-bold text-lg text-gray-800">WebShop</span>
        </Button>

        <div className="flex space-x-2 items-center md:space-x-6">
          {!hasUser ? (
            <Link
              to="/login"
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
            >
              <AiOutlineUser className="h-6 w-6" />
              <span>Login</span>
            </Link>
          ) : (
            <>
              <div className="flex items-center gap-2 space-x-1 text-gray-600 hover:text-gray-800">
                <FaUserAlt className="h-6 w-6" />
                <span>{hasUser.username ?? hasUser}</span>
              </div>
            </>
          )}

          <Link
            to="/cart"
            className="relative flex items-center space-x-1 text-gray-600 hover:text-gray-800"
          >
            <AiOutlineShoppingCart className="h-6 w-6" />
            <span>Cart</span>
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {quantity}
            </span>
          </Link>

          {hasUser && (
            <Button
              onClick={logout}
              className="flex bg-transparent border-0 items-center gap-2 space-x-1 text-gray-600 hover:bg-transparent"
            >
              <IoMdLogOut className="h-6 w-6" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
