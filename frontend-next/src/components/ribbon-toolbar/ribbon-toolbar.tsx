"use client";
import jsPDF from "jspdf";

import {
  File,
  Filter,
  Home,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { PaginationData } from "../pagination-handler";
import { FilterData } from "../students-table/students-table";
import StartTab from "./tabs/start-tab";
import FilterTab from "./tabs/filter-tab";
import PageTab from "./tabs/page-tab";

interface RibbonTooolbarProps {
  data: PaginationData;
  setData: React.Dispatch<React.SetStateAction<PaginationData>>;
  filters: FilterData;
  setFilters: React.Dispatch<React.SetStateAction<FilterData>>;
}

export function RibbonToolbar({
  data,
  setData,
  filters,
  setFilters,
}: RibbonTooolbarProps) {

  /*   const generatePDF = (data: any[]) => {
    const doc = new jsPDF();

    // Define table columns
    const tableColumns = [
      "id_alumno",
      "nombre",
      "apellidop",
      "apellidom",
      "num_control",
      "sexo",
      "CURP",
      "periodo_ingreso",
      "periodo_egreso",
      "estado_nacimiento",
      "fecha_nacimiento",
      "carrera fk",
      "nombre_carrera",
      "certificado_fk",
      "num_folio",
      "fecha_registro_cert",
      "observaciones_cert",
      "titulo_fk",
      "num_titulo",
      "clave_plan",
      "fecha_acto",
      "fecha_registro_tit",
      "num_cedula",
      "observaciones_tit",
    ];

    // Calculate table width and height
    const tableWidth = doc.internal.pageSize.getWidth() - 20;
    const tableHeight = 20 + 15 * data.length * tableColumns.length;

    // Calculate cell width and height
    const cellWidth = tableWidth / tableColumns.length;
    const cellHeight = tableHeight / (data.length * tableColumns.length);

    // Draw table header
    for (let i = 0; i < tableColumns.length; i++) {
      const column = tableColumns[i];
      const x = 10 + i * cellWidth;
      const y = 20;
      doc.text(column, x, y);
    }

    // Draw table rows
    data.forEach((row, index) => {
      const x = 10;
      const y = 20 + (index + 1) * tableHeight;

      // Draw property columns
      for (const property in row) {
        const x1 = x;
        const y1 = y + (tableColumns.indexOf(property) + 1) * cellHeight;
        doc.text(String(row[property]), x1, y1);
      }

      // Add a new page for the next object
      if (index < data.length - 1) {
        doc.addPage();
      }
    });

    // Save the PDF file
    doc.save("my-data.pdf");
  }; */

  return (
    <Tabs defaultValue="Inicio" className="min-w-[200px]">
      <TabsList
        className="w-full rounded-none flex flex-row justify-start 
      items-center overflow-x-auto overflow-y-visible"
      >
        <TabsTrigger value="Inicio">
          <Home size={14} className="mr-2" />
          Inicio
        </TabsTrigger>
        <TabsTrigger value="Filtrar">
          <Filter size={14} className="mr-2" />
          Filtrar
        </TabsTrigger>
        <TabsTrigger value="Pagina">
          <File size={14} className="mr-2" />
          Página
        </TabsTrigger>
      </TabsList>

      <StartTab filters={filters} setFilters={setFilters} />
      <FilterTab filters={filters} setFilters={setFilters} setPaginationData={setData} />
      <PageTab paginationData={data} setPaginationData={setData} />
    </Tabs>
  );
}
