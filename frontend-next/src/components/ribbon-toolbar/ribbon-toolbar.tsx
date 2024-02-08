"use client";
import jsPDF from "jspdf";

import { File, Filter, Home } from "lucide-react";
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
      <FilterTab
        filters={filters}
        setFilters={setFilters}
        setPaginationData={setData}
      />
      <PageTab paginationData={data} setPaginationData={setData} />
    </Tabs>
  );
}
