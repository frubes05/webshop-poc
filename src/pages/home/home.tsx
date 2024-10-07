import { HomeContextProvider } from "@/contexts/home/home";
import HomeFilters from "@/features/home/home-filters/home-filters";
import HomePagination from "@/features/home/home-pagination/home-pagination";
import HomeProducts from "@/features/home/home-products/home-products";
import HomeSearch from "@/features/home/home-search/home-search";
import HomeSelectedFilters from "@/features/home/home-selected-filters/home-selected-filters";
import HomeSort from "@/features/home/home-sort/home-sort";

const Home = () => {
  return (
    <HomeContextProvider>
      <main className="mt-16">
        <h1 className="mb-16">Welcome to products section!</h1>
        <HomeSearch />
        <div className="flex justify-between items-start flex-col md:flex-row gap-0 mb-8 lg:mb-0">
          <HomeFilters />
          <HomeSort />
        </div>
        <HomeSelectedFilters />
        <HomeProducts />
        <HomePagination />
      </main>
    </HomeContextProvider>
  );
};

export default Home;
