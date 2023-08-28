import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import axios from 'axios'
import { ClientDialog } from '@/components/ClientDialog'

// Simulate a database read for tasks.
const client =
[
  {
    "id": 1,
    "first_name": "client",
    "last_name": "client",
    "email": "client@test.com",
    "phone_number": "1234567890",
    "address": "123 Somewhere, Earth"
  }
]

export function ClientTable({ className } : React.HTMLAttributes<HTMLDivElement>) {
  const [clients, setClients] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/client');
      const data = await response.data;~
      console.log(data);
      setClients(data);
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
            <h2 className="text-2xl font-bold tracking-tight">Client List</h2>
          </div>
          <div className="flex items-center space-x-2">
            <ClientDialog />
          </div>
        </div>
        <DataTable data={client} columns={columns} />
      </div>
  )
}
