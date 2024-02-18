import { BookUser, Link, Pencil, Trash2 } from "lucide-react"

export const STATES = [
    { text: 'Aguascalientes', value: 'Aguascalientes' },
    { text: 'Baja California', value: 'Baja California' },
    { text: 'Baja California Sur', value: 'Baja California Sur' },
    { text: 'Campeche', value: 'Campeche' },
    { text: 'Chiapas', value: 'Chiapas' },
    { text: 'Chihuahua', value: 'Chihuahua' },
    { text: 'Coahuila', value: 'Coahuila' },
    { text: 'Colima', value: 'Colima' },
    { text: 'Durango', value: 'Durango' },
    { text: 'Guanajuato', value: 'Guanajuato' }
]

export const REPORTS: { [key: string]: string } = {
    gob: "Gobierno del estado",
    est911: "Estadística 911"
}

export const FORMATS: { [key: string]: string } = {
    pdf: "Archivo PDF",
    xls: "Archivo de Excel (xlsx)"
}

export const CERTIFICATE_VISIBLE_COLUMNS = {
    "num_control": true,
    "nombre": true,
    "apellidop": true,
    "apellidom": true,
    "sexo": false,
    "fecha_nacimiento": true,
    "estado_nacimiento": false,
    "CURP": false,
    "nombre_carrera": true,
    "periodo_ingreso": true,
    "periodo_egreso": true,
    "num_folio": true,
    "fecha_registro_cert": true,
    "observaciones_cert": true,
    "num_titulo": false,
    "clave_plan": false,
    "fecha_registro_tit": false,
    "fecha_acto": false,
    "num_cedula": false,
    "observaciones_tit": false
}
export const TITLE_VISIBLE_COLUMNS = {
    "num_control": true,
    "nombre": true,
    "apellidop": true,
    "apellidom": true,
    "sexo": false,
    "fecha_nacimiento": true,
    "estado_nacimiento": false,
    "CURP": false,
    "nombre_carrera": true,
    "periodo_ingreso": true,
    "periodo_egreso": true,
    "num_folio": false,
    "fecha_registro_cert": false,
    "observaciones_cert": false,
    "num_titulo": true,
    "clave_plan": true,
    "fecha_registro_tit": true,
    "fecha_acto": true,
    "num_cedula": true,
    "observaciones_tit": true
}

export const BOTH_VISIBLE_COLUMNS = {
    "num_control": true,
    "nombre": true,
    "apellidop": true,
    "apellidom": true,
    "sexo": false,
    "fecha_nacimiento": true,
    "estado_nacimiento": false,
    "CURP": false,
    "nombre_carrera": true,
    "periodo_ingreso": true,
    "periodo_egreso": true,
    "num_folio": true,
    "fecha_registro_cert": true,
    "observaciones_cert": true,
    "num_titulo": true,
    "clave_plan": true,
    "fecha_registro_tit": true,
    "fecha_acto": true,
    "num_cedula": true,
    "observaciones_tit": true
}

export const STUDENT_COLUMNS = [
    {
        value: "num_control",
        text: "Número de control"
    },
    {
        value: "nombre",
        text: "Nombre"
    },
    {
        value: "apellidop",
        text: "Apellido Paterno"
    },
    {
        value: "apellidom",
        text: "Apellido Materno"
    },
    {
        value: "sexo",
        text: "Sexo"
    },
    {
        value: "estado_nacimiento",
        text: "Estado de nacimiento"
    },
    {
        value: "fecha_nacimiento",
        text: "Fecha de nacimiento"
    },
    {
        value: "CURP",
        text: "CURP"
    }
]

export const CAREER_COLUMNS = [
    {
        value: "nombre_carrera",
        text: "Nombre"
    },
    {
        value: "periodo_ingreso",
        text: "Periodo de ingreso"
    },
    {
        value: "periodo_egreso",
        text: "Periodo de egreso"
    }
]

