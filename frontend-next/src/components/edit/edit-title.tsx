"use client"
import { Student } from '@/lib/columns'
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'
import { Textarea } from '../ui/textarea'
import { Session } from 'next-auth'
import { toast } from 'sonner'
import { Input } from '../ui/input'

const formSchema = z.object({
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
    num_cedula: z
        .string()
        .max(10, "Máximo 10 caracteres").optional()
});

interface EditTitleProps {
    studentData: Student,
    session: Session,
}

const EditTitle = ({ studentData, session }: EditTitleProps) => {
    const initialValues = {
        num_cedula: studentData.num_cedula,
        observaciones_tit: studentData.observaciones_tit,
        clave_plan: studentData.clave_plan,
        fecha_acto: new Date(studentData.fecha_acto || "1970-01-01"),
        fecha_registro_tit: new Date(studentData.fecha_registro_tit || "1970-01-01")
    }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const putTitle = await fetch(`http://127.0.0.1:8000/data/api/v1/titulados/${studentData.titulo_fk}/`, {
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
        toast(`Actualización correcta`, {
            description: "Se han actualizado los datos del título.",
        })
    }
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
                <div className="flex my-8">
                    <Button variant="secondary" type="submit">Guardar cambios</Button>
                </div>
            </form>
        </Form >
    )
}

export default EditTitle