"use client";
import { Student } from "@/lib/columns";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { STATES } from "@/lib/constants";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../ui/calendar";
import { Session } from "next-auth";
import { toast } from "sonner";
import { STUDENT_SCHEMA } from "@/lib/form-schemas";
import { useMediaQuery } from "@/hooks/use-media-query";
import { notification } from "@/components/responsive/notification";

const { num_control, ...fields} = STUDENT_SCHEMA
const formSchema = z.object({
  ...fields
});

type Career = {
  id_carrera: number;
  nombre_carrera: string;
};

interface EditStudentProps {
  studentData: Student;
  session: Session;
  careers: Career[];
}

const EditStudent = ({ studentData, careers, session }: EditStudentProps) => {
  const initialValues = {
    nombre: studentData.nombre,
    apellidop: studentData.apellidop,
    apellidom: studentData.apellidom,
    sexo: studentData.sexo,
    CURP: studentData.CURP,
    carrera_fk: `${studentData.carrera_fk}`,
    estado_nacimiento: studentData.estado_nacimiento,
    fecha_nacimiento: new Date(studentData.fecha_nacimiento),
    periodo_ingreso: studentData.periodo_ingreso,
    periodo_egreso: studentData.periodo_egreso,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const putStudent = await fetch(
      `http://127.0.0.1:8000/data/api/v1/alumnos/${studentData.id_alumno}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + session.token,
        },
        body: JSON.stringify({
          nombre: values.nombre,
          apellidop: values.apellidop,
          apellidom: values.apellidom,
          sexo: values.sexo,
          CURP: values.CURP,
          periodo_ingreso: values.periodo_ingreso,
          periodo_egreso: values.periodo_egreso,
          estado_nacimiento: values.estado_nacimiento,
          fecha_nacimiento: values.fecha_nacimiento,
          carrera_fk: values.carrera_fk,
          certificado_fk: studentData.certificado_fk,
          titulo_fk: studentData.titulo_fk,
        }),
      }
    );
    if (!putStudent.ok) {
      notification(`Error al actualizar los datos del estudiante (${putStudent.status})`,
            "error", "Verifica que los datos sean correctos y vuelve a intentarlo", isDesktop)
      return
    }
    notification("Actualización correcta",
            "success", "Se han actualizado los datos del estudiante", isDesktop)
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="my-5 text-lg text-muted-foreground leading-none tracking-tight">
          Estudiante
        </h2>
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                      selected={new Date(field.value)}
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
            name="carrera_fk"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Carrera</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {careers.map(({ id_carrera, nombre_carrera }) => (
                      <SelectItem key={id_carrera} value={`${id_carrera}`}>
                        {nombre_carrera}
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
        </section>
        <div className="flex my-8">
          <Button variant="secondary" type="submit">
            Guardar cambios
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditStudent;
