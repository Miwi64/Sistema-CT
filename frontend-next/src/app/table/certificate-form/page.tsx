import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import CertificateForm from '@/components/forms/certificate-form'
import { getServerSession } from 'next-auth'
import { Session } from 'next-auth'

const getCareers = async (session: Session) => {
  const fetchApi =
    await fetch(`http://127.0.0.1:8000/data/api/v1/carreras/`,
      {
        method: "GET",
        headers: {
          Authorization: "Token " + session.token,
        }
      })
  const results = await fetchApi.json()
  return results
}

const Page = async () => {
  const session = await getServerSession(authOptions)
  const careers = await getCareers(session)
  return (
    <>
      <h1 className="my-5 text-2xl font-semibold leading-none tracking-tight">
        Agregar Certificado
      </h1>
      <CertificateForm careers={careers} session={session} />
    </>
  )
}

export default Page