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
import { useState } from "react"
import { Product, productSchema } from "@/data/schema"
import { FileEdit } from "lucide-react"

const MAX_IMAGE_SIZE = 5242880; // 5 MB
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
];

const formSchema = z.object({
  product_name: z
    .string()
    .min(1, {
      message: 'Required'
    }),
  image_url: z
      .custom<File>((val) => val instanceof File || null || undefined, "Required")
      .refine(
        (file) => file.size <= MAX_IMAGE_SIZE,
        `Each file size should be less than 5 MB.`
      )
      .refine(
        (file) => ALLOWED_IMAGE_TYPES.includes(file.type),
        "Only these types are allowed .jpg, .jpeg, .png and .webp"
      )
      .nullable(),
  description: z
    .string()
    .min(1, {
      message: 'Required'
    }),
  barcode: z
    .string()
    .min(1, {
      message: 'Required'
    }),
  reference: z
    .string()
    .min(1, {
      message: 'Required'
    }),
  buying_price: z
    .string()
    .min(1, {
      message: 'Required'
    }),
  selling_price: z
    .string()
    .min(1, {
      message: 'Required'
    }),
  quantity_in_stock: z
    .number(),
  value_added_tax: z
    .string()
    .min(1, {
      message: 'Required'
    }),
  categories: z
    .coerce
    .number(),
})

interface Props {
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
  product?: Product
}

export function ProductDialog( { setProducts, product }: Props ) {
  const [open, setOpen] = useState(false)

  const defaultValues = {
    product_name: "",
    image_url: null,
    description: "",
    barcode: "",
    reference: "",
    buying_price: "",
    selling_price: "",
    quantity_in_stock: 0,
    value_added_tax: "",
    categories: 1,
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: product || defaultValues,
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = new FormData()

    data.append("product_name", values.product_name)
    if (values.image_url != null)
      data.append("image_url", values.image_url)
    data.append("description", values.description)
    data.append("barcode", values.barcode)
    data.append("reference", values.reference)
    data.append("buying_price", values.buying_price)
    data.append("selling_price", values.selling_price)
    data.append("quantity_in_stock", values.quantity_in_stock.toString())
    data.append("value_added_tax", values.value_added_tax)
    data.append("categories", values.categories.toString())

    if (!product) {
      try {
        const response = await axios.post('http://localhost:8000/api/product/add', data)
        console.log('Response:', response.data)
        setProducts((products: Product[]) => [...products, response.data])

        console.log(values)
        setOpen(false)
      } catch (error) {
        console.error('Error:', error)
      }
    } else {
      try {
        const response = await axios.put('http://localhost:8000/api/product/' + product.id, data)
        console.log('Response:', response.data)
        setProducts(products => 
          products.map((item) =>
            item.id === product.id ? response.data : item))
        setOpen(false)

      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={
      (open) => {
        setOpen(open)
        form.clearErrors()
        form.reset()
      }
    }>
      <DialogTrigger asChild>
        {!product
          ? <Button variant="outline">Add Product</Button>
          : <Button size="icon">
              <FileEdit className="w-4 h-4"/>
            </Button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]" onPointerDownOutside={(event: any) => { event.preventDefault() }}>
        <DialogHeader>
          {!product
            ? <>
                <DialogTitle>Add Product</DialogTitle>
                <DialogDescription>
                  Fill all the fields
                </DialogDescription>
             </>
            : <DialogTitle>Modify Product</DialogTitle>
          }
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
              name="image_url"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">Image</FormLabel>
                  <FormControl className="col-span-3">
                    <Input
                      accept=".jpg, .jpeg, .png"
                      type="file"
                      onChange={(e) =>
                        field.onChange(e.target.files ? e.target.files[0] : null)
                      }
                    />
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
                  <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                    <FormControl className="col-span-3">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"1"}>m@example.com</SelectItem>
                      <SelectItem value={"2"}>m@google.com</SelectItem>
                      <SelectItem value={"3"}>m@support.com</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="col-start-2 col-span-3"/>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">
                {!product ? 'Add' : 'Modify'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
