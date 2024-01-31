"use client"
import { NavMenu, NavMobile } from "@/components/nav-menu";
import PaginationHandler, { PaginationData } from "@/components/pagination-handler";
import { RibbonToolbar } from "@/components/ribbon-toolbar";
import { DataTable } from "@/components/ui/data-table";
import { Student, columns } from "@/lib/columns";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function StudentsTable() {
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
  const [selection, setSelection] = useState<number>(0)

  const { data: session } = useSession()
  useEffect(() => {
    const loadData = async () => {
      const fetchApi =
        await fetch(`http://127.0.0.1:8000/data/api/v1/alumnos?page=${paginationData.current_page}&limit=${paginationData.page_size}`,
          {
            method: "GET",
            headers: {
              Authorization: "Token " + session?.token,
            }
          })
      const { results, ...pagination } = await fetchApi.json()
      setPaginationData(pagination)
      setStudentData(results)
    }
    if (session) {
      console.log(paginationData)
      loadData()
    }
  }, [paginationData.current_page, session])
  return (
    <>
      <nav className="top-0 sticky z-20">
        <NavMenu />
        <NavMobile />
        <RibbonToolbar selection={selection} data={paginationData} setData={setPaginationData} />
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
