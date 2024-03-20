import { REF_COLUMN_NAMES } from "./constants";
import ExcelJS from "exceljs";
import JsExcelTemplate from "js-excel-template";
import { saveAs } from "file-saver";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Student } from "./columns";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { VisibilityState } from "@tanstack/react-table";
import { notification } from "@/components/responsive/notification";
import { getSession } from "next-auth/react";

type GobReportData = {
  summary: [
    {
      year: number;
      total: number;
      graduates: number;
      titles: number;
    }
  ];
  sheets: [
    {
      gen: number;
      count: number;
      year: number;
      students: [
        {
          name: string;
          last_name1: string;
          last_name2: String;
          title_date: string;
        }
      ];
    }
  ];
};

type Est911ReportData = {
  graduates: [
    {
      num_control: string;
      name: string;
      last_name1: string;
      last_name2: string;
      curp: string;
      birth_date: Date;
      gender: string;
      career: string;
      certificate: boolean;
    }
  ];
  titles: [
    {
      num_control: string;
      name: string;
      last_name1: string;
      last_name2: string;
      curp: string;
      birth_date: Date;
      gender: string;
      career: string;
      study_plan: string;
    }
  ];
};

type Career = {
  id_carrera: number;
  nombre_carrera: string;
};


export const generateEst911Report = async (
  template: ArrayBuffer,
  data: Est911ReportData,
  careers: Career[]
) => {
  const results = careers.map((career) => ({ career: career.nombre_carrera }));
  const { graduates, titles } = data;
  const excelTemplate = await JsExcelTemplate.fromArrayBuffer(template);
  excelTemplate.set("graduates", graduates);
  excelTemplate.set("titles", titles);
  excelTemplate.set("results", results);
  try {
    const blob = await excelTemplate.toBlob();
    saveAs(blob, "est911.xlsx");
  } catch (error) {
    notification(
      "Error al generar el archivo",
      "error",
      `Vuelve a intentarlo más tarde.`
    );
  }
};

export const generateGobReport = async (
  template: ArrayBuffer,
  data: GobReportData,
  career: string
) => {
  let noSheetToDuplicate = false;
  const { summary, sheets } = data;
  const totalGraduates = summary.reduce(
    (previous, { graduates }) => previous + graduates,
    0
  );
  const totalTitles = summary.reduce(
    (previous, { titles }) => previous + titles,
    0
  );
  const years = sheets.map((value) => value.year);
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(template).then(
    () => {
      const sheetToDuplicate = workbook.getWorksheet("year");
      if (!sheetToDuplicate) {
        notification(
          "Error de formato",
          "error",
          "El formato de la plantilla no es válido."
        );
        noSheetToDuplicate = true;
        return;
      }
      years.forEach((year) => {
        const duplicatedSheet = workbook.addWorksheet(`${year}`);
        duplicatedSheet.model = Object.assign(
          { ...sheetToDuplicate.model, name: `${year}` },
          { mergeCells: sheetToDuplicate.model.merges }
        );
        sheetToDuplicate.eachRow(function (row, rowNumber) {
          row.eachCell(function (cell, colNumber) {
            let newText = cell.value;
            newText = newText.replace("{gen", `{gen${year}`) as any;
            newText = newText.replace("{count", `{count${year}`);
            newText = newText.replace("{year", `{year${year}`);
            newText = newText.replace("{students", `{students${year}`);
            duplicatedSheet.getCell(rowNumber, colNumber).value = newText;
          });
        });
      });
      workbook.removeWorksheet("year");
    },
    () => {
      notification(
        "Error al cargar la plantilla",
        "error",
        `Si estás utilizando una plantilla 
    personalizada, revisa que el archivo no esté corrupto y vuelve a intentarlo.`
      );
      return;
    }
  );
  workbook.xlsx.writeBuffer().then(
    async (buffer) => {
      if (noSheetToDuplicate) return;
      const excelTemplate = await JsExcelTemplate.fromArrayBuffer(buffer);
      for (const sheet of sheets) {
        const { year, count, gen, students } = sheet;
        excelTemplate.set(`year${year}`, `${year}`);
        excelTemplate.set(`count${year}`, `${count}`);
        excelTemplate.set(`gen${year}`, `${gen}`);
        excelTemplate.set(`students${year}`, students);
      }
      excelTemplate.set(`summary`, summary);
      excelTemplate.set(`career`, career);
      excelTemplate.set(`totalGraduates`, totalGraduates);
      excelTemplate.set(`totalTitles`, totalTitles);
      try {
        const blob = await excelTemplate.toBlob();
        saveAs(blob, "gob.xlsx");
      } catch (error) {
        notification(
          "Error al generar el archivo",
          "error",
          `Ha ocurrido un error al grabar el archivo. 
      Si estás utilizando una plantilla personalizada, revisa que el archivo no esté corrupto y 
      vuelve a intentarlo.`
        );
        return;
      }
    },
    () => {
      () => {
        notification(
          "Error al intentar generar la descarga del archivo",
          "error",
          "Vuelve a intentarlo más tarde"
        );
        return;
      };
    }
  );
};

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const filterProps = (obj: { [x: string]: any }, props: string[]) => {
  const newObj: { [x: string]: any } = {};
  props.forEach((prop, index) => {
    if (obj.hasOwnProperty(prop)) {
      newObj[`column${index + 1}`] = obj[prop];
    }
  });
  return newObj;
};

