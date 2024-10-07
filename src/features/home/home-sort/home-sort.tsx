import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import useHomeContext from "@/hooks/home/use-home-context"

const sorts = [
  {
    key: "sortBy",
    value: "price-asc",
  },
  {
    key: "sortBy",
    value: "price-desc",
  },
  {
    key: "sortBy",
    value: "title-asc",
  },
  {
    key: "sortBy",
    value: "title-desc",
  },
]

const HomeSort = () => {
  const { handleSortChange } = useHomeContext();
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between md:self-end mb-4 md:mt-[28px]"
        >
          {value
            ? sorts.find((sort) => sort.value === value)?.value
            : "Sort products..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {sorts.map((sort) => (
                <CommandItem
                  key={sort.value}
                  value={sort.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    handleSortChange(sort.value)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === sort.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {sort.value}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default HomeSort;
