import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { STATES } from "@/lib/constants";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import SemesterSelector from "../custom-selectors/semester-selector";

interface StudentFieldsProps {
  form: UseFormReturn<any>;
}

const StudentFields = ({ form }: StudentFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="num_control"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Número de control*</FormLabel>
            <FormControl>
              <Input
                placeholder="Número de control - Ejem.: 12345678"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="nombre"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Nombre*</FormLabel>
            <FormControl>
              <Input placeholder="Nombre - Ejem.: Juan Carlos" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="apellidop"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Apellido Paterno*</FormLabel>
            <FormControl>
              <Input
                placeholder="Apellido paterno - Ejem.: Estrada"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="apellidom"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Apellido Materno</FormLabel>
            <FormControl>
              <Input placeholder="Apellido materno - Ejem.: Perez" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="sexo"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Género*</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="m">Masculino</SelectItem>
                <SelectItem value="f">Femenino</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="CURP"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>CURP*</FormLabel>
            <FormControl>
              <Input
                placeholder="CURP - Ejem.: PECJ040815HBCSPNA7"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="estado_nacimiento"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Estado de nacimiento*</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {STATES.map(({ value, text }, key) => (
                  <SelectItem key={key} value={value}>
                    {text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="fecha_nacimiento"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-2">
            <FormLabel>Fecha de nacimiento*</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Fecha</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  captionLayout="dropdown"
                  fromYear={1950}
                  toYear={new Date().getFullYear()}
                  classNames={{
                    caption: "justify-between",
                    caption_label: "hidden",
                    dropdown: `flex h-10 items-center justify-between 
                                                rounded-md border border-input bg-background 
                                                px-3 py-1 text-sm ring-offset-background 
                                                [&>span]:line-clamp-1`,
                    caption_dropdowns: "text-[0] flex justify-center",
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="periodo_ingreso"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Periodo de Ingreso*</FormLabel>
            <FormControl>
              <SemesterSelector
                from={1990}
                value={field.value}
                onValueChange={field.onChange}
                reverse
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="periodo_egreso"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel>Periodo de egreso*</FormLabel>
            <FormControl>
              <SemesterSelector
                from={1990}
                value={field.value}
                onValueChange={field.onChange}
                reverse
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default StudentFields;