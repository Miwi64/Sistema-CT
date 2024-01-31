import { Session, getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import StudentsTable from "@/components/students-table/students-table"

const getCareers = async (session: Session) => {
    const fetchApi =
      await fetch(`http://127.0.0.1:8000/data/api/v1/carreras/`,
        {
          method: "GET",
          headers: {
            Authorization: "Token " + session.token,
          }
        })
    const results = await fetchApi.json()
    const careers = results.map((result: { id_carrera: number, nombre_carrera: string }) => ({ text: result.nombre_carrera, value: result.id_carrera, checked: true }))
    return careers
}

const StudentsTablePage = async () => {
  const session = await getServerSession(authOptions)
  const careers = await getCareers(session) 
  return (
    <StudentsTable session={session} careers={careers}/>
  )
}

export default StudentsTablePage