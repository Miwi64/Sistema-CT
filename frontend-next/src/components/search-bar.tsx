"use client"
import { FilterData } from "./students-table/students-table"
import { Input } from "./ui/input"
import { Search } from "lucide-react"

interface SearchBarProps {
    setFilters: React.Dispatch<React.SetStateAction<FilterData>>
    filters:FilterData
  }

export function SearchBar({filters, setFilters}: SearchBarProps) {
    return (
        <div className="min-w-[200px] max-w-md">
            <div className="absolute p-3 text-muted-foreground">
                <Search size={18} />
            </div>
            <Input
                placeholder="Buscar por número de control..."
                value={filters.search}
                onChange={(e)=>setFilters({...filters, search: e.target.value})}
                className="w-full pl-9"
            />
        </div>
    )
}

export default SearchBar