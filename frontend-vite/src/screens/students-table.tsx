import { Student, columns } from "@/lib/columns"
import { DataTable } from "../components/ui/data-table"
import { useEffect, useState } from "react";



export default function StudentsTable() {
  const [students, setStudents] = useState<Student[]>([])

  useEffect(() => {
    const loadStudents = async () => {
      //const res = getAllStudents()
      const res = [
        {
            numeroControl: "19761234",
            nombre: "Elton",
            apellido: "Tito",
            carrera: "Administración",
            folio: "023024934",
            titulo: "353594395",
          },
          {
            numeroControl: "17766348",
            nombre: "Javier",
            apellido: "Torres",
            carrera: "Sistemas",
            folio: "",
            titulo: "49596590",
          },
          {
            numeroControl: "15762130",
            nombre: "Ana",
            apellido: "Perez",
            carrera: "Electromecánica",
            folio: "35475758",
            titulo: "87749599",
          },
          {
            numeroControl: "18760647",
            nombre: "María",
            apellido: "López",
            carrera: "Agrícola",
            folio: "59495940",
            titulo: "",
          },
      ]
      setStudents(res)
    }
    loadStudents()
  }, []);
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={students} />
    </div>
  )
}
