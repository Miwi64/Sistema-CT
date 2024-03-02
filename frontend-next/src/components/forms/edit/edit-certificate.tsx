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
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../ui/calendar";
import { Textarea } from "../../ui/textarea";
import { Session } from "next-auth";
import { CERTIFICATE_SCHEMA } from "@/lib/form-schemas";
import { useMediaQuery } from "@/hooks/use-media-query";
import { notification } from "@/components/responsive/notification";

const { fecha_registro_cert, observaciones_cert } = CERTIFICATE_SCHEMA;
const formSchema = z.object({
  fecha_registro_cert,
  observaciones_cert,
});

interface EditCertificateProps {
  studentData: Student;
  session: Session;
}

const EditCertificate = ({ studentData, session }: EditCertificateProps) => {
  const initialValues = {
    fecha_registro_cert: new Date(
      studentData.fecha_registro_cert || "1970-01-01"
    ),
    observaciones_cert: studentData.observaciones_cert,
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const putCertificate = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/certificados/${studentData.certificado_fk}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + session.token,
        },
        body: JSON.stringify({
          fecha_registro: values.fecha_registro_cert
            .toISOString()
            .split("T")[0],
          observaciones: values.observaciones_cert,
        }),
      }
    );
    if (!putCertificate.ok) {
      notification(
        `Error al actualizar los datos del certificado (${putCertificate.status})`,
        "error",
        "Verifica que los datos sean correctos y vuelve a intentarlo",
        isDesktop
      );
      return;
    }
    notification(
      "Actualización correcta",
      "success",
      "Se han actualizado los datos del certificado",
      isDesktop
    );
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2 className="my-5 text-lg text-muted-foreground leading-none tracking-tight">
          Certificado
        </h2>
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FormField
            control={form.control}
            name="fecha_registro_cert"
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
                      selected={new Date(field.value)}
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
            name="observaciones_cert"
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

export default EditCertificate;
