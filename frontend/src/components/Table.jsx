import * as React from "react";
import {
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  createTableColumn,
} from "@fluentui/react-components";
import { items } from "../libs/constants";

const columns = [
  createTableColumn({
    columnId: "control",
    compare: (a, b) => {
      return a.numeroControl.label.localeCompare(b.numeroControl.label);
    },
    renderHeaderCell: () => {
      return "Número de control";
    },
    renderCell: (item) => {
      return <TableCellLayout>{item.numeroControl.label}</TableCellLayout>;
    },
  }),
  createTableColumn({
    columnId: "nombre",
    compare: (a, b) => {
      return a.nombre.label.localeCompare(b.nombre.label);
    },
    renderHeaderCell: () => {
      return "Nombre";
    },
    renderCell: (item) => {
      return <TableCellLayout>{item.nombre.label}</TableCellLayout>;
    },
  }),
  createTableColumn({
    columnId: "apellido",
    compare: (a, b) => {
      return a.apellido.label.localeCompare(b.apellido.label);
    },
    renderHeaderCell: () => {
      return "Apellido";
    },
    renderCell: (item) => {
      return <TableCellLayout>{item.apellido.label}</TableCellLayout>;
    },
  }),
  createTableColumn({
    columnId: "carrera",
    compare: (a, b) => {
      return a.carrera.label.localeCompare(b.carrera.label);
    },
    renderHeaderCell: () => {
      return "Carrera";
    },
    renderCell: (item) => {
      return <TableCellLayout>{item.carrera.label}</TableCellLayout>;
    },
  }),
  createTableColumn({
    columnId: "titulo",
    compare: (a, b) => {
      return a.titulo.label.localeCompare(b.titulo.label);
    },
    renderHeaderCell: () => {
      return "Número de título";
    },
    renderCell: (item) => {
      return <TableCellLayout>{item.titulo.label}</TableCellLayout>;
    },
  }),
  createTableColumn({
    columnId: "folio",
    compare: (a, b) => {
      return a.folio.label.localeCompare(b.folio.label);
    },
    renderHeaderCell: () => {
      return "Número de folio";
    },
    renderCell: (item) => {
      return <TableCellLayout>{item.folio.label}</TableCellLayout>;
    },
  }),
];

const columnSizingOptions = {
  control: {
    minWidth: 180,
    defaultWidth: 180,
    idealWidth: 200,
  },
  nombre: {
    minWidth: 120,
    defaultWidth: 120,
    idealWidth: 220,
  },
  apellido: {
    minWidth: 120,
    defaultWidth: 120,
    idealWidth: 220,
  },
  carrera: {
    minWidth: 120,
    defaultWidth: 120,
    idealWidth: 220,
  },
  titulo: {
    minWidth: 120,
    defaultWidth: 120,
    idealWidth: 220,
  },
  folio: {
    minWidth: 120,
    defaultWidth: 120,
    idealWidth: 220,
  },
};

export default function Table() {
  const studentList = items;

  return (
    <div style={{ overflowX: "auto" }}>
      <DataGrid
        columnSizingOptions={columnSizingOptions}
        resizableColumns
        items={studentList}
        columns={columns}
        sortable
        selectionMode="multiselect"
        getRowId={(item) => item.nombre.label}
        onSelectionChange={(e, data) => {}}
        focusMode="composite"
      >
        <DataGridHeader>
          <DataGridRow selectionCell={{ "aria-label": "Select all rows" }}>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody>
          {({ item, rowId }) => (
            <DataGridRow
              key={rowId}
              selectionCell={{ "aria-label": "Select row" }}
            >
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </div>
  );
}
