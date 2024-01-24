"use client"
import { Table } from "@tanstack/react-table"
import { Input } from "../ui/input"
import { Search } from "lucide-react"

interface DataTableViewOptionsProps<TData> {
    table: Table<TData>
}
export function DataTableSearch<TData>({
    table,
}: DataTableViewOptionsProps<TData>) {
    return (
        <div className="min-w-[200px] max-w-md">
            <div className="absolute p-3 text-muted-foreground">
                <Search size={18} />
            </div>
            <Input
                placeholder="Buscar por número de control..."
                value={(table.getColumn("num_control")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("num_control")?.setFilterValue(event.target.value)
                }
                className="w-full pl-9"
            />
        </div>
    )
}

export default DataTableSearch