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
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string({ required_error: "Campo requerido" }).transform(value => value.replace(/\s+/g, ''))
    .pipe(z.string().min(1, "Campo requerido")),
  password: z.string({ required_error: "Campo requerido" }).transform(value => value.replace(/\s+/g, ''))
    .pipe(z.string().min(1, "Campo requerido")),
});

const Login = () => {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/table";
  const router = useRouter();

  const [signing, setSigning] = useState(false);

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
      toast(`Error al intentar iniciar sesión (${responseNextAuth.status})`, {
        description: "Verifica que tu nombre de usuario y contraseña sean correctos.",
      });
      return;
    }
    router.push(callbackUrl, { scroll: false });
    setSigning(false);
  };

  const imgUrl = "/backgrounds/558866.jpg";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    },
  });

  return (
    <div className="relative">
      <section
        className="hidden md:block w-full h-screen bg-no-repeat bg-cover absolute"
        style={{ backgroundImage: `url(${imgUrl})` }}
      />
      <section className="w-full h-screen flex justify-center items-center overflow-y-auto absolute 
      md:bg-[rgba(255,255,255,0.9)] md:dark:bg-[rgba(0,0,0,0.9)] backdrop-blur-3xl">
        <Card className="rounded-none md:rounded-lg bg-transparent md:bg-card w-full h-full
         md:w-[420px] md:h-auto">
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
                  {!signing ? <><LogIn className="mr-2 h-4 w-4" />Iniciar sesión</> : "Iniciando sesión..."}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
export default Login;
