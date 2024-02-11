import { REPORT_EXAMPLE_DATA } from "./constants"
import ExcelJS from 'exceljs';
import JsExcelTemplate from "js-excel-template";
import { saveAs } from "file-saver";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Student } from "./columns";
import { TDocumentDefinitions } from "pdfmake/interfaces";

export const generateGobReport = async (template: ArrayBuffer,) => {
    const data = REPORT_EXAMPLE_DATA
    const years = data.map(value => value.year)
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(template).then(
        () => {
            const sheetToDuplicate = workbook.getWorksheet('year')
            if (!sheetToDuplicate) {
                console.log("Error de formato")
                return
            }
            years.forEach(year => {
                const duplicatedSheet = workbook.addWorksheet(`${year}`)
                duplicatedSheet.model =
                    Object.assign(
                        { ...sheetToDuplicate.model, name: `${year}` },
                        { mergeCells: sheetToDuplicate.model.merges })
                sheetToDuplicate.eachRow(function (row, rowNumber) {
                    row.eachCell(function (cell, colNumber) {
                        let newText = cell.value
                        newText = newText.replace('{gen', `{gen${year}`)
                        newText = newText.replace('{count', `{count${year}`)
                        newText = newText.replace('{year', `{year${year}`)
                        newText = newText.replace('{students', `{students${year}`)
                        duplicatedSheet.getCell(rowNumber, colNumber).value = newText
                    });
                });
            });
            workbook.removeWorksheet('year')
        }
    )
    workbook.xlsx.writeBuffer().then(async buffer => {
        const excelTemplate = await JsExcelTemplate.fromArrayBuffer(buffer)
        for (const sheet of data) {
            const { year, count, gen, students } = sheet
            excelTemplate.set(`year${year}`, `${year}`)
            excelTemplate.set(`count${year}`, `${count}`)
            excelTemplate.set(`gen${year}`, `${gen}`)
            excelTemplate.set(`students${year}`, students)
        }
        const blob = await excelTemplate.toBlob()
        saveAs(blob, "gob.xlsx")
    })
}


pdfMake.vfs = pdfFonts.pdfMake.vfs;

//CSV
function jsonToCsv(jsonData: Student[]) {

    const data = jsonData.map((item) => (
        {
            "No. Control": item.num_control,
            "Nombre": item.nombre,
            "Apellido Paterno": item.apellidop,
            "Apellido Materno": item.apellidom,
            "Sexo": item.sexo === 'm' ? "Masculino" : item.sexo === 'f' ? "Femenino" : "No Definido",
            "CURP": item.CURP,
            "Periodo Ingreso": item.periodo_ingreso,
            "Periodo Egreso": item.periodo_egreso,
            "Estado Nacimiento": item.estado_nacimiento,
            "Fecha Nacimiento": item.fecha_nacimiento,
            "Carrera": item.nombre_carrera,
            "No. Folio": item.num_folio,
            "Fecha Registro Certificado": item.fecha_registro_cert,
            "Observaciones Certificado": item.observaciones_cert,
            "No. Titulo": item.num_titulo,
            "Clave Plan": item.clave_plan,
            "Fecha Acto": item.fecha_acto,
            "Fecha Registro Titulo": item.fecha_registro_tit,
            "No. Cedula": item.num_cedula,
            "Observaciones Titulo": item.observaciones_tit
        }
    ))

    const headers = Object.keys(data[0]);
    let csvContent = headers.join(",") + "\n";

    data.forEach((item) => {
        let values = headers
            .map((header) => {
                const cell = item[header] || "";
                return typeof cell === "string"
                    ? `"${cell.replace(/"/g, '""')}"`
                    : cell;
            })
            .join(",");

        csvContent += values + "\n";
    });

    return csvContent;
}

