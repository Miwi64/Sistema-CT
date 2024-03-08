import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CareerCard from "@/components/careers/career-card";
import AddButton from "@/components/careers/add-button";

type Career = {
  id_carrera: number;
  nombre_carrera: string;
};

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
    <section className="py-5">
      <div className="flex justify-between items-center gap-5 mb-5">
        <h1 className="text-2xl font-semibold leading-none tracking-tight">Carreras</h1>
        <AddButton session={session} />
      </div>
      <section className="grid gap-3">
        {careers.map((career: Career) => (
          <CareerCard
            key={career.id_carrera}
            career={career}
            session={session}
          />
        ))}
      </section>
    </section>
  );
};

export default Page;
