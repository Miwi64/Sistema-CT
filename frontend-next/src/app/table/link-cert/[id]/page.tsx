"use client";
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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, ScrollText } from "lucide-react";
import { UseFormReturn, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { Session, getServerSession } from "next-auth";
import { Student } from "@/lib/columns";
import { CERTIFICATE_SCHEMA } from "@/lib/form-schemas";
import { useMediaQuery } from "@/hooks/use-media-query";
import { notification } from "@/components/responsive/notification";
import ResponsiveDialog from "@/components/responsive/dialog";
import { useState } from "react";
import NumericInput from "@/components/custom-selectors/numeric-input";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getSession } from "next-auth/react";

const formSchema = z.object(CERTIFICATE_SCHEMA);

const page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      num_folio: "",
    },
  });

  async function getData(session: Session, id: string) {
    const fetchStudent = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/alumnos/${id}/`,
      {
        method: "GET",
        headers: {
          Authorization: "Token " + session?.token,
        },
      }
    );
    const student = await fetchStudent.json();
    return { student };
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const session = await getSession();
    const { student: studentData } = await getData(session, params.id);
    const postCertificate = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/certificados/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${session?.token}`,
        },
        body: JSON.stringify({
          num_folio: values.num_folio,
          fecha_registro: values.fecha_registro_cert
            .toISOString()
            .split("T")[0],
          observaciones: values.observaciones_cert,
        }),
      }
    );
    if (!postCertificate.ok) {
      notification(
        `Error al subir los datos del certificado (${postCertificate.status})`,
        "error",
        "Verifica que los datos sean correctos y vuelve a intentarlo",
        isDesktop
      );
      return;
    }
    const { id_certificado } = await postCertificate.json();

    const putStudent = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/alumnos/${params.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${session?.token}`,
        },
        body: JSON.stringify({
          periodo_ingreso: studentData.periodo_ingreso,
          periodo_egreso: studentData.periodo_egreso,
          fecha_nacimiento: studentData.fecha_nacimiento.split("T")[0],
          carrera_fk: studentData.carrera_fk,
          certificado_fk: id_certificado,
          titulo_fk: studentData.titulo_fk,
        }),
      }
    );
    if (!putStudent.ok) {
      notification(
        `Error al intentar vincular los datos con el estudiante (${putStudent.status})`,
        "error",
        "Verifica que los datos sean correctos y vuelve a intentarlo",
        isDesktop
      );
      return;
    }
    notification("Actualización correcta", "success", undefined, isDesktop);
    location.reload();
    router.push(`/table/edit/${studentData.id_alumno}`);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <section className="flex max-h overflow-y-auto px-1 py-5 flex-col gap-4">
            <FormField
              control={form.control}
              name="num_folio"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Número de folio</FormLabel>
                  <FormControl>
                    <NumericInput
                      placeholder="Número de folio - Ejem.: 12345678"
                      field={field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fecha_registro_cert"
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
          <div className="flex justify-center my-2">
            <Button type="submit">Vincular certificado</Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default page;
