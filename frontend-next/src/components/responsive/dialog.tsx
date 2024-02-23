"use client"
import { useMediaQuery } from '@/hooks/use-media-query'
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer'
import { X } from 'lucide-react'

interface ResponsiveDialogProps {
    controlledOpen?: {
        open: boolean,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>
    },
    children?: React.ReactNode
    title?: string
    description?: string
    trigger: React.ReactNode
}

const ResponsiveDialog = ({ children, controlledOpen,
    title = "Dialog", description, trigger }: ResponsiveDialogProps) => {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    if (isDesktop) {
        return (
            <Dialog open={controlledOpen?.open} onOpenChange={controlledOpen?.setOpen}>
                <DialogTrigger asChild>
                    {trigger}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-card text-card-foreground">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
        )
    }
    return (
        <Drawer open={controlledOpen?.open} onOpenChange={controlledOpen?.setOpen}>
            <DrawerTrigger asChild>
                {trigger}
            </DrawerTrigger>
            <DrawerContent className="bg-card text-card-foreground">
                <DrawerHeader className="text-left">
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>
                        {description}
                    </DrawerDescription>
                </DrawerHeader>
                <section className="px-4">
                    {children}
                </section>
                <DrawerFooter className="pt-4 w-full flex flex-row justify-center">
                    <DrawerClose asChild>
                        <Button size="icon" className="rounded-full" variant="secondary"><X /></Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default ResponsiveDialog