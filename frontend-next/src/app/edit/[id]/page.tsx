import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditForm from "@/components/edit/edit-form";
import PageLayout from "@/components/page-layout";
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
  const careersData = await fetchCareers.json()
  const { results: studentData } = await fetchStudent.json();
  return {studentData, careersData};
}

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const {studentData: [student], careersData: careers} = await getData(session, params.id);
  return (
    <PageLayout>
      <h1 className="my-5 text-2xl font-semibold leading-none tracking-tight">
        Editar
      </h1>
      <EditForm session={session} data={student} careers={careers}/>
    </PageLayout>
  );
}
