import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PageLayout from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  BookType,
  ChevronsUpDown,
  GraduationCap,
  Pencil,
  Printer,
  ScrollText,
  UserRound,
} from "lucide-react";
import { Session, getServerSession } from "next-auth";
import AlertDialogClient from "@/components/AlertDialogClient";

async function getData(session: Session, id: string) {
  const fetchApi = await fetch(
    `http://127.0.0.1:8000/data/api/v1/alumnos?num_control=${id}`,
    {
      method: "GET",
      headers: {
        Authorization: "Token " + session.token,
      },
    }
  );
  const { results: studentData } = await fetchApi.json();
  return studentData;
}

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const [
    {
      nombre,
      apellidop,
      apellidom,
      nombre_carrera,
      periodo_ingreso,
      periodo_egreso,
      sexo,
      CURP,
      estado_nacimiento,
      fecha_nacimiento,
      num_folio,
      fecha_registro_cert,
      observaciones_cert,
      num_titulo,
      clave_plan,
      fecha_acto,
      fecha_registro_tit,
      num_cedula,
      observaciones_tit,
    },
  ] = await getData(session, params.id);
  const sexoText =
    sexo === "m" || sexo === "M"
      ? "Masculino"
      : sexo === "f" || sexo === "F"
      ? "Femenino"
      : "Indefinido";
  return (
    <PageLayout>
      <h1 className="text-muted-foreground font-semibold mt-8 text-md">
        Número de control: {params.id}
      </h1>
      <h2 className="my-2  text-3xl font-bold mr-16">{`${nombre} ${apellidop} ${apellidom}`}</h2>
      <section className="my-5 flex gap-3">
        <Button variant="secondary" asChild>
          <a href={`/table/edit/${params.id}`}>
            <Pencil className="md:mr-2" />
            <span className="hidden md:inline">Editar</span>
          </a>
        </Button>
        {/*Eliminacion */}
        <AlertDialogClient id={params.id} />
        {/*Eliminacion */}
      </section>
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground w-full justify-between text-xl"
            >
              <span className="flex flex-row items-center text-xl text-muted-foreground gap-2">
                <UserRound size={22} /> Estudiante
              </span>
              <ChevronsUpDown />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="mt-4">
              <CardContent>
                <Table>
                  <TableBody>
                    {[
                      { head: "Nombre", value: nombre },
                      { head: "Apellido paterno", value: apellidop },
                      { head: "Apellido materno", value: apellidom },
                      { head: "Sexo", value: sexoText },
                      { head: "CURP", value: CURP },
                      {
                        head: "Estado de nacimiento",
                        value: estado_nacimiento,
                      },
                      { head: "Fecha de nacimiento", value: fecha_nacimiento },
                    ].map(({ head, value }) => (
                      <TableRow key={value}>
                        <TableCell>{head}</TableCell>
                        <TableCell className="text-primary font-medium">
                          {value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
        <Collapsible defaultOpen>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground w-full justify-between text-xl"
            >
              <span className="flex flex-row items-center text-xl text-muted-foreground gap-2">
                <GraduationCap size={24} /> Carrera
              </span>
              <ChevronsUpDown />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="mt-4">
              <CardContent>
                <Table>
                  <TableBody>
                    {[
                      { head: "Nombre", value: nombre_carrera },
                      { head: "Periodo de ingreso", value: periodo_ingreso },
                      { head: "Periodo de egreso", value: periodo_egreso },
                    ].map(({ head, value }) => (
                      <TableRow key={value}>
                        <TableCell>{head}</TableCell>
                        <TableCell className="text-primary font-medium">
                          {value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
        {num_folio && (
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground w-full justify-between text-xl"
              >
                <span className="flex flex-row items-center text-xl text-muted-foreground gap-2">
                  <ScrollText size={22} /> Certificado
                </span>
                <ChevronsUpDown />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Card className="mt-4">
                <CardContent>
                  <Table>
                    <TableBody>
                      {[
                        { head: "Número de folio", value: num_folio },
                        {
                          head: "Fecha de registro",
                          value: fecha_registro_cert,
                        },
                        { head: "Observaciones", value: observaciones_cert },
                      ].map(({ head, value }) => (
                        <TableRow key={value}>
                          <TableCell>{head}</TableCell>
                          <TableCell className="text-primary font-medium">
                            {value}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        )}
        {num_titulo && (
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground w-full justify-between text-xl"
              >
                <span className="flex flex-row items-center text-xl text-muted-foreground gap-2">
                  <BookType size={22} /> Título
                </span>
                <ChevronsUpDown />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Card className="mt-4">
                <CardContent>
                  <Table>
                    <TableBody>
                      {[
                        { head: "Número de título", value: num_titulo },
                        {
                          head: "Fecha de registro",
                          value: fecha_registro_tit,
                        },
                        { head: "Fecha del acto", value: fecha_acto },
                        { head: "Número de cédula", value: num_cedula },
                        { head: "Plan de estudios", value: clave_plan },
                        { head: "Observaciones", value: observaciones_tit },
                      ].map(({ head, value }) => (
                        <TableRow key={value}>
                          <TableCell>{head}</TableCell>
                          <TableCell className="text-primary font-medium">
                            {value}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        )}
      </section>
    </PageLayout>
  );
}
