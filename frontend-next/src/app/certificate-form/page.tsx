"use client";
import PageLayout from "@/components/page-layout";
import StudentFields from "@/components/student-fields";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
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
import { CAREERS } from "@/lib/constants";
import { cn, getData } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import * as z from "zod";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getServerSession } from "next-auth";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  num_control: z
    .string({ required_error: "Campo requerido" })
    .transform((value) => value.replace(/\s+/g, ""))
    .pipe(
      z
        .string()
        .min(8, { message: "Minimo 8 caracteres" })
        .max(10, "Máximo 10 caracteres")
    ),
  nombre: z
    .string({ required_error: "Campo requerido" })
    .transform((value) => value.replace(/\s+/g, " "))
    .pipe(
      z
        .string()
        .min(1, { message: "Campo requerido" })
        .max(50, "Máximo 50 caracteres")
    ),
  apellidop: z
    .string({ required_error: "Campo requerido" })
    .transform((value) => value.replace(/\s+/g, ""))
    .pipe(
      z
        .string()
        .min(1, { message: "Campo requerido" })
        .max(50, "Máximo 50 caracteres")
    ),
  apellidom: z.string().max(50, "Máximo 50 caracteres").optional(),
  sexo: z.string({ required_error: "Campo requerido" }).max(1),
  CURP: z
    .string({ required_error: "Campo requerido" })
    .regex(
      /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
      "CURP inválido"
    ),
  estado_nacimiento: z.string({ required_error: "Campo requerido" }),
  fecha_nacimiento: z
    .date({ required_error: "Campo requerido" })
    .transform((value) => value.toISOString().split("T")[0]),
  periodo_ingreso: z
    .string({ required_error: "Campo requerido" })
    .transform((value) => value.replace(/\s+/g, ""))
    .pipe(z.string().max(50, "Máximo 50 caracteres")),
  periodo_egreso: z
    .string({ required_error: "Campo requerido" })
    .transform((value) => value.replace(/\s+/g, ""))
    .pipe(z.string().max(50, "Máximo 50 caracteres")),
  num_folio: z
    .string({ required_error: "Campo requerido" })
    .transform((value) => value.replace(/\s+/g, ""))
    .pipe(z.string().min(1, { message: "Campo requerido" })),
  carrera_fk: z.string({ required_error: "Campo requerido" }),
  fecha_registro_cert: z
    .date({ required_error: "Campo requerido" })
    .transform((value) => value.toISOString().split("T")[0]),
  observaciones_cert: z
    .string()
    .max(150, "Límite de caracteres excedido")
    .optional(),
});

const CertificateForm = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [careers, setCareers] = useState([]);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();

  const handleBadRequest = () => {
    setOpen(true);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // useEffect(() => {
  //   async function fetch() {
  //     const datos = getData();
  //     setCareers(datos);
  //   }
  //   fetch();
  // }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    //return;
    /* Verificacion  */
    const verificacion = await fetch(`http://localhost:8000/searchAC/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token" + session?.token,
      },
      body: JSON.stringify({
        num_folio: values.num_folio,
        num_control: values.num_control,
      }),
    });
    if (!verificacion.ok) {
      //setVer(verificacion.status); Solo regresa: 400
      handleBadRequest();
      return;
    }
    /*  */
    toast(`Registro Exitoso`, {
      description: "Redirigiendo a Tabla Principal",
    });

    /* Insertacion */
    const postCert = await fetch(
      `http://127.0.0.1:8000/data/api/v1/certificados/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + session?.token,
        },
        body: JSON.stringify({
          num_folio: values.num_folio,
          fecha_registro: values.fecha_registro_cert,
          observaciones: values.observaciones_cert,
        }),
      }
    );
    console.log(postCert);

    if (!postCert.ok) {
      handleBadRequest();
      return;
    }

    //llamada a ultima entrada de certificado
    const getIdCert = await fetch(`http://localhost:8000/ultimo-cert/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + session?.token,
      },
    });
    const { id_certificado } = await getIdCert.json();
    console.log(id_certificado);

    const postAlum = await fetch(`http://127.0.0.1:8000/data/api/v1/alumnos/`, {
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
        fecha_nacimiento: values.fecha_nacimiento,
        titulo_fk: null,
        certificado_fk: id_certificado,
      }),
    });
    console.log(postAlum);

    if (!postAlum.ok) {
      handleBadRequest();
      return;
    }
    /*  */
    router.push("/students-table");
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {/*  */}
        <PageLayout>
          <h1 className="my-5 text-2xl font-semibold leading-none tracking-tight">
            Agregar certificado
          </h1>
          <section className="">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <h2 className="my-5 text-lg leading-none tracking-tight">
                  Datos del estudiante
                </h2>
                <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <StudentFields form={form} />
                </section>
                <Separator className="my-8" />
                <h2 className="mb-5 text-lg leading-none tracking-tight">
                  Datos del certificado
                </h2>
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
                          <SelectContent>
                            {CAREERS.map(({ value, text }, key) => (
                              <SelectItem key={key} value={value}>
                                {text}
                              </SelectItem>
                            ))}
                            {/*                             {careers.map(({ id_carrera, nombre_carrera }) => (
                              <SelectItem
                                key={id_carrera}
                                value={`${id_carrera}`}
                              >
                                {nombre_carrera}
                              </SelectItem>
                            ))} */}
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
                                date > new Date() ||
                                date < new Date("1900-01-01")
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
                  <Button type="submit">Agregar</Button>
                </div>
              </form>
            </Form>
          </section>
        </PageLayout>
        {/*  */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Error al Registrar</DialogTitle>
            <DialogDescription>
              Puede que ya exista un registro de Certificado con el Numero de
              Folio o un Alumno con el Numero de Control puesto, verifique la
              tabla de Alumnos
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Entendido</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {/*  */}
      <PageLayout>
        <h1 className="my-5 text-2xl font-semibold leading-none tracking-tight">
          Agregar certificado
        </h1>
        <section className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <h2 className="my-5 text-lg leading-none tracking-tight">
                Datos del estudiante
              </h2>
              <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <StudentFields form={form} />
              </section>
              <Separator className="my-8" />
              <h2 className="mb-5 text-lg leading-none tracking-tight">
                Datos del certificado
              </h2>
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar carrera" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CAREERS.map(({ value, text }, key) => (
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
                <Button type="submit">Agregar</Button>
              </div>
            </form>
          </Form>
        </section>
      </PageLayout>
      {/*  */}
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Error al Registrar</DrawerTitle>
          <DrawerDescription>
            Puede que ya exista un registro de Certificado con el Numero de
            Folio o un Alumno con el Numero de Control puesto, verifique la
            tabla de Alumnos
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Entendido</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CertificateForm;
