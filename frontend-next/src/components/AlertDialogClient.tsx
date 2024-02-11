"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AlertDialogProps {
  id: string;
}

export default function AlertDialogClient({ id }: AlertDialogProps) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" asChild>
          <a>
            <Trash2 className="md:mr-2" />
            <span className="hidden md:inline">Eliminar</span>
          </a>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and all your data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              console.log("se cancelo");
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              console.log(id);
              const busqueda = await fetch(
                `http://127.0.0.1:8000/data/api/v1/alumnos/?num_control=${id}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Token " + session?.token,
                  },
                }
              );
              const { results } = await busqueda.json();

              console.log(results?.[0].id_alumno);
              console.log(results?.[0].certificado_fk);
              console.log(results?.[0].titulo_fk);
              const data = results?.[0].id_alumno;
              const datac = results?.[0].certificado_fk;
              const datat = results?.[0].titulo_fk;

              await fetch(
                `http://127.0.0.1:8000/data/api/v1/alumnos/${data}/`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Token " + session?.token,
                  },
                }
              );
              /*Eliminacion de Certificado y Titulo*/
              // await fetch(
              //   `http://127.0.0.1:8000/data/api/v1/certificados/${datac}/`,
              //   {
              //     method: "DELETE",
              //     headers: {
              //       "Content-Type": "application/json",
              //       Authorization: "Token " + session?.token,
              //     },
              //   }
              // );
              // await fetch(
              //   `http://127.0.0.1:8000/data/api/v1/titulados/${datat}/`,
              //   {
              //     method: "DELETE",
              //     headers: {
              //       "Content-Type": "application/json",
              //       Authorization: "Token " + session?.token,
              //     },
              //   }
              // );

              toast(`Eliminacion Exitosa`, {
                description: "Actualizando y redirigiendo a la Tabla Principal",
              });
              router.push("/table");
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
