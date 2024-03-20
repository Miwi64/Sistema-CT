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
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../ui/calendar";
import { Textarea } from "../../ui/textarea";
import { Session } from "next-auth";
import { toast } from "sonner";
import { Input } from "../../ui/input";
import { TITLE_SCHEMA } from "@/lib/form-schemas";
import { useMediaQuery } from "@/hooks/use-media-query";
import { notification } from "@/components/responsive/notification";
import NumericInput from "@/components/custom-selectors/numeric-input";

const { num_titulo, ...fields } = TITLE_SCHEMA;
const formSchema = z.object({
  ...fields,
});

interface EditTitleProps {
  studentData: Student;
  session: Session;
}

const EditTitle = ({ studentData, session }: EditTitleProps) => {
  const registerDate = parseISO(studentData.fecha_registro_tit || "1970-12-10");
  const utcRegisterDate = new Date(
    registerDate.getTime() + registerDate.getTimezoneOffset() * 60000
  );
  const localregisterDate = new Date(
    utcRegisterDate.getTime() - utcRegisterDate.getTimezoneOffset() * 60000
  );

  const actDate = parseISO(studentData.fecha_acto || "1970-12-10");
  const utcActDate = new Date(
    actDate.getTime() + actDate.getTimezoneOffset() * 60000
  );
  const localActDate = new Date(
    utcActDate.getTime() - utcActDate.getTimezoneOffset() * 60000
  );

  const initialValues = {
    num_cedula: studentData.num_cedula,
    observaciones_tit: studentData.observaciones_tit,
    clave_plan: studentData.clave_plan,
    fecha_acto: localActDate,
    fecha_registro_tit: localregisterDate,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const putTitle = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/titulados/${studentData.titulo_fk}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + session.token,
        },
        body: JSON.stringify({
          num_cedula: values.num_cedula,
          clave_plan: values.clave_plan,
          fecha_acto: values.fecha_acto.toISOString().split("T")[0],
          fecha_registro: values.fecha_registro_tit.toISOString().split("T")[0],
          observaciones: values.observaciones_tit,
        }),
      }
    );
    if (!putTitle.ok) {
      notification(
        `Error al actualizar los datos del título (${putTitle.status})`,
        "error",
        "Verifica que los datos sean correctos y vuelve a intentarlo",
        isDesktop
      );
      return;
    }
    notification(
      "Actualización correcta",
      "success",
      "Se han actualizado los datos del Título",
      isDesktop
    );
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="my-5 text-lg text-muted-foreground leading-none tracking-tight">
          Título
        </h2>
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FormField
            control={form.control}
            name="num_cedula"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Número de cedula</FormLabel>
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
                <FormLabel>Plan de estudios*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Clave Plan Ejem.: IISC-2001-201"
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
                <FormLabel>Fecha de registro*</FormLabel>
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
                <FormLabel>Fecha del acto*</FormLabel>
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
        <div className="flex my-8">
          <Button variant="secondary" type="submit">
            Guardar cambios
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditTitle;
