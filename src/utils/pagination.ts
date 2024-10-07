import { Product } from "@/types/home/home";

export const paginateProducts = (
  products: Array<Product>,
  page: number = 1,
  productsPerPage: number = 20
): Array<Product> => {
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  return products.slice(startIndex, endIndex);
};

export const calculateTotalPages = (
  totalProducts: number,
  productsPerPage: number = 20
): number => {
  return Math.ceil(totalProducts / productsPerPage);
};