export const CERTIFICATE_COLUMNS = [
    {
        value: "num_folio",
        text: "Número de folio"
    },
    {
        value: "fecha_registro_cert",
        text: "Fecha de registro"
    },
    {
        value: "observaciones_cert",
        text: "Observaciones"
    }
]

export const TITLE_COLUMNS = [
    {
        value: "num_titulo",
        text: "Número de título"
    },
    {
        value: "fecha_acto",
        text: "Fecha del acto"
    },
    {
        value: "clave_plan",
        text: "Plan de estudios"
    },
    {
        value: "fecha_registro_tit",
        text: "Fecha de registro"
    },
    {
        value: "num_cedula",
        text: "Número de cédula"
    },
    {
        value: "observaciones_tit",
        text: "Observaciones"
    },
]

export const REF_COLUMN_NAMES = {
    "num_control": "Número de control",
    "nombre": "Nombre",
    "apellidop": "Apellido paterno",
    "apellidom": "Apellido materno",
    "sexo": "Sexo",
    "CURP": "CURP",
    "estado_nacimiento": "Estado de nacimiento",
    "fecha_nacimiento": "Fecha de nacimiento",
    "nombre_carrera": "Carrera",
    "periodo_ingreso": "Periodo de ingreso",
    "periodo_egreso": "Periodo de egreso",
    "num_folio": "Número de folio",
    "fecha_registro_cert": "Fecha de registro (Certificado)",
    "observaciones_cert": "Observaciones (Certificado)",
    "num_titulo": "Número de título",
    "fecha_acto": "Fecha del acto",
    "clave_plan": "Plan de estudios",
    "num_cedula": "Número de cédula",
    "fecha_registro_tit": "Fecha de registro (Título)",
    "observaciones_tit": "Observaciones (Título)"
}

export const ORDER_CRITERIAS = [
    { text: "Número de control", value: "num_control" },
    { text: "Nombre", value: "nombre" },
    { text: "Apellido paterno", value: "apellidop" },
    { text: "Apellido materno", value: "apellidom" },
    { text: "Fecha de nacimiento", value: "fecha_nacimiento" },
    { text: "Periodo de ingreso", value: "periodo_ingreso" },
    { text: "Periodo de egreso", value: "periodo_egreso" },
]

export const DATE_CRITERIAS = [
    { text: "Fecha de nacimiento", value: "nacimiento" },
    { text: "Registro de certificado", value: "registro_cert" },
    { text: "Registro de título", value: "registro_tit" }
]



export const tableOptions = (id: string | number, title_id?: string, cert_id?: string) => {
    if (!title_id && !cert_id) {
        return [
            {
                icon: <BookUser />,
                label: "Ver más",
                link: `/table/view/${id}`
            },
            {
                icon: <Pencil />,
                label: "Editar",
                link: `/table/edit/${id}`
            },
            {
                icon: <Link />,
                label: "Vincular título",
                link: `/table/link-title/${id}`
            },
            {
                icon: <Link />,
                label: "Vincular certificado",
                link: `/table/link-certificate/${id}`
            },
        ]
    }
    else if (title_id && !cert_id) {
        return [
            {
                icon: <BookUser />,
                label: "Ver más",
                link: `/table/view/${id}`
            },
            {
                icon: <Pencil />,
                label: "Editar",
                link: `/table/edit/${id}`
            },
            {
                icon: <Link />,
                label: "Vincular certificado",
                link: `/table/link-certificate/${id}`
            },
        ]
    }
    else if (cert_id && !title_id) {
        return [
            {
                icon: <BookUser />,
                label: "Ver más",
                link: `/table/view/${id}`
            },
            {
                icon: <Pencil />,
                label: "Editar",
                link: `/table/edit/${id}`
            },
            {
                icon: <Link />,
                label: "Vincular título",
                link: `/table/link-title/${id}`
            },
        ]
    }
    else {
        return [
            {
                icon: <BookUser />,
                label: "Ver más",
                link: `/table/view/${id}`
            },
            {
                icon: <Pencil />,
                label: "Editar",
                link: `/table/edit/${id}`
            },
        ]
    }
}