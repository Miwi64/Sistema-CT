import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LinkCertificateForm from "@/components/link/link-certificate-form";
import { Button } from "@/components/ui/button";
import { Session, getServerSession } from "next-auth";

async function getData(session: Session, id: string) {
  const fetchStudent = await fetch(
    `http://127.0.0.1:8000/data/api/v1/alumnos?num_control=${id}`,
    {
      method: "GET",
      headers: {
        Authorization: "Token " + session.token,
      },
    }
  )
  const data = await fetchStudent.json()
  return data
}

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  const { results: [student] } = await getData(session, params.id);
  if (student.certificado_fk) {
    return <div className="flex h-screen flex-col gap-8 justify-center items-center">
      El registro proporcionado ya está vinculado con un certificado
      <Button asChild>
        <a href="/table">Volver a la tabla de estudiantes</a> 
      </Button>
    </div>
  }
  else {
    return (
      <>
        <h1 className="my-5 text-2xl font-semibold leading-none tracking-tight">
          Vincular certificado a {`${student.nombre} ${student.apellidop} ${student.apellidom}`}
        </h1>
        <LinkCertificateForm session={session} studentData={student} />
      </>)
  }
}
