import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { STATES } from "@/lib/constants";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";

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
            <FormLabel>Número de control</FormLabel>
            <FormControl>
              <Input placeholder="Número de control" {...field} />
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
            <FormLabel>Nombre</FormLabel>
            <FormControl>
              <Input placeholder="Nombre" {...field} />
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
            <FormLabel>Apellido Paterno</FormLabel>
            <FormControl>
              <Input placeholder="Apellido paterno" {...field} />
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
              <Input placeholder="Apellido materno" {...field} />
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
            <FormLabel>Sexo</FormLabel>
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
            <FormLabel>CURP</FormLabel>
            <FormControl>
              <Input placeholder="CURP" {...field} />
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
            <FormLabel>Estado de nacimiento</FormLabel>
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
            <FormLabel>Fecha de nacimiento</FormLabel>
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
            <FormLabel>Periodo de ingreso</FormLabel>
            <FormControl>
              <Input
                placeholder="Periodo de ingreso ejem. 2013-12-19"
                {...field}
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
            <FormLabel>Periodo de egreso</FormLabel>
            <FormControl>
              <Input
                placeholder="Periodo de egreso ejem. 2013-12-19"
                {...field}
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
