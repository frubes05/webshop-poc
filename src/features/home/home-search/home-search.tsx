import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useHomeContext from "@/hooks/home/use-home-context"
 
const FormSchema = z.object({
  term: z.string()
})

function HomeSearch() {
  const { handleSearchChange } = useHomeContext();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      term: "",
    },
  })
 
  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.term.trim() === "") return;
    handleSearchChange(data.term);
  }
 
  return (
    <div className="flex justify-center items-center my-8">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-grow md:flex-initial md:w-auto flex-col md:flex-row w-3/4 flex justify-center items-center gap-2">
        <FormField
          control={form.control}
          name="term"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="w-full md:w-auto">
                <Input placeholder="Enter product name..." className="w-full md:min-w-[300px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full md:w-fit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}

export default HomeSearch;