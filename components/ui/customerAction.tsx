"use client"

import { MoreVertical, Eye, Pencil, Trash2, FileDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
interface CustomerActionsProps {
    customer: any
    onView?: (customer: any) => void
    onEdit?: (customer: any) => void
    onDelete?: (customerId: string) => void
}

const CustomerAction: React.FC<CustomerActionsProps> = ({ customer, onView, onEdit, onDelete }) => {
    const handleView = () => {

        onView?.(customer)
    }

    const handleEdit = () => {
        onEdit?.(customer)
    }


    const handleDelete = async () => {
        onDelete?.(customer)


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

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default CustomerAction
