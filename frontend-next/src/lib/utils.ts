import { type ClassValue, clsx } from "clsx";
import jsPDF from "jspdf";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


import { twMerge } from "tailwind-merge";
import { Student } from "./columns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

pdfMake.vfs = pdfFonts.pdfMake.vfs;

  //CSV
  function jsonToCsv(jsonData: Student[]) {
    const headers = Object.keys(jsonData[0]);
    let csvContent = headers.join(",") + "\n";

    jsonData.forEach((item) => {
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

export const handleExcelDownload = async (filters: { doc: any; sex: any; search: any; careers: any; order: any; date: any; }) => {
  const orderFilter = `&order_by=${filters.order.type}${filters.order.criteria}`
  const docFilter = filters.doc === "C" ? "&certificado_fk_null=false" : filters.doc === "T" ? "&titulo_fk_null=false" : ""
  const sexFilter = filters.sex === "M" ? "&sexo=M" : filters.sex === "F" ? "&sexo=F" : ""
  const checkedCareers = filters.careers.filter(((career: { checked: any; }) => career.checked))
  const careerFilter = checkedCareers.length > 0 ? `&carrera_fk=${checkedCareers.map((career: { value: any; }) => career.value).join(",")}` : ""
  const min = new Date(filters.date.min.getTime() - (filters.date.min.getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0]
  const max = new Date(filters.date.max.getTime() - (filters.date.max.getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0]
  const dateFilter = filters.date.enable ? `&${filters.date.criteria}_min=${min}&${filters.date.criteria}_max=${max}` : ""
  const urlFilters = `${docFilter}${sexFilter}${careerFilter}${dateFilter}${orderFilter}&num_control=${filters.search}`
    //console.log(urlFilters);
    fetch("http://127.0.0.1:8000/alumnos/?" + `${urlFilters}`)
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


export const handlePdfDownload = async (filters: { order: { type: any; criteria: any; }; doc: string; sex: string; careers: any[]; date: { min: { getTime: () => number; getTimezoneOffset: () => number; }; max: { getTime: () => number; getTimezoneOffset: () => number; }; enable: any; criteria: any; }; search: any; }) => {
  const orderFilter = `&order_by=${filters.order.type}${filters.order.criteria}`
  const docFilter = filters.doc === "C" ? "&certificado_fk_null=false" : filters.doc === "T" ? "&titulo_fk_null=false" : ""
  const sexFilter = filters.sex === "M" ? "&sexo=M" : filters.sex === "F" ? "&sexo=F" : ""
  const checkedCareers = filters.careers.filter(((career: { checked: any; }) => career.checked))
  const careerFilter = checkedCareers.length > 0 ? `&carrera_fk=${checkedCareers.map((career: { value: any; }) => career.value).join(",")}` : ""
  const min = new Date(filters.date.min.getTime() - (filters.date.min.getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0]
  const max = new Date(filters.date.max.getTime() - (filters.date.max.getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0]
  const dateFilter = filters.date.enable ? `&${filters.date.criteria}_min=${min}&${filters.date.criteria}_max=${max}` : ""
  const urlFilters = `${docFilter}${sexFilter}${careerFilter}${dateFilter}${orderFilter}&num_control=${filters.search}`
    fetch("http://127.0.0.1:8000/alumnos/?" + `${urlFilters}`)
        .then((response) => response.json())
        .then((data) => {
            const csv = jsonToCsv(data);
            const doc = new jsPDF();
            const lines = csv.trim().split("\n");
            const colCount = lines[0].split(",").length;
            const cellWidth = (doc.internal.pageSize.width - 10) / colCount;
            lines.shift();
            

            lines.forEach((line) => {
                const cells = line.split(",");

                cells.forEach((cell, idx) => {
                    doc.text(cell, 10, (idx + 1) * 10);
                });

                doc.addPage();
            });

            doc.save("archivo.pdf");
        });
};


export const handlePdfDownload2 = async (filters: { doc: any; sex: any; search: any; careers: any; order: any; date: any; }) => {
  const orderFilter = `&order_by=${filters.order.type}${filters.order.criteria}`
  const docFilter = filters.doc === "C" ? "&certificado_fk_null=false" : filters.doc === "T" ? "&titulo_fk_null=false" : ""
  const sexFilter = filters.sex === "M" ? "&sexo=M" : filters.sex === "F" ? "&sexo=F" : ""
  const checkedCareers = filters.careers.filter(((career: { checked: any; }) => career.checked))
  const careerFilter = checkedCareers.length > 0 ? `&carrera_fk=${checkedCareers.map((career: { value: any; }) => career.value).join(",")}` : ""
  const min = new Date(filters.date.min.getTime() - (filters.date.min.getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0]
  const max = new Date(filters.date.max.getTime() - (filters.date.max.getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0]
  const dateFilter = filters.date.enable ? `&${filters.date.criteria}_min=${min}&${filters.date.criteria}_max=${max}` : ""
  const urlFilters = `${docFilter}${sexFilter}${careerFilter}${dateFilter}${orderFilter}&num_control=${filters.search}`
  const datos = await fetch("http://127.0.0.1:8000/alumnos/?" + `${urlFilters}`);
  const data = await datos.json();

  const docDefinition = {
    pageSize: 'A4',
    pageOrientation: 'landscape',
    content: [
      {
        text: 'Tabla de Estudiantes',
        style: 'header',
      },
      {
        table: {
          widths: ['7%','7%','7%','7%','8%','1%','6%','5%','5%','5%','6%','5%','5%','5%','5%','5%','5%','6%'],
          body: data.map((row:Student) => (
            [
              { text: row.num_control, style: 'body' },
              { text: row.nombre, style: 'body' },
              { text: row.apellidop, style: 'body' },
              { text: row.apellidom, style: 'body' },
              { text: row.nombre_carrera, style: 'body' },
              { text: row.sexo, style: 'body' },
              { text: row.CURP, style: 'body' },
              { text: row.periodo_ingreso, style: 'body' },
              { text: row.periodo_egreso, style: 'body' },
              { text: row.num_folio, style: 'body' },
              { text: row.fecha_registro_cert, style: 'body' },
              { text: row.observaciones_cert, style: 'body' },
              { text: row.num_titulo, style: 'body' },
              { text: row.clave_plan, style: 'body' },
              { text: row.fecha_acto, style: 'body' },
              { text: row.fecha_registro_tit, style: 'body' },
              { text: row.num_cedula, style: 'body' },
              { text: row.observaciones_tit, style: 'body' },
            ]
          )),
          willDrawCell: (cell: { borderWidth: number; borderColor: string; }) => {
            cell.borderWidth = 5;
            cell.borderColor = '#000000';
          },
        },
        layout: 'headerLineOnly',
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
    },
  };


  pdfMake.createPdf(docDefinition).download('data-table.pdf');


}


