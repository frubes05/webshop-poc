import useHomeContext from "@/hooks/home/use-home-context";
import HomeProduct from "../home-product/home-product";
import { Modal } from "@/components/modal/modal";
import { useState } from "react";
import { Product } from "@/types/home/home";
import { Button } from "@/components/ui/button";
import useCartContext from "@/hooks/cart/use-cart-context";
import { useLocation } from "react-router-dom";

const HomeProducts = () => {
  const { filteredProducts, filters } = useHomeContext();
  const { handleAddToCart } = useCartContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const hasSelectedFilters = Object.keys(filters).length > 0;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const handleModalClick = (product: Product) => {
    setIsModalOpen(true);
    setCurrentProduct(product);
  };

  if (filteredProducts.length === 0 && searchParams.get("search")) {
    return (
      <div className="w-full flex justify-center">
        <h2 className="text-lg my-6">There are no products for {searchParams.get("search")}.</h2>
      </div>
    );
  }

  if (filteredProducts.length === 0 && hasSelectedFilters) {
    return (
      <div className="w-full flex justify-center">
        <h2 className="text-lg my-6">There are no products for given filter combination.</h2>
      </div>
    );
  }

  return (
    <>
      <ul className="grid-cols-1 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {filteredProducts.map((product) => (
          <li key={product.title}>
            <HomeProduct
              product={product}
              onModalClick={handleModalClick}
              onAddToCartClick={handleAddToCart}
            />
          </li>
        ))}
      </ul>
      {currentProduct && (
        <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
          <HomeProduct
            product={currentProduct}
            onAddToCartClick={handleAddToCart}
            isModal
          />
          <Button type="button" onClick={() => setIsModalOpen(false)}>
            Close Modal
          </Button>
        </Modal>
      )}
    </>
  );
};

export default HomeProducts;
