"use client";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import ResponsiveDialog from "./responsive/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { notification } from "./responsive/notification";
import { useState } from "react";

interface DeleteButtonProps {
  id: string;
  mode?: "button" | "context-menu-item";
  additionalAction?: () => void
}

export const DeleteButton = ({ id, mode = "button", additionalAction }: DeleteButtonProps) => {
  const { data: session } = useSession();

  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const handleDelete = async (controlNumber: string) => {
    const search = await fetch(
      `http://127.0.0.1:8000/data/api/v1/alumnos/?num_control=${controlNumber}`,
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
    const id = student?.id_alumno;
    const response = await fetch(
      `http://127.0.0.1:8000/data/api/v1/alumnos/${id}/`,
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
    await fetch(`http://127.0.0.1:8000/data/api/v1/certificados/${datac}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + session?.token,
      },
    });
    await fetch(`http://127.0.0.1:8000/data/api/v1/titulados/${datat}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + session?.token,
      },
    });
    if (pathname === "/table") {
      notification(
        `El registro ha sido eliminado correctamente`,
        "success",
        undefined,
        isDesktop
      );
    } else {
      notification(
        `El registro ha sido eliminado correctamente`,
        "success",
        "Redirigiendo a la Tabla de estudiantes",
        isDesktop
      );
      router.push("/table");
    }
    /*Eliminacion de Certificado y Titulo*/
  };
  return (
    <ResponsiveDialog
      title={`Eliminar ${id}`}
      controlledOpen={{ open, setOpen }}
      trigger={
        mode === "button" ? (
          <Button variant="destructive">
            <Trash2 />
            <span className={"hidden md:ml-2 md:inline"}>Eliminar</span>
          </Button>
        ) : isDesktop ? (
          <Button
            variant="ghost"
            className="flex px-2 py-1 justify-start w-full h-auto"
          >
            <Trash2 />
            <span className={"ml-2 md:inline"}>Eliminar</span>
          </Button>
        ) : (
          <Button variant="destructive" className="justify-start py-6">
            <Trash2 />
            <span className={"text-lg ml-4 md:inline"}>Eliminar</span>
          </Button>
        )
      }
      description="¿Está seguro? Esta acción no podrá deshacerse."
    >
      <section className="flex items-center gap-3">
        <Button
          onClick={async () => {
            await handleDelete(id);
            {additionalAction && additionalAction()}
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
