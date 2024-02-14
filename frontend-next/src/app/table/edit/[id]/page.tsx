import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditCertificate from "@/components/forms/edit/edit-certificate";
import EditStudent from "@/components/forms/edit/edit-student";
import EditTitle from "@/components/forms/edit/edit-title";
import { Separator } from "@/components/ui/separator";
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
  );
  const fetchCareers = await fetch(
    `http://127.0.0.1:8000/data/api/v1/carreras/`,
    {
      method: "GET",
      headers: {
        Authorization: "Token " + session.token,
      },
    }
  );
  const careersData = await fetchCareers.json();
  const { results: studentData } = await fetchStudent.json();
  return { studentData, careersData };
}

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const {
    studentData: [student],
    careersData: careers,
  } = await getData(session, params.id);
  return (
    <>
      <h1 className="my-5 text-2xl font-semibold leading-none tracking-tight">
        Editar
      </h1>
      <EditStudent session={session} studentData={student} careers={careers} />
      {student.titulo_fk &&
        <>
          <Separator />
          <EditTitle session={session} studentData={student} />
        </>
      }
      {student.certificado_fk &&
        <>
          <Separator />
          <EditCertificate session={session} studentData={student} />
        </>
      }
    </>
  );
}
