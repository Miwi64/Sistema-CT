
import { FilterData } from './students-table';
import { Toggle } from '../ui/toggle';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Calendar } from '../ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DATE_CRITERIAS } from '@/lib/constants';

interface DateFilterProps {
    filters: FilterData;
    setFilters: React.Dispatch<React.SetStateAction<FilterData>>;
}

const DateFilter = ({ filters, setFilters }: DateFilterProps) => {
    return (
        <div className="flex items-center gap-4">

            <Toggle
                pressed={filters.date.enable}
                onPressedChange={(pressed) => setFilters({ ...filters, date: { ...filters.date, enable: pressed } })}
                aria-label="Activar/desactivar rango de fechas"
            >
                <CalendarIcon className="sm:mr-2 h-5 w-5" />
                <span className="hidden sm:block">Rango de fechas</span>
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
    )
}

export default DateFilter