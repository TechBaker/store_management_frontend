import { ColumnDef } from "@tanstack/react-table"

// import { Checkbox } from "@/components/ui/checkbox"

import { Product } from "../../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Product>[] = [
//  {
//    id: "select",
//    header: ({ table }) => (
//      <Checkbox
//        checked={table.getIsAllPageRowsSelected()}
//        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//        aria-label="Select all"
//        className="translate-y-[2px]"
//      />
//    ),
//    cell: ({ row }) => (
//      <Checkbox
//        checked={row.getIsSelected()}
//        onCheckedChange={(value) => row.toggleSelected(!!value)}
//        aria-label="Select row"
//        className="translate-y-[2px]"
//      />
//    ),
//    enableSorting: false,
//    enableHiding: false,
//  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[40px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "product_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue("product_name")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[300px] items-center">
          <span>{row.getValue("description")}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "barcode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Barcode" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("barcode")}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "reference",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reference" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("reference")}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "buying_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Buying Price" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("buying_price")}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "selling_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Selling Price" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span>{row.getValue("selling_price")}</span>
        </div>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
  },
]
