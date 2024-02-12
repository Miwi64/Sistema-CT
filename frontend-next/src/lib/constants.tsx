export const CAREERS = [
    { value: "sistemas", text: "Sistemas" },
    { value: "administracion", text: "Administración" },
    { value: "agricola", text: "Agrícola" },
    { value: "industrial", text: "Industrial" },
    { value: "mecatronica", text: "Mecatrónica" },
    { value: "electromecanica", text: "Electromecánica" },
]

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
    "CURP": false,
    "estado_nacimiento": false,
    "fecha_nacimiento": true,
    "nombre_carrera": true,
    "periodo_ingreso": true,
    "periodo_egreso":true,
    "num_folio": true,
    "fecha_registro_cert":true,
    "observaciones_cert":true,
    "num_titulo":false,
    "fecha_acto":false,
    "clave_plan":false,
    "num_cedula":false,
    "fecha_registro_tit":false,
    "observaciones_tit":false
}
export const TITLE_VISIBLE_COLUMNS = {
    "num_control": true,
    "nombre": true,
    "apellidop": true,
    "apellidom": true,
    "sexo": false,
    "CURP": false,
    "estado_nacimiento": false,
    "fecha_nacimiento": true,
    "nombre_carrera": true,
    "periodo_ingreso": true,
    "periodo_egreso":true,
    "num_folio": false,
    "fecha_registro_cert":false,
    "observaciones_cert":false,
    "num_titulo":true,
    "fecha_acto":true,
    "clave_plan":true,
    "num_cedula":true,
    "fecha_registro_tit":true,
    "observaciones_tit":true
}

