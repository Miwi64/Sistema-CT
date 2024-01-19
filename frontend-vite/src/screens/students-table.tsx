import { Student, columns } from "@/lib/columns";
import { DataTable } from "../components/ui/data-table";
import { useEffect, useState } from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { RibbonToolbar } from "@/components/datatable/ribbon-toolbar";
import { NavMenu } from "@/components/nav-menu";
import { useToken } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function StudentsTable() {
  const is = useToken();
  const [data, setData] = useState<Student[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    const loadData = async () => {
      /*       console.log(is);
      if (is) {
        console.log("Token caducada");
      } */

      //const res = getAllStudents()
      /* const res = [
        {
          num_control: "2022001",
          nombre: "Carlos",
          apellidop: "González",
          apellidom: "Rodríguez",
          carrera: "Ingeniería Informática",
          sexo: "Masculino",
          CURP: "CGO123456ABCDEF01",
          num_folio: "F2022001001",
          fecha_registro_cert: "2022-01-01",
          observaciones_cert: "Certificación completada con éxito",
          num_titulo: "Ingeniero en Informática",
          clave_plan: "2018",
          fecha_acto: "2022-02-15",
          fecha_registro_tit: "2022-02-20",
          num_cedula: "CIT2022001",
          observaciones_tit: "Título expedido sin problemas",
        },
        {
          num_control: "2022002",
          nombre: "Sofía",
          apellidop: "Martínez",
          apellidom: "López",
          carrera: "Psicología",
          sexo: "Femenino",
          CURP: "SMA789012ABCDEF02",
          num_folio: "F2022002002",
          fecha_registro_cert: "2022-01-05",
          observaciones_cert: "Certificación completada con éxito",
          num_titulo: "Licenciada en Psicología",
          clave_plan: "2019",
          fecha_acto: "2022-02-18",
          fecha_registro_tit: "2022-02-25",
          num_cedula: "CPS2022002",
          observaciones_tit: "Título expedido sin problemas",
        },
        {
          num_control: "2022003",
          nombre: "Miguel",
          apellidop: "Hernández",
          carrera: "Administración de Empresas",
          sexo: "Masculino",
          CURP: "MHE345678ABCDEF03",
          observaciones_tit: "Título pendiente",
        },
        {
          num_control: "2022004",
          nombre: "Ana",
          apellidop: "López",
          carrera: "Derecho",
          sexo: "Femenino",
          CURP: "ALO901234ABCDEF04",
          num_titulo: "Abogada",
          num_cedula: "CDE2022004",
        },
        {
          num_control: "2022005",
          nombre: "Diego",
          apellidop: "Ramírez",
          carrera: "Medicina",
          sexo: "Masculino",
          CURP: "DRA567890ABCDEF05",
          num_folio: "F2022005005",
          fecha_registro_cert: "2022-03-01",
          observaciones_cert: "Certificación pendiente",
        },
        {
          num_control: "2022006",
          nombre: "Laura",
          apellidop: "García",
          carrera: "Arquitectura",
          sexo: "Femenino",
          CURP: "LGA123456ABCDEF06",
          clave_plan: "2020",
        },
        {
          num_control: "2022007",
          nombre: "Javier",
          apellidop: "Flores",
          carrera: "Contabilidad",
          sexo: "Masculino",
          CURP: "JFL789012ABCDEF07",
        },
        {
          num_control: "2022008",
          nombre: "María",
          apellidop: "Díaz",
          carrera: "Ciencias de la Comunicación",
          sexo: "Femenino",
          CURP: "MDI345678ABCDEF08",
          fecha_registro_tit: "2022-03-05",
          observaciones_tit: "Título expedido con menciones honoríficas",
        },
        {
          num_control: "2022009",
          nombre: "Pedro",
          apellidop: "Martínez",
          carrera: "Ingeniería Eléctrica",
          sexo: "Masculino",
          CURP: "PMA901234ABCDEF09",
          fecha_registro_cert: "2022-01-15",
          observaciones_cert: "Certificación completada con éxito",
        },
        {
          num_control: "2022010",
          nombre: "Isabel",
          apellidop: "López",
          carrera: "Biología",
          sexo: "Femenino",
          CURP: "ILO567890ABCDEF10",
          num_titulo: "Bióloga",
          num_cedula: "CBI2022010",
          observaciones_tit: "Título expedido sin problemas",
        },
      ];
      setData(res); */

      const AuthToken = localStorage.getItem("jwt");
      // Este codigo es el que nos funciono el Viernes
      const res = await fetch("http://localhost:8000/data/api/v1/alumnos/", {
        method: "GET",
        headers: {
          Authorization: "Token " + AuthToken,
        },
      });

      const object = await res.json();
      console.log(object.results);

      setData(object.results);
    };
    loadData();
  }, []);
  return (
    <div>
      <div className="top-0 sticky z-20">
        <NavMenu />
        <RibbonToolbar table={table} />
      </div>
      <div className="px-5">
        <DataTable table={table} />
      </div>
    </div>
  );
}
