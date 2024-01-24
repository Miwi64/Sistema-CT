"use client"
import PageLayout from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FORMATS, REPORTS } from "@/lib/constants";
import { ChevronsUpDown } from "lucide-react";
import React, { useState } from "react";

const Export = () => {
  const [report, setReport] = useState(Object.keys(REPORTS)[0])
  const [format, setFormat] = useState(Object.keys(FORMATS)[0])
  const [isOpen, setIsOpen] = useState(false)
  return (
    <PageLayout>
      <h1 className="my-5 text-2xl font-semibold leading-none tracking-tight">Exportar</h1>
      <section className="">
        <section>
          <Label>Tipo de reporte</Label>
          <Select onValueChange={setReport} value={report}>
            <SelectTrigger className="my-2">
              <SelectValue>
                {REPORTS[report]}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.keys(REPORTS).map((
                keys, index) =>
                (<SelectItem key={index} value={keys}>{Object.values(REPORTS)[index]}</SelectItem>))}
            </SelectContent>
          </Select>
          <Label>Formato de salida</Label>
          <Select onValueChange={setFormat} value={format}>
            <SelectTrigger className="my-2">
              <SelectValue>
                {FORMATS[format]}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Object.keys(FORMATS).map((
                keys, index) =>
                (<SelectItem key={index} value={keys}>{Object.values(FORMATS)[index]}</SelectItem>))}
            </SelectContent>
          </Select>
          <Collapsible open={isOpen}
            onOpenChange={setIsOpen}
            className="space-y-2 mt-5">
            <div className="flex items-center justify-between space-x-4">
              <h4 className="text-sm font-semibold">
                Opciones avanzadas
              </h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Expandir/Ocultar</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-2">
              <div className="rounded-md border px-4 py-3 font-mono text-sm">
                @radix-ui/colors
              </div>
              <div className="rounded-md border px-4 py-3 font-mono text-sm">
                @stitches/react
              </div>
            </CollapsibleContent>
          </Collapsible>

        </section>
        <div className="flex my-8 justify-center">
          <Button>
            Aceptar
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Export;
