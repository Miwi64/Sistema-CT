import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TabsContent } from '@/components/ui/tabs';
import { Toggle } from '@/components/ui/toggle';
import { BOTH_VISIBLE_COLUMNS, CERTIFICATE_VISIBLE_COLUMNS, DATE_CRITERIAS, ORDER_CRITERIAS, TITLE_VISIBLE_COLUMNS } from '@/lib/constants';
import { BookText, CalendarIcon, SortDesc, Users } from 'lucide-react';
import React from 'react'
import { Career, FilterData } from '@/components/students-table/students-table';
import { PaginationData } from '@/components/pagination-handler';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { VisibilityState } from '@tanstack/react-table';

interface FilterTabProps {
    careers: Career[]
    filters: FilterData;
    setFilters: React.Dispatch<React.SetStateAction<FilterData>>;
    setPaginationData: React.Dispatch<React.SetStateAction<PaginationData>>;
    setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
}

const FilterTab = ({ careers, filters, setFilters, setPaginationData, setColumnVisibility }: FilterTabProps) => {
    return (
        <TabsContent className="mt-0" value="Filtrar">
            <div
                className="rounded-t-none rounded-b-lg overflow-x-auto flex flex-row items-center gap-4 
                rounded-md px-4 py-3 border bg-card text-card-foreground shadow-md"
            >
                <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex items-center space-x-2">
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
                </div>

                <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex items-center space-x-2">
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
                                <SelectItem value="-1">
                                    Todas
                                </SelectItem>
                                {careers.map(({ id_carrera, nombre_carrera }) => (
                                    <SelectItem key={id_carrera} value={`${id_carrera}`}>
                                        {nombre_carrera}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>


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
                                else {
                                    setColumnVisibility(BOTH_VISIBLE_COLUMNS)
                                }
                            }
                            }
                        >
                            <DropdownMenuRadioItem value="C">
                                Certificado
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="T">Título</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="CT">
                                Certificado y título
                            </DropdownMenuRadioItem>
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
                        <DropdownMenuRadioGroup
                            value={filters.sex}
                            onValueChange={(value) =>
                                setFilters({ ...filters, sex: value })
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
                                    update: function (selected: Date) { return { ...filters, date: { ...filters.date, min: selected } } }
                                },
                                {
                                    label: "Hasta",
                                    date: filters.date.max,
                                    update: function (selected: Date) { return { ...filters, date: { ...filters.date, max: selected } } }
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
            </div>
        </TabsContent>
    )
}

export default FilterTab