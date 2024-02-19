import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CareerCard from "@/components/careers/career-card";
import AddButton from "@/components/careers/add-button";

type Career = {
  id_carrera: number,
  nombre_carrera: string
}

const getCareers = async (session: Session) => {
  const fetchApi = await fetch(`http://127.0.0.1:8000/data/api/v1/carreras/`, {
    method: "GET",
    headers: {
      Authorization: "Token " + session.token,
    },
  });
  const results = await fetchApi.json();
  return results;
};

const Page = async () => {
  const session = await getServerSession(authOptions);
  const careers = await getCareers(session);
  return (
    <section className="py-5">
      <div className="flex justify-between items-center gap-5 mb-7">
        <h1 className="text-3xl font-bold">Carreras</h1>
        <AddButton session={session} />
      </div>
      <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {careers.map((career: Career) => (
          <CareerCard key={career.id_carrera} career={career} session={session} />
        ))}
      </section>
    </section>
  );
};

export default Page;
