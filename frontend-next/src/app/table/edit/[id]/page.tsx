import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditCertificate from "@/components/forms/edit/edit-certificate";
import EditStudent from "@/components/forms/edit/edit-student";
import EditTitle from "@/components/forms/edit/edit-title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookType, Link2, ScrollText } from "lucide-react";
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
      <h1 className="my-3 text-2xl font-semibold leading-none tracking-tight">
        Editar
      </h1>
      {!student.titulo_fk || !student.certificado_fk &&
        <><section className="flex gap-2 text-muted-foreground">
          <Link2 /> Anexar
        </section>
          <section className="flex gap-3 mt-3 mb-10">
            {!student.titulo_fk && <Button variant="secondary" asChild>
              <a href={`/table/link/${params.id}`}>
                <BookType className="mr-2" />
                <span className="inline">Título</span>
              </a>
            </Button>}
            {!student.certificado_fk && <Button variant="secondary" asChild>
              <a href={`/table/link/${params.id}`}>
                <ScrollText className="mr-2" />
                <span className="inline">Certificado</span>
              </a>
            </Button>}
          </section></>}
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
