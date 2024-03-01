"use client";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SemesterSelectorProps {
  from?: number;
  to?: number;
  value: string;
  reverse?: boolean;
  onValueChange: (value: string) => void;
}

const selectSemesterValue = (year: number, semester: number) => {
  const date = semester === 1 ? new Date(year, 1, 1) : new Date(year, 7, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

type Semester = {
  text: string;
  value: string;
};

const SemesterSelector = ({
  from = 1960,
  to = new Date().getFullYear(),
  value,
  onValueChange,
  reverse,
}: SemesterSelectorProps) => {
  const [semesters, setSemesters] = useState<Semester[]>([]);
  useEffect(() => {
    const semestersArray: Semester[] = [];
    for (let year = from; year <= to; year++) {
      semestersArray.push({
        value: selectSemesterValue(year, 1),
        text: `${year}-1`,
      });
      semestersArray.push({
        value: selectSemesterValue(year, 2),
        text: `${year}-2`,
      });
    }
    if (reverse) {
      setSemesters(semestersArray.toReversed());
    } else {
      setSemesters(semestersArray);
    }
  }, []);
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className="my-2">
        <SelectValue placeholder={"Seleccionar"} />
      </SelectTrigger>
      <SelectContent className="max-h-[250px]">
        {semesters.map(({ text, value }) => (
          <SelectItem key={text} value={`${value}`}>
            {text}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SemesterSelector;