const formatHeader = (refStrings: { [x: string]: string }, array: string[]) => {
  const newArray: string[] = array.map((element) => refStrings[element]);
  return newArray;
};

export const handleExcelDownload = async (
  urlFilter: string,
  columnVisibility: VisibilityState
) => {
  const columns = Object.keys(columnVisibility).filter(
    (col) => columnVisibility[col] === true
  );
  const headers = formatHeader(REF_COLUMN_NAMES, columns);
  const objHeaders: { [x: string]: string } = {};
  headers.forEach((head, index) => {
    objHeaders[`column${index + 1}`] = head;
  });
  const session = await getSession();
  fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_BASEURL}/alumnos/?` + `${urlFilter}`,{
    method: "GET",
    headers: {
      Authorization: "Token " + session?.token,
    },
  }).then((response) => response.json())
    .then(async (data: Student[]) => {
      const selected_data = data.map((element: { [x: string]: any }) =>
        filterProps(element, columns)
      );
      const fetchTemplate = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/templates/export_template.xlsx`
      );
      const template = await fetchTemplate.arrayBuffer();
      const excelTemplate = await JsExcelTemplate.fromArrayBuffer(template);
      excelTemplate.set("headers", [objHeaders]);
      excelTemplate.set("data", selected_data);
      const blob = await excelTemplate.toBlob();
      saveAs(blob, "table.xlsx");
    });
};

export const handlePdfDownload = async (
  urlFilter: string,
  columnVisibility: VisibilityState
) => {
  const columns = Object.keys(columnVisibility).filter(
    (col) => columnVisibility[col] === true
  );
  const headers = formatHeader(REF_COLUMN_NAMES, columns);
  const session = await getSession();
  const fetchData = await fetch(
    `${process.env.NEXT_PUBLIC_DJANGO_API_BASEURL}/alumnos/?` + `${urlFilter}`,{
      method: "GET",
      headers: {
        Authorization: "Token " + session?.token,
      },
    }
  );
  const data = await fetchData.json();
  const docDefinition: TDocumentDefinitions = {
    pageSize: "A4",
    pageOrientation: "portrait",
    content: [
      {
        table: {
          body: [
            headers.map((header) => ({
              text: header,
              style: "head",
              border: [true, true, true, true],
            })),
            ...data.map((row: Student) =>
              columns.map((column) => ({
                text: row[column],
                style: "body",
                border: [true, true, true, true],
              }))
            ),
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
            return "#aaa"; // Set the color of horizontal lines
          },
          vLineColor: function (i, node) {
            return "#aaa"; // Set the color of vertical lines
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
        alignment: "center",
        margin: [0, 0, 0, 10],
      },
      body: {
        fontSize: 5,
      },
      head: {
        alignment: "center",
        fontSize: 5,
      },
    },
  };
  pdfMake.createPdf(docDefinition).download("data-table.pdf");
};
