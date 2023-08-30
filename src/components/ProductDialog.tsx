import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
[
    {
        "id": 1,
        "": "Camera",
        "": "camera for taking pictures",
        "": "1234567890943245",
        "": "CA-129",
        "image_url": null,
        "": "-0.02",
        "": "-0.01",
        "": 2,
        "": "0.00",
        "": 1
    }
]
const formSchema = z.object({
  product_name: z.string(),
  description: z.string(),
  barcode: z.string(),
  reference: z.string(),
  buying_price: z.string(),
  selling_price: z.string(),
  quantity_in_stock: z.string(),
  value_added_tax: z.string(),
  categories: z.string(),
})

export function ProductDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    //const url = 'http://localhost:8000/api/client/add'
    //const data = values

    //try {
    //  const response = await axios.post(url, data)
    //  console.log('Response:', response.data)
    //} catch (error) {
    //  console.error('Error:', error)
    //}
    console.log(values)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Client</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Fill all the fields
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="product_name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">Product Name</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">Description</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="barcode"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">Barcode</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reference"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">Reference</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buying_price"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">Buying Price</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="" type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="selling_price"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">Selling Price</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="" type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity_in_stock"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">Quantity</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="" type="number" {...field} />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value_added_tax"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">Value Added Tax</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="" type="number" {...field} />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl className="col-span-3">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1" >Category 1</SelectItem>
                      <SelectItem value="2" >Category 2</SelectItem>
                      <SelectItem value="3" >Category 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="col-start-2 col-span-3"/>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
