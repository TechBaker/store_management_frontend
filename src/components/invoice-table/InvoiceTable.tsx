import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import axios from 'axios'

// Simulate a database read for tasks.
const invoice =
[
  {
    "id": 1,
    "invoice_date": "2023-08-16T13:58:31.540200Z",
    "due_date": "2023-08-16T13:49:40Z",
    "total_amount": "0.01",
    "discount_amount": "0.01",
    "is_paid": true,
    "client": 1,
    "sale": 1
  }
]

export function InvoiceTable({ className } : React.HTMLAttributes<HTMLDivElement>) {
  const [invoices, setInvoice] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/product');
      const data = await response.data;
      console.log(data);
      setInvoice(data);
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
            <h2 className="text-2xl font-bold tracking-tight">Invoice List</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
          </div>
        </div>
        <DataTable data={invoice} columns={columns} />
      </div>
  )
}
