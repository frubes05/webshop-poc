import { HomeContextType, ProductList } from "@/types/home/home";
import { fetcher } from "@/utils/fetcher";
import {
  buildSearchParams,
  calculateInitialQueryString,
  getFilterableFilters,
  getFilteredProducts,
  getSelectedFilters,
  getSortedProducts,
  isValidSortCriteria,
  parseSearchParams,
} from "@/utils/filters";
import { calculateTotalPages, paginateProducts } from "@/utils/pagination";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useSWRImmutable from "swr/immutable";

export const HomeContext = createContext<HomeContextType>({
  filteredProducts: [],
  products: [],
  handleSortChange: () => {},
  handlePageChange: () => {},
  handleFiltersChange: () => {},
  handleFilterRemove: () => {},
  handleSearchChange: () => {},
  handleFiltersRemove: () => {},
  filters: {},
  pagination: {
    totalPages: 1,
    currentPage: 1,
  },
});

export const HomeContextProvider = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const [filters, setFilters] = useState<{ [key: string]: Array<string> }>(
    getFilterableFilters(parseSearchParams(searchParams))
  );
  const page = Number(searchParams.get("page"));
  const [currentPage, setCurrentPage] = useState<number>(
    page === 0 ? 1 : page ?? 1
  );
  const existingSearch = searchParams.get("search");
  const [queryString, setQueryString] = useState(calculateInitialQueryString(existingSearch));

  const { data } = useSWRImmutable<ProductList>(queryString, fetcher);

  const handleFiltersChange = useCallback(
    (newFilter: { key: string; value: string }) => {
      const selectedFilters = getSelectedFilters(filters, newFilter);
      setFilters(selectedFilters);
      const filterParams = buildSearchParams(selectedFilters);
      const existingSearch = searchParams.get("search");
      if (existingSearch) {
        filterParams.set("search", existingSearch);
      }
      const stringFilterParams = filterParams.toString().replace(/%2B/g, "+");
      navigate(location.pathname + "?" + stringFilterParams.toString());
      setCurrentPage(1);
    },
    [filters, navigate, location, searchParams]
  );

  const handleSortChange = useCallback(
    (value: string) => {
      if (searchParams.get("sortBy") === value) {
        searchParams.delete("sortBy");
        setFilters((prev) => {
          const updatedFilters = { ...prev };
          delete updatedFilters["sortBy"];

          return updatedFilters;
        });
      } else {
        searchParams.set("sortBy", value);
        setFilters((prev) => ({
          ...prev,
          sortBy: [value],
        }));
      }
      const existingSearch = searchParams.get("search");
      if (existingSearch) {
        searchParams.set("search", existingSearch);
      }
      navigate(location.pathname + "?" + searchParams.toString());
      setCurrentPage(1);
    },
    [searchParams, navigate, location]
  );

  const handleFilterRemove = useCallback(
    (filter: { key: string }) => {
      const { key } = filter;
      setFilters((prev) => {
        const updatedFilters = { ...prev };
        delete updatedFilters[key];

        return updatedFilters;
      });
      searchParams.delete(key);
      const existingSearch = searchParams.get("search");
      if (existingSearch) {
        searchParams.set("search", existingSearch);
      }
      navigate(location.pathname + "?" + searchParams.toString());
      setCurrentPage(1);
    },
    [location, navigate, searchParams]
  );

  const handleFiltersRemove = useCallback(() => {
    const existingSearch = searchParams.get("search");
    if (existingSearch) {
        const newSearchParams = new URLSearchParams();
        newSearchParams.set("search", existingSearch);
        navigate(location.pathname + "?" + newSearchParams.toString());
    } else {
        navigate(location.pathname);
    }
    setFilters({});
    setCurrentPage(1);
  }, [location, navigate, searchParams]);

  const handlePageChange = useCallback(
    (value: number) => {
      searchParams.set("page", String(value));
      const existingSearch = searchParams.get("search");
      if (existingSearch) {
        searchParams.set("search", existingSearch);
      }
      navigate(location.pathname + "?" + searchParams.toString());
      setCurrentPage(value);
    },
    [searchParams, navigate, location]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set("search", value);
      setQueryString(calculateInitialQueryString(value));
      navigate(location.pathname + "?" + newSearchParams.toString());
    },
    [navigate, location]
  );

  const productsToDisplay = useMemo(() => {
    const filteredProducts = getFilteredProducts(
      getFilterableFilters(filters),
      data?.products
    );
    const hasFilteredProducts =
      filteredProducts && filteredProducts?.length > 0;
    const hasFiltersApplied = Object.keys(filters).length > 0;

    const sortCriteria = filters["sortBy"]?.[0];

    const sortedFilteredProducts = isValidSortCriteria(sortCriteria)
      ? getSortedProducts(sortCriteria, filteredProducts)
      : filteredProducts;

    return hasFilteredProducts
      ? sortedFilteredProducts || []
      : hasFiltersApplied
      ? []
      : data?.products ?? [];
  }, [data, filters]);

  const totalPages = useMemo(() => {
    return calculateTotalPages(productsToDisplay.length, 20);
  }, [productsToDisplay.length]);

  const paginatedProducts = useMemo(() => {
    return paginateProducts(productsToDisplay, currentPage, 20);
  }, [productsToDisplay, currentPage]);

  const value = useMemo(
    () => ({
      filteredProducts: paginatedProducts,
      products: data?.products ?? [],
      handleFiltersChange,
      handleSortChange,
      handleFilterRemove,
      handleFiltersRemove,
      handlePageChange,
      handleSearchChange,
      filters,
      pagination: {
        totalPages,
        currentPage,
      },
    }),
    [
      data,
      filters,
      handleFiltersChange,
      handleSortChange,
      handlePageChange,
      handleFilterRemove,
      handleFiltersRemove,
      handleSearchChange,
      paginatedProducts,
      totalPages,
      currentPage,
    ]
  );

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};
