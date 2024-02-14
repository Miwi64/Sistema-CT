"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { REPORTS } from "@/lib/constants";
import { generateGobReport } from "@/lib/export-functions";
import { Session } from "next-auth";
import React, { ChangeEvent, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";


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
    useDefaultTemplate: boolean,
    templateFile: File | null
}

const ExportForm = ({ careers, session }: ExportFormProps) => {
    const [config, setConfig] = useState<ExportSettings>(
        {
            formatType: "gob",
            career: careers[0].id_carrera,
            useDefaultTemplate: true,
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
        const fetchData = await fetch(
            `http://127.0.0.1:8000/data/api/v1/get-gob-report-data/${config.career}`,
            {
                method: "GET",
                headers: {
                    Authorization: "Token " + session.token,
                },
            }
        )
        const data = await fetchData.json()


        if (config.templateFile && !config.useDefaultTemplate && config.formatType === "gob") {
            const template = await config.templateFile.arrayBuffer()
            await generateGobReport(template, data)
        }
        else if(config.useDefaultTemplate && config.formatType === "gob"){
            const fetchTemplate = await fetch(`http://localhost:3000/templates/gob_template.xlsx`)
            const template = await fetchTemplate.arrayBuffer()
            await generateGobReport(template, data)
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
                <RadioGroup className="flex gap-5 my-2" defaultValue="default" onValueChange={
                    (value) => {
                        setConfig({ ...config, useDefaultTemplate: value === "default" })
                    }
                }>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="default" id="default" />
                        <Label htmlFor="option-one">Usar plantilla por defecto</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="custom" id="custom" />
                        <Label htmlFor="option-two">Plantilla personalizada</Label>
                    </div>
                </RadioGroup>
            </section>

            {!config.useDefaultTemplate &&
                <section className="">
                    <Label htmlFor="template">Usar plantilla personalizada</Label>
                    <Input
                        className="my-2"
                        accept=".xlsx"
                        onChange={handleFileChange} id="template" type="file" placeholder="Subir"
                    />
                </section>
            }

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
                <Button disabled={!config.useDefaultTemplate && !config.templateFile} onClick={handleExport}>Exportar</Button>
            </section>
        </section>
    );
};

export default ExportForm;
