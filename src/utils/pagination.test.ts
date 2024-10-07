import { mockProducts } from "../mock-data/pagination";
import { paginateProducts, calculateTotalPages } from "../utils/pagination";

describe("paginateProducts", () => {
  it("should return the first page of products", () => {
    const paginated = paginateProducts(mockProducts, 1, 5);
    expect(paginated).toEqual(mockProducts.slice(0, 5));
  });

  it("should return the second page of products", () => {
    const paginated = paginateProducts(mockProducts, 2, 5);
    expect(paginated).toEqual(mockProducts.slice(5, 10));
  });

  it("should return an empty array if the page is out of range", () => {
    const paginated = paginateProducts(mockProducts, 3, 5);
    expect(paginated).toEqual([]);
  });

  it("should return all products if productsPerPage is greater than total products", () => {
    const paginated = paginateProducts(mockProducts, 1, 20);
    expect(paginated).toEqual(mockProducts);
  });
});

describe("calculateTotalPages", () => {
  it("should calculate total pages correctly when productsPerPage is 5", () => {
    const totalPages = calculateTotalPages(mockProducts.length, 5);
    expect(totalPages).toBe(2);
  });

  it("should calculate total pages correctly when productsPerPage is 3", () => {
    const totalPages = calculateTotalPages(mockProducts.length, 3);
    expect(totalPages).toBe(4);
  });

  it("should return 1 page when productsPerPage is greater than total products", () => {
    const totalPages = calculateTotalPages(mockProducts.length, 20);
    expect(totalPages).toBe(1);
  });

  it("should return 0 pages if there are no products", () => {
    const totalPages = calculateTotalPages(0, 5);
    expect(totalPages).toBe(0);
  });
});
