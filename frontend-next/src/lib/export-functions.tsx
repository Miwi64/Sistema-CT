import { REF_COLUMN_NAMES, REPORT_EXAMPLE_DATA } from "./constants"
import ExcelJS from 'exceljs';
import JsExcelTemplate from "js-excel-template";
import { saveAs } from "file-saver";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Student } from "./columns";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { VisibilityState } from "@tanstack/react-table";

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
function jsonToCsv(headers: string[], jsonData: Student[]) {
    const keys = Object.keys(jsonData[0])
    let csvContent = headers.join(",") + "\n";
    jsonData.forEach((item) => {
        let values = keys
            .map((key) => {
                const cell = item[key] || "";
                return typeof cell === "string"
                    ? `"${cell.replace(/"/g, '""')}"`
                    : cell;
            })
            .join(",");
        csvContent += values + "\n";
    });

    return csvContent;
}

const filterProps = (obj: { [x: string]: any }, props: string[]) => {
    const newObj: { [x: string]: any } = {};
    props.forEach(prop => {
        if (obj.hasOwnProperty(prop)) {
            newObj[prop] = obj[prop];
        }
    });
    return newObj;
}

const formatHeader = (refStrings: { [x: string]: string }, array: string[]) => {
    const newArray: string[] = array.map(element => refStrings[element]);
    return newArray;
}

export const handleExcelDownload = async (urlFilter: string, columnVisibility: VisibilityState) => {
    const columns = Object.keys(columnVisibility).filter(col => columnVisibility[col] === true);
    const headers = formatHeader(REF_COLUMN_NAMES, columns)
    fetch("http://127.0.0.1:8000/alumnos/?" + `${urlFilter}`)
        .then((response) => response.json())
        .then((data) => {
            const selected_data = data.map((element: { [x: string]: any }) => filterProps(element, columns));
            const csv = jsonToCsv(headers, selected_data);
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



export const handlePdfDownload = async (urlFilter: string, columnVisibility: VisibilityState) => {
    const columns = Object.keys(columnVisibility).filter(col => columnVisibility[col] === true);
    const headers = formatHeader(REF_COLUMN_NAMES, columns)
    const datos = await fetch("http://127.0.0.1:8000/alumnos/?" + `${urlFilter}`);
    const data = await datos.json();
    const docDefinition: TDocumentDefinitions = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        content: [
            {
                table: {
                    body: [
                        headers.map(header => ({ text: header, style: 'head', border: [true, true, true, true] })),
                        ...data.map((row: Student) => (
                            columns.map(column => ({ text: row[column], style: 'body', border: [true, true, true, true] }))
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
