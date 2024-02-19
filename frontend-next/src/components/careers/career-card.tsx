"use client"
import React, { useState } from 'react'
import { Card, CardFooter, CardHeader, CardTitle } from '../ui/card';
import ResponsiveDialog from '../responsive/dialog';
import { Button } from '../ui/button';
import { Trash2, Trash2Icon } from 'lucide-react';
import { Session } from 'next-auth';
import { notification } from '../responsive/notification';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useRouter } from 'next/navigation';

interface CareerCardProps {
    career: {
        id_carrera: number,
        nombre_carrera: string
    },
    session: Session
}

const CareerCard = ({ career, session }: CareerCardProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const { id_carrera: id, nombre_carrera: nombre } = career
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const router = useRouter()

    const handleDelete = async (id: number) => {
        const response = await fetch(
            `http://127.0.0.1:8000/data/api/v1/carreras/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Token " + session?.token,
                },
            }
        )
        setOpen(false)
        if (!response.ok) {
            notification(
                `Error al intentar eliminar el registro (${response.status})`,
                "error",
                "Vuelva a intentarlo más tarde",
                isDesktop
            )
            return
        }
        notification(
            `Se ha eliminado el registro`,
            "success", undefined,
            isDesktop
        )
        router.refresh()
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{nombre}</CardTitle>
            </CardHeader>
            <CardFooter className="justify-end">
                <ResponsiveDialog
                    controlledOpen={{ open, setOpen }}
                    title={`¿Desea eliminar la carrera "${nombre}"?`}
                    trigger={<Button variant="destructive"><Trash2Icon /></Button>}
                    description="Esta acción no podrá deshacerse"
                >
                    <section className="flex items-center gap-3">
                        <Button
                            onClick={async () => await handleDelete(id)}
                            variant="destructive"
                        >
                            <Trash2 className="mr-2" />
                            <span>Eliminar</span>
                        </Button>
                        <Button onClick={() => setOpen(!open)} variant="outline">
                            Cancelar
                        </Button>
                    </section>
                </ResponsiveDialog>
            </CardFooter>
        </Card>
    )
}

export default CareerCard