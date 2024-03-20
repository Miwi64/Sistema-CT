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
  LogOut,
  Menu,
  Plus,
  ScrollText,
  Settings,
  Table,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

export function NavMenu() {
  return (
    <div className="bg-background hidden md:flex justify-between pl-1 w-full py-2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/students-table" className={navigationMenuTriggerStyle()}>
              Tabla
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Agregar</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-1 p-2 md:w-[300px]">
                <ListItem
                  href="/certificate-form"
                  title="Certificado"
                />
                <ListItem
                  href="/title-form"
                  title="Título"
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Importar/Exportar</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 p-2 md:w-[400px]">
                <ListItem href="/title-import" title="Importar títulos">
                  Desde un archivo de Excel.
                </ListItem>
                <ListItem
                  href="/certificate-import"
                  title="Importar certificados"
                >
                  Desde un archivo de Excel.
                </ListItem>
                <ListItem href="/export" title="Crear reporte">
                  Elaborar reporte de Excel o PDF.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Avatar className="h-[1.5rem] w-[1.5rem] mr-3">
                <AvatarFallback>
                  <User size={14} />
                </AvatarFallback>
              </Avatar>
              Cuenta
            </NavigationMenuTrigger>
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
                        Usuario1
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Administrador
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem
                  href="/profile"
                  title="Editar perfil"
                >
                  Nombre, contraseña.
                </ListItem>
                <ListItem
                  onClick={async () => {
                    const AuthToken = localStorage.getItem("jwt");
                    await fetch("http://localhost:8000/logout/", {
                      method: "POST",
                      headers: {
                        Authorization: "Token " + AuthToken,
                      },
                    });
                    localStorage.removeItem("jwt");
                  }}
                  href="/"
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
          <a href="/settings">
            <Settings className="h-[1.2rem] w-[1.2rem]" />
          </a>
        </Button>
      </div>
    </div>
  );
}

export function NavMobile() {
  return (
    <div className="pt-2 pl-3 bg-background md:hidden w-full">
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
                <a href="/profile">
                  <Avatar className="w-[60px] h-[60px]">
                    <AvatarFallback>
                      <User size={30} />
                    </AvatarFallback>
                  </Avatar>
                </a>
              </div>
              <div className="my-2 text-lg font-medium">
                Usuario1
                <p className="text-sm leading-tight text-muted-foreground">
                  Administrador
                </p>
              </div>
              <div className="w-full flex justify-center gap-2">
                <Button variant="outline" asChild>
                  <a href="/profile"><Edit2 size={20} /></a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/"><LogOut size={20} /></a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/settings"><Settings size={20} /></a>
                </Button>
              </div>
            </div>
          </SheetHeader>
          <div className="px-4 py-6 grid grid-cols-3 text-muted-foreground gap-3">
            {navLinks.map(({ title, icon, path }, index) => (
              <Button variant="ghost" className="flex-col h-auto gap-2 
              text-center whitespace-normal" asChild>
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

const navLinks = [
  {
    title: "Tabla de estudiantes",
    icon: <Table size={40} />,
    path: "/students-table"
  },
  {
    title: "Agregar Certificado",
    icon: <ScrollText size={40} />,
    path: "/certificate-form"
  },
  {
    title: "Agregar Título",
    icon: <BookText size={40} />,
    path: "/title-form"
  },
  {
    title: "Importar Certificados",
    icon: <FileUp size={40} />,
    path: "/certificate-import"
  },
  {
    title: "Importar Título",
    icon: <FileUp size={40} />,
    path: "/title-import"
  },
  {
    title: "Crear Reporte",
    icon: <FileDown size={40} />,
    path: "/export"
  },
]

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