"use client";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ResponsiveDialog from "./responsive/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { notification } from "./responsive/notification";
import { useState } from "react";

interface DeleteButtonProps {
  id: string;
}

export const DeleteButton = ({ id }: DeleteButtonProps) => {
  const { data: session } = useSession();

  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = async (controlNumber: string) => {
    const search = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/alumnos/?num_control=${controlNumber}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + session?.token,
        },
      }
    );
    const {
      results: [student],
    } = await search.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/alumnos/${student?.id_alumno}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + session?.token,
        },
      }
    );

    setOpen(false);
    if (!response.ok) {
      notification(
        `Error al intentar eliminar el registro (${response.status})`,
        "error",
        "Vuelva a intentarlo más tarde",
        isDesktop
      );
      return;
    }

    const datac = student.certificado_fk;
    const datat = student.titulo_fk;
    await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/certificados/${datac}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + session?.token,
        },
      }
    );
    await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}1/titulados/${datat}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + session?.token,
        },
      }
    );
    notification(
      `El registro ha sido eliminado correctamente`,
      "success",
      "Redirigiendo a la Tabla de estudiantes",
      isDesktop
    );
    router.push("/table");
  };

  return (
    <ResponsiveDialog
      title={`Eliminar ${id}`}
      controlledOpen={{ open, setOpen }}
      trigger={
        <Button variant="destructive">
          <Trash2 />
          <span className={"hidden md:ml-2 md:inline"}>Eliminar</span>
        </Button>
      }
      description="¿Está seguro? Esta acción no podrá deshacerse."
    >
      <section className="flex items-center gap-3">
        <Button
          onClick={async () => {
            await handleDelete(id);
          }}
          variant="destructive"
        >
          <Trash2 className="mr-2" />
          <span>Eliminar</span>
        </Button>
        <Button onClick={() => setOpen(!open)} variant="outline">
          Cancelar
        </Button>
      </section>
    </ResponsiveDialog>
  );
};
