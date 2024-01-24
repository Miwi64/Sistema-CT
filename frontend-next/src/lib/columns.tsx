"use client"
import { ColumnHeader } from "@/components/column-header"
import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"

export type Student = {
  num_control: string,
  nombre: string,
  apellidop: string,
  apellidom?: string,
  carrera: string,
  sexo: string,
  CURP: string,
  num_folio?: string,
  fecha_registro_cert?: string,
  observaciones_cert?: string,
  num_titulo?: string,
  clave_plan?: string,
  fecha_acto?: string,
  fecha_registro_tit?: string,
  num_cedula?: string,
  observaciones_tit?: string
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
        aria-label="Seleccionar todo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "num_control",
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
    accessorKey: "apellidop",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Apellido Paterno" />
    ),
  },
  {
    accessorKey: "apellidom",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Apellido Materno" />
    ),
  },
  {
    accessorKey: "carrera",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Carrera" />
    ),
  },
  {
    accessorKey: "sexo",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Sexo" />
    ),
  },
  {
    accessorKey: "CURP",
    header: ({ column }) => (
      <ColumnHeader column={column} title="CURP" />
    ),
  },
  {
    accessorKey: "num_folio",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Número de folio" />
    ),
  },
  {
    accessorKey: "fecha_registro_cert",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Fecha de registro (Cert.)" />
    ),
  },
  {
    accessorKey: "observaciones_cert",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Observaciones (Cert.)" />
    ),
  },
  {
    accessorKey: "num_titulo",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Número de título" />
    ),
  },
  {
    accessorKey: "clave_plan",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Plan de estudios" />
    ),
  },
  {
    accessorKey: "fecha_acto",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Fecha del acto" />
    ),
  },
  {
    accessorKey: "fecha_registro_tit",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Fecha de registro (Título)" />
    ),
  },
  {
    accessorKey: "num_cedula",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Número de cédula" />
    ),
  },
  {
    accessorKey: "observaciones_tit",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Observaciones(Título)" />
    ),
  },
]
