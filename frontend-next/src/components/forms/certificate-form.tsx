"use client";
import StudentFields from "@/components/student-fields";
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

const formSchema = z.object({
    num_control: z
        .string({ required_error: "Campo requerido" })
        .transform((value) => {
            if (/^(?!\s*$).+/.test(value)) {
                return value;
            }
            return value.replace(/\s+/g, "");
        })
        .pipe(
            z
                .string()
                .min(8, { message: "Minimo 8 caracteres" })
                .max(10, "Máximo 10 caracteres")
        ),
    nombre: z
        .string({ required_error: "Campo requerido" })
        .transform((value) => {
            if (/^(?!\s*$).+/.test(value)) {
                return value;
            }
            return value.replace(/\s+/g, "");
        })
        .pipe(
            z
                .string()
                .min(1, { message: "Campo requerido" })
                .max(50, "Máximo 50 caracteres")
        ),
    apellidop: z
        .string({ required_error: "Campo requerido" })
        .transform((value) => {
            if (/^(?!\s*$).+/.test(value)) {
                return value;
            }
            return value.replace(/\s+/g, "");
        })
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
        .transform((value) => {
            if (/^(?!\s*$).+/.test(value)) {
                return value;
            }
            return value.replace(/\s+/g, "");
        })
        .pipe(z.string().max(50, "Máximo 50 caracteres")),
    periodo_egreso: z
        .string({ required_error: "Campo requerido" })
        .transform((value) => {
            if (/^(?!\s*$).+/.test(value)) {
                return value;
            }
            return value.replace(/\s+/g, "");
        })
        .pipe(z.string().max(50, "Máximo 50 caracteres")),
    num_folio: z
        .string({ required_error: "Campo requerido" })
        .transform((value) => {
            if (/^(?!\s*$).+/.test(value)) {
                return value;
            }
            return value.replace(/\s+/g, "");
        })
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

type Career = {
    id_carrera: number;
    nombre_carrera: string;
};

interface CertificateFormProps {
    careers: Career[];
    session: Session;
}

const CertificateForm = ({ careers, session }: CertificateFormProps) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const router = useRouter();

    const handleError = (message: string) => {
        return (notification("Error al intentar registrar el certificado", "error",
            message, isDesktop));
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const checkNotDuplicated = await fetch(`http://localhost:8000/searchAC/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + session?.token,
            },
            body: JSON.stringify({
                num_folio: values.num_folio,
                num_control: values.num_control,
            }),
        });

        if (!checkNotDuplicated.ok) {
            handleError("Ya existe un registro con el mismo número de control y/o número de folio");
            return;
        }

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
        if (!postCert.ok) {
            handleError(`Ha ocurrido un error al registrar el certificado. 
      Revise que los datos sean correctos y vuelva a intentarlo`);
            return;
        }
        const { id_certificado } = await postCert.json();

        const postStudent = await fetch(`http://127.0.0.1:8000/data/api/v1/alumnos/`, {
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
        if (!postStudent.ok) {
            handleError(`Ha ocurrido un error al registrar los datos del 
      estudiante en el certificado. Revise que los datos sean correctos y vuelva a intentarlo`);
            return;
        }

        router.push("/table");
        notification("Registro realizado correctamente", "success",
            "Redirigiendo a la Tabla de estudiantes", isDesktop);
    };

    return (
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
                </section >
                <section className="flex my-8 justify-center">
                    <Button type="submit">Agregar</Button>
                </section>
            </form>
        </Form>
    );
};
export default CertificateForm;
