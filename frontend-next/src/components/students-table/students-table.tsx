"use client"
import { NavMenu, NavMobile } from "@/components/nav-menu";
import PaginationHandler, { PaginationData } from "@/components/pagination-handler";
import { RibbonToolbar } from "@/components/ribbon-toolbar";
import { DataTable } from "@/components/ui/data-table";
import { Student, columns } from "@/lib/columns";
import { Session } from "next-auth";
import { useEffect, useState } from "react";

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
  search:string,
  careers: Career[]
}

export default function StudentsTable({careers, session}: StudentsTableProps) {
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
  const [filters, setFilters] = useState<FilterData>({ doc: "C", sex: "M", careers: careers, search: "" })

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
      const docFilter = filters.doc === "C" ? "&certificado_fk!=null" : filters.doc === "T" ? "&titulo_fk!=null" : ""
      const sexFilter = filters.sex === "M" ? "&sexo=M" : filters.sex === "F" ? "&sexo=F" : ""
      const checkedCareers = filters.careers.filter((career => career.checked))
      const careerFilter = checkedCareers.length > 0 ? `&career_FK=${checkedCareers.map((career) => career.value).join(",")}` : ""
      const urlFilters = `${docFilter}${sexFilter}${careerFilter}&num_control=${filters.search}`
      console.log(`http://127.0.0.1:8000/data/api/v1/alumnos?page=${paginationData.current_page}&limit=${paginationData.page_size}${urlFilters}`)
      loadData(urlFilters)

  }, [paginationData.current_page, filters])
  return (
    <>
      <nav className="top-0 sticky z-20">
        <NavMenu />
        <NavMobile />
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
