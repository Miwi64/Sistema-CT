"use client"
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface YearSelectorProps {
    from?: number;
    to?: number;
    value: string;
    reverse?: boolean;
    onValueChange: (value: string) => void;
}

const YearSelector = (
    { from = 1960, to = new Date().getFullYear(), value, onValueChange, reverse }: YearSelectorProps) => {
    const [years, setYears] = useState<number[]>([]);
    useEffect(() => {
        const yearsArray: number[] = [];
        for (let year = from; year <= to; year++) {
            yearsArray.push(year);
        }
        if(reverse) {
            setYears(yearsArray.toReversed());
        }
        else{
            setYears(yearsArray);
        }
    }, []);
    return (
        <Select
            onValueChange={onValueChange}
            value={value}>
            <SelectTrigger className="my-2">
                <SelectValue placeholder={"Seleccionar"} />
            </SelectTrigger>
            <SelectContent className="max-h-[250px]">
                {years.map((year) => (
                    <SelectItem key={year} value={`${year}`}>
                        {year}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default YearSelector;
