"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnResizeDirection,
  ColumnResizeMode,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useReducer, useState } from "react";
import ResponsiveContextMenu from "../responsive/context-menu";
import { tableOptions } from "@/lib/constants";
import { DeleteButton } from "../delete-button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  columnVisibility: VisibilityState;
  setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  columnVisibility,
  setColumnVisibility,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [columnResizeMode, setColumnResizeMode] =
    useState<ColumnResizeMode>("onChange");

  const [columnResizeDirection, setColumnResizeDirection] =
    useState<ColumnResizeDirection>("ltr");

  const rerender = useReducer(() => ({}), {})[1];

  const reactTable = useReactTable({
    data,
    columns,
    columnResizeMode,
    columnResizeDirection,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });
  return (
    <div className="rounded-md border">
      {reactTable.getRowModel().rows?.length ? (
        <div>
          <Table>
            <TableHeader>
              {reactTable.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        <div
                          {...{
                            onDoubleClick: () => header.column.resetSize(),
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            className: `resizer ${
                              reactTable.options.columnResizeDirection
                            } ${
                              header.column.getIsResizing() ? "isResizing" : ""
                            }`,
                          }}
                        />
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {reactTable.getRowModel().rows.map((row) => (
                <ResponsiveContextMenu
                  title={row.getValue("num_control")}
                  options={tableOptions(
                    row.getValue("num_control"),
                    row.getValue("num_titulo"),
                    row.getValue("num_folio")
                  )}
                  key={row.id}
                  additionalOptions={
                    <DeleteButton
                      id={row.getValue("num_control")}
                      mode="context-menu-item"
                    />
                  }
                >
                  <TableRow data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </ResponsiveContextMenu>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sin resultados.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
}
