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
            <div className="w-full lg:max-w-6xl">
                <div className="absolute p-2 text-muted-foreground">
                    <Search size={18} />
                </div>
                <Input
                    placeholder="Buscar por número de control..."
                    value={(table.getColumn("numeroControl")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("numeroControl")?.setFilterValue(event.target.value)
                    }
                    className="w-full pl-9"
                />
            </div>
    )
}

export default DataTableSearch