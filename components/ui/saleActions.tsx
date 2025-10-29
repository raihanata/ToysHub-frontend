"use client"

import { MoreVertical, Eye, Pencil, Trash2,FileDown  } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
interface SaleActionsProps {
  sale: any
  onView?: (sale: any) => void
  onEdit?: (sale: any) => void
  onDelete?: (saleId: string) => void
}

const SaleActions: React.FC<SaleActionsProps> = ({ sale, onView, onEdit, onDelete }) => {
  const handleView = () => {
    console.log("View sale:", sale._id)
    onView?.(sale) 
  }

  const handleEdit = () => {
    console.log("Edit sale:", sale._id)
    onEdit?.(sale)
  }
  
   const handleDownloadPDF = () => {
    const doc = new jsPDF()

    doc.setFontSize(16)
    doc.text("Sale Invoice", 14, 15)

    doc.setFontSize(12)
    doc.text(`Customer: ${sale.customerId?.customerName || "N/A"}`, 14, 25)
    doc.text(`Date: ${new Date(sale.saleDate).toLocaleString()}`, 14, 32)
    doc.text(`Payment: ${sale.paymentMethod}`, 14, 39)

    const productRows = sale.products.map((p: any) => [
      p.productId?.productName || "Unknown",
      p.quantity,
      `₹${p.price}`,
      `₹${p.total}`,
    ])

    autoTable(doc, {
      startY: 45,
      head: [["Product", "Qty", "Price", "Total"]],
      body: productRows,
    })

    const finalY = (doc as any).lastAutoTable.finalY + 10
    doc.text(`Subtotal: ₹${sale.amount?.subtotal}`, 140, finalY)
    doc.text(`Tax: ₹${sale.amount?.tax}`, 140, finalY + 6)
    doc.text(`Discount: ₹${sale.amount?.discount}`, 140, finalY + 12)
    doc.text(`Total: ₹${sale.amount?.totalAmount}`, 140, finalY + 20)

    doc.save(`Invoice_${sale._id}.pdf`)
  }
  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this sale?")
    if (!confirmDelete) return

    
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleView}>
          <Eye className="h-4 w-4 mr-2" /> View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleEdit}>
          <Pencil className="h-4 w-4 mr-2" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
          <Trash2 className="h-4 w-4 mr-2" /> Delete
        </DropdownMenuItem>
         <DropdownMenuItem onClick={handleDownloadPDF}>
          <FileDown className="h-4 w-4 mr-2" /> Download PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SaleActions
