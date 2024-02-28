"use client";
import React, { useState } from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import ResponsiveDialog from "../responsive/dialog";
import { Button } from "../ui/button";
import { Plus, Trash2, Trash2Icon } from "lucide-react";
import { Session } from "next-auth";
import { notification } from "../responsive/notification";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface CareerCardProps {
  session: Session;
}

const formSchema = z.object({
  nombre_carrera: z
    .string({ required_error: "Campo requerido" })
    .transform((value) => {
      if (/^(?!\s*$).+/.test(value)) {
        return value;
      }
      return value.replace(/\s+/g, "");
    })
    .pipe(z.string().min(1, { message: "Campo requerido" })),
});

const AddButton = ({ session }: CareerCardProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/carreras/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + session.token,
        },
        body: JSON.stringify(values),
      }
    );
    setOpen(false);
    if (!response.ok) {
      notification(
        `Error al intentar subir el registro (${response.status})`,
        "error",
        "Vuelva a intentarlo más tarde",
        isDesktop
      );
      return;
    }
    notification(
      `Se ha agregado el registro correctamente`,
      "success",
      undefined,
      isDesktop
    );
    router.refresh();
  };

  return (
    <ResponsiveDialog
      controlledOpen={{ open, setOpen }}
      title={`Agregar una nueva carrera`}
      trigger={
        <Button variant="secondary">
          <Plus className="mr-2" />
          Agregar
        </Button>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="nombre_carrera"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <section className="mt-5 flex  gap-3">
            <Button type="submit">
              <Plus className="mr-2" />
              <span>Agregar</span>
            </Button>
          </section>
        </form>
      </Form>
    </ResponsiveDialog>
  );
};

export default AddButton;
