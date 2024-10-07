import { Product } from "../home/home";

export interface ProductWithQuantity extends Product{
    quantity: number;
}

export interface CartContextType {
    user: null | string;
    quantity: number;
    products: ProductWithQuantity[];
    handleAddToCart: (product: ProductWithQuantity) => void;
    handleRemoveFromCart: (id: number) => void;
    handleUpdateQuantity: (id: number, quantity: number) => void;
    resetProducts: () => void;
  }