import { Row, Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

import { FileEdit, Trash2 } from "lucide-react"
import { clientSchema } from "../../data/schema"
import axios from "axios"
import { ClientDialog } from "../ClientDialog"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>,
  table: Table<TData>
}

export function DataTableRowActions<TData>({
  row,
  table,
}: DataTableRowActionsProps<TData>) {
  const client = clientSchema.parse(row.original)

  const deleteClient = async () => {
    try {
      const response = await axios.delete("http://localhost:8000/api/client/" + client.id)
      const data = await response.data;
      console.log(data);
      console.log(client)
      table.options.meta?.delClient(row.index)
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div className="flex space-x-1">
      <ClientDialog setClients={table.options.meta?.setClients} client={client}/>
      <Button variant="destructive" size="icon" onClick={deleteClient}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
 )
}