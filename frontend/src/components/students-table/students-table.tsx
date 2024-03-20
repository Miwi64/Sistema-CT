"use client";
import PaginationHandler, {
  PaginationData,
} from "@/components/pagination-handler";
import { DataTable } from "@/components/ui/data-table";
import { Student, columns } from "@/lib/columns";
import { Tabs } from "@radix-ui/react-tabs";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { TabsList, TabsTrigger } from "../ui/tabs";
import { File, Filter, Home } from "lucide-react";
import StartTab from "./tabs/start-tab";
import FilterTab from "./tabs/filter-tab";
import PageTab from "./tabs/page-tab";
import { VisibilityState } from "@tanstack/react-table";
import { STUDENT_VISIBLE_COLUMNS } from "@/lib/constants";
import Loader from "../ui/loader";

interface StudentsTableProps {
  careers: Career[];
  session: Session;
}

export type Career = {
  id_carrera: number;
  nombre_carrera: string;
};

export type FilterData = {
  doc: string;
  gender: string;
  search: string;
  career: number;
  order: {
    criteria: string;
    type: string;
  };
  date: {
    enable: boolean;
    criteria: string;
    min: Date;
    max: Date;
  };
  period: {
    enable: boolean;
    criteria: string;
    date: string;
  };
};

export default function StudentsTable({
  careers,
  session,
}: StudentsTableProps) {
  const [paginationData, setPaginationData] = useState<PaginationData>({
    total_count: 0,
    current_page: "1",
    page_size: 10,
    total_pages: 1,
    next: "",
    previous: "",
    first: "",
    last: "",
  });

  const [studentData, setStudentData] = useState<Student[]>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    STUDENT_VISIBLE_COLUMNS
  );

  const [loading, setLoading] = useState(false);
  const [urlFilter, setUrlFilter] = useState<string>("");
  const [filters, setFilters] = useState<FilterData>({
    doc: "E",
    gender: "B",
    career: -1,
    search: "",
    order: { criteria: "num_control", type: "" },
    date: {
      enable: false,
      criteria: "nacimiento",
      min: new Date("1999-01-01"),
      max: new Date(),
    },
    period: {
      enable: false,
      criteria: "Ingreso",
      date: `${new Date().getFullYear()}${new Date().getMonth() < 8 ? "-02-01" : "-08-1"
        }`,
    },
  });
  useEffect(() => {
    const loadData = async (url: string) => {
      const fetchApi = await fetch(
        `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/alumnos?page=${paginationData.current_page}&limit=${paginationData.page_size}${url}`,
        {
          method: "GET",
          headers: {
            Authorization: "Token " + session.token,
          },
        }
      );
      const { results, ...pagination } = await fetchApi.json();
      setPaginationData(pagination);
      setStudentData(results);
    };
    const orderFilter = `&order_by=${filters.order.type}${filters.order.criteria}`;
    const docFilter =
      filters.doc === "C"
        ? "&certificado_fk_null=false"
        : filters.doc === "T"
          ? "&titulo_fk_null=false"
          : filters.doc === "CT" ?
          "&certificado_fk_null=false&titulo_fk_null=false":
          "";
    const sexFilter =
      filters.gender === "M"
        ? "&genero=M"
        : filters.gender === "F"
          ? "&genero=F"
          : "";
    const careerFilter =
      filters.career !== -1 ? `&carrera_fk=${filters.career}` : "";
    const min = new Date(
      filters.date.min.getTime() -
      filters.date.min.getTimezoneOffset() * 60 * 1000
    )
      .toISOString()
      .split("T")[0];
    const max = new Date(
      filters.date.max.getTime() -
      filters.date.max.getTimezoneOffset() * 60 * 1000
    )
      .toISOString()
      .split("T")[0];
    const dateFilter = filters.date.enable
      ? `&${filters.date.criteria}_min=${min}&${filters.date.criteria}_max=${max}`
      : "";
    const periodFilter = filters.period.enable
      ? `&periodo_${filters.period.criteria.toLowerCase()}=${filters.period.date
      }`
      : "";
    setUrlFilter(
      `${docFilter}${sexFilter}${careerFilter}${dateFilter}${periodFilter}${orderFilter}&num_control=${filters.search}`
    );
    setLoading(true);
    loadData(
      `${docFilter}${sexFilter}${careerFilter}${dateFilter}${periodFilter}${orderFilter}&num_control=${filters.search}`
    );
    setLoading(false);
  }, [paginationData.current_page, filters]);
  return (
    <>
      <Tabs defaultValue="Inicio" className="min-w-[200px] my-3">
        <TabsList
          className="w-full rounded-b-none flex flex-row justify-start 
            items-center overflow-x-auto overflow-y-visible h-15"
        >
          <TabsTrigger
            value="Inicio"
            className="data-[state=active]:text-primary dark:data-[state=active]:text-foreground"
          >
            <Home size={14} className="mr-2" />
            Inicio
          </TabsTrigger>
          <TabsTrigger
            value="Filtrar"
            className="data-[state=active]:text-primary dark:data-[state=active]:text-foreground"
          >
            <Filter size={14} className="mr-2" />
            Filtrar
          </TabsTrigger>
          <TabsTrigger
            value="Pagina"
            className="data-[state=active]:text-primary dark:data-[state=active]:text-foreground"
          >
            <File size={14} className="mr-2" />
            Página
          </TabsTrigger>
        </TabsList>

        <StartTab
          urlFilter={urlFilter}
          columnVisibility={columnVisibility}
          filters={filters}
          setFilters={setFilters}
        />

        <FilterTab
          careers={careers}
          filters={filters}
          setFilters={setFilters}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          setPaginationData={setPaginationData}
        />
        <PageTab
          paginationData={paginationData}
          setPaginationData={setPaginationData}
        />
      </Tabs>
      {
        loading ? <Loader /> : <DataTable
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          columns={columns}
          data={studentData}
          setData={setStudentData}
        />
      }
      <section className="flex justify-center my-5">
        <PaginationHandler data={paginationData} setData={setPaginationData} />
      </section>
    </>
  );
}