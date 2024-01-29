export const CAREERS = [
    { value: "sistemas", text: "Sistemas" },
    { value: "administracion", text: "Administración" },
    { value: "agricola", text: "Agrícola" },
    { value: "industrial", text: "Industrial" },
    { value: "mecatronica", text: "Mecatrónica" },
    { value: "electromecanica", text: "Electromecánica" },
]

export const STATES = [
    { text: 'Aguascalientes', value: 'aguascalientes' },
    { text: 'Baja California', value: 'baja_california' },
    { text: 'Baja California Sur', value: 'baja_california_sur' },
    { text: 'Campeche', value: 'campeche' },
    { text: 'Chiapas', value: 'chiapas' },
    { text: 'Chihuahua', value: 'chihuahua' },
    { text: 'Coahuila', value: 'coahuila' },
    { text: 'Colima', value: 'colima' },
    { text: 'Durango', value: 'durango' },
    { text: 'Guanajuato', value: 'guanajuato' }
]

export const REPORTS: { [key: string]: string } = {
    gob: "Gobierno del estado",
    est911: "Estadística 911"
}

export const FORMATS: { [key: string]: string } = {
    pdf: "Archivo PDF",
    xls: "Archivo de Excel (xlsx)"
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
        value: "carrera",
        text: "Carrera"
    },
    {
        value: "sexo",
        text: "Sexo"
    },
    {
        value: "CURP",
        text: "CURP"
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