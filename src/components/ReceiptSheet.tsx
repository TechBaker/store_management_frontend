import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import InvoiceForm from "./ReceiptForm"

export function ReceiptSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">New Receipt</Button>
      </SheetTrigger>
      <SheetContent className="w-4/6">
        <SheetHeader>
          <SheetTitle>New Receipt</SheetTitle>
        </SheetHeader>
        <InvoiceForm />
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

