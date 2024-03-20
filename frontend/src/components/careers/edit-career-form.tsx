"use client";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
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
import { Career } from "../students-table/students-table";

interface EditCareerFormProps {
  handleEdit: (values: { nombre_carrera: string }) => Promise<void>;
  career: Career;
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

const EditCareerForm = ({ career, handleEdit }: EditCareerFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre_carrera: career.nombre_carrera
    }
  });
  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(async (values) => await handleEdit(values))}>
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
              <Pencil className="mr-2" />
              <span>Editar</span>
            </Button>
          </section>
        </form>
      </Form>
  );
};

export default EditCareerForm;
