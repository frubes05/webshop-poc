interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface Meta {
  createdAt: string;
  updatedAt: string;
}

interface Review {
  revierEmail: string;
  revierName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: number;
  availabilityStatus: string;
  brand: string;
  category: string;
  description: string;
  dimensions: Dimensions;
  discountPercentage: number;
  images: string[];
  meta: Meta;
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: string;
  reviews: Review[];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  weight: number;
}

export interface ProductList {
  products?: Product[];
}

export interface HomeContextType {
  filteredProducts: Product[];
  products: Product[];
  handleSortChange: (elem: string) => void;
  handlePageChange: (elem: number) => void;
  handleFiltersChange: (elem: { key: string; value: string }) => void;
  handleFilterRemove: (elem: { key: string; }) => void;
  handleFiltersRemove: () => void;
  handleSearchChange: (elem: string) => void;
  filters: {
    [key: string]: Array<string>
  };
  pagination: {
    totalPages: number;
    currentPage: number;
  };
}