export const BOTH_VISIBLE_COLUMNS = {
    "num_control": true,
    "nombre": true,
    "apellidop": true,
    "apellidom": true,
    "sexo": false,
    "CURP": false,
    "estado_nacimiento": false,
    "fecha_nacimiento": true,
    "nombre_carrera": true,
    "periodo_ingreso": true,
    "periodo_egreso":true,
    "num_folio": true,
    "fecha_registro_cert":true,
    "observaciones_cert":true,
    "num_titulo":true,
    "fecha_acto":true,
    "clave_plan":true,
    "num_cedula":true,
    "fecha_registro_tit":true,
    "observaciones_tit":true
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

export const REPORT_EXAMPLE_DATA = [
    {
        "gen": 1,
        "count": 7,
        "year": 2020,
        "students": [
            { name: "Alice", last_name: "Smith", title_date: "2020-05-10" },
            { name: "Bob", last_name: "Johnson", title_date: "2020-07-15" },
            { name: "Charlie", last_name: "Williams", title_date: "2020-03-20" },
            { name: "David", last_name: "Jones", title_date: "2020-09-05" },
            { name: "Emma", last_name: "Brown", title_date: "2020-11-30" },
            { name: "Frank", last_name: "Davis", title_date: "2020-04-25" },
            { name: "Grace", last_name: "Miller", title_date: "2020-08-12" }
        ]
    },
    {
        "gen": 2,
        "count": 6,
        "year": 2021,
        "students": [
            { "name": "Sophia", "last_name": "Harris", "title_date": "2021-03-14" },
            { "name": "Ethan", "last_name": "Thompson", "title_date": "2021-08-19" },
            { "name": "Ava", "last_name": "Garcia", "title_date": "2021-01-25" },
            { "name": "Michael", "last_name": "Martinez", "title_date": "2021-11-10" },
            { "name": "Emily", "last_name": "Robinson", "title_date": "2021-06-30" },
            { "name": "James", "last_name": "Lopez", "title_date": "2021-04-05" }
        ]
    },
    {
        "gen": 3,
        "count": 8,
        "year": 2019,
        "students": [
            { "name": "Alexander", "last_name": "Perez", "title_date": "2019-09-08" },
            { "name": "Madison", "last_name": "Sanchez", "title_date": "2019-10-17" },
            { "name": "Daniel", "last_name": "Ramirez", "title_date": "2019-02-22" },
            { "name": "Charlotte", "last_name": "Clark", "title_date": "2019-05-12" },
            { "name": "William", "last_name": "Lewis", "title_date": "2019-12-01" },
            { "name": "Sofia", "last_name": "Nguyen", "title_date": "2019-07-26" },
            { "name": "Olivia", "last_name": "Taylor", "title_date": "2019-06-14" },
            { "name": "Noah", "last_name": "Rodriguez", "title_date": "2019-08-03" }
        ]
    },
    {
        "gen": 4,
        "count": 5,
        "year": 2018,
        "students": [
            { "name": "Liam", "last_name": "Wilson", "title_date": "2018-04-13" },
            { "name": "Emma", "last_name": "Moore", "title_date": "2018-10-22" },
            { "name": "Noah", "last_name": "Brown", "title_date": "2018-03-05" },
            { "name": "Olivia", "last_name": "Jones", "title_date": "2018-07-18" },
            { "name": "William", "last_name": "Johnson", "title_date": "2018-12-09" }
        ]
    },
    {
        "gen": 5,
        "count": 9,
        "year": 2017,
        "students": [
            { "name": "Ava", "last_name": "Anderson", "title_date": "2017-05-16" },
            { "name": "Ethan", "last_name": "White", "title_date": "2017-09-30" },
            { "name": "Sophia", "last_name": "Thomas", "title_date": "2017-06-11" },
            { "name": "Mia", "last_name": "Garcia", "title_date": "2017-02-24" },
            { "name": "Liam", "last_name": "Martinez", "title_date": "2017-10-05" },
            { "name": "Isabella", "last_name": "Miller", "title_date": "2017-08-19" },
            { "name": "Jacob", "last_name": "Wilson", "title_date": "2017-03-28" },
            { "name": "Mia", "last_name": "Thomas", "title_date": "2017-11-14" },
            { "name": "James", "last_name": "Hernandez", "title_date": "2017-12-03" }
        ]
    },
    {
        "gen": 3,
        "count": 5,
        "year": 2022,
        "students": [
            { "name": "Sophia", "last_name": "Adams", "title_date": "2022-05-12" },
            { "name": "Ethan", "last_name": "Brown", "title_date": "2022-11-20" },
            { "name": "Ava", "last_name": "Garcia", "title_date": "2022-07-07" },
            { "name": "Michael", "last_name": "Williams", "title_date": "2022-08-28" },
            { "name": "Emily", "last_name": "Davis", "title_date": "2022-03-04" }
        ]
    },
    {
        "gen": 4,
        "count": 6,
        "year": 2016,
        "students": [
            { "name": "Alexander", "last_name": "Harris", "title_date": "2016-04-30" },
            { "name": "Madison", "last_name": "Martin", "title_date": "2016-09-15" },
            { "name": "Daniel", "last_name": "Lopez", "title_date": "2016-01-28" },
            { "name": "Charlotte", "last_name": "Gonzalez", "title_date": "2016-07-11" },
            { "name": "William", "last_name": "Martinez", "title_date": "2016-12-10" },
            { "name": "Sofia", "last_name": "Flores", "title_date": "2016-11-03" }
        ]
    },
    {
        "gen": 5,
        "count": 10,
        "year": 2023,
        "students": [
            { "name": "Olivia", "last_name": "Young", "title_date": "2023-08-09" },
            { "name": "Noah", "last_name": "Hernandez", "title_date": "2023-05-27" },
            { "name": "Ava", "last_name": "King", "title_date": "2023-01-14" },
            { "name": "Ethan", "last_name": "Wright", "title_date": "2023-09-01" },
            { "name": "Sophia", "last_name": "Allen", "title_date": "2023-07-02" },
            { "name": "Michael", "last_name": "Perez", "title_date": "2023-06-16" },
            { "name": "Emily", "last_name": "Carter", "title_date": "2023-10-25" },
            { "name": "James", "last_name": "Scott", "title_date": "2023-04-19" },
            { "name": "Alexander", "last_name": "Young", "title_date": "2023-03-07" },
            { "name": "Madison", "last_name": "Green", "title_date": "2023-12-11" }
        ]
    },
    {
        "gen": 1,
        "count": 8,
        "year": 2015,
        "students": [
            { "name": "Jacob", "last_name": "Lee", "title_date": "2015-06-05" },
            { "name": "Isabella", "last_name": "Walker", "title_date": "2015-09-20" },
            { "name": "Mason", "last_name": "Hall", "title_date": "2015-03-14" },
            { "name": "Samantha", "last_name": "Young", "title_date": "2015-10-30" },
            { "name": "William", "last_name": "Allen", "title_date": "2015-12-28" },
            { "name": "Elizabeth", "last_name": "Hall", "title_date": "2015-02-18" },
            { "name": "Oliver", "last_name": "Phillips", "title_date": "2015-07-09" },
            { "name": "Ava", "last_name": "Ross", "title_date": "2015-11-03" }
        ]
    },
    {
        "gen": 2,
        "count": 9,
        "year": 2024,
        "students": [
            { "name": "Benjamin", "last_name": "Evans", "title_date": "2024-03-18" },
            { "name": "Emma", "last_name": "Morris", "title_date": "2024-05-26" },
            { "name": "Elijah", "last_name": "Price", "title_date": "2024-10-07" },
            { "name": "Avery", "last_name": "Baker", "title_date": "2024-12-02" },
            { "name": "Charlotte", "last_name": "Cook", "title_date": "2024-08-15" },
            { "name": "Logan", "last_name": "Sanders", "title_date": "2024-09-29" },
            { "name": "Amelia", "last_name": "Rivera", "title_date": "2024-01-11" },
            { "name": "Owen", "last_name": "Mitchell", "title_date": "2024-06-23" },
            { "name": "Harper", "last_name": "Perez", "title_date": "2024-11-19" }
        ]
    }
]  