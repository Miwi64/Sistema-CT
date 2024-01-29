import { Table } from "@tanstack/react-table";

interface DataTableSelectionProps<TData> {
  table: Table<TData>;
}

export function DataTableSelection<TData>({
  table,
}: DataTableSelectionProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="hidden sm:block flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} de{" "}
        {table.getFilteredRowModel().rows.length} fila(s) seleccionadas
      </div>
    </div>
  );
}
