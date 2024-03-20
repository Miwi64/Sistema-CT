"use client";
import { FilterData } from "@/components/students-table/students-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TabsContent } from "@/components/ui/tabs";
import { handleExcelDownload, handlePdfDownload } from "@/lib/export-functions";
import { VisibilityState } from "@tanstack/react-table";
import { ChevronDown, Save, Search } from "lucide-react";
import React from "react";

interface StartTabProps {
  urlFilter: string;
  columnVisibility: VisibilityState;
  filters: FilterData;
  setFilters: React.Dispatch<React.SetStateAction<FilterData>>;
}

const StartTab = ({ urlFilter, columnVisibility, filters, setFilters }: StartTabProps) => {

  const searchBar = () => (
    <div className="min-w-[200px] max-w-md">
      <div className="absolute p-3 text-muted-foreground">
        <Search size={18} />
      </div>
      <Input
        placeholder="Buscar por número de control..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        className="w-full pl-9"
      />
    </div>
  )

  return (
    <TabsContent className="mt-0" value="Inicio">
      <div
        className="rounded-t-none rounded-b-lg overflow-x-auto flex flex-row items-center gap-4 
                px-4 py-3 border bg-card text-card-foreground shadow-md"
      >
        <div className="hidden md:block">
          {searchBar()}
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex md:hidden">
              <Search className="mr-2 h-5 w-5" />
              Buscar
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            {searchBar()}
          </PopoverContent>
        </Popover>
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
                  handleExcelDownload(urlFilter, columnVisibility);
                }}
              >
                Excel
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handlePdfDownload(urlFilter, columnVisibility);
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
