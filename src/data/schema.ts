import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const clientSchema = z.object({
    id: z.number(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    phone_number: z.string(),
    address: z.string(),
})

export type Client = z.infer<typeof clientSchema>

export const productSchema = z.object({
    id: z.number(),
    product_name: z.string(),
    description: z.string(),
    barcode: z.string(),
    reference: z.string(),
    category: z.string(),
    image_url: z.string(),
    buying_price: z.string(),
    selling_price: z.string(),
    quantity_in_stock: z.number(),
    value_added_tax: z.string(),
})

export type Product = z.infer<typeof productSchema>

export const saleSchema = z.object({
    id: z.number(),
    sale_date: z.string(),
    total_amount: z.string(),
    client: z.number(),
    items: z.number(),
})

export type Sale = z.infer<typeof saleSchema>

export const invoiceSchema = z.object({
    id: z.number(),
    invoice_date: z.string(),
    due_date: z.string(),
    total_amount: z.string(),
    discount_amount: z.string(),
    is_paid: z.boolean(),
    client: z.number(),
    sale: z.number()
})
export type Invoice = z.infer<typeof invoiceSchema>