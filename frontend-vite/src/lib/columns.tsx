import { ColumnHeader } from "@/components/column-header"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"

export type Student = {
  numeroControl: string,
  nombre: string,
  apellido: string,
  carrera: string,
  folio: string,
  titulo: string,
}

export const columns: ColumnDef<Student>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "numeroControl",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Número de control" />
    ),
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: "apellido",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Apellido" />
    ),
  },
  {
    accessorKey: "carrera",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Carrera" />
    ),
  },
  {
    accessorKey: "folio",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Número de folio" />
    ),
  },
  {
    accessorKey: "titulo",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Número de título" />
    ),
  },
]
