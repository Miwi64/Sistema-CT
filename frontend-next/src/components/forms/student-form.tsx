"use client";
import StudentFields from "@/components/form-fields/student-fields";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import * as z from "zod";
import { useMediaQuery } from "@/hooks/use-media-query";
import { notification } from "@/components/responsive/notification";
import { Session } from "next-auth";
import { CERTIFICATE_SCHEMA, STUDENT_SCHEMA } from "@/lib/form-schemas";
import NumericInput from "../custom-selectors/numeric-input";

const formSchema = z.object({
  ...STUDENT_SCHEMA,
});

type Career = {
  id_carrera: number;
  nombre_carrera: string;
};

interface StudentFormProps {
  careers: Career[];
  session: Session;
}

const StudentForm = ({ careers, session }: StudentFormProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();

  const handleError = (message: string) => {
    return notification(
      "Error al intentar registrar al alumno",
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
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const checkNotDuplicated = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/alumnos/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + session?.token,
        },
        body: JSON.stringify({
          nombre: values.nombre,
          apellidop: values.apellidop,
          apellidom: values.apellidom,
          carrera_fk: values.carrera_fk,
          num_control: values.num_control,
          sexo: values.sexo,
          CURP: values.CURP,
          periodo_ingreso: values.periodo_ingreso,
          periodo_egreso: values.periodo_egreso,
          estado_nacimiento: values.estado_nacimiento,
          fecha_nacimiento: values.fecha_nacimiento.toISOString().split("T")[0],
          certificado_fk: null,
          titulo_fk: null,
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
                      <SelectValue placeholder="Seleccionar carrera" />
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
        </section>
        <section className="flex my-8 justify-center">
          <Button type="submit">Agregar</Button>
        </section>
      </form>
    </Form>
  );
};
export default StudentForm;
