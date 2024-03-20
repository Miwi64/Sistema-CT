import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditCertificate from "@/components/forms/edit/edit-certificate";
import EditStudent from "@/components/forms/edit/edit-student";
import EditTitle from "@/components/forms/edit/edit-title";
import LinkCertificateButton from "@/components/forms/link-certificate";
import LinkTitleButton from "@/components/forms/link-title";
import { Separator } from "@/components/ui/separator";
import { Link2 } from "lucide-react";
import { Session, getServerSession } from "next-auth";

async function getData(session: Session, id: string) {
  const fetchStudent = await fetch(
    `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/alumnos/${id}/`,
    {
      method: "GET",
      headers: {
        Authorization: "Token " + session.token,
      },
    }
  );
  const fetchCareers = await fetch(
    `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/carreras/`,
    {
      method: "GET",
      headers: {
        Authorization: "Token " + session.token,
      },
    }
  );
  const careersData = await fetchCareers.json();
  const studentData = await fetchStudent.json();
  return { studentData, careersData };
}

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const { studentData: student, careersData: careers } = await getData(
    session,
    params.id
  );
  return (
    <>
      <h1 className="my-3 text-2xl font-semibold leading-none tracking-tight">
        Editar
      </h1>
      {(!student.titulo_fk || !student.certificado_fk) && (
        <section className="flex gap-2 text-muted-foreground">
          <Link2 /> Anexar
        </section>
      )}

      <section className="flex gap-3 mt-3 mb-10">
        {!student.titulo_fk && (
          <LinkTitleButton studentData={student} session={session} />
        )}
        {!student.certificado_fk && (
          <LinkCertificateButton studentData={student} session={session} />
        )}
      </section>

      <EditStudent session={session} studentData={student} careers={careers} />
      {student.titulo_fk && (
        <>
          <Separator />
          <EditTitle session={session} studentData={student} />
        </>
      )}
      {student.certificado_fk && (
        <>
          <Separator />
          <EditCertificate session={session} studentData={student} />
        </>
      )}
    </>
  );
}
