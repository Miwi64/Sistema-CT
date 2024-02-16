"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { BookUser, Link, MoreVertical, Pencil, Trash2, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
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
import { toast } from "sonner";

interface OptionsButtonProps {
  id: string;
  title: string;
  certificate: string;
}

const OptionsButton = ({ id, title, certificate }: OptionsButtonProps) => {
  const { data: session } = useSession();
  const [showAlert, setShowAlert] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="hidden md:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
            >
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="text-muted-foreground">
            <DropdownMenuItem asChild>
              <a href={`/table/view/${id}`} target="_blank">
                <BookUser className="mr-2" />
                <span>Ver más</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href={`/table/edit/${id}`} target="_blank">
                <Pencil className="mr-2" />
                <span>Editar</span>
              </a>
            </DropdownMenuItem>

            {!title && (
              <DropdownMenuItem asChild>
                <a href={`/table/link-title/${id}`} target="_blank">
                  <Link className="mr-2" />
                  <span>Vincular título</span>
                </a>
              </DropdownMenuItem>
            )}

            {!certificate && (
              <DropdownMenuItem asChild>
                <a href={`/table/link-certificate/${id}`} target="_blank">
                  <Link className="mr-2" />
                  <span>Vincular certificado</span>
                </a>
              </DropdownMenuItem>
            )}

            <DropdownMenuItem asChild>
              <a
                onClick={() => {
                  setShowAlert(true);
                }}
              >
                <Trash2 className="mr-2" />
                <span>Eliminar</span>
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialog open={showAlert}>
          <AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Esta seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta accion no se puede deshacer. Se eliminara el registros de
                  forma permanente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    console.log("Se cancelo");
                    setShowAlert(false);
                  }}
                >
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    //console.log(id);
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
                    await fetch(
                      `http://127.0.0.1:8000/data/api/v1/certificados/${datac}/`,
                      {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: "Token " + session?.token,
                        },
                      }
                    );
                    await fetch(
                      `http://127.0.0.1:8000/data/api/v1/titulados/${datat}/`,
                      {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: "Token " + session?.token,
                        },
                      }
                    );

                    setShowAlert(false);
                    toast(`Eliminacion Exitosa`, {
                      description: "Actualizando la Tabla Principal",
                    });
                    window.location.reload();
                  }}
                >
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogTrigger>
        </AlertDialog>
      </div>

      <div className="md:hidden">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
            >
              <MoreVertical />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>Número de control: {id}</DrawerTitle>
              <DrawerDescription>Opciones</DrawerDescription>
            </DrawerHeader>
            <div className="mx-5 my-2 flex flex-col gap-3">
              <Button
                variant="secondary"
                className="justify-start py-6"
                asChild
              >
                <a href={`/table/view/${id}`}>
                  <BookUser className="mr-4 h-7 w-7" />
                  <span className="text-lg">Ver más</span>
                </a>
              </Button>
              <Button
                variant="secondary"
                className="justify-start py-6"
                asChild
              >
                <a href={`/table/edit/${id}`}>
                  <Pencil className="mr-4 h-7 w-7" />
                  <span className="text-lg">Editar</span>
                </a>
              </Button>
              {!title && (
                <Button
                  variant="secondary"
                  className="justify-start py-6"
                  asChild
                >
                  <a href={`/table/link-title/${id}`}>
                    <Link className="mr-4 h-7 w-7" />
                    <span className="text-lg">Vincular título</span>
                  </a>
                </Button>
              )}
              {!certificate && (
                <Button
                  variant="secondary"
                  className="justify-start py-6"
                  asChild
                >
                  <a href={`/table/link-certificate/${id}`}>
                    <Link className="mr-4 h-7 w-7" />
                    <span className="text-lg">Vincular certificado</span>
                  </a>
                </Button>
              )}
              <Button
                variant="destructive"
                className="justify-start py-6"
                asChild
              >
                <a
                  /* href={`/delete/${id}`} */ onClick={() => {
                    setShowAlert(true);
                  }}
                >
                  <Trash2 className="mr-4 h-7 w-7" />
                  <span className="text-lg">Eliminar</span>
                </a>
              </Button>
            </div>
            <DrawerFooter className="pt-4">
              <DrawerClose asChild>
                <Button variant="outline">
                  <X className="mr-2" />
                  <span>Cerrar</span>
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <AlertDialog open={showAlert}>
          <AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Esta Seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta accion no se puede deshacer. Se eliminara el registros de
                  forma permanente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    console.log("Se cancelo");
                    setShowAlert(false);
                  }}
                >
                  Cancelar
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

                    setShowAlert(false);
                    toast(`Eliminacion Exitosa`, {
                      description: "Actualizando la Tabla Principal",
                    });
                    window.location.reload();
                  }}
                >
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogTrigger>
        </AlertDialog>
      </div>
    </>
  );
};

export default OptionsButton;