export const handleExcelDownload = async (urlFilter: string) => {
    //console.log(urlFilters);
    fetch("http://127.0.0.1:8000/alumnos/?" + `${urlFilter}`)
        .then((response) => response.json())
        .then((data) => {
            const csv = jsonToCsv(data);
            const blob = new Blob([csv], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = "archivo.csv";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        });
};



export const handlePdfDownload2 = async (urlFilter: string) => {
    const datos = await fetch("http://127.0.0.1:8000/alumnos/?" + `${urlFilter}`);
    const data = await datos.json();

    const docDefinition: TDocumentDefinitions = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        content: [
            {
                text: 'Tabla de Estudiantes',
                style: 'header',
            },
            {
                table: {
                    widths: ['5%', '7%', '7%', '7%', '8%', '3%', '6%', '5%', '5%', '5%', '6%', '5%', '5%', '5%', '5%', '5%', '5%', '6%'],
                    body: [
                        [
                            { text: 'No. Control', style: 'head', border: [true, true, true, true] },
                            { text: 'Nombre', style: 'head', border: [true, true, true, true] },
                            { text: 'Apellido P', style: 'head', border: [true, true, true, true] },
                            { text: 'Apellido M', style: 'head', border: [true, true, true, true] },
                            { text: 'Carrera', style: 'head', border: [true, true, true, true] },
                            { text: 'Sexo', style: 'head', border: [true, true, true, true] },
                            { text: 'CURP', style: 'head', border: [true, true, true, true] },
                            { text: 'Ingreso', style: 'head', border: [true, true, true, true] },
                            { text: 'Egreso', style: 'head', border: [true, true, true, true] },
                            { text: 'No. Folio', style: 'head', border: [true, true, true, true] },
                            { text: 'Registro Cert.', style: 'head', border: [true, true, true, true] },
                            { text: 'Obser. Cert.', style: 'head', border: [true, true, true, true] },
                            { text: 'No. Titulo', style: 'head', border: [true, true, true, true] },
                            { text: 'Clave Plan', style: 'head', border: [true, true, true, true] },
                            { text: 'Fecha Acto', style: 'head', border: [true, true, true, true] },
                            { text: 'Registro Tit.', style: 'head', border: [true, true, true, true] },
                            { text: 'No. Cedula', style: 'head', border: [true, true, true, true] },
                            { text: 'Obser. Tit.', style: 'head', border: [true, true, true, true] },
                        ],
                        ...data.map((row: Student) => (
                            [
                                { text: row.num_control, style: 'body', border: [true, true, true, true] },
                                { text: row.nombre, style: 'body', border: [true, true, true, true] },
                                { text: row.apellidop, style: 'body', border: [true, true, true, true] },
                                { text: row.apellidom, style: 'body', border: [true, true, true, true] },
                                { text: row.nombre_carrera, style: 'body', border: [true, true, true, true] },
                                { text: row.sexo, style: 'body', border: [true, true, true, true] },
                                { text: row.CURP, style: 'body', border: [true, true, true, true] },
                                { text: row.periodo_ingreso, style: 'body', border: [true, true, true, true] },
                                { text: row.periodo_egreso, style: 'body', border: [true, true, true, true] },
                                { text: row.num_folio, style: 'body', border: [true, true, true, true] },
                                { text: row.fecha_registro_cert, style: 'body', border: [true, true, true, true] },
                                { text: row.observaciones_cert, style: 'body', border: [true, true, true, true] },
                                { text: row.num_titulo, style: 'body', border: [true, true, true, true] },
                                { text: row.clave_plan, style: 'body', border: [true, true, true, true] },
                                { text: row.fecha_acto, style: 'body', border: [true, true, true, true] },
                                { text: row.fecha_registro_tit, style: 'body', border: [true, true, true, true] },
                                { text: row.num_cedula, style: 'body', border: [true, true, true, true] },
                                { text: row.observaciones_tit, style: 'body', border: [true, true, true, true] },
                            ]
                        )),
                    ],
                    headerRows: 1,
                    dontBreakRows: true,
                },
                layout: {
                    hLineWidth: function (i, node) {
                        return 0.5; // Set the width of horizontal lines
                    },
                    vLineWidth: function (i, node) {
                        return 0.5; // Set the width of vertical lines
                    },
                    hLineColor: function (i, node) {
                        return '#aaa'; // Set the color of horizontal lines
                    },
                    vLineColor: function (i, node) {
                        return '#aaa'; // Set the color of vertical lines
                    },
                    paddingLeft: function (i, node) {
                        return 2; // Set the left padding
                    },
                    paddingRight: function (i, node) {
                        return 2; // Set the right padding
                    },
                    paddingTop: function (i, node) {
                        return 2; // Set the top padding
                    },
                    paddingBottom: function (i, node) {
                        return 2; // Set the bottom padding
                    },
                },
            },
        ],
        styles: {
            header: {
                bold: true,
                fontSize: 16,
                alignment: 'center',
                margin: [0, 0, 0, 10],
            },
            body: {
                fontSize: 5,
            },
            head: {
                alignment: 'center',
                fontSize: 5,
            }
        },
    };
    pdfMake.createPdf(docDefinition).download('data-table.pdf');
}
