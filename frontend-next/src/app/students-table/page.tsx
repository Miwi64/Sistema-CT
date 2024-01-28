"use client"
import PageLayout from "@/components/page-layout";
import PaginationHandler, { PaginationData } from "@/components/pagination-handler";
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
      const {results, ...pagination} = await fetchApi.json()
      setPaginationData(pagination)
      setStudentData(results)
    }
    if(session) {
      console.log(paginationData)
      loadData()
    }
  }, [paginationData.current_page, session])
  return (
    <PageLayout>
      <DataTable columns={columns} data={studentData} />
      <section className="my-5 flex justify-center">
      <PaginationHandler data={paginationData} setData={setPaginationData}/>
      </section>
    </PageLayout>
  );
}
