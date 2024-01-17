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
  BookType,
  Edit2,
  Home,
  LogOut,
  ScrollText,
  Settings,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export function NavMenu() {
  return (
    <div className="bg-background hidden md:flex justify-between pl-1 w-full py-2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <a href="/students-table">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Tabla
              </NavigationMenuLink>
            </a>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Agregar</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-1 p-2 md:w-[300px]">
                <ListItem
                  href="/certificate-form"
                  title={
                    <div className="flex items-center gap-2">
                      <ScrollText size={18} />
                      Certificado
                    </div>
                  }
                />
                <ListItem
                  href="/title-form"
                  title={
                    <div className="flex items-center gap-2">
                      <BookType size={18} />
                      Título
                    </div>
                  }
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
                <ListItem href="/export" title="Exportar">
                  Elaborar reporte de Excel y/o PDF.
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
                  title={
                    <div className="flex items-center gap-2">
                      <Edit2 size={18} />
                      Editar perfil
                    </div>
                  }
                >
                  Nombre, contraseña.
                </ListItem>
                <ListItem
                  href="/"
                  title={
                    <div className="flex items-center gap-2">
                      <LogOut size={18} />
                      Cerrar sesión
                    </div>
                  }
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
