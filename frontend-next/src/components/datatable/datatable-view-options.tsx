"use client"

import { Table } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { BookText, BookType, Columns, ScrollText, UserRound, View, ViewIcon } from "lucide-react"
import { CERTIFICATE_COLUMNS, STUDENT_COLUMNS, TITLE_COLUMNS } from "@/lib/constants"


interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex text-muted-foreground"
        >
          <Columns className="sm:mr-2 h-4 w-4" />
          <span className="hidden sm:block">Mostrar/Ocultar</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Mostrar columnas</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <UserRound className="mr-2 h-4 w-4" />
            <span>Estudiante</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {
                STUDENT_COLUMNS.map((s) => (<DropdownMenuCheckboxItem
                  key={table.getColumn(s.value)?.id}
                  className="capitalize"
                  checked={table.getColumn(s.value)?.getIsVisible()}
                  onCheckedChange={(value) => table.getColumn(s.value)?.toggleVisibility(!!value)}
                >
                  {s.text}
                </DropdownMenuCheckboxItem>))
              }
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <BookType className="mr-2 h-4 w-4" />
            <span>Título</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {
                TITLE_COLUMNS.map((t) => (<DropdownMenuCheckboxItem
                  key={table.getColumn(t.value)?.id}
                  className="capitalize"
                  checked={table.getColumn(t.value)?.getIsVisible()}
                  onCheckedChange={(value) => table.getColumn(t.value)?.toggleVisibility(!!value)}
                >
                  {t.text}
                </DropdownMenuCheckboxItem>))
              }
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <ScrollText className="mr-2 h-4 w-4" />
            <span>Certificado</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {
                CERTIFICATE_COLUMNS.map((c) => (<DropdownMenuCheckboxItem
                  key={table.getColumn(c.value)?.id}
                  className="capitalize"
                  checked={table.getColumn(c.value)?.getIsVisible()}
                  onCheckedChange={(value) => table.getColumn(c.value)?.toggleVisibility(!!value)}
                >
                  {c.text}
                </DropdownMenuCheckboxItem>))
              }
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
