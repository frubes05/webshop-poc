import { buildSearchParams, calculateInitialQueryString, getFilterableFilters, getFilteredProducts, getPriceFilter, getSelectedFilters, getSortedProducts, getValueFilter, isValidSortCriteria, parseSearchParams } from "./filters";
import { expectedFilteredProducts, expectedProductsInAscendingOrder, expectedProductsInDescendingOrder, mockProducts } from "../mock-data/filters";

  
  describe("getValueFilter", () => {
    it("should group products by a given key and return a value filter object", () => {
      const result = getValueFilter(mockProducts, "title");
      expect(result).toEqual({
        title: ["Product A", "Product B", "Product C"],
      });
    });
  
    it("should return an empty object if products are empty", () => {
      const result = getValueFilter([], "title");
      expect(result).toEqual({});
    });
  });
  
  describe("getPriceFilter", () => {
    it("should return a fixed price range filter object", () => {
      const result = getPriceFilter(mockProducts);
      expect(result).toEqual({ price: ["0-10", "10-50", "50-100", "100+"] });
    });
  });
  
  describe("getSelectedFilters", () => {
    it("should add a filter if it does not exist", () => {
      const filters = getSelectedFilters({}, { key: "category", value: "Electronics" });
      expect(filters).toEqual({ category: ["Electronics"] });
    });
  
    it("should remove a filter if it already exists", () => {
      const filters = getSelectedFilters({ category: ["Electronics"] }, { key: "category", value: "Electronics" });
      expect(filters).toEqual({});
    });
  });
  
  describe("buildSearchParams", () => {
    it("should build a URLSearchParams object based on filters", () => {
      const searchParams = buildSearchParams({ category: ["Electronics"] });
      expect(searchParams.toString()).toBe("category=Electronics");
    });
  });
  
  describe("getFilteredProducts", () => {
    it("should filter products based on price range", () => {
      const filters = { price: ["10-50", "50-100"] };
      const result = getFilteredProducts(filters, mockProducts);
      expect(result).toEqual(expectedFilteredProducts);
    });
  
    it("should return undefined if products are not provided", () => {
      const result = getFilteredProducts({}, undefined);
      expect(result).toBeUndefined();
    });
  });
  
  describe("getFilterableFilters", () => {
    it("should exclude sortBy, page, and search filters from the object", () => {
      const result = getFilterableFilters({
        sortBy: ["price-asc"],
        page: ["1"],
        search: ["query"],
        category: ["Electronics"],
      });
      expect(result).toEqual({ category: ["Electronics"] });
    });
  });
  
  describe("getSortedProducts", () => {
    it("should sort products in ascending order by price", () => {
      const result = getSortedProducts("price-asc", mockProducts);
      expect(result).toEqual(expectedProductsInAscendingOrder);
    });
  
    it("should sort products in descending order by title", () => {
      const result = getSortedProducts("title-desc", mockProducts);
      expect(result).toEqual(expectedProductsInDescendingOrder);
    });
  });
  
  describe("parseSearchParams", () => {
    it("should parse search parameters into filter objects", () => {
      const searchParams = new URLSearchParams("category=Electronics+Books");
      const result = parseSearchParams(searchParams);
      expect(result).toEqual({ category: ["Electronics", "Books"] });
    });
  });
  
  describe("isValidSortCriteria", () => {
    it("should return true for valid sort criteria", () => {
      expect(isValidSortCriteria("price-asc")).toBe(true);
      expect(isValidSortCriteria("title-desc")).toBe(true);
    });
  
    it("should return false for invalid sort criteria", () => {
      expect(isValidSortCriteria("invalid-criteria")).toBe(false);
    });
  });
  
  describe("calculateInitialQueryString", () => {
    it("should return a URL with query string if a value is provided", () => {
      expect(calculateInitialQueryString("laptop")).toBe(
        "https://dummyjson.com/products/search?q=laptop"
      );
    });
  
    it("should return a default URL if no value is provided", () => {
      expect(calculateInitialQueryString(null)).toBe("https://dummyjson.com/products");
    });
  });
  