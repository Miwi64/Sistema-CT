import * as React from "react";
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from "@fluentui/react-icons";
import {
  Avatar,
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

/* const items = [
  {
    numeroControl: { label: "1976123"},
    nombre: { label: "Elton"},
    apellido: { label: "Tito"},
    carrera: {label : "Administración"},
    folio: {label: "023024934"},
    titulo: {label: "353594395"},
  },
  {
    numeroControl: { label: "17766348"},
    nombre: { label: "Javier"},
    apellido: { label: "Torres"},
    carrera: {label : "Sistemas"},
    folio: {label: ""},
    titulo: {label: "49596590"},
  },
  {
    numeroControl: { label: "1576213"},
    nombre: { label: "Ana"},
    apellido: { label: "Perez"},
    carrera: {label : "Electromecánica"},
    folio: {label: "35475758"},
    titulo: {label: "87749599"},
  },
  {
    numeroControl: { label: "18760647"},
    nombre: { label: "María"},
    apellido: { label: "López"},
    carrera: {label : "Agrícola"},
    folio: {label: "59495940"},
    titulo: {label: ""},
  },
]; */

const columns = [
  createTableColumn({
    columnId: "Numero de control",
    compare: (a, b) => {
      return a.numeroControl.label.localeCompare(b.numeroControl.label);
    },
    renderHeaderCell: () => {
      return "Número de control";
    },
    renderCell: (item) => {
      return (
        <TableCellLayout>
          {item.numeroControl.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn({
    columnId: "Nombre",
    compare: (a, b) => {
      return a.nombre.label.localeCompare(b.nombre.label);
    },
    renderHeaderCell: () => {
      return "Nombre";
    },
    renderCell: (item) => {
      return (
        <TableCellLayout>
          {item.nombre.label}
        </TableCellLayout>
      );
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
      return (
        <TableCellLayout>
          {item.apellido.label}
        </TableCellLayout>
      );
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
      return (
        <TableCellLayout>
          {item.carrera.label}
        </TableCellLayout>
      );
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
      return (
        <TableCellLayout>
          {item.titulo.label}
        </TableCellLayout>
      );
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
      return (
        <TableCellLayout>
          {item.folio.label}
        </TableCellLayout>
      );
    },
  }),
];

export default function Table() {
  return (
    <DataGrid
      items={items}
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
  );
};