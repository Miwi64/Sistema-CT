import { ArrowLeftToLine, ArrowRightToLine, BookText, BookType, BookUser, CalendarIcon, CheckSquare, ChevronDown, ChevronLeft, ChevronRight, Columns3, Contact, File, Filter, GraduationCap, Home, Pencil, Plus, Printer, Save, ScrollText, Search, Trash2, Users, XSquare } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Table } from "@tanstack/react-table"
import DataTableSearch from "./datatable-search"
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { addDays, format } from "date-fns"
import { Calendar } from "../ui/calendar"
import { DateRange } from "react-day-picker"
import { Toggle } from "../ui/toggle"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface RibbonTooolbarProps<TData> {
  table: Table<TData>
}

type Checked = DropdownMenuCheckboxItemProps["checked"]

export function RibbonToolbar<TData>({
  table,
}: RibbonTooolbarProps<TData>) {

  const [dateRange, setDateRange] = useState(false)
  const [doc, setDoc] = useState("C")
  const [sex, setSex] = useState("M")
  const [careers, setCareers] = useState(
    [
      { value: true, text: "Sistemas" },
      { value: true, text: "Administración" },
      { value: true, text: "Agrícola" },
      { value: true, text: "Industrial" },
      { value: true, text: "Mecatrónica" },
      { value: true, text: "Electromecánica" },
    ])
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  const student = [
    {
      value: "num_control",
      text: "Número de control"
    },
    {
      value: "nombre",
      text: "Nombre"
    },
    {
      value: "apellidop",
      text: "Apellido Paterno"
    },
    {
      value: "apellidom",
      text: "Apellido Materno"
    },
    {
      value: "carrera",
      text: "Carrera"
    },
    {
      value: "sexo",
      text: "Sexo"
    },
    {
      value: "CURP",
      text: "CURP"
    }
  ]

  const cert = [
    {
      value: "num_folio",
      text: "Número de folio"
    },
    {
      value: "fecha_registro_cert",
      text: "Fecha de registro"
    },
    {
      value: "observaciones_cert",
      text: "Observaciones"
    }
  ]

  const title = [
    {
      value: "num_titulo",
      text: "Número de título"
    },
    {
      value: "fecha_acto",
      text: "Fecha del acto"
    },
    {
      value: "clave_plan",
      text: "Plan de estudios"
    },
    {
      value: "fecha_registro_tit",
      text: "Fecha de registro"
    },
    {
      value: "num_cedula",
      text: "Número de cédula"
    },
    {
      value: "observaciones_tit",
      text: "Observaciones"
    },
  ]



  return (
    <Tabs defaultValue="Inicio" className="min-w-[200px]">
      <TabsList className="w-full rounded-t-lg rounded-b-none flex flex-row justify-start 
      items-center overflow-x-auto overflow-y-visible">
        <TabsTrigger value="Inicio"><Home size={14} className="mr-2" />Inicio</TabsTrigger>
        <TabsTrigger value="Filtrar"><Filter size={14} className="mr-2" />Filtrar</TabsTrigger>
        <TabsTrigger value="Pagina"><File size={14} className="mr-2" />Página</TabsTrigger>
        <TabsTrigger value="Ver"><Columns3 size={14} className="mr-2" />Ver</TabsTrigger>
        <TabsTrigger value="Seleccion"><CheckSquare size={14} className="mr-2" />Selección</TabsTrigger>
      </TabsList>


      <TabsContent className="mt-0" value="Inicio">
        <div className="rounded-t-none rounded-b-lg overflow-x-auto flex flex-row items-center gap-4 
        px-4 py-3 border bg-card text-card-foreground shadow-md">
          <div className="hidden md:block"><DataTableSearch table={table} /></div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex md:hidden">
                <Search className="mr-2 h-5 w-5" />
                Buscar
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <DataTableSearch table={table} />
            </PopoverContent>
          </Popover>
          <Button variant="outline">
            <Plus className="sm:mr-2 h-5 w-5" />
            <span className="sm:block hidden">Agregar</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="default"
                size="sm"
                className="h-8 flex"
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
          <Button variant="outline">
            <Plus className="sm:mr-2 h-5 w-5" />
            <span className="sm:block hidden">Agregar</span>
          </Button>
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
                <DropdownMenuCheckboxItem checked={career.value} onCheckedChange={
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
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
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
          <div className="flex items-center space-x-2">
          <Button
              variant="outline"
            >
              <Printer className="sm:mr-2 h-5 w-5" />
              <span className="hidden sm:block">Imprimir</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ArrowLeftToLine className="sm:mr-2 h-5 w-5" />
              <span className="hidden sm:block">Primera</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="sm:mr-2 h-5 w-5" />
              <span className="hidden sm:block">Anterior</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="sm:mr-2 h-5 w-5" />
              <span className="hidden sm:block">Siguiente</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ArrowRightToLine className="sm:mr-2 h-5 w-5" />
              <span className="hidden sm:block">Última</span>
            </Button>
          </div>
        </div>
      </TabsContent>

      <TabsContent className="mt-0" value="Ver">
        <div className="rounded-t-none rounded-b-lg overflow-x-auto flex flex-row items-center gap-4 
        rounded-md px-4 py-3 border bg-card text-card-foreground shadow-md">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Contact className="sm:mr-2 h-5 w-5" />
                <span className="hidden sm:block">Estudiante</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mostrar u ocultar</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {
                student.map((s) => (<DropdownMenuCheckboxItem
                  key={table.getColumn(s.value)?.id}
                  className="capitalize"
                  checked={table.getColumn(s.value)?.getIsVisible()}
                  onCheckedChange={(value) => table.getColumn(s.value)?.toggleVisibility(!!value)}
                >
                  {s.text}
                </DropdownMenuCheckboxItem>))
              }
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <ScrollText className="sm:mr-2 h-5 w-5" />
                <span className="hidden sm:block">Certificado</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mostrar u ocultar</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {
                cert.map((c) => (<DropdownMenuCheckboxItem
                  key={table.getColumn(c.value)?.id}
                  className="capitalize"
                  checked={table.getColumn(c.value)?.getIsVisible()}
                  onCheckedChange={(value) => table.getColumn(c.value)?.toggleVisibility(!!value)}
                >
                  {c.text}
                </DropdownMenuCheckboxItem>))
              }
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <BookType className="sm:mr-2 h-5 w-5" />
                <span className="hidden sm:block">Título</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mostrar u ocultar</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {
                title.map((t) => (<DropdownMenuCheckboxItem
                  key={table.getColumn(t.value)?.id}
                  className="capitalize"
                  checked={table.getColumn(t.value)?.getIsVisible()}
                  onCheckedChange={(value) => table.getColumn(t.value)?.toggleVisibility(!!value)}
                >
                  {t.text}
                </DropdownMenuCheckboxItem>))
              }
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TabsContent>


      <TabsContent className="mt-0" value="Seleccion">
        <div className="rounded-t-none rounded-b-lg overflow-x-auto flex flex-row items-center gap-4 
        rounded-md px-4 py-3 border bg-card text-card-foreground shadow-md">
          <Button variant="outline">
            <Pencil className="sm:mr-2 h-5 w-5" />
            <span className="hidden sm:block">Editar</span>
          </Button>
          <Button variant="outline">
            <BookUser className="sm:mr-2 h-5 w-5" />
            <span className="hidden sm:block">Ver más</span>
          </Button>
          <Button variant="outline">
            <Trash2 className="sm:mr-2 h-5 w-5" />
            <span className="hidden sm:block">Eliminar</span>
          </Button>
          <Button variant="outline">
            <CheckSquare className="sm:mr-2 h-5 w-5" />
            <span className="hidden sm:block">Seleccionar todo</span>
          </Button>
          <Button variant="outline">
            <XSquare className="sm:mr-2 h-5 w-5" />
            <span className="hidden sm:block">Borrar selección</span>
          </Button>
        </div>
      </TabsContent>
    </Tabs >
  )
}