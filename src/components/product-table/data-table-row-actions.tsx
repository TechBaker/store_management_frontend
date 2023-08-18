import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

import { FileEdit, Trash2 } from "lucide-react"
import { productSchema } from "../../data/schema"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const task = productSchema.parse(row.original)

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
//    <DropdownMenu>
//      <DropdownMenuTrigger asChild>
//        <Button
//          variant="ghost"
//          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
//        >
//          <DotsHorizontalIcon className="h-4 w-4" />
//          <span className="sr-only">Open menu</span>
//        </Button>
//      </DropdownMenuTrigger>
//      <DropdownMenuContent align="end" className="w-[160px]">
//        <DropdownMenuItem>Edit</DropdownMenuItem>
//        <DropdownMenuItem>Make a copy</DropdownMenuItem>
//        <DropdownMenuItem>Favorite</DropdownMenuItem>
//        <DropdownMenuSeparator />
//        <DropdownMenuSub>
//          <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
//          <DropdownMenuSubContent>
//            <DropdownMenuRadioGroup value={task.product_name}>
//              {labels.map((label) => (
//                <DropdownMenuRadioItem key={label.value} value={label.value}>
//                  {label.label}
//                </DropdownMenuRadioItem>
//              ))}
//            </DropdownMenuRadioGroup>
//          </DropdownMenuSubContent>
//        </DropdownMenuSub>
//        <DropdownMenuSeparator />
//        <DropdownMenuItem>
//          Delete
//          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
//        </DropdownMenuItem>
//      </DropdownMenuContent>
//    </DropdownMenu>
 