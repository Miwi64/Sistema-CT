"use client"
import { ArrowLeftToLine, ArrowRightToLine, BookText, BookUser, CalendarIcon, ChevronDown, ChevronLeft, ChevronRight, File, FileDown, Filter, GraduationCap, Home, Pencil, Printer, Save, Search, Trash2, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { SearchBar } from "./search-bar"
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { addDays, format } from "date-fns"
import { Calendar } from "./ui/calendar"
import { DateRange } from "react-day-picker"
import { Toggle } from "./ui/toggle"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { CAREERS } from "@/lib/constants"
import { PaginationData } from "./pagination-handler"

interface RibbonTooolbarProps {
  data: PaginationData,
  setData: React.Dispatch<React.SetStateAction<PaginationData>>
  selection: number
}

export function RibbonToolbar({
  data, setData
}: RibbonTooolbarProps) {

  const [dateRange, setDateRange] = useState(false)
  const [doc, setDoc] = useState("CT")
  const [sex, setSex] = useState("M")
  const [careers, setCareers] = useState(
    CAREERS.map((career) => ({ text: career.text, value: true })))
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })
  const { current_page, page_size, total_pages, next, previous } = data
  const [tabValue, setTabValue] = useState("Inicio")


  return (
    <Tabs defaultValue="Inicio" className="min-w-[200px]">
      <TabsList className="w-full rounded-none flex flex-row justify-start 
      items-center overflow-x-auto overflow-y-visible">
        <TabsTrigger value="Inicio"><Home size={14} className="mr-2" />Inicio</TabsTrigger>
        <TabsTrigger value="Filtrar"><Filter size={14} className="mr-2" />Filtrar</TabsTrigger>
        <TabsTrigger value="Pagina"><File size={14} className="mr-2" />Página</TabsTrigger>
      </TabsList>


      <TabsContent className="mt-0" value="Inicio">
        <div className="rounded-t-none rounded-b-lg overflow-x-auto flex flex-row items-center gap-4 
        px-4 py-3 border bg-card text-card-foreground shadow-md">
          <div className="hidden md:block"><SearchBar /></div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex md:hidden">
                <Search className="mr-2 h-5 w-5" />
                Buscar
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <SearchBar />
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
              <Button
                variant="secondary"
                className="flex"
              >
                <Save className="sm:mr-2 h-5 w-5" />
                <span className="hidden sm:block">Guardar como</span>
                <ChevronDown className="sm:ml-5 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
              <DropdownMenuGroup>
                <DropdownMenuItem>Excel</DropdownMenuItem>
                <DropdownMenuItem>PDF</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TabsContent>


      <TabsContent className="mt-0" value="Filtrar">
        <div className="rounded-t-none rounded-b-lg overflow-x-auto flex flex-row items-center gap-4 
        rounded-md px-4 py-3 border bg-card text-card-foreground shadow-md">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <GraduationCap className="sm:mr-2 h-5 w-5" />
                <span className="hidden sm:block">Carrera</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Mostrar</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {careers.map((career, index) => (
                <DropdownMenuCheckboxItem key={index} checked={career.value} onCheckedChange={
                  (checked) => {
                    const newArray = [...careers];
                    newArray[index].value = checked;
                    setCareers(newArray);
                  }}>
                  {career.text}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <BookText className="sm:mr-2 h-5 w-5" />
                <span className="hidden sm:block">Documento</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Mostrar estudiantes con:</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={doc} onValueChange={setDoc}>
                <DropdownMenuRadioItem value="C">Certificado</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="T">Título</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="CT">Certificado y título</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Users className="sm:mr-2 h-5 w-5" />
                <span className="hidden sm:block">Sexo</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Sexo</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={sex} onValueChange={setSex}>
                <DropdownMenuRadioItem value="M">Masculino</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="F">Femenino</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="B">Ambos</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Toggle pressed={dateRange} onPressedChange={setDateRange} aria-label="Activar/desactivar rango de fechas">
            <CalendarIcon className="sm:mr-2 h-5 w-5" />
            <span className="hidden sm:block">Rango de fechas</span>
          </Toggle>
          {dateRange &&
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[200px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Rango de fechas</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          }
        </div>
      </TabsContent>


      <TabsContent className="mt-0" value="Pagina">
        <div className="rounded-t-none rounded-b-lg overflow-x-auto flex flex-row items-center gap-4 
        rounded-md px-4 py-3 border bg-card text-card-foreground shadow-md">
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Filas</p>
              <Select
                value={`${page_size}`}
                onValueChange={(value) => {
                  setData({ ...data, page_size: Number(value), current_page: "1" })
                }}
              >
                <SelectTrigger className="h-8 w-[80px]">
                  <SelectValue placeholder={`${page_size}`} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Página</p>
              <Select
                value={`${current_page}`}
                onValueChange={(value) => {
                  setData({ ...data, current_page: value })
                }}
              >
                <SelectTrigger className="h-8 w-[80px]">
                  <SelectValue placeholder={current_page === "last" ? `${total_pages}` : `${current_page}`} />
                </SelectTrigger>
                <SelectContent side="top">
                  {Array.from({ length: total_pages }, (_, index) => index + 1).map((page) => (
                    <SelectItem key={page} value={`${page}`}>
                      {page}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
            >
              <Printer className="sm:mr-2 h-5 w-5" />
              <span className="hidden sm:block">Imprimir</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => setData({ ...data, current_page: "1" })}
              disabled={!previous}
            >
              <ArrowLeftToLine className="sm:mr-2 h-5 w-5" />
              <span className="hidden sm:block">Primera</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => setData({ ...data, current_page: `${Number(current_page) - 1}` })}
              disabled={!previous}
            >
              <ChevronLeft className="sm:mr-2 h-5 w-5" />
              <span className="hidden sm:block">Anterior</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => setData({ ...data, current_page: `${Number(current_page) + 1}` })}
              disabled={!next}
            >
              <ChevronRight className="sm:mr-2 h-5 w-5" />
              <span className="hidden sm:block">Siguiente</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => setData({ ...data, current_page: "last" })}
              disabled={!next}
            >
              <ArrowRightToLine className="sm:mr-2 h-5 w-5" />
              <span className="hidden sm:block">Última</span>
            </Button>
          </div>
        </div>
      </TabsContent>
    </Tabs >
  )
}