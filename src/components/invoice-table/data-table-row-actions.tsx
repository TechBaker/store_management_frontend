import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

import { FileEdit, Trash2 } from "lucide-react"
import { invoiceSchema } from "../../data/schema"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = invoiceSchema.parse(row.original)

  return (
    <div className="flex space-x-1">
      <Button size="icon">
        <FileEdit className="w-4 h-4"/>
      </Button>
      <Button variant="destructive" size="icon">
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
 )
}