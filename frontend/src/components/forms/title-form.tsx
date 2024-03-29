"use client";
import StudentFields from "@/components/form-fields/student-fields";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { notification } from "@/components/responsive/notification";
import { Session } from "next-auth";
import { STUDENT_SCHEMA, TITLE_SCHEMA } from "@/lib/form-schemas";
import NumericInput from "../custom-selectors/numeric-input";

const formSchema = z.object({
  ...STUDENT_SCHEMA,
  ...TITLE_SCHEMA,
});

type Career = {
  id_carrera: number;
  nombre_carrera: string;
};
interface TitleFormProps {
  careers: Career[];
  session: Session;
}

const TitleForm = ({ careers, session }: TitleFormProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();

  const handleError = (message: string) => {
    return notification(
      "Error al intentar registrar el título",
      "error",
      message,
      isDesktop
    );
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      num_control: "",
      nombre: "",
      apellidom: "",
      apellidop: "",
      CURP: "",
      num_cedula: "",
      num_titulo: "",
      clave_plan: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    const checkNotDuplicated = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/alumno-titulo/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token" + session?.token,
        },
        body: JSON.stringify({
          num_titulo: values.num_titulo,
          clave_plan: values.clave_plan,
          fecha_acto: values.fecha_acto.toISOString().split("T")[0],
          fecha_registro: values.fecha_registro_tit.toISOString().split("T")[0],
          num_cedula: values.num_cedula,
          observaciones: values.observaciones_tit,
          nombre: values.nombre,
          apellidop: values.apellidop,
          apellidom: values.apellidom,
          num_control: values.num_control,
          sexo: values.sexo,
          CURP: values.CURP,
          periodo_ingreso: values.periodo_ingreso,
          periodo_egreso: values.periodo_egreso,
          estado_nacimiento: values.estado_nacimiento,
          fecha_nacimiento: values.fecha_nacimiento.toISOString().split("T")[0],
          carrera_fk: values.carrera_fk,
          certificado_fk: null,
        }),
      }
    );
    const result = await checkNotDuplicated.json();

    if (!checkNotDuplicated.ok) {
      handleError(result.error);
      return;
    }

    router.push("/table");
    notification(
      "Registro realizado correctamente",
      "success",
      "Redirigiendo a la Tabla de estudiantes",
      isDesktop
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="my-5 text-muted-foreground text-lg leading-none tracking-tight">
          Datos del estudiante
        </h2>
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StudentFields form={form} />
        </section>
        <Separator className="my-8" />
        <h2 className="mb-5 text-muted-foreground text-lg leading-none tracking-tight">
          Datos del título
        </h2>
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                      <SelectValue placeholder="Seleccionar carrera" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[250x]">
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
            name="num_titulo"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Número de título</FormLabel>
                <FormControl>
                  <NumericInput
                    placeholder="Número de título - Ejem.: 12345678"
                    field={field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="num_cedula"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Número de cédula</FormLabel>
                <FormControl>
                  <NumericInput
                    placeholder="Número de cédula - Ejem.: 12345678"
                    field={field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clave_plan"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Plan de estudios</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Clave Plan - Ejem.: IISC-2006-201"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fecha_registro_tit"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Fecha de registro</FormLabel>
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
            name="fecha_acto"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Fecha del acto</FormLabel>
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
            name="observaciones_tit"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Observaciones</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Máximo 150 caracteres"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>
        <div className="flex my-8 justify-center">
          <Button type="submit">Agregar</Button>
        </div>
      </form>
    </Form>
  );
};
export default TitleForm;
