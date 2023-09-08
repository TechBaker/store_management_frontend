import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import axios from 'axios'
import { ProductDialog } from "../ProductDialog";
import { Product } from "@/data/schema";

// Simulate a database read for tasks.
const product =
[
  {
    "id": 1,
    "product_name": "Camera",
    "description": "Camera for taking pictures",
    "barcode": "1234567890943245",
    "reference": "CA-129",
    "category": "Electronics",
    "image_url": "/media/products/product_1.jpg",
    "buying_price": "2000.00",
    "selling_price": "3000.00",
    "is_paid": false,
    "quantity_in_stock": 20,
    "value_added_tax": "20.00"
  }
]

export function ProductTable({ className } : React.HTMLAttributes<HTMLDivElement>) {
  const [products, setProducts] = useState<Product[]>([])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products');
      const data = await response.data;
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData()
  }, [])

  return (
      <div className={cn("hidden h-full flex-1 flex-col space-y-8 p-8 md:flex", className)}>
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Products List</h2>
          </div>
          <div className="flex items-center space-x-2">
            <ProductDialog setProducts={setProducts} />
          </div>
        </div>
        <DataTable data={products} columns={columns} setProducts={setProducts} />
      </div>
  )
}
