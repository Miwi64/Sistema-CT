import {
  ColumnDef,
  Table as ReactTable,
  flexRender,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "../datatable/datatable-pagination";

interface DataTableProps<TData> {
  table: ReactTable<TData>;
}

export function DataTable<TData>({
  table,
}: DataTableProps<TData>) {
  return table.getRowModel().rows?.length ? (
    <div className="rounded-md mt-4 border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
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
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))
          }
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  ) : (
    <div className="rounded-md mt-4 border">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="h-24 text-center">
              Sin datos para mostrar.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
