"use client"
import { Student } from '@/lib/columns'
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { STATES } from '@/lib/constants'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import { Textarea } from '../ui/textarea'
import { Session } from 'next-auth'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    nombre: z
        .string({ required_error: "Campo requerido" })
        .min(1, { message: "Campo requerido" })
        .max(50, "Máximo 50 caracteres"),
    apellidop: z
        .string({ required_error: "Campo requerido" })
        .min(1, { message: "Campo requerido" })
        .max(50, "Máximo 50 caracteres"),
    apellidom: z.string().max(50, "Máximo 50 caracteres").optional(),
    sexo: z.string({ required_error: "Campo requerido" }).max(1),
    carrera_fk: z.string({ required_error: "Campo requerido" }),
    CURP: z.string({ required_error: "Campo requerido" })
        .min(1, { message: "Campo requerido" })
        .max(50, "Máximo 50 caracteres"),
    estado_nacimiento: z.string({ required_error: "Campo requerido" }),
    fecha_nacimiento: z
        .date({ required_error: "Campo requerido" })
        .transform((value) => value.toISOString().split("T")[0]),
    periodo_ingreso: z
        .string({ required_error: "Campo requerido" }).max(50, "Máximo 50 caracteres"),
    periodo_egreso: z
        .string({ required_error: "Campo requerido" }).max(50, "Máximo 50 caracteres"),
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
    fecha_registro_cert: z
        .date({ required_error: "Campo requerido" })
        .transform((value) => value.toISOString().split("T")[0]),
    observaciones_cert: z
        .string()
        .max(150, "Límite de caracteres excedido")
        .optional(),
});

type Career = {
    id_carrera: number
    nombre_carrera: string
}

interface EditFormProps {
    data: Student,
    session: Session,
    careers: Career[]
}

const EditForm = ({ data, careers, session }: EditFormProps) => {
    const router = useRouter()
    const initialValues = {
        nombre: data.nombre,
        apellidop: data.apellidop,
        apellidom: data.apellidom,
        sexo: data.sexo,
        CURP: data.CURP,
        carrera_fk: `${data.carrera_fk}`,
        estado_nacimiento: data.estado_nacimiento,
        fecha_nacimiento: new Date(data.fecha_nacimiento),
        periodo_ingreso: data.periodo_ingreso,
        periodo_egreso: data.periodo_egreso,
        observaciones_tit: data.observaciones_tit,
        clave_plan: data.clave_plan,
        fecha_acto: new Date(data.fecha_acto || "1970-01-01"),
        fecha_registro_tit: new Date(data.fecha_registro_tit || "1970-01-01"),
        fecha_registro_cert: new Date(data.fecha_registro_cert || "1970-01-01"),
        observaciones_cert: data.observaciones_cert
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const putStudent = await fetch(`http://127.0.0.1:8000/data/api/v1/alumnos/${data.id_alumno}/`, {
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
                fecha_nacimiento: values.fecha_nacimiento,
                carrera_fk: values.carrera_fk,
                certificado_fk: data.certificado_fk,
                titulo_fk: data.titulo_fk
            }),

        });
        if (!putStudent.ok) {
            toast(`Error al actualizar los datos del estudiante (${putStudent.status})`, {
                description: "Verifica que los datos sean correctos y vuelve a intentarlo",
            })
            return
        }

        const putTitle = await fetch(`http://127.0.0.1:8000/data/api/v1/titulados/${data.titulo_fk}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + session.token,
            },
            body: JSON.stringify({
                clave_plan: values.clave_plan,
                fecha_acto: values.fecha_acto,
                fecha_registro: values.fecha_registro_tit,
                observaciones: values.observaciones_tit
            }),
        });
        if (!putTitle.ok) {
            toast(`Error al actualizar los datos del título (${putTitle.status})`, {
                description: "Verifica que los datos sean correctos y vuelve a intentarlo",
            });
            return
        }

        const putCertificate = await fetch(`http://127.0.0.1:8000/data/api/v1/certificados/${data.certificado_fk}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Token " + session.token,
            },
            body: JSON.stringify({
                fecha_registro: values.fecha_registro_cert,
                observaciones: values.observaciones_cert
            }),
        });
        if (!putCertificate.ok) {
            toast(`Error al actualizar los datos del certificado (${putCertificate.status})`, {
                description: "Verifica que los datos sean correctos y vuelve a intentarlo",
            })
            return
        }
        toast(`Actualización correcta`, {
            description: "Regresando a la tabla de estudiantes...",
        })
        router.push("/students-table")
    }
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
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre" {...field} />
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
                                <FormLabel>Apellido Paterno</FormLabel>
                                <FormControl>
                                    <Input placeholder="Apellido paterno" {...field} />
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
                                <FormLabel>Apellido Materno</FormLabel>
                                <FormControl>
                                    <Input placeholder="Apellido materno" {...field} />
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
                                <FormLabel>Sexo</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                <FormLabel>CURP</FormLabel>
                                <FormControl>
                                    <Input placeholder="CURP" {...field} />
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
                                <FormLabel>Estado de nacimiento</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                <FormLabel>Fecha de nacimiento</FormLabel>
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
                </section>
                <h2 className="my-5 text-lg text-muted-foreground leading-none tracking-tight">
                    Carrera
                </h2>
                <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <FormField
                        control={form.control}
                        name="carrera_fk"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormLabel>Carrera</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
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
                                <FormLabel>Periodo de ingreso</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Periodo de ingreso ejem. 2013-12-19"
                                        {...field}
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
                                <FormLabel>Periodo de egreso</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Periodo de egreso ejem. 2013-12-19"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </section>

                <h2 className="my-5 text-lg text-muted-foreground leading-none tracking-tight">
                    Título
                </h2>
                <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

                <h2 className="my-5 text-lg text-muted-foreground leading-none tracking-tight">
                    Certificado
                </h2>
                <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                </section>
                <div className="flex my-8 justify-center">
                    <Button type="submit">Agregar</Button>
                </div>
            </form>
        </Form >
    )
}

export default EditForm