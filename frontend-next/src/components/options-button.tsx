"use client"

import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { BookUser, MoreVertical, Pencil, Trash2, X } from "lucide-react"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer"

interface OptionsButtonProps {
    id: string
}

const OptionsButton = ({ id }: OptionsButtonProps) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <div className="hidden md:block">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground"
                        >
                            <MoreVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="text-muted-foreground">
                        <DropdownMenuItem asChild>
                            <a href={`/view/${id}`} target="_blank">
                                <BookUser className="mr-2" />
                                <span>Ver más</span>
                            </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <a href={`/edit/${id}`} target="_blank">
                                <Pencil className="mr-2" />
                                <span>Editar</span>
                            </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <a href={`/delete/${id}`} target="_blank">
                                <Trash2 className="mr-2" />
                                <span>Eliminar</span>
                            </a>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="md:hidden">
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground"
                        >
                            <MoreVertical />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader className="text-left">
                            <DrawerTitle>Número de control: {id}</DrawerTitle>
                            <DrawerDescription>Opciones</DrawerDescription>
                        </DrawerHeader>
                        <div className="mx-5 my-2 flex flex-col gap-3">
                            <Button variant="secondary" className="justify-start py-6" asChild>
                                <a href={`/view/${id}`}>
                                    <BookUser className="mr-4 h-7 w-7" />
                                    <span className="text-lg">Ver más</span>
                                </a>
                            </Button>
                            <Button variant="secondary" className="justify-start py-6" asChild>
                                <a href={`/edit/${id}`} target="_blank">
                                    <Pencil className="mr-4 h-7 w-7" />
                                    <span className="text-lg">Editar</span>
                                </a>
                            </Button>
                            <Button variant="destructive" className="justify-start py-6" asChild>
                                <a href={`/delete/${id}`}>
                                    <Trash2 className="mr-4 h-7 w-7" />
                                    <span className="text-lg">Eliminar</span>
                                </a>
                            </Button>
                        </div>
                        <DrawerFooter className="pt-4">
                            <DrawerClose asChild>
                                <Button variant="outline">
                                    <X className="mr-2" />
                                    <span>Cerrar</span>
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    )
}

export default OptionsButton