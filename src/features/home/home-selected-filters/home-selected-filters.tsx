import { Button } from "@/components/ui/button";
import { FaTimes } from "react-icons/fa"; 
import useHomeContext from "@/hooks/home/use-home-context";

const HomeSelectedFilters = () => {
  const { filters, handleFilterRemove, handleFiltersRemove } = useHomeContext();

  if (Object.keys(filters).length === 0) return null;

  return (
    <ul className="flex justify-start gap-4 mb-8 flex-wrap md:gap-6 items-center">
      {Object.keys(filters).map((name) => (
        <li key={name} className="flex items-center">
          <Button
            onClick={() => handleFilterRemove({ key: name })}
            variant="secondary"
            className="flex items-center gap-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-full px-4 py-1 hover:bg-gray-200 transition-all"
          >
            <span className="font-medium">{name}:</span>
            <span className="truncate max-w-[100px] italic">{filters[name].join(", ")}</span>
            <FaTimes className="text-sm ml-2 text-gray-500 hover:text-gray-700" />
          </Button>
        </li>
      ))}
      <li className="md:ml-auto">
        <Button
          onClick={handleFiltersRemove}
          variant="secondary"
          className="flex items-center gap-2 bg-red-100 text-red-600 border border-red-300 rounded-full px-4 py-1 hover:bg-red-200 transition-all"
        >
          <span>Remove all filters</span>
          <FaTimes className="text-sm" />
        </Button>
      </li>
    </ul>
  );
};

export default HomeSelectedFilters;
