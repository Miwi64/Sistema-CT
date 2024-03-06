"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  BookText,
  Edit2,
  FileDown,
  FileUp,
  GraduationCap,
  LogOut,
  Menu,
  ScrollText,
  Settings,
  Table,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import { signOut, useSession } from "next-auth/react";

const navLinks = [
  {
    desktopTitle: "Tabla",
    description: "Tabla de estudiantes",
    title: "Tabla de estudiantes",
    icon: <Table size={40} />,
    path: "/table",
  },
  {
    desktopTitle: "Certificado",
    description: "Formulario para agregar certificado",
    title: "Agregar Certificado",
    icon: <ScrollText size={40} />,
    path: "/table/certificate-form",
  },
  {
    desktopTitle: "Título",
    description: "Formulario para agregar título",
    title: "Agregar Título",
    icon: <BookText size={40} />,
    path: "/table/title-form",
  },
  {
    desktopTitle: "Certificado",
    description: "Subir certificados desde un archivo de Excel",
    title: "Importar Certificados",
    icon: <FileUp size={40} />,
    path: "/table/certificate-import",
  },
  {
    desktopTitle: "Título",
    description: "Subir títulos desde un archivo de Excel",
    title: "Importar Títulos",
    icon: <FileUp size={40} />,
    path: "/table/title-import",
  },
  {
    desktopTitle: "Crear reporte",
    description: "Generar reporte con formato",
    title: "Crear Reporte",
    icon: <FileDown size={40} />,
    path: "/table/export",
  },
  {
    desktopTitle: "Carrera",
    description: "Agregar carrera",
    title: "Carreras",
    icon: <GraduationCap size={40} />,
    path: "/table/careers",
  },
  {
    desktopTitle: "Alumnos",
    description: "Agregar alumno",
    title: "Alumnos",
    icon: <User size={40} />,
    path: "/table/student-form",
  },
];

export function NavMenu() {
  const { data: session } = useSession();

  return (
    <div className="bg-primary text-primary-foreground hidden md:flex justify-between px-2 w-full py-2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              href={navLinks[0].path}
              className={navigationMenuTriggerStyle()}
            >
              {navLinks[0].desktopTitle}
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Agregar</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-1 p-2 md:w-[300px]">
                {[navLinks[1], navLinks[2], navLinks[6], navLinks[7]].map(
                  ({ desktopTitle, path, description }) => (
                    <ListItem
                      key={desktopTitle}
                      href={path}
                      title={desktopTitle}
                    >
                      {description}
                    </ListItem>
                  )
                )}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* <NavigationMenuItem>
            <NavigationMenuTrigger>Importar</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 p-2 md:w-[400px]">
                {[navLinks[3], navLinks[4]].map(
                  ({ desktopTitle, path, description }) => (
                    <ListItem
                      key={desktopTitle}
                      href={path}
                      title={desktopTitle}
                    >
                      {description}
                    </ListItem>
                  )
                )}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem> */}

          <NavigationMenuItem>
            <NavigationMenuLink
              href={navLinks[5].path}
              className={navigationMenuTriggerStyle()}
            >
              {navLinks[5].desktopTitle}
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Cuenta</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-1 py-4 px-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/20 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="#"
                    >
                      <div className="w-full flex justify-center">
                        <Avatar className="w-[90px] h-[90px] mb-1">
                          <AvatarFallback>
                            <User size={45} />
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="mb-2 mt-4 text-lg font-medium">
                        {session?.user.username}
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Administrador
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                {/* <ListItem href="/table/profile" title="Editar perfil">
                  Nombre, contraseña.
                </ListItem> */}
                <ListItem
                  className="cursor-pointer"
                  onClick={async () => {
                    //console.log(session?.token);
                    const signout = await fetch(
                      `${process.env.NEXT_PUBLIC_DJANGO_API_BASEURL}/logout/`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: "Token " + session?.token,
                        },
                      }
                    );
                    if (signout.ok) {
                      signOut();
                    }
                  }}
                  title="Cerrar Sesión"
                >
                  Regresar a inicio de sesión.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex">
        <ModeToggle />
        <Button variant="ghost" size="icon" asChild>
          <a href="/table/settings">
            <Settings className="h-[1.2rem] w-[1.2rem]" />
          </a>
        </Button>
      </div>
    </div>
  );
}

export function NavMobile() {
  const { data: session } = useSession();
  return (
    <div className="bg-background md:hidden w-full">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-[1.5rem] w-[1.5rem]" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="overflow-y-auto p-0">
          <SheetHeader>
            <div
              className="flex h-full w-full flex-col justify-end 
              bg-gradient-to-b from-muted/20 to-muted py-4 no-underline 
              focus:shadow-md text-center"
            >
              <div className="w-full flex justify-center">
                <a href="#">
                  <Avatar className="w-[60px] h-[60px]">
                    <AvatarFallback>
                      <User size={30} />
                    </AvatarFallback>
                  </Avatar>
                </a>
              </div>
              <div className="my-2 text-lg font-medium">
                {session?.user.username}
                <p className="text-sm leading-tight text-muted-foreground">
                  Administrador
                </p>
              </div>
              <div className="w-full flex justify-center gap-2">
                {/* <Button variant="outline" asChild>
                  <a href="/table/profile">
                    <Edit2 size={20} />
                  </a>
                </Button> */}
                <Button variant="outline" onClick={() => signOut()}>
                  <LogOut size={20} />
                </Button>
                <Button variant="outline" asChild>
                  <a href="/table/settings">
                    <Settings size={20} />
                  </a>
                </Button>
              </div>
            </div>
          </SheetHeader>
          <div className="px-4 py-6 grid grid-cols-3 text-muted-foreground gap-3">
            {[
              navLinks[0],
              navLinks[1],
              navLinks[2],
              navLinks[5],
              navLinks[6],
              navLinks[7],
            ].map(({ title, icon, path }, index) => (
              <Button
                key={index}
                variant="ghost"
                className="flex-col h-auto gap-2 
              text-center whitespace-normal"
                asChild
              >
                <a href={path}>
                  {icon}
                  {title}
                </a>
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
