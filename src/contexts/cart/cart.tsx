import { useAuthContext } from "@/hooks/auth/use-auth-context";
import { CartContextType, ProductWithQuantity } from "@/types/cart/cart";
import { createContext, PropsWithChildren, useMemo, useState } from "react";

export const CartContext = createContext<CartContextType>({
  user: null,
  products: [],
  quantity: 0,
  handleAddToCart: () => {},
  handleRemoveFromCart: () => {},
  handleUpdateQuantity: () => {},
  resetProducts: () => {}
});

export const CartContextProvider = ({ children }: PropsWithChildren) => {
  const { credentials } = useAuthContext();
  const [user] = useState<string | null>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart).id : null;
  });

  const [products, setProducts] = useState<ProductWithQuantity[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart).products : [];
  });

  const handleAddToCart = (product: ProductWithQuantity) => {
    setProducts((prevProducts) => {
      const existingProductIndex = prevProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        const updatedProducts = [...prevProducts];

        updatedProducts[existingProductIndex] = {
          ...updatedProducts[existingProductIndex],
          quantity: updatedProducts[existingProductIndex].quantity + 1,
        };

        localStorage.setItem(
          "cart",
          JSON.stringify({ id: !user ? credentials?.username : user, products: updatedProducts })
        );

        return updatedProducts;
      }

      localStorage.setItem(
        "cart",
        JSON.stringify({
          id: !user ? credentials?.username : user,
          products: [...prevProducts, { ...product, quantity: 1 }],
        })
      );

      return [...prevProducts, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter(
        (product) => product.id !== productId
      );
      localStorage.setItem(
        "cart",
        JSON.stringify({ id: user, products: updatedProducts })
      );
      return updatedProducts;
    });
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    setProducts((prevProducts) => {
      if (newQuantity <= 0) {
        const updatedProducts = prevProducts.filter((item) => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify({ id: user, products: updatedProducts }));
        return updatedProducts;
      }
  
      const updatedProducts = prevProducts.map((product) =>
        product.id === productId ? { ...product, quantity: newQuantity } : product
      );
  
      localStorage.setItem('cart', JSON.stringify({ id: user, products: updatedProducts }));
  
      return updatedProducts;
    });
  };

  const resetProducts = () => setProducts([]);

  const quantity = useMemo(() => {
    return products.reduce((prev, acc) => prev + acc.quantity, 0);
  }, [products]);

  const value = {
    user,
    products,
    quantity,
    resetProducts,
    handleAddToCart,
    handleRemoveFromCart,
    handleUpdateQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
