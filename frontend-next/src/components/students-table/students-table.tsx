"use client"
import { NavMenu, NavMobile } from "@/components/nav-menu";
import PaginationHandler, { PaginationData } from "@/components/pagination-handler";
import { RibbonToolbar } from "@/components/ribbon-toolbar";
import { DataTable } from "@/components/ui/data-table";
import { Student, columns } from "@/lib/columns";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import DateFilter from "./date-filter";

interface StudentsTableProps {
  careers: Career[],
  session: Session
}

type Career = {
  text: string,
  value: number,
  checked: boolean
}

export type FilterData = {
  doc: string,
  sex: string,
  search: string,
  careers: Career[]
  order: {
    criteria: string,
    type: string
  },
  date: {
    enable: boolean
    criteria: string,
    min: Date,
    max: Date
  }
}

export default function StudentsTable({ careers, session }: StudentsTableProps) {
  const [paginationData, setPaginationData] = useState<PaginationData>({
    total_count: 0,
    current_page: "1",
    page_size: 10,
    total_pages: 1,
    next: "",
    previous: "",
    first: "",
    last: ""
  })

  const [studentData, setStudentData] = useState<Student[]>([])
  const [filters, setFilters] = useState<FilterData>({
    doc: "C", sex: "M", careers: careers, search: "", order: { criteria: "num_control", type: "" },
    date: { enable: false, criteria: "nacimiento", min: new Date("1963-01-01"), max: new Date() }
  })

  useEffect(() => {
    const loadData = async (urlFilters: string) => {
      const fetchApi =
        await fetch(`http://127.0.0.1:8000/data/api/v1/alumnos?page=${paginationData.current_page}&limit=${paginationData.page_size}${urlFilters}`,
          {
            method: "GET",
            headers: {
              Authorization: "Token " + session.token,
            }
          })
      const { results, ...pagination } = await fetchApi.json()
      setPaginationData(pagination)
      setStudentData(results)
    }
    console.log(paginationData)
    const orderFilter = `&order_by=${filters.order.type}${filters.order.criteria}`
    const docFilter = filters.doc === "C" ? "&certificado_fk_null=false" : filters.doc === "T" ? "&titulo_fk_null=false" : ""
    const sexFilter = filters.sex === "M" ? "&sexo=M" : filters.sex === "F" ? "&sexo=F" : ""
    const checkedCareers = filters.careers.filter((career => career.checked))
    const careerFilter = checkedCareers.length > 0 ? `&carrera_fk=${checkedCareers.map((career) => career.value).join(",")}` : ""
    const min = new Date(filters.date.min.getTime() - (filters.date.min.getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0]
    const max = new Date(filters.date.max.getTime() - (filters.date.max.getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0]
    const dateFilter = filters.date.enable ? `&${filters.date.criteria}_min=${min}&${filters.date.criteria}_max=${max}` : ""
    const urlFilters = `${docFilter}${sexFilter}${careerFilter}${dateFilter}${orderFilter}&num_control=${filters.search}`
    console.log(`http://127.0.0.1:8000/data/api/v1/alumnos?page=${paginationData.current_page}&limit=${paginationData.page_size}${urlFilters}`)
    loadData(urlFilters)

  }, [paginationData.current_page, filters])
  return (
    <>
      <nav className="top-0 sticky z-20">
        <NavMenu />
        <NavMobile />
        <DateFilter filters={filters} setFilters={setFilters} />
        <RibbonToolbar data={paginationData} setData={setPaginationData} filters={filters} setFilters={setFilters} />
      </nav>
      <main className="my-4 mx-3">
        <DataTable columns={columns} data={studentData} />
      </main>
      <footer className="flex justify-center mb-5">
        <PaginationHandler data={paginationData} setData={setPaginationData} />
      </footer>
    </>
  );
}
