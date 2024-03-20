"use client";
import React, { useState } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { BookUser, Pencil, Trash2, X } from "lucide-react";
import ResponsiveDialog from "../responsive/dialog";
import { notification } from "../responsive/notification";
import { useSession } from "next-auth/react";

interface TableContextMenuProps {
  id: string;
  children: React.ReactNode;
  title: string;
  afterDelete?: () => void;
}

const contextMenuItems = (id: string) => [
  {
    icon: <BookUser />,
    label: "Ver más",
    link: `/table/view/${id}`,
  },
  {
    icon: <Pencil />,
    label: "Editar",
    link: `/table/edit/${id}`,
  },
];

const TableContextMenu = ({
  id,
  children,
  title,
  afterDelete,
}: TableContextMenuProps) => {
  const { data: session } = useSession();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const handleDelete = async () => {
    const search = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/alumnos/${id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + session?.token,
        },
      }
    );
    const student = await search.json();

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
    setDrawerOpen(false);
    setDialogOpen(false);
    if (!response.ok) {
      notification(
        `Error al intentar eliminar el registro (${response.status})`,
        "error",
        "Vuelva a intentarlo más tarde",
        isDesktop
      );
      return;
    }

    const datac = student?.certificado_fk;
    const datat = student?.titulo_fk;
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
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/titulados/${datat}/`,
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
      undefined,
      isDesktop
    );
    {
      afterDelete && afterDelete();
    }
  };

  const deleteButton = (
    id: string,
    trigger: React.ReactNode,
    title: string
  ) => (
    <ResponsiveDialog
      title={`Eliminar ${title}`}
      controlledOpen={{ open: dialogOpen, setOpen: setDialogOpen }}
      trigger={trigger}
      description="¿Está seguro? Esta acción no podrá deshacerse."
    >
      <section className="flex items-center gap-3">
        <Button
          onClick={async () => await handleDelete()}
          variant="destructive"
        >
          <Trash2 className="mr-2" />
          <span>Eliminar</span>
        </Button>
        <Button onClick={() => setDialogOpen(false)} variant="secondary">
          Cancelar
        </Button>
      </section>
    </ResponsiveDialog>
  );

  if (isDesktop) {
    return (
      <ContextMenu>
        <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
        <ContextMenuContent className="bg-card text-card-foreground">
          <ContextMenuLabel>{title}</ContextMenuLabel>
          <ContextMenuSeparator />
          {contextMenuItems(id).map(({ label, icon, link }) => (
            <ContextMenuItem key={label} asChild>
              <a href={link}>
                {icon}
                <span className="ml-2">{label}</span>
              </a>
            </ContextMenuItem>
          ))}
          {deleteButton(
            id,
            <ContextMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              <Trash2 />
              <span className="ml-2">Eliminar</span>
            </ContextMenuItem>,
            title
          )}
        </ContextMenuContent>
      </ContextMenu>
    );
  }
  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <ContextMenu onOpenChange={setDrawerOpen}>
        <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      </ContextMenu>
      <DrawerContent className="bg-card text-card-foreground">
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>Opciones</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 grid gap-3">
          {contextMenuItems(id).map(({ label, icon, link }) => (
            <Button
              key={label}
              variant="secondary"
              className="justify-start py-6 gap-4"
              asChild
            >
              <a href={link}>
                {icon}
                <span className="text-lg">{label}</span>
              </a>
            </Button>
          ))}
          {deleteButton(
            id,
            <Button variant="destructive" className="justify-start py-6 gap-4">
              <Trash2 />
              <span className="text-lg">Eliminar</span>
            </Button>,
            title
          )}
        </div>
        <DrawerFooter className="pt-4 w-full flex flex-row justify-center">
          <DrawerClose asChild>
            <Button size="icon" className="rounded-full" variant="secondary">
              <X />
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default TableContextMenu;
