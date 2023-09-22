import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { uid } from "uid"

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
import { toast } from "@/components/ui/use-toast"
import { Select, 
    SelectContent, 
    SelectTrigger, 
    SelectValue,
    SelectItem } from "./ui/select"
import { Separator } from "./ui/separator"
import { useState } from "react"
import { ReceiptItem } from "./ReceiptItem"
import axios from "axios"

const FormSchema = z.object({
  client: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  discount: z.coerce.number(),
  total: z.number(),
  payment_method: z.string()
})

type Item = {
  id: string,
  real_id: number,
  barcode: string,
  name: string,
  price: number,
  disc: number,
  qty: number,
  real_qty: number,
  t_price: number,
}

export function ReceiptForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      discount: 0,
      total: 0
    }
    
  })

  const findItem = async (barcode: string) => {
    try {
      const response = await axios.get('http://localhost:8000/api/product/barcode/' + barcode);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null
    }
  }
  
  const [items, setItems] = useState<Item[]>([])

  const addItemHandler = () => {
    setItems((prevItem) => [
      ...prevItem,
      {
        id: uid(6),
        barcode: "",
        name: "",
        price: 0.00,
        disc: 0.00,
        qty: 1,
        t_price: 0.00,
        real_id: 0,
        real_qty: 0,
      },
    ])
  }
  const deleteItemHandler = (id: string) => {
    setItems((prevItem) => prevItem.filter((item) => item.id !== id));
  }
  const editItemHandler = (event: any) => {
    const editedItem = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value,
    };

    const updateItems = async () => {
      let finalPrice = 0
      const updatedItems = await Promise.all(items.map(async (item: any) => {
        for (const key in item) {
          if (key === editedItem.name && item.id === editedItem.id) {
            item[key] = editedItem.value;
            if (key === 'barcode') {
              const result = await findItem(item[key])
              if (result !== null && ( item['qty'] <= result.quantity_in_stock)) {
                item['real_id'] = result.id
                item['real_qty'] = result.quantity_in_stock
                item['name'] = result.product_name
                item['price'] = result.selling_price
                item['t_price'] = (item['price'] - (item['price'] * (item['disc'] / 100))) * item['qty']
              } else {
                item.barcode = ""
              }
            } else if (key === 'disc') {
              item['t_price'] = (item['price'] - (item['price'] * (item['disc'] / 100))) * item['qty']
            } else if (key === 'qty') {
              if (item['qty'] <= item['real_qty']) {
                item['t_price'] = item['price'] * item['qty']
              } else {
                item['t_price'] = item['price'] * item['real_qty']
                item['qty'] = item['real_qty']
              }
            }
          }
        }
        finalPrice += item['t_price']
        return item;
      }));
      form.setValue('total', finalPrice * (1 - form.getValues('discount')/100))
      setItems(updatedItems);
    };
    updateItems()
  };

  const getTotal = () => {
    return items.reduce((accumulator, item) => accumulator + Number(item.t_price), 0)
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
        <div className="flex flex-flow space-x-20">
          <FormField
            control={form.control}
            name="client"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Client</FormLabel>
                <FormControl>
                  <Input placeholder="Client" {...field} />
                </FormControl>
                <FormDescription/>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Discount</FormLabel>
                <div className="flex flex-flow space-x-2 space-y-1">
                  <FormControl>
                    <Input type="number" step={1} min={0} placeholder="discount" {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            form.setValue('total', getTotal() * (1 - form.getValues('discount')/100))
                          }}/>
                  </FormControl>
                  <h1 className="">%</h1>
                </div>
                <FormDescription/>
                <FormMessage />
              </FormItem>
            )}
          />         
        </div>
        <div className="flex flex-flow space-x-20">
        <FormField
            control={form.control}
            name="payment_method"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Payment Method</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger >
                      <SelectValue placeholder="Payment Method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="on account">On Account</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="bank card">Bank Card</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription/>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
          control={form.control}
          name='total'
          render={({ field }) => (
            <FormItem className="w-1/2">
              <FormLabel>Total</FormLabel>
              <FormControl>
                <Input placeholder="Total" className="h-[80px]" readOnly {...field} />
              </FormControl>
              <FormDescription/>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="flex flex-flow space-x-20">
          <Button type="submit">Submit</Button>
          <Button type="button">Print</Button>
        </div>
        <Separator/>
        <table className="w-full p-4 text-left">
          <thead>
            <tr className="border-b border-gray-900/10 text-sm md:text-base">
              <th>BAR CODE</th>
              <th>NAME</th>
              <th className="text-center">PRICE</th>
              <th className="text-center">DISC.</th>
              <th className="text-center">QTY</th>
              <th className="text-center">T. PRICE</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <ReceiptItem
                key={item.id}
                id={item.id}
                barcode={item.barcode}
                name={item.name}
                price={item.price}
                disc={item.disc}
                qty={item.qty}
                t_price={item.t_price}
                onDeleteItem={deleteItemHandler}
                onEdtiItem={editItemHandler}
              />
            ))}
          </tbody>
        </table>
        <Button
          type="button"
          onClick={addItemHandler}
        >
          +
        </Button>
      </form>
    </Form>
  )
}
