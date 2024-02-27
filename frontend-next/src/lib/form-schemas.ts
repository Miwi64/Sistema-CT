import { z } from "zod";

export const STUDENT_SCHEMA = {
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
        .date({ required_error: "Campo requerido" }),
    periodo_ingreso: z
        .string({ required_error: "Campo requerido" }),
    periodo_egreso: z
        .string({ required_error: "Campo requerido" }),
    carrera_fk: z.string({ required_error: "Campo requerido" }),

}

export const TITLE_SCHEMA = {
    num_titulo: z
        .string({ required_error: "Campo requerido" })
        .transform((value) => {
            if (/^(?!\s*$).+/.test(value)) {
                return value;
            }
            return value.replace(/\s+/g, "");
        })
        .pipe(z.string().min(8, { message: "Minimo 8 caracteres" })),
    num_cedula: z.string().max(10, "Máximo 10 caracteres").optional(),
    observaciones_tit: z
        .string()
        .max(150, "Límite de caracteres excedido")
        .optional(),
    clave_plan: z
        .string({ required_error: "Campo requerido" })
        .transform((value) => {
            if (/^(?!\s*$).+/.test(value)) {
                return value;
            }
            return value.replace(/\s+/g, "");
        })
        .pipe(z.string().min(13, { message: "ejem.: IISC-2006-201" })),
    fecha_acto: z
        .date({ required_error: "Campo requerido" }),
    fecha_registro_tit: z
        .date({ required_error: "Campo requerido" })
}

export const CERTIFICATE_SCHEMA = {
    num_folio: z
        .string({ required_error: "Campo requerido" })
        .transform((value) => {
            if (/^(?!\s*$).+/.test(value)) {
                return value;
            }
            return value.replace(/\s+/g, "");
        })
        .pipe(z.string().min(1, { message: "Campo requerido" }).max(10, "Máximo 10 caracteres")),
    fecha_registro_cert: z
        .date({ required_error: "Campo requerido" }),
    observaciones_cert: z
        .string()
        .max(150, "Límite de caracteres excedido")
        .optional(),
}