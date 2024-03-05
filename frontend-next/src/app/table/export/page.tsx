import { Session, getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import ExportForm from "@/components/forms/export-form";
import Loader from "@/components/ui/loader";

const getCareers = async (session: Session) => {
  const fetchApi = await fetch(
    `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/carreras/`,
    {
      method: "GET",
      headers: {
        Authorization: "Token " + session.token,
      },
    }
  );
  const results = await fetchApi.json();
  return results;
};

const StudentsTablePage = async () => {
  const session = await getServerSession(authOptions);
  const careers = await getCareers(session);
  return (
    <>
      <ExportForm session={session} careers={careers} />
    </>
  );
};

export default StudentsTablePage;
