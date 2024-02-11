"use client";
import SearchBar from "@/components/search-bar";
import { FilterData } from "@/components/students-table/students-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TabsContent } from "@/components/ui/tabs";
import { handleExcelDownload, handlePdfDownload2 } from "@/lib/export-functions";
import { ChevronDown, FileDown, Save, Search } from "lucide-react";
import React from "react";

interface StartTabProps {
  urlFilter: string;
  filters: FilterData;
  setFilters: React.Dispatch<React.SetStateAction<FilterData>>;
}

const StartTab = ({ urlFilter, filters, setFilters }: StartTabProps) => {
  return (
    <TabsContent className="mt-0" value="Inicio">
      <div
        className="rounded-t-none rounded-b-lg overflow-x-auto flex flex-row items-center gap-4 
                px-4 py-3 border bg-card text-card-foreground shadow-md"
      >
        <div className="hidden md:block">
          <SearchBar setFilters={setFilters} filters={filters} />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex md:hidden">
              <Search className="mr-2 h-5 w-5" />
              Buscar
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <SearchBar setFilters={setFilters} filters={filters} />
          </PopoverContent>
        </Popover>
        <Button variant="outline" asChild>
          <a href="/export">
            <FileDown className="sm:mr-2 h-5 w-5" />
            <span className="sm:block hidden">Generar Reporte</span>
          </a>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="flex">
              <Save className="sm:mr-2 h-5 w-5" />
              <span className="hidden sm:block">Guardar como</span>
              <ChevronDown className="sm:ml-5 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  handleExcelDownload(urlFilter);
                }}
              >
                Excel
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handlePdfDownload2(urlFilter);
                }}
              >
                PDF
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TabsContent>
  );
};

export default StartTab;
