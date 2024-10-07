import Paginate from "@/components/pagination/pagination";
import useCartContext from "@/hooks/cart/use-cart-context";
import { calculateTotalPages } from "@/utils/pagination";
import { useState } from "react";
import { FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cart = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { products, handleUpdateQuantity, handleRemoveFromCart } =
    useCartContext();

  const calculateTotalPrice = () => {
    return products
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="overflow-x-hidden">
      <h1 className="mt-12 lg:mt-16 text-4xl font-bold text-center mb-12">
        Your Shopping Cart
      </h1>

      {products.length > 0 ? (
        <div className="flex flex-col lg:flex-row lg:space-x-12 gap-12 lg:gap-0">
          <div className="flex-grow space-y-6">
            <ul className="space-y-6 flex flex-col gap-2">
              {products.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col border border-gray-200 md:flex-row items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 min-w-full md:min-w-[400px] xl:min-w-[600px]"
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-24 h-24 object-contain rounded-lg mr-6"
                  />

                  <div className="flex-grow">
                    <h2 className="font-semibold text-xl mb-1 lg:whitespace-nowrap">
                      {item.title}
                    </h2>
                    <p className="text-gray-500 mb-2">
                      Price: ${item.price.toFixed(2)}
                    </p>

                    <div className="flex justify-center items-center mt-4 space-x-2">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 text-lg font-semibold bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 text-lg font-semibold bg-gray-200 rounded-lg hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="w-full flex mt-8 md:mt-0 justify-center md:w-fit text-red-500 hover:text-red-700 ml-4 self-end"
                  >
                    <FaTrashAlt className="h-6 w-6" />
                  </button>
                </li>
              ))}
            </ul>
            <Paginate onPageChange={(page: number) => setCurrentPage(page)} totalPages={calculateTotalPages(products.length, 3)} currentPage={currentPage} />
          </div>

          <aside className="lg:mt-0 md:min-w-[400px]">
            <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Cart Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-700">Total Items:</span>
                  <span>
                    {products.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-gray-700">Total Price:</span>
                  <span>${calculateTotalPrice()}</span>
                </div>
              </div>
              <Link
                to="/"
                className="mt-6 block w-full text-center bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                Back to shopping
              </Link>
            </div>
          </aside>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <FaShoppingCart className="text-gray-400 text-6xl mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            to="/"
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
