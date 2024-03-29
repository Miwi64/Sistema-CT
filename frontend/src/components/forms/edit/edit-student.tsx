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
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../ui/calendar";
import { Session } from "next-auth";
import { STUDENT_SCHEMA } from "@/lib/form-schemas";
import { useMediaQuery } from "@/hooks/use-media-query";
import { notification } from "@/components/responsive/notification";
import SemesterSelector from "@/components/custom-selectors/semester-selector";

const { num_control, ...fields } = STUDENT_SCHEMA;
const formSchema = z.object({
  ...fields,
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
  const birthDate = parseISO(studentData.fecha_nacimiento);
  const utcBirthDate = new Date(
    birthDate.getTime() + birthDate.getTimezoneOffset() * 60000
  );
  const localBirthDate = new Date(
    utcBirthDate.getTime() - utcBirthDate.getTimezoneOffset() * 60000
  );

  const initialValues = {
    nombre: studentData.nombre,
    apellidop: studentData.apellidop,
    apellidom: studentData.apellidom,
    sexo: studentData.sexo,
    CURP: studentData.CURP,
    carrera_fk: `${studentData.carrera_fk}`,
    estado_nacimiento: studentData.estado_nacimiento,
    fecha_nacimiento: localBirthDate,
    periodo_ingreso: studentData.periodo_ingreso,
    periodo_egreso: studentData.periodo_egreso,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const putStudent = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/alumnos/${studentData.id_alumno}/`,
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
          fecha_nacimiento: values.fecha_nacimiento.toISOString().split("T")[0],
          carrera_fk: values.carrera_fk,
          certificado_fk: studentData.certificado_fk,
          titulo_fk: studentData.titulo_fk,
        }),
      }
    );
    if (!putStudent.ok) {
      notification(
        `Error al actualizar los datos del estudiante (${putStudent.status})`,
        "error",
        "Verifica que los datos sean correctos y vuelve a intentarlo",
        isDesktop
      );
      return;
    }
    notification(
      "Actualización correcta",
      "success",
      "Se han actualizado los datos del estudiante",
      isDesktop
    );
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
                <FormLabel>Apellido Materno*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Apellido materno - Ejem.: Perez"
                    {...field}
                  />
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
                <FormLabel>CURP*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="CURP - Ejem.: PERA050403HBCDPNA9"
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
                      captionLayout="dropdown"
                      fromYear={1970}
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
                <FormLabel>Carrera*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[250px]">
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
                <FormLabel>Periodo de ingreso*</FormLabel>
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
