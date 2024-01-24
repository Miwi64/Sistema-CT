import PageLayout from "@/components/page-layout";
import { DataTable } from "@/components/ui/data-table";
import { Student, columns } from "@/lib/columns";

async function getData(): Promise<Student[]>{
  return [
    {
      num_control: "2022001",
      nombre: "Carlos",
      apellidop: "González",
      apellidom: "Rodríguez",
      carrera: "Ingeniería Informática",
      sexo: "Masculino",
      CURP: "CGO123456ABCDEF01",
      num_folio: "F2022001001",
      fecha_registro_cert: "2022-01-01",
      observaciones_cert: "Certificación completada con éxito",
      num_titulo: "Ingeniero en Informática",
      clave_plan: "2018",
      fecha_acto: "2022-02-15",
      fecha_registro_tit: "2022-02-20",
      num_cedula: "CIT2022001",
      observaciones_tit: "Título expedido sin problemas",
    },
    {
      num_control: "2022002",
      nombre: "Sofía",
      apellidop: "Martínez",
      apellidom: "López",
      carrera: "Psicología",
      sexo: "Femenino",
      CURP: "SMA789012ABCDEF02",
      num_folio: "F2022002002",
      fecha_registro_cert: "2022-01-05",
      observaciones_cert: "Certificación completada con éxito",
      num_titulo: "Licenciada en Psicología",
      clave_plan: "2019",
      fecha_acto: "2022-02-18",
      fecha_registro_tit: "2022-02-25",
      num_cedula: "CPS2022002",
      observaciones_tit: "Título expedido sin problemas",
    },
    {
      num_control: "2022003",
      nombre: "Miguel",
      apellidop: "Hernández",
      carrera: "Administración de Empresas",
      sexo: "Masculino",
      CURP: "MHE345678ABCDEF03",
      observaciones_tit: "Título pendiente",
    },
    {
      num_control: "2022004",
      nombre: "Ana",
      apellidop: "López",
      carrera: "Derecho",
      sexo: "Femenino",
      CURP: "ALO901234ABCDEF04",
      num_titulo: "Abogada",
      num_cedula: "CDE2022004",
    },
    {
      num_control: "2022005",
      nombre: "Diego",
      apellidop: "Ramírez",
      carrera: "Medicina",
      sexo: "Masculino",
      CURP: "DRA567890ABCDEF05",
      num_folio: "F2022005005",
      fecha_registro_cert: "2022-03-01",
      observaciones_cert: "Certificación pendiente",
    },
    {
      num_control: "2022006",
      nombre: "Laura",
      apellidop: "García",
      carrera: "Arquitectura",
      sexo: "Femenino",
      CURP: "LGA123456ABCDEF06",
      clave_plan: "2020",
    },
    {
      num_control: "2022007",
      nombre: "Javier",
      apellidop: "Flores",
      carrera: "Contabilidad",
      sexo: "Masculino",
      CURP: "JFL789012ABCDEF07",
    },
    {
      num_control: "2022008",
      nombre: "María",
      apellidop: "Díaz",
      carrera: "Ciencias de la Comunicación",
      sexo: "Femenino",
      CURP: "MDI345678ABCDEF08",
      fecha_registro_tit: "2022-03-05",
      observaciones_tit: "Título expedido con menciones honoríficas",
    },
    {
      num_control: "2022009",
      nombre: "Pedro",
      apellidop: "Martínez",
      carrera: "Ingeniería Eléctrica",
      sexo: "Masculino",
      CURP: "PMA901234ABCDEF09",
      fecha_registro_cert: "2022-01-15",
      observaciones_cert: "Certificación completada con éxito",
    },
    {
      num_control: "2022010",
      nombre: "Isabel",
      apellidop: "López",
      carrera: "Biología",
      sexo: "Femenino",
      CURP: "ILO567890ABCDEF10",
      num_titulo: "Bióloga",
      num_cedula: "CBI2022010",
      observaciones_tit: "Título expedido sin problemas",
    },
  ];
}

export default async function StudentsTable() {
  const data = await getData();
  return (
    <PageLayout>
      <DataTable columns={columns} data={data} />
    </PageLayout>
  );
}
