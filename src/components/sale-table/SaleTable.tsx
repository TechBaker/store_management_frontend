import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import axios from 'axios'

// Simulate a database read for tasks.
const sale =
[
  {
    "id": 1,
    "sale_date": "2023-08-04T12:29:58.935054Z",
    "total_amount": "2000.00",
    "client": 1,
    "items": 1
  }
]

export function SaleTable({ className } : React.HTMLAttributes<HTMLDivElement>) {
  const [products, setProducts] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/sale');
      const data = await response.data;~
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //useEffect(() => {
  //  fetchData()
  //}, [])

  return (
      <div className={cn("hidden h-full flex-1 flex-col space-y-8 p-8 md:flex", className)}>
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Sale List</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
          </div>
        </div>
        <DataTable data={sale} columns={columns} />
      </div>
  )
}
