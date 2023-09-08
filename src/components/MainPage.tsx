import { Route, Routes } from "react-router-dom"
import { NavBar } from "./NavBar"
import { SideBar } from "./SideBar"
import { ProductTable } from "./product-table/ProductTable"
import { ClientTable } from "./client-table/ClientTable"
import { SaleTable } from "./sale-table/SaleTable"
import { InvoiceTable } from "./invoice-table/InvoiceTable"

export default function MainPage() {
  return (
    <>
      <div className="md:hidden">
      </div>
      <div className="hidden md:block">
        <NavBar />
        <div className="border-t">
          <div className="bg-background">
            <div className="flex ">
              <SideBar className="hidden lg:block w-48 border-r" />
              <Routes>
                <Route path="/" element={ <ProductTable /> } />
                <Route path="/products" element={ <ProductTable /> } />
                <Route path="/clients" element={ <ClientTable /> } />
                <Route path="/sales" element={ <SaleTable /> } />
                <Route path="/invoices" element={ <InvoiceTable /> } />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
