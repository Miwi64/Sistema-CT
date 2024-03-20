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
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

import TableContextMenu from "../students-table/table-context-menu";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  columnVisibility: VisibilityState;
  setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
  setData: React.Dispatch<React.SetStateAction<TData[]>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  columnVisibility,
  setColumnVisibility,
  setData,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const router = useRouter();
  const reactTable = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    defaultColumn: {
      size: 120,
      minSize: 50,
      maxSize: 350,
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  function handleClick(id: number) {
    router.push(`/table/view/${id}`);
  }

  return (
    <div className="rounded-md border">
      {reactTable.getRowModel().rows?.length ? (
        <div>
          <Table
            style={{
              width: reactTable.getCenterTotalSize(),
            }}
          >
            <TableHeader>
              {reactTable.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        style={{ width: header.getSize() }}
                        className="font-semibold text-primary dark:text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                        onDoubleClick={() => header.column.resetSize()}
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {reactTable.getRowModel().rows.map((row) => (
                <TableContextMenu
                  title={row.getValue("num_control")}
                  id={row.getValue("id_alumno")}
                  key={row.id}
                  afterDelete={() => {
                    const dataCopy = [...data];
                    dataCopy.splice(row.index, 1);
                    setData(dataCopy);
                  }}
                >
                  <TableRow
                    className="hover:bg-accent cursor-pointer"
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => {
                      handleClick(row.getValue("id_alumno"));
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{
                          width: cell.column.getSize(),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableContextMenu>
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
