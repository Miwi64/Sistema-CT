import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { Toggle } from "@/components/ui/toggle";
import {
  BOTH_VISIBLE_COLUMNS,
  CAREER_COLUMNS,
  CERTIFICATE_COLUMNS,
  CERTIFICATE_VISIBLE_COLUMNS,
  DATE_CRITERIAS,
  ORDER_CRITERIAS,
  STUDENT_COLUMNS,
  STUDENT_VISIBLE_COLUMNS,
  TITLE_COLUMNS,
  TITLE_VISIBLE_COLUMNS,
} from "@/lib/constants";
import {
  BellElectric,
  BookText,
  BookType,
  CalendarIcon,
  GraduationCap,
  ScrollText,
  SortAsc,
  SortDesc,
  UserRound,
  Users,
  View,
} from "lucide-react";
import React from "react";
import { Career, FilterData } from "@/components/students-table/students-table";
import { PaginationData } from "@/components/pagination-handler";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { VisibilityState } from "@tanstack/react-table";
import { Calendar } from "@/components/ui/calendar";
import { DropdownMenuSub } from "@radix-ui/react-dropdown-menu";
import SemesterSelector from "@/components/custom-selectors/semester-selector";

interface FilterTabProps {
  careers: Career[];
  filters: FilterData;
  setFilters: React.Dispatch<React.SetStateAction<FilterData>>;
  setPaginationData: React.Dispatch<React.SetStateAction<PaginationData>>;
  columnVisibility: VisibilityState;
  setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
}

