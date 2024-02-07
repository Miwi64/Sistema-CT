"use client"
import SearchBar from '@/components/search-bar'
import { FilterData } from '@/components/students-table/students-table'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { TabsContent } from '@/components/ui/tabs'
import { Student } from '@/lib/columns'
import jsPDF from 'jspdf'
import { ChevronDown, FileDown, Save, Search } from 'lucide-react'
import React from 'react'

interface StartTabProps {
    filters: FilterData;
    setFilters: React.Dispatch<React.SetStateAction<FilterData>>;
}

const StartTab = ({ filters, setFilters }: StartTabProps) => {

    //PDF
    const fetchData = async () => {
        const orderFilter = `&order_by=${filters.order.type}${filters.order.criteria}`;
        const docFilter =
            filters.doc === "C"
                ? "&certificado_fk_null=false"
                : filters.doc === "T"
                    ? "&titulo_fk_null=false"
                    : "";
        const sexFilter =
            filters.sex === "M" ? "&sexo=M" : filters.sex === "F" ? "&sexo=F" : "";
        const checkedCareers = filters.careers.filter((career) => career.checked);
        const careerFilter =
            checkedCareers.length > 0
                ? `&carrera_fk=${checkedCareers
                    .map((career) => career.value)
                    .join(",")}`
                : "";
        const urlFilters = `${docFilter}${sexFilter}${careerFilter}${orderFilter}&num_control=${filters.search}`;
        //console.log(urlFilters);
        const res = await fetch(
            "http://127.0.0.1:8000/alumnos/?" + `${urlFilters}`
        );
        const data = await res.json();
        return data;
    };
    //CSV
    function jsonToCsv(jsonData: Student[]) {
        const headers = Object.keys(jsonData[0]);
        let csvContent = headers.join(",") + "\n";

        jsonData.forEach((item) => {
            let values = headers
                .map((header) => {
                    const cell = item[header] || "";
                    return typeof cell === "string"
                        ? `"${cell.replace(/"/g, '""')}"`
                        : cell;
                })
                .join(",");

            csvContent += values + "\n";
        });

        return csvContent;
    }

    const handleExcelDownload = async () => {
        const orderFilter = `&order_by=${filters.order.type}${filters.order.criteria}`;
        const docFilter =
            filters.doc === "C"
                ? "&certificado_fk_null=false"
                : filters.doc === "T"
                    ? "&titulo_fk_null=false"
                    : "";
        const sexFilter =
            filters.sex === "M" ? "&sexo=M" : filters.sex === "F" ? "&sexo=F" : "";
        const checkedCareers = filters.careers.filter((career) => career.checked);
        const careerFilter =
            checkedCareers.length > 0
                ? `&carrera_fk=${checkedCareers
                    .map((career) => career.value)
                    .join(",")}`
                : "";
        const urlFilters = `${docFilter}${sexFilter}${careerFilter}${orderFilter}&num_control=${filters.search}`;
        //console.log(urlFilters);
        fetch("http://127.0.0.1:8000/alumnos/?" + `${urlFilters}`)
            .then((response) => response.json())
            .then((data) => {
                const csv = jsonToCsv(data);
                const blob = new Blob([csv], { type: "text/csv" });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = "archivo.csv";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            });
    };

    const handlePdfDownload = async () => {
        const orderFilter = `&order_by=${filters.order.type}${filters.order.criteria}`;
        const docFilter =
            filters.doc === "C"
                ? "&certificado_fk_null=false"
                : filters.doc === "T"
                    ? "&titulo_fk_null=false"
                    : "";
        const sexFilter =
            filters.sex === "M" ? "&sexo=M" : filters.sex === "F" ? "&sexo=F" : "";
        const checkedCareers = filters.careers.filter((career) => career.checked);
        const careerFilter =
            checkedCareers.length > 0
                ? `&carrera_fk=${checkedCareers
                    .map((career) => career.value)
                    .join(",")}`
                : "";
        const urlFilters = `${docFilter}${sexFilter}${careerFilter}${orderFilter}&num_control=${filters.search}`;
        fetch("http://127.0.0.1:8000/alumnos/?" + `${urlFilters}`)
            .then((response) => response.json())
            .then((data) => {
                const csv = jsonToCsv(data);
                const doc = new jsPDF();
                const lines = csv.trim().split("\n");
                const colCount = lines[0].split(",").length;
                const cellWidth = (doc.internal.pageSize.width - 10) / colCount;
                lines.shift();

                lines.forEach((line) => {
                    const cells = line.split(",");

                    cells.forEach((cell, idx) => {
                        doc.text(cell, 10, (idx + 1) * 10);
                    });

                    doc.addPage();
                });

                doc.save("archivo.pdf");
            });
    };

    return (
        <TabsContent className="mt-0" value="Inicio">
            <div
                className="rounded-t-none rounded-b-lg overflow-x-auto flex flex-row items-center gap-4 
                px-4 py-3 border bg-card text-card-foreground shadow-md">
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
                            <DropdownMenuItem onClick={handleExcelDownload}>
                                Excel
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handlePdfDownload}>
                                PDF
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </TabsContent>
    )
}

export default StartTab