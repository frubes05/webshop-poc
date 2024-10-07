import { Product } from "@/types/home/home";

type ValueFilterObject = {
  [key: string]: string[];
};

type SortCriteria = "price-asc" | "price-desc" | "title-asc" | "title-desc";

type PriceFilterObject = {
  price: Array<string>;
};

export const getValueFilter = (
  products: Array<Product>,
  key: keyof Product
) => {
  return products.reduce<ValueFilterObject>((prev, acc) => {
    const value = acc[key] as string;

    if (value) {
      return {
        ...prev,
        [key]: prev[key] ? Array.from(new Set([...prev[key], value])) : [value],
      };
    }
    return prev;
  }, {});
};

export const getPriceFilter = (products: Array<Product>): PriceFilterObject => {
  return products.reduce<PriceFilterObject>(
    () => {
      return {
        price: ["0-10", "10-50", "50-100", "100+"],
      };
    },
    { price: [] }
  );
};

export const getSelectedFilters = (
  filters: { [key: string]: string[] },
  newFilter: { key: string; value: string }
): { [key: string]: string[] } => {
  const { key, value } = newFilter;
  const currentFilterValues = filters[key] ?? [];

  const isFilterIncluded = currentFilterValues.includes(value);

  const updatedFilterValues = isFilterIncluded
    ? currentFilterValues.filter((item) => item !== value)
    : [...currentFilterValues, value];

  const updatedFilters = { ...filters, [key]: updatedFilterValues };

  Object.keys(updatedFilters).forEach((filterKey) => {
    if (updatedFilters[filterKey].length === 0) {
      delete updatedFilters[filterKey];
    }
  });

  return updatedFilters;
};

export const buildSearchParams = (filters: {
  [key: string]: Array<string>;
}) => {
  const searchParams = new URLSearchParams();

  for (const filter in filters) {
    const joinedFilters = filters[filter].join("+");
    if (joinedFilters.length === 0) {
      searchParams.delete(filter);
    } else {
      searchParams.set(filter, joinedFilters);
    }
  }

  return searchParams;
};

export const getFilteredProducts = (
  filters: { [key: string]: Array<string> },
  products?: Array<Product>
): Array<Product> | undefined => {
  return products?.filter((product) => {
    return Object.keys(filters).every((filterKey) => {
      const filterValues = filters[filterKey];

      if (filterKey === "price") {
        return filterValues.some((priceRange) => {
          if (priceRange.includes("+")) {
            const min = parseInt(priceRange.replace("+", ""), 10);
            return product.price >= min;
          }

          const [min, max] = priceRange.split("-").map(Number);
          const productPrice = product.price;

          if (max) {
            return productPrice >= min && productPrice <= max;
          }
          return productPrice >= min;
        });
      }

      return filterValues.includes(String(product[filterKey as keyof Product]));
    });
  });
};

export const getFilterableFilters = (
  filters: { [key: string]: Array<string> }
): { [key: string]: Array<string> } => {
  const newFilters: { [key: string]: Array<string> } = {};

  for (const filter in filters) {
    if (filter !== "sortBy" && filter !== "page" && filter !== "search") {
      newFilters[filter] = filters[filter];
    }
  }

  return newFilters;
};

export const getSortedProducts = (
  criteria: "price-asc" | "price-desc" | "title-asc" | "title-desc",
  products?: Array<Product>
): Array<Product> | undefined => {
  if (!products) return;

  return [...products].sort((a, b) => {
    switch (criteria) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });
};

export const parseSearchParams = (searchParams: URLSearchParams) => {
  const initialFilters: { [key: string]: string[] } = {};

  searchParams.forEach((value, key) => {
    const decodedValue = decodeURIComponent(value).replace(/ /g, "+");
    const values = decodedValue.split("+");

    if (!initialFilters[key]) {
      initialFilters[key] = values;
    } else {
      initialFilters[key] = [...initialFilters[key], ...values];
    }
  });

  return initialFilters;
};

export const isValidSortCriteria = (value: string): value is SortCriteria => {
    return ["price-asc", "price-desc", "title-asc", "title-desc"].includes(value);
  };

export const calculateInitialQueryString = (value: string | null) => {
    if (value) {
        return `https://dummyjson.com/products/search?q=${value}`
    }

    return 'https://dummyjson.com/products';
}