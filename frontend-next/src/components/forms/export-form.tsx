"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { REPORTS } from "@/lib/constants";
import {
  generateEst911Report,
  generateGobReport,
} from "@/lib/export-functions";
import { Session } from "next-auth";
import React, { ChangeEvent, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { notification } from "../responsive/notification";
import { useMediaQuery } from "@/hooks/use-media-query";
import YearSelector from "../year-selector";

interface ExportFormProps {
  careers: Career[];
  session: Session;
}

type Career = {
  id_carrera: number;
  nombre_carrera: string;
};

type ExportSettings = {
  formatType: string;
  career?: number;
  year?: number;
  useDefaultTemplate: boolean;
  templateFile: File | null;
};

const ExportForm = ({ careers, session }: ExportFormProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [config, setConfig] = useState<ExportSettings>({
    formatType: "gob",
    useDefaultTemplate: true,
    templateFile: null,
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setConfig({ ...config, templateFile: event.target.files[0] });
    }
  };

  const handleExport = async () => {
    //Check required fields
    const requiredField =
      config.formatType === "gob"
        ? { value: config.career, text: "carrera" }
        : config.formatType === "est911"
        ? { value: config.year, text: "año" }
        : undefined;
    if (!requiredField?.value) {
      notification(
        "Favor de seleccionar " + requiredField?.text,
        "error",
        undefined,
        isDesktop
      );
      return;
    }
    //Select the correct data api url
    const templatePath =
      config.formatType === "gob"
        ? `http://localhost:3000/templates/gob_template.xlsx`
        : config.formatType === "est911"
        ? `http://localhost:3000/templates/est911_template.xlsx`
        : undefined;
    //Select the correct template
    const dataPath =
      config.formatType === "gob"
        ? `http://127.0.0.1:8000/data/api/v1/get-gob-report-data/${config.career}`
        : config.formatType === "est911"
        ? `http://127.0.0.1:8000/data/api/v1/get-format911/${config.year}/`
        : undefined;
    //Return if the format type is unknown
    if (!templatePath || !dataPath) return;
    //Select default templete or a custom one
    let template;
    if (config.templateFile && !config.useDefaultTemplate) {
      template = await config.templateFile.arrayBuffer();
    } else if (config.useDefaultTemplate) {
      const fetchTemplate = await fetch(templatePath);
      template = await fetchTemplate.arrayBuffer();
    }
    if (!template) {
      notification(
        "Error al recuperar la plantilla",
        "error",
        "Vuelve a intentarlo más tarde",
        isDesktop
      );
      return;
    }
    //Get data
    const fetchData = await fetch(dataPath, {
      method: "GET",
      headers: {
        Authorization: "Token " + session.token,
      },
    });
    const data = await fetchData.json();
    //Generate report
    switch (config.formatType) {
      case "gob":
        await generateGobReport(template, data);
        break;
      case "est911":
        console.log(config);
        await generateEst911Report(template, data);
        break;
      default:
        break;
    }
  };

  return (
    <section className="grid gap-3">
      <section className="">
        <Label htmlFor="report">Tipo de reporte</Label>
        <Select
          onValueChange={(value) =>
            setConfig((prev) => ({ ...prev, formatType: value }))
          }
          value={config.formatType}
        >
          <SelectTrigger className="my-2">
            <SelectValue>{REPORTS[config.formatType]}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Object.keys(REPORTS).map((keys, index) => (
              <SelectItem key={index} value={keys}>
                {Object.values(REPORTS)[index]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      <section className="">
        <Label htmlFor="template">Plantilla</Label>
        <RadioGroup
          className="flex gap-5 my-2"
          defaultValue="default"
          onValueChange={(value) => {
            setConfig({ ...config, useDefaultTemplate: value === "default" });
          }}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="default" />
            <Label htmlFor="default">Usar plantilla por defecto</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="custom" id="custom" />
            <Label htmlFor="custom">Plantilla personalizada</Label>
          </div>
        </RadioGroup>
      </section>

      {!config.useDefaultTemplate && (
        <section className="">
          <Label htmlFor="template">Usar plantilla personalizada</Label>
          <Input
            className="my-2"
            accept=".xlsx"
            onChange={handleFileChange}
            id="template"
            type="file"
            placeholder="Subir"
          />
        </section>
      )}

      {config.formatType === "gob" && (
        <section className="">
          <Label htmlFor="career">Carrera</Label>
          <Select
            onValueChange={(value) =>
              setConfig((prev) => ({ ...prev, career: Number(value) }))
            }
            value={`${config.career}`}
          >
            <SelectTrigger className="my-2">
              <SelectValue placeholder={"Seleccionar carrera"} />
            </SelectTrigger>
            <SelectContent className="max-h-[250px]">
              {careers.map(({ id_carrera, nombre_carrera }) => (
                <SelectItem key={id_carrera} value={`${id_carrera}`}>
                  {nombre_carrera}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>
      )}
      {config.formatType === "est911" && (
        <section className="">
          <Label htmlFor="year">Año</Label>
          <YearSelector
            reverse
            from={1990}
            value={`${config.year}`}
            onValueChange={(value) =>
              setConfig((prev) => ({ ...prev, year: Number(value) }))
            }
          />
        </section>
      )}
      <section className="w-full flex justify-center mb-5">
        <Button
          disabled={!config.useDefaultTemplate && !config.templateFile}
          onClick={handleExport}
        >
          Exportar
        </Button>
      </section>
    </section>
  );
};

export default ExportForm;
