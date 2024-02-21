"use client";
import { ColumnHeader } from "@/components/column-header";
import OptionsButton from "@/components/options-button";
import { ColumnDef } from "@tanstack/react-table";

export type Student = {
  id_alumno: string;
  num_control: string;
  nombre: string;
  apellidop: string;
  apellidom?: string;
  carrera_fk: string;
  periodo_ingreso: string; //
  periodo_egreso: string; //
  estado_nacimiento: string; //
  fecha_nacimiento: string; //
  nombre_carrera: string;
  carrera: string;
  sexo: string;
  CURP: string;
  certificado_fk?: string;
  num_folio?: string;
  fecha_registro_cert?: string;
  observaciones_cert?: string;
  titulo_fk?: string;
  num_titulo?: string;
  clave_plan?: string;
  fecha_acto?: string;
  fecha_registro_tit?: string;
  num_cedula?: string;
  observaciones_tit?: string;
};

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "num_control",
    header: "No. control"
  },
  {
    accessorKey: "nombre",
    header: "Nombre"
  },
  {
    accessorKey: "apellidop",
    header:
      "A.Paterno"
  },
  {
    accessorKey: "apellidom",
    header: "A.Materno"
  },
  {
    accessorKey: "sexo",
    header: "Sexo",
  },
  {
    accessorKey: "fecha_nacimiento",
    header:
      "Fecha de nacimiento"
    ,
  },
  {
    accessorKey: "estado_nacimiento",
    header:
      "Estado de nacimiento"
    ,
  },
  {
    accessorKey: "CURP",
    header: ({ column }) => "CURP"
  },
  {
    accessorKey: "nombre_carrera",
    header: ({ column }) => "Carrera",
  },
  {
    accessorKey: "periodo_ingreso",
    header:
      "Ingreso"
  },
  {
    accessorKey: "periodo_egreso",
    header:
      "Egreso"
  },
  {
    accessorKey: "num_folio",
    header:
      "Folio"
  },
  {
    accessorKey: "fecha_registro_cert",
    header:
      "(Certificado) Registro"
  },
  {
    accessorKey: "observaciones_cert",
    header:
      "(Certificado) Observaciones"
  },
  {
    accessorKey: "num_titulo",
    header:
      "Título"
  },
  {
    accessorKey: "clave_plan",
    header:
      "Plan de estudios"
  },
  {
    accessorKey: "fecha_acto",
    header:
      "Fecha del acto"
  },
  {
    accessorKey: "fecha_registro_tit",
    header:
      "(Título) Registro"
  },
  {
    accessorKey: "num_cedula",
    header:
      "Cédula"
  },
  {
    accessorKey: "observaciones_tit",
    header:
      "(Título) Observaciones"
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <OptionsButton
        id={row.getValue("num_control")}
        title={row.getValue("num_titulo")}
        certificate={row.getValue("num_folio")}
      />
    ),
    size: 20,
    enableResizing: false,
    enableSorting: false,
    enableHiding: false,
  },
];
