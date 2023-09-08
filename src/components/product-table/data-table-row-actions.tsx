import { Row, Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

import { FileEdit, Trash2 } from "lucide-react"
import { productSchema } from "../../data/schema"
import axios from "axios"
import { ProductDialog } from "../ProductDialog"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  table: Table<TData>
}

export function DataTableRowActions<TData>({
  row,
  table,
}: DataTableRowActionsProps<TData>) {
  const product = productSchema.parse(row.original)
  
  const deleteProduct = async () => {
    try {
      const response = await axios.delete("http://localhost:8000/api/product/" + product.id)
      const data = await response.data;
      console.log(data);
      console.log(product)
      table.options.meta?.delProduct(row.index)
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  return (
    <div className="flex space-x-1">
      <ProductDialog setProducts={table.options.meta?.setProducts} product={product}/>
      <Button variant="destructive" size="icon" onClick={deleteProduct}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
 )
}