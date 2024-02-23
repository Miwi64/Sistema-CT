"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, InfoIcon, Paintbrush2, User2 } from "lucide-react";
import { useTheme } from "next-themes";

const Settings = () => {
  const { setTheme, theme } = useTheme()
  return (
    <>
      <h1 className="my-5 text-2xl font-semibold leading-none tracking-tight">Configuración</h1>
      <section className="">
        <Tabs defaultValue="theme" className="w-full">
          <TabsList className="grid max-w-[550px]  grid-cols-2 min-h-11">
            <TabsTrigger className="min-h-8" value="theme"><Paintbrush2 className="mr-2 w-5 h-5" /> Tema</TabsTrigger>
            <TabsTrigger className="min-h-8" value="about"><InfoIcon className="mr-2 w-5 h-5" /> Acerca de</TabsTrigger>
          </TabsList>
          <TabsContent value="theme">
            <Card>
              <CardHeader>
                <CardTitle>Tema</CardTitle>
                <CardDescription>
                  Cambiar el tema de la aplicación.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue placeholder={theme} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Claro</SelectItem>
                    <SelectItem value="dark">Oscuro</SelectItem>
                    <SelectItem value="system">Sistema</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-5">
                  <Label htmlFor="username">Feature 2</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Opcion 1", "Opcion 2"].map((
                        value, key) =>
                        (<SelectItem key={key} value={value}>{value}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Guardar cambios</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>Sistema de certificados y títulos</CardTitle>
                <CardDescription>
                  Versión 0.0.1
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <h2 className="leading-none tracking-tight">Desarrolladores</h2>
                <Button variant="ghost" className="text-muted-foreground w-full md:max-w-[250px] justify-start" asChild>
                  <a href="#"><User2 size={20} className="mr-3" />Miguel Argote Reyes</a>
                </Button>
                <Button variant="ghost" className="text-muted-foreground w-full md:max-w-[250px] justify-start" asChild>
                  <a href="#"><User2 size={20} className="mr-3" />André Axel Cadena Zepeda</a>
                </Button>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <a href="https://github.com/Miwi64/Sistema-CT" target="_blank">
                    <Github className="w-5 h-5 mr-2" />
                    Repositorio
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};

export default Settings;
