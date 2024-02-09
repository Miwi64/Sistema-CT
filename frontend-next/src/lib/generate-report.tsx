import { REPORT_EXAMPLE_DATA } from "./constants"
import ExcelJS from 'exceljs';
import JsExcelTemplate from "js-excel-template";
import { saveAs } from "file-saver";

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