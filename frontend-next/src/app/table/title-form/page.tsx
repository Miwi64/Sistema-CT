"use client";
import StudentFields from "@/components/student-fields";
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
import { CAREERS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as z from "zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
    .transform((value) => value.replace(/\s+/g, ""))
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
  num_titulo: z
    .string({ required_error: "Campo requerido" })
    .transform((value) => value.replace(/\s+/g, ""))
    .pipe(z.string().min(8, { message: "Minimo 8 caracteres" })),
  carrera_fk: z.string({ required_error: "Campo requerido" }),
  num_cedula: z
    .string()
    .max(10, "Máximo 10 caracteres").optional(),
  observaciones_tit: z
    .string()
    .max(150, "Límite de caracteres excedido")
    .optional(),
  clave_plan: z.string({ required_error: "Campo requerido" }),
  fecha_acto: z
    .date({ required_error: "Campo requerido" })
    .transform((value) => value.toISOString().split("T")[0]),
  fecha_registro_tit: z
    .date({ required_error: "Campo requerido" })
    .transform((value) => value.toISOString().split("T")[0]),
});

type Career = {
  id_carrera: number;
  nombre_carrera: string;
};

const TitleForm = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [careers, setCareers] = useState<Career[]>([]);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();
  const handleBadRequest = () => {
    setOpen(true);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchCareers = await fetch(`http://127.0.0.1:8000/carrera/`, {
        method: "GET",
      });
      const results = await fetchCareers.json();
      console.log(results);
      setCareers(
        results.map((item: Career) => ({
          id_carrera: item.id_carrera,
          nombre_carrera: item.nombre_carrera,
        }))
      );
      console.log(careers);
    };

    fetchData();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // This will be type-safe and validated.
    //console.log(values);
    /* Verificacion  */
    const verificacion = await fetch(`http://localhost:8000/searchAT/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token" + session?.token,
      },
      body: JSON.stringify({
        num_titulo: values.num_titulo,
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

    const postTit = await fetch(
      `http://127.0.0.1:8000/data/api/v1/titulados/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + session?.token,
        },
        body: JSON.stringify({
          num_titulo: values.num_titulo,
          clave_plan: values.clave_plan,
          fecha_acto: values.fecha_acto,
          fecha_registro: values.fecha_registro_tit,
          num_cedula: values.num_cedula,
          observaciones: values.observaciones_tit,
        }),
      }
    );
    if (!postTit.ok) {
      handleBadRequest();
      return;
    }
    console.log(postTit);

    //llamada a ultima entrada de certificado
    const getIdCert = await fetch(`http://localhost:8000/ultimo-tit/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + session?.token,
      },
    });
    const { id_titulo } = await getIdCert.json();
    console.log(id_titulo);

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
        num_control: values.num_control,
        sexo: values.sexo,
        CURP: values.CURP,
        periodo_ingreso: values.periodo_ingreso,
        periodo_egreso: values.periodo_egreso,
        estado_nacimiento: values.estado_nacimiento,
        fecha_nacimiento: values.fecha_nacimiento,
        carrera_fk: values.carrera_fk,
        titulo_fk: id_titulo,
        certificado_fk: null,
      }),
    });
    if (!postAlum.ok) {
      handleBadRequest();
      return;
    }
    console.log(postAlum);

    router.push("/table");
  };

  if (isDesktop) {
    return (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
            <h1 className="my-5 text-2xl font-semibold leading-none tracking-tight">
              Agregar Título
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
                            <SelectContent>
                              {careers.map(({ id_carrera, nombre_carrera }) => (
                                <SelectItem
                                  key={id_carrera}
                                  value={`${id_carrera}`}
                                >
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
                            <Input placeholder="Número de título" {...field} />
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
                            <Input placeholder="Número de cédula" {...field} />
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
                              {["Plan 1", "Plan 2"].map((value, key) => (
                                <SelectItem key={key} value={value}>
                                  {value}
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
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={new Date(field.value)}
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
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={new Date(field.value)}
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
            </section>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Error al Registrar</DialogTitle>
              <DialogDescription>
                Ya existe un registro con el mismo número de control y/o número de título.
              </DialogDescription>
            </DialogHeader>
            <DialogClose asChild>
              <Button variant="outline">Aceptar</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <Drawer open={open} onOpenChange={setOpen}>
          <h1 className="my-5 text-2xl font-semibold leading-none tracking-tight">
            Agregar Título
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
                          <SelectContent>
                            {careers.map(({ id_carrera, nombre_carrera }) => (
                              <SelectItem
                                key={id_carrera}
                                value={`${id_carrera}`}
                              >
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
                          <Input placeholder="Número de título" {...field} />
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
                          <Input placeholder="Número de cédula" {...field} />
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
                            {["Plan 1", "Plan 2"].map((value, key) => (
                              <SelectItem key={key} value={value}>
                                {value}
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
                              selected={new Date(field.value)}
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
                              selected={new Date(field.value)}
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
          </section>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Error al Registrar</DrawerTitle>
            <DrawerDescription>
              Ya existe un registro con el mismo número de control y/o número de título.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Aceptar</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default TitleForm;
