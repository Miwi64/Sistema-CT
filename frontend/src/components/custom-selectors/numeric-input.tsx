"use client";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";
import { Input } from "../ui/input";

interface NumericInputProps {
  field: ControllerRenderProps<any, any>;
  placeholder?: string;
}

const NumericInput = ({ field, placeholder }: NumericInputProps) => {
  return (
    <Input
      type="text"
      {...field}
      placeholder={placeholder}
      onChange={(e) => {
        const value = e.target.value;
        const regex = /^[0-9]*$/;
        if (value === "" || regex.test(value)) {
          field.onChange(e);
        }
      }}
    />
  );
};

export default NumericInput;
