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
interface SaleActionsProps {
    employee: any
    onView?: (sale: any) => void
    onEdit?: (sale: any) => void
    onDelete?: (saleId: string) => void
}

const EmployeesAction: React.FC<SaleActionsProps> = ({ employee, onView, onEdit, onDelete }) => {
    const handleView = () => {

        onView?.(employee)
    }

    const handleEdit = () => {
        onEdit?.(employee)
    }


    const handleDelete = async () => {
        onDelete?.(employee)


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

export default EmployeesAction
