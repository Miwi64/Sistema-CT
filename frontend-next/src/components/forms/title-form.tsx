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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { notification } from "@/components/responsive/notification";
import { Session } from "next-auth";
import { STUDENT_SCHEMA, TITLE_SCHEMA } from "@/lib/form-schemas";

const formSchema = z.object({
    ...STUDENT_SCHEMA,
    ...TITLE_SCHEMA
});


type Career = {
    id_carrera: number;
    nombre_carrera: string;
};
interface TitleFormProps {
    careers: Career[],
    session: Session
}

const TitleForm = ({ careers, session }: TitleFormProps) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const router = useRouter();

    const handleError = (message: string) => {
        return (notification("Error al intentar registrar el título", "error",
            message, isDesktop));
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const checkNotDuplicated = await fetch(`http://localhost:8000/searchAT/`, {
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

        if (!checkNotDuplicated.ok) {
            handleError("Ya existe un registro con el mismo número de control y/o número de título");
            return;
        }

        const postTitle = await fetch(
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
        if (!postTitle.ok) {
            handleError(`Ha ocurrido un error al registrar el título. 
      Revise que los datos sean correctos y vuelva a intentarlo`);
            return;
        }
        const { id_titulo } = await postTitle.json();


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
        if (!postStudent.ok) {
            handleError(`Ha ocurrido un error al registrar los datos del 
      estudiante en el título. Revise que los datos sean correctos y vuelva a intentarlo`);
            return;
        }
        router.push("/table");
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
                                <FormControl>
                                    <Input placeholder="Clave Plan" {...field} />
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
    );
}
export default TitleForm;