"use client";
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import ResponsiveDialog from "../responsive/dialog";
import { Button } from "../ui/button";
import { Pencil, Trash2, Trash2Icon, icons } from "lucide-react";
import { Session } from "next-auth";
import { notification } from "../responsive/notification";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useRouter } from "next/navigation";
import { Career } from "../students-table/students-table";
import EditCareerForm from "./edit-career-form";

interface CareerCardProps {
  career: {
    id_carrera: number;
    nombre_carrera: string;
  };
  session: Session;
}

const CareerCard = ({ career, session }: CareerCardProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const { id_carrera: id, nombre_carrera: nombre } = career;
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();

  const handleDelete = async (id: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/carreras/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + session?.token,
        },
      }
    );
    setDeleteDialogOpen(false);
    if (!response.ok) {
      notification(
        `Error al intentar eliminar el registro (${response.status})`,
        "error",
        "Vuelva a intentarlo más tarde",
        isDesktop
      );
      return;
    }
    notification(
      `Se ha eliminado el registro`,
      "success",
      undefined,
      isDesktop
    );
    router.refresh();
  };

  const handleEdit = async (values: { nombre_carrera: string }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/carreras/${career.id_carrera}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + session.token,
        },
        body: JSON.stringify(values),
      }
    );
    setEditDialogOpen(false);
    if (!response.ok) {
      notification(
        `Error al intentar actualizar el registro (${response.status})`,
        "error",
        "Vuelva a intentarlo más tarde",
        isDesktop
      );
      return;
    }
    notification(
      `Se ha actualizado el registro correctamente`,
      "success",
      undefined,
      isDesktop
    );
    router.refresh();
  };

  return (
    <section className="flex pl-4 text-card-foreground justify-between items-center bg-card border rounded-lg shadow-sm">
      <h3>{nombre}</h3>
      <section className="flex">
        <ResponsiveDialog
          controlledOpen={{ open: editDialogOpen, setOpen: setEditDialogOpen }}
          title={`Editar carrera`}
          trigger={
            <Button variant="ghost" size="icon">
              <Pencil size={18}/>
            </Button>
          }
        >
          <EditCareerForm career={career} handleEdit={handleEdit} />
        </ResponsiveDialog>
        <ResponsiveDialog
          controlledOpen={{ open: deleteDialogOpen, setOpen: setDeleteDialogOpen }}
          title={`¿Desea eliminar la carrera "${nombre}"?`}
          trigger={
            <Button variant="ghost" size="icon">
              <Trash2Icon size={18} />
            </Button>
          }
          description="Esta acción no podrá deshacerse"
        >
          <section className="flex items-center gap-3">
            <Button
              onClick={async () => await handleDelete(id)}
              variant="destructive"
            >
              <Trash2 className="mr-2" />
              <span>Eliminar</span>
            </Button>
            <Button onClick={() => setDeleteDialogOpen(!open)} variant="outline">
              Cancelar
            </Button>
          </section>
        </ResponsiveDialog>
      </section>
    </section>
  );
};

export default CareerCard;
