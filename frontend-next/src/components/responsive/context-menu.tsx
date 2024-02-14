"use client"
import React, { MouseEventHandler, useState } from "react"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger } from "../ui/context-menu"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer"
import { Button } from "../ui/button"

interface ResponsiveContextMenuProps {
    children: React.ReactNode,
    title: string,
    options:
    {
        label: string,
        icon: React.ReactNode,
        link?: string,
        onClick?: MouseEventHandler<any>
    }[]
}

const ResponsiveContextMenu = ({ children, title, options }: ResponsiveContextMenuProps) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [open, setOpen] = useState<boolean>(false)
    if (isDesktop) {
        return (
            <ContextMenu>
                <ContextMenuTrigger asChild>
                    {children}
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuLabel>{title}</ContextMenuLabel>
                    <ContextMenuSeparator />
                    {options.map(
                        ({ label, icon, link, onClick }) => (
                            !onClick ?
                                <ContextMenuItem key={label} asChild>
                                    <a href={link}>
                                        {icon}
                                        <span className="ml-2">{label}</span>
                                    </a>
                                </ContextMenuItem> :
                                <ContextMenuItem key={label} onClick={onClick}>
                                    {icon}
                                    <span className="ml-2">{label}</span>
                                </ContextMenuItem>
                        )
                    )}
                </ContextMenuContent>
            </ContextMenu>
        )
    }
    else {
        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <ContextMenu onOpenChange={setOpen}>
                    <ContextMenuTrigger asChild>
                        {children}
                    </ContextMenuTrigger>
                </ContextMenu>
                <DrawerContent>
                    <DrawerHeader className="text-left">
                        <DrawerTitle>{title}</DrawerTitle>
                        <DrawerDescription>Opciones</DrawerDescription>
                    </DrawerHeader>
                    <div className="mx-3 mb-8 flex flex-col gap-3">
                        {options.map(
                            ({ label, icon, link, onClick }) => (
                                !onClick ? <Button
                                    key={label}
                                    variant="secondary"
                                    className="justify-start py-6 gap-6"
                                    asChild
                                >
                                    <a href={link}>
                                        {icon}
                                        <span className="text-lg">{label}</span>
                                    </a>
                                </Button> :
                                    <Button
                                        key={label}
                                        className="justify-start py-6 gap-6"
                                        onClick={onClick}
                                    >
                                        {icon}
                                        <span className="text-lg">{label}</span>
                                    </Button>

                            )
                        )}
                    </div>
                </DrawerContent>
            </Drawer>
        )
    }
}

export default ResponsiveContextMenu