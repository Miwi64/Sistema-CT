import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DEVELOPERS } from "@/lib/constants";
import { Github, InfoIcon, Paintbrush2, User2 } from "lucide-react";
import dynamic from 'next/dynamic'

const ThemeSelector = dynamic(() => import('../../../components/custom-selectors/theme-selector'), { ssr: false })

const Settings = () => {
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
                <ThemeSelector />
              </CardContent>
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
              <CardContent className="space-y-4 space-x-1">
                <h2 className="leading-none tracking-tight">Desarrolladores</h2>
                {DEVELOPERS.map(({ name, link }) => (
                  <Button key={name} variant="outline" className="text-muted-foreground w-full md:max-w-[250px] justify-start" asChild>
                    <a href={link} target="_blank"><User2 size={20} className="mr-3" />{name}</a>
                  </Button>
                ))}
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
