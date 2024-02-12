import { Session, getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import ExportForm from "@/components/export/ExportForm"

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
  return results
}

const StudentsTablePage = async () => {
  const session = await getServerSession(authOptions)
  const careers = await getCareers(session)
  return (
    <>
      <h1 className="my-5 text-2xl font-semibold leading-none tracking-tight">Exportar</h1>
      <ExportForm session={session} careers={careers} />
    </>
  )
}

export default StudentsTablePage