import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { Label } from "../ui/label";
import clsx from "clsx";

interface FilterProps {
  filterName: string;
  filterCode: string;
  filterOptions: Array<string>;
  selectedFilters: Array<string>;
  handleFiltersChange: (elem: { key: string; value: string }) => void;
}

const Filter = ({
  filterName,
  filterCode,
  filterOptions,
  selectedFilters,
  handleFiltersChange,
}: FilterProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full sm:w-[200px] justify-between border-gray-300 hover:border-gray-500 focus:ring-2 focus:ring-gray-200 rounded-lg"
        >
          {`Choose ${filterName}`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full sm:w-[200px] p-2 bg-white shadow-lg border border-gray-200 rounded-lg">
        <Command>
          <CommandInput
            placeholder={`Search ${filterName}`}
            className="mb-2 p-2 rounded border border-gray-300 focus:outline-none focus:border-gray-500"
          />
          <CommandList>
            <CommandEmpty>{`No ${filterName} found.`}</CommandEmpty>
            <CommandGroup className="space-y-2">
              {filterOptions?.map((filter) => (
                <CommandItem
                  key={filter}
                  value={filter}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id={filter}
                    name={filter}
                    checked={selectedFilters?.includes(filter) || false}
                    onChange={() => {
                      handleFiltersChange({ key: filterCode, value: filter });
                    }}
                    className={clsx("mr-2 h-4 w-4 bg-white border border-gray-300 rounded  focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer", {
                        "appearance-none": !selectedFilters?.includes(filter)
                    })}
                  />
                  <Label htmlFor={filter} className="text-sm font-medium cursor-pointer">
                    {filter}
                  </Label>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Filter;