const FilterTab = ({
  careers,
  filters,
  setFilters,
  setPaginationData,
  columnVisibility,
  setColumnVisibility,
}: FilterTabProps) => {
  const updateProp = (
    prev: VisibilityState,
    property: string,
    value: boolean
  ) => {
    const newColumnVisibility = { ...prev };
    newColumnVisibility[property] = value;
    return newColumnVisibility;
  };


  const careerFilter = () => (
    <div className="flex items-center gap-2">
      <p className="text-sm font-medium">Carreras</p>
      <Select
        value={`${filters.career}`}
        onValueChange={(value) => {
          setFilters({
            ...filters,
            career: Number(value),
          });
          setPaginationData((value) => ({ ...value, current_page: "1" }));
        }}
      >
        <SelectTrigger className="h-9">
          <SelectValue placeholder={filters.career} />
        </SelectTrigger>
        <SelectContent side="top">
          <SelectItem value="-1">Todas</SelectItem>
          {careers.map(({ id_carrera, nombre_carrera }) => (
            <SelectItem key={id_carrera} value={`${id_carrera}`}>
              {nombre_carrera}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )

  const orderFilter = () => (
    <div className="flex items-center gap-2">
      <p className="text-sm font-medium">Ordenar</p>
      <Select
        value={filters.order.criteria}
        onValueChange={(value) => {
          setFilters({
            ...filters,
            order: { criteria: value, type: filters.order.type },
          });
          setPaginationData((value) => ({ ...value, current_page: "1" }));
        }}
      >
        <SelectTrigger className="h-9">
          <SelectValue placeholder={filters.order.criteria} />
        </SelectTrigger>
        <SelectContent side="top">
          {ORDER_CRITERIAS.map(({ text, value }) => (
            <SelectItem key={value} value={value}>
              {text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Toggle
        variant="outline"
        size="sm"
        pressed={filters.order.type === "-"}
        onPressedChange={(pressed) => {
          const type = pressed ? "-" : "";
          setFilters({
            ...filters,
            order: { criteria: filters.order.criteria, type: type },
          });
        }}
      >
        <SortDesc size={18} />
      </Toggle>
    </div>
  );

  return (
    <TabsContent className="mt-0" value="Filtrar">
      <div
        className="overflow-x-auto rounded-t-none rounded-b-lg flex items-center gap-4 
                px-4 py-3 border bg-card text-card-foreground shadow-md"
      >
        <div className="hidden md:block">{orderFilter()}</div>
        <div className="md:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
              >
                <SortAsc className="sm:mr-2 h-5 w-5" />
                <span className="hidden sm:block">Ordenar</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-5" align="start">
              {orderFilter()}
            </PopoverContent>
          </Popover>
        </div>
        <div className="hidden md:block">{careerFilter()}</div>
        <div className="md:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
              >
                <GraduationCap className="sm:mr-2 h-5 w-5" />
                <span className="hidden sm:block">Carreras</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-5" align="start">
              {careerFilter()}
            </PopoverContent>
          </Popover>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <View className="sm:mr-2 h-5 w-5" />
              <span className="hidden sm:block">Mostrar</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[150px]">
            <DropdownMenuLabel>Mostrar columnas</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              {
                label: "Estudiante",
                list: STUDENT_COLUMNS,
                icon: <UserRound className="mr-2 h-4 w-4" />,
              },
              {
                label: "Carrera",
                list: CAREER_COLUMNS,
                icon: <GraduationCap className="mr-2 h-4 w-4" />,
              },
              {
                label: "Título",
                list: TITLE_COLUMNS,
                icon: <BookType className="mr-2 h-4 w-4" />,
              },
              {
                label: "Certificado",
                list: CERTIFICATE_COLUMNS,
                icon: <ScrollText className="mr-2 h-4 w-4" />,
              },
            ].map(({ label, list, icon }) => (
              <DropdownMenuSub key={label}>
                <DropdownMenuSubTrigger>
                  {icon}
                  <span>{label}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {list.map((element) => (
                      <DropdownMenuCheckboxItem
                        key={element.value}
                        checked={columnVisibility[element.value]}
                        onCheckedChange={(checked) =>
                          setColumnVisibility((prev) =>
                            updateProp(prev, element.value, checked)
                          )
                        }
                      >
                        {element.text}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
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
            <DropdownMenuLabel>Mostrar estudiantes</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={filters.doc}
              onValueChange={(value) => {
                setFilters({ ...filters, doc: value })
                setPaginationData((prev) => ({ ...prev, current_page: "1" }))
                if (value === "C") {
                  setColumnVisibility(CERTIFICATE_VISIBLE_COLUMNS)
                }
                else if (value === "T") {
                  setColumnVisibility(TITLE_VISIBLE_COLUMNS)
                }
                else if (value === "CT") {
                  setColumnVisibility(BOTH_VISIBLE_COLUMNS)
                }
                else {
                  setColumnVisibility(STUDENT_VISIBLE_COLUMNS)
                }
              }
              }
            >
              <DropdownMenuRadioItem value="E">
                Egresados
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="C">
                con Certificado
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="T">
                con Título
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="CT">
                con Certificado y título
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Users className="sm:mr-2 h-5 w-5" />
              <span className="hidden sm:block">Género</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Género</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={filters.gender}
              onValueChange={(value) =>
                setFilters({ ...filters, gender: value })
              }
            >
              <DropdownMenuRadioItem value="M">
                Masculino
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="F">
                Femenino
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="B">Ambos</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Toggle
          pressed={filters.period.enable}
          onPressedChange={(pressed) => setFilters({ ...filters, period: { ...filters.period, enable: pressed } })}
          aria-label="Activar/desactivar filtro por fecha de ingreso/egreso"
        >
          <BellElectric className="sm:mr-2 h-5 w-5" />
          <span className="hidden sm:block">Periodo</span>
        </Toggle>
        {filters.period.enable &&
          (
            <>
              <Select
                value={filters.period.criteria}
                onValueChange={(value) => {
                  setFilters({
                    ...filters,
                    period: { ...filters.period, criteria: value },
                  });
                }}
              >
                <SelectTrigger className="h-9 w-fit">
                  <SelectValue placeholder={filters.period.criteria} />
                </SelectTrigger>
                <SelectContent>
                  {["Ingreso", "Egreso"].map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="w-fit">
                <SemesterSelector value={filters.period.date} onValueChange={
                  value => setFilters({ ...filters, period: { ...filters.period, date: value } })
                } from={2000} />
              </div>
            </>
          )
        }

        <Toggle
          pressed={filters.date.enable}
          onPressedChange={(pressed) => setFilters({ ...filters, date: { ...filters.date, enable: pressed } })}
          aria-label="Activar/desactivar rango de fechas"
        >
          <CalendarIcon className="sm:mr-2 h-5 w-5" />
          <span className="hidden sm:block">Fecha</span>
        </Toggle>
        {filters.date.enable &&
          (
            <>
              <Select
                value={filters.date.criteria}
                onValueChange={(value) => {
                  setFilters({
                    ...filters,
                    date: { ...filters.date, criteria: value },
                  });
                }}
              >
                <SelectTrigger className="h-9 w-[200px]">
                  <SelectValue placeholder={filters.date.criteria} />
                </SelectTrigger>
                <SelectContent>
                  {DATE_CRITERIAS.map(({ text, value }) => (
                    <SelectItem key={value} value={value}>
                      {text}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {[
                {
                  label: "Desde",
                  date: filters.date.min,
                  update: (selected: Date) =>
                    ({ ...filters, date: { ...filters.date, min: selected } })

                },
                {
                  label: "Hasta",
                  date: filters.date.max,
                  update: (selected: Date) =>
                    ({ ...filters, date: { ...filters.date, max: selected } })
                },
              ].map(({ label, date, update }, index) => (
                <div key={index} className="flex items-center gap-3">
                  {label}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-[200px] justify-start text-left font-normal",
                        )}
                      >
                        {date.toDateString()}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown" fromYear={1970} toYear={new Date().getFullYear()}
                        classNames={{
                          caption: "justify-between",
                          caption_label: "hidden",
                          dropdown: `flex h-10 items-center justify-between 
                                                rounded-md border border-input bg-background 
                                                px-3 py-1 text-sm ring-offset-background 
                                                [&>span]:line-clamp-1`,
                          caption_dropdowns: "text-[0] flex justify-center"
                        }}
                        defaultMonth={date}
                        selected={date}
                        onSelect={(selected) => {
                          if (selected) {
                            setFilters(update(selected))
                          }
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              ))}
            </>
          )
        }
      </div >
    </TabsContent >
  );
};

export default FilterTab;
