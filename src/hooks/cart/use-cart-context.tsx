import { CartContext } from '@/contexts/cart/cart';
import { CartContextType } from '@/types/cart/cart';
import { useContext } from 'react'

const useCartContext: () => CartContextType = () => {
  return useContext(CartContext);
}

export default useCartContext