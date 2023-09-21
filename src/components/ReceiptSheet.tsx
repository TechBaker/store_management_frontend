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
import { ReceiptForm } from "./ReceiptForm"
import { Separator } from "./ui/separator"

export function ReceiptSheet() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">New Sale</Button>
      </SheetTrigger>
      <SheetContent className="w-4/6">
        <SheetHeader>
          <SheetTitle>New Sale</SheetTitle>
          <Separator className="my-6"/>
          <ReceiptForm/>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
