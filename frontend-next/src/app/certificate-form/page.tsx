"use client"
import PageLayout from "@/components/page-layout";
import StudentFields from "@/components/student-fields";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { CARREERS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod"

const formSchema = z.object({
  num_control: z.string({ required_error: "Campo requerido" }).transform(value => value.replace(/\s+/g, ''))
  .pipe(z.string().min(8, { message: "Minimo 8 caracteres" }).max(10, "Máximo 10 caracteres")),
  nombre: z.string({ required_error: "Campo requerido" }).transform(value => value.replace(/\s+/g, ''))
    .pipe(z.string().min(1, { message: "Campo requerido" }).max(50, "Máximo 50 caracteres")),
  apellidop: z.string({ required_error: "Campo requerido" }).transform(value => value.replace(/\s+/g, ''))
    .pipe(z.string().min(1, { message: "Campo requerido" }).max(50, "Máximo 50 caracteres")),
  apellidom: z.string().max(50, "Máximo 50 caracteres").optional(),
  sexo: z.string({ required_error: "Campo requerido" }).max(1),
  CURP: z.string({ required_error: "Campo requerido" }).regex(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/, "CURP inválido"),
  estado_nacimiento: z.string({ required_error: "Campo requerido" }),
  fecha_nacimiento: z.date({ required_error: "Campo requerido" }),
  periodo_ingreso: z.string({ required_error: "Campo requerido" }).transform(value => value.replace(/\s+/g, ''))
    .pipe(z.string().max(50, "Máximo 50 caracteres")),
  periodo_egreso: z.string({ required_error: "Campo requerido" }).transform(value => value.replace(/\s+/g, ''))
    .pipe(z.string().max(50, "Máximo 50 caracteres")),
  num_folio: z.string({ required_error: "Campo requerido" }).transform(value => value.replace(/\s+/g, ''))
    .pipe(z.string().min(1, { message: "Campo requerido" })),
  carrera: z.string({ required_error: "Campo requerido" }),
  fecha_registro_cert: z.date({ required_error: "Campo requerido" }),
  observaciones_cert: z.string().max(150, "Límite de caracteres excedido").optional(),
})

const CertificateForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // This will be type-safe and validated.
    console.log(values)
  }

  return (
    <PageLayout>
      <h1 className="my-5 text-2xl font-semibold leading-none tracking-tight">Agregar certificado</h1>
      <section className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <h2 className="my-5 text-lg leading-none tracking-tight">Datos del estudiante</h2>
            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <StudentFields form={form} />
            </section>
            <Separator className="my-8"/>
            <h2 className="mb-5 text-lg leading-none tracking-tight">Datos del certificado</h2>
            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <FormField
                control={form.control}
                name="num_folio"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Número de folio</FormLabel>
                    <FormControl>
                      <Input placeholder="Número de folio" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="carrera"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Carrera</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar carrera" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CARREERS.map((
                          { value, text }, key) =>
                          (<SelectItem key={key} value={value}>{text}</SelectItem>))}
                      </SelectContent>
                    </Select>
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
            <div className="flex my-8 justify-center">
              <Button type="submit">
                Agregar
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </PageLayout>
  );
};

export default CertificateForm;
