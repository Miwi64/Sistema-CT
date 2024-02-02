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

export default function AlertDialogClient({ dato }) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" asChild>
          <a>
            <Trash2 className="md:mr-2" />
            <span className="hidden md:inline">Eliminacion </span>
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
              console.log(dato);
              const busqueda = await fetch(
                `http://127.0.0.1:8000/data/api/v1/alumnos/?num_control=${dato}`,
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
              const data = results?.[0].id_alumno;
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
              toast(`Eliminacion Exitosa`, {
                description: "Actualizando y redirigiendo a la Tabla Principal",
              });
              router.push("/students-table");
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
