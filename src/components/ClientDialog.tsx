import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"

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
import axios from "axios"
import { Client } from "@/data/schema"
import { FileEdit, Trash2 } from "lucide-react"

const formSchema = z.object({
  first_name: z
    .string()
    .min(1, {
      message: "Required"
    }),
  last_name: z
    .string()
    .min(1, {
      message: "Required"
    }),
  email: z
    .string()
    .email(),
  address: z
    .string()
    .min(1, {
      message: "Required"
    }),
  phone_number: z
    .string()
    .min(1, {
      message: "Required"
    }),
  balance: z
    .string()
    .min(1, {
      message: "Required"
    }),
})

interface Props {
  setClients: React.Dispatch<React.SetStateAction<Client[]>>
  client?: Client
}

export function ClientDialog( { setClients, client }: Props ) {
  const [open, setOpen] = useState(false)

  const defaultValues = {
    first_name: "",
    last_name: "",
    email: "empty@empty.com",
    address: "",
    phone_number: "",
    balance: "0.00",
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: client || defaultValues,
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {

    if (!client) {
      try {
        const response = await axios.post('http://localhost:8000/api/client/add', values)
        console.log('Response:', response.data)
        setClients(clients => [...clients, response.data])
        setOpen(false)
      } catch (error) {
        console.error('Error:', error)
      }
      console.log(values)
    } else {
      try {
        const response = await axios.put('http://localhost:8000/api/client/' + client.id, values)
        console.log('Response:', response.data)
        setClients(clients => 
          clients.map((item) =>
            item.id === client.id ? response.data : item))
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
        {!client
          ? <Button variant="outline">Add Client</Button>
          : <Button size="icon">
              <FileEdit className="w-4 h-4"/>
            </Button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]" onPointerDownOutside={(event: any) => { event.preventDefault() }}>
        <DialogHeader>
          {!client
            ? <>
                <DialogTitle>Add Client</DialogTitle>
                <DialogDescription>
                  Fill all the fields
                </DialogDescription>
              </>
            : <DialogTitle>Modify Client</DialogTitle>
          }
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">First Name</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">Last Name</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">Email</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="" type="email" {...field} />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">Address</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">Phone Number</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="" type="tel" {...field} />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">Starting Balance</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="" type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3"/>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">
                {!client ? 'Add' : 'Modify'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
