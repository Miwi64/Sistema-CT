"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { REPORTS } from "@/lib/constants";
import { generateGobReport } from "@/lib/export-functions";
import { Session } from "next-auth";
import React, { ChangeEvent, useState } from "react";


interface ExportFormProps {
    careers: Career[],
    session: Session
}

type Career = {
    id_carrera: number,
    nombre_carrera: string
}

type ExportSettings = {
    formatType: string,
    career: number | null,
    templateFile: File | null
}

const ExportForm = ({ careers, session }: ExportFormProps) => {
    const [config, setConfig] = useState<ExportSettings>(
        {
            formatType: "gob",
            career: careers[0].id_carrera,
            templateFile: null
        }
    )

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setConfig({ ...config, templateFile: event.target.files[0] });
        }
    }


    const handleExport = async () => {
        if (!config.career) {
            console.log("¡Carrera no seleccionada!")
        }
        if (!config.templateFile) {
            console.log("¡Plantilla no seleccionada!")
            return
        }
        const template = await config.templateFile.arrayBuffer()
        if (config.formatType === "gob") {
            await generateGobReport(template)
        }

    }


    return (
        <section className="grid gap-3">
            <section className="">
                <Label htmlFor="report">Tipo de reporte</Label>
                <Select
                    onValueChange={(value) => setConfig((prev) => ({ ...prev, formatType: value }))}
                    value={config.formatType}>
                    <SelectTrigger className="my-2">
                        <SelectValue>
                            {REPORTS[config.formatType]}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {Object.keys(REPORTS).map((
                            keys, index) =>
                            (<SelectItem key={index} value={keys}>{Object.values(REPORTS)[index]}</SelectItem>))}
                    </SelectContent>
                </Select>
            </section>

            <section className="">
                <Label htmlFor="template">Plantilla</Label>
                <Input
                    className="my-2"
                    accept=".xlsx"
                    onChange={handleFileChange} id="template" type="file" placeholder="Subir plantilla"
                />
            </section>

            {config.formatType === "gob" &&
                <section className="">
                    <Label htmlFor="career">Carrera</Label>
                    <Select
                        onValueChange={(value) => setConfig((prev) => ({ ...prev, career: Number(value) }))}
                        value={`${config.career}`}
                    >
                        <SelectTrigger className="my-2">
                            <SelectValue placeholder={"Seleccionar carrera"} />
                        </SelectTrigger>
                        <SelectContent>
                            {careers.map((
                                { id_carrera, nombre_carrera }) =>
                                (<SelectItem key={id_carrera} value={`${id_carrera}`}>{nombre_carrera}</SelectItem>))}
                        </SelectContent>
                    </Select>
                </section>
            }
            <section className="w-full flex justify-center mb-5">
                <Button disabled={!config.templateFile} onClick={handleExport}>Exportar</Button>
            </section>
        </section>
    );
};

export default ExportForm;
