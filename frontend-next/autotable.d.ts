declare module "jspdf-autotable" {
    export function autoTable(
      doc: jsPDF,
      options: {
        head?: (() => any)[] | any[][];
        body?: (() => any)[][] | any[][][];
        startY?: number;
        margin?: { top?: number; right?: number; bottom?: number; left?: number };
        styles?: {
          font?: string;
          fontSize?: number;
          fontStyle?: string;
          fontItalic?: boolean;
          fontStroke?: string;
          fontColor?: string;
          fillColor?: string;
          textColor?: string;
          cellPadding?: number;
          halign?: string;
          valign?: string;
          lineColor?: string;
          lineWidth?: number;
          minCellHeight?: number;
          overflow?: string;
          cellWidth?: number;
          tableWidth?: number;
          tableLineWidth?: number;
          tableLineColor?: string;
          tableBackgroundColor?: string;
          tableHeaderColor?: string;
          useCss?: boolean;
        };
        didParseCell?: (data: {
          section: string;
          row: any;
          column: any;
          rowIndex: number;
          columnIndex: number;
          table: any;
        }) => void;
        willDrawCell?: (data: {
          section: string;
          row: any;
          column: any;
          rowIndex: number;
          columnIndex: number;
          table: any;
        }) => void;
        didDrawCell?: (data: {
          section: string;
          row: any;
          column: any;
          rowIndex: number;
          columnIndex: number;
          table: any;
        }) => void;
        marginCallback?: (doc: jsPDF, width: number, height: number) => void;
        tableWidthCallback?: (data: { table: any }) => number;
        didDrawPage?: (data: {
          pageCount: number;
          pageNumber: number;
          doc: jsPDF;
        }) => void;
      }
    ): void;
  }