import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TitleForm from "@/components/forms/title-form";
import { getServerSession } from "next-auth";
import { Session } from "next-auth";

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

const Page = async () => {
  const session = await getServerSession(authOptions);
  const careers = await getCareers(session);
  return (
    <>
      <h1 className="my-5 text-2xl font-semibold leading-none tracking-tight">
        Agregar Título
      </h1>
      <TitleForm careers={careers} session={session} />
    </>
  );
};

export default Page;
