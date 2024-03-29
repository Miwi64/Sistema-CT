"use client";
import { LogIn, User } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { ModeToggle } from "../components/mode-toggle";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { notification } from "@/components/responsive/notification";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Suspense } from "react";

const formSchema = z.object({
  username: z
    .string({ required_error: "Campo requerido" })
    .transform((value) => value.replace(/\s+/g, ""))
    .pipe(z.string().min(1, "Campo requerido")),
  password: z
    .string({ required_error: "Campo requerido" })
    .transform((value) => value.replace(/\s+/g, ""))
    .pipe(z.string().min(1, "Campo requerido")),
});

const Login = () => {
  const params = useSearchParams();
  const { data: session, status } = useSession();
  const callbackUrl = params.get("callbackUrl") || "/table";
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [signing, setSigning] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSigning(true);
    const username = values.username;
    const password = values.password;
    const responseNextAuth = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      console.log(responseNextAuth?.error);
      setSigning(false);
      switch (responseNextAuth?.status) {
        case 401:
          notification(
            `Error al intentar iniciar sesión (${responseNextAuth.status})`,
            "error",
            "Verifica que tu nombre de usuario y contraseña sean correctos",
            isDesktop
          );
          return;
        case 500:
          notification(
            `Error al intentar iniciar sesión (${responseNextAuth.status})`,
            "error",
            `Ha ocurrido un error en el servidor del sistema. Verifica que no
            exista una sesión abierta y vuelve a intentarlo`,
            isDesktop
          );
          return;
      }
    }
    router.push(callbackUrl, { scroll: false });
    setSigning(false);
    notification(
      "Inicio de sesión",
      "success",
      "Accediendo a la sesión",
      isDesktop
    );
  };

  const imgUrl = "/backgrounds/558866.jpg";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <div className="relative">
      <section
        className="hidden md:block w-full h-screen bg-no-repeat bg-cover absolute"
        style={{ backgroundImage: `url(${imgUrl})` }}
      />
      <section
        className="w-full h-screen flex justify-center items-center overflow-y-auto absolute 
      md:bg-[rgba(255,255,255,0.6)] md:dark:bg-[rgba(0,0,0,0.8)] backdrop-blur-3xl"
      >
        <Card
          className="rounded-none md:rounded-lg bg-transparent md:bg-card w-full h-full
         md:w-[420px] md:h-auto"
        >
          <div className="text-right">
            <ModeToggle />
          </div>
          <CardHeader className="flex-column items-center">
            <Avatar className="w-[90px] h-[90px] mb-1">
              <AvatarFallback>
                <User size={45} />
              </AvatarFallback>
            </Avatar>
            <CardTitle>Iniciar sesión</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="mb-8">
                      <FormLabel>Usuario</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre de usuario" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mb-8">
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Contraseña"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={signing}>
                  {!signing ? (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Iniciar sesión
                    </>
                  ) : (
                    "Iniciando sesión..."
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

const Page = () => (
  <Suspense>
    <Login />
  </Suspense>
);

export default Page;
