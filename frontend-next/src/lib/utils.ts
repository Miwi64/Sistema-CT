import { type ClassValue, clsx } from "clsx";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


import { twMerge } from "tailwind-merge";
import { Student } from "./columns";
import { TDocumentDefinitions } from "pdfmake/interfaces";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

pdfMake.vfs = pdfFonts.pdfMake.vfs;

  //CSV
  function jsonToCsv(jsonData: Student[]) {

    const data = jsonData.map((item)=>(
      {
        "No. Control" : item.num_control,
        "Nombre" : item.nombre,
        "Apellido Paterno" : item.apellidop,
        "Apellido Materno" : item.apellidom,
        "Sexo" : item.sexo==='m'?"Masculino":item.sexo==='f'?"Femenino":"No Definido",
        "CURP" : item.CURP,
        "Periodo Ingreso" : item.periodo_ingreso,
        "Periodo Egreso" : item.periodo_egreso,
        "Estado Nacimiento" : item.estado_nacimiento,
        "Fecha Nacimiento" : item.fecha_nacimiento,
        "Carrera" : item.nombre_carrera,
        "No. Folio" : item.num_folio,
        "Fecha Registro Certificado" : item.fecha_registro_cert,
        "Observaciones Certificado" : item.observaciones_cert,
        "No. Titulo" : item.num_titulo,
        "Clave Plan" : item.clave_plan,
        "Fecha Acto" : item.fecha_acto,
        "Fecha Registro Titulo" : item.fecha_registro_tit,
        "No. Cedula" : item.num_cedula,
        "Observaciones Titulo" : item.observaciones_tit
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

  const docDefinition:TDocumentDefinitions = {
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
          headerRows:1,
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
    },
  };


  pdfMake.createPdf(docDefinition).download('data-table.pdf');


}


