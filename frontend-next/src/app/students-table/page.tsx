import PageLayout from "@/components/page-layout";
import { DataTable } from "@/components/ui/data-table";
import { Student, columns } from "@/lib/columns";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

async function getData(): Promise<Student[]> {
  const session = await getServerSession(authOptions)
  const fetchApi = await fetch(process.env.DJANGO_API_URL+"/alumnos/", {
    method: "GET",
    headers: {
      Authorization: "Token " + session.token,
    },
  });
  const response = await fetchApi.json();
  return response.results;
}

export default async function StudentsTable() {
  const data = await getData();
  return (
    <PageLayout>
      <DataTable columns={columns} data={data} />
    </PageLayout>
  );
}
