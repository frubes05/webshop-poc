import Filter from "@/components/filter/filter";
import useHomeContext from "@/hooks/home/use-home-context";
import { getPriceFilter, getValueFilter } from "@/utils/filters";

const HomeFilters = () => {
  const { products, handleFiltersChange, filters } = useHomeContext();

  const categories = getValueFilter(products, "category");
  const prices = getPriceFilter(products);

  return (
    <div className="text-left mb-4">
      <p className="text-lg font-semibold mb-4 underline">Filters:</p>
      <ul className="flex justify-start gap-4">
        <Filter filterName="Categories" filterCode="category" filterOptions={categories.category} selectedFilters={filters["category"]} handleFiltersChange={handleFiltersChange} />
        <Filter filterName="Prices" filterCode="price" filterOptions={prices.price} selectedFilters={filters["price"]} handleFiltersChange={handleFiltersChange} />
      </ul>
    </div>
  );
};

export default HomeFilters;
