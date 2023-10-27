/**    <div>
      Numero Control
      Nombre
      Apellido Paterno
      Apellido Materno
      Estado de origen
      Fecha de nacimiento
      CURP
      Sexo
      Carrera
      Periodo de Ingreso
      Periodo de Egreso
    </div> */
import {
  Button,
  Combobox,
  Divider,
  Dropdown,
  Field,
  Input,
  Option,
  Radio,
  RadioGroup,
  Textarea,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import React from "react";

const useStyles = makeStyles({
  formContainer: {
    paddingTop: "10px",
    paddingBottom: "30px",
    display: "flex",
    width: "100%",
    flexDirection: "column",
    rowGap: "20px",
    maxWidth: "800px",
  },
  field: {
    display: "grid",
    gridRowGap: tokens.spacingVerticalS,
  },
});

const StudentForm = () => {
  const styles = useStyles();
  return (
    <div className={styles.formContainer}>
      <Field as="div" orientation="horizontal" label={"Numero de control"} required>
        <Input />
      </Field>
      <Field as="div" orientation="horizontal" label={"Nombre"} required>
        <Input />
      </Field>
      <Field as="div" orientation="horizontal" label={"Apellido Paterno"}>
        <Input />
      </Field>
      <Field as="div" orientation="horizontal" label={"Apellido Materno"}>
        <Input />
      </Field>
      <Field label="Sexo" orientation="horizontal" required className={styles.field}>
        <div>
          <Radio name="sexo" label="Masculino" defaultChecked />
          <Radio name="sexo" label="Femenino" />
        </div>
      </Field>
      <Field as="div" orientation="horizontal" label={"CURP"} required>
        <Input />
      </Field>
      <Field as="div" orientation="horizontal" label="Estado de origen" required>
        <Combobox>
          <Option>Baja California</Option>
          <Option>Baja California Sur</Option>
          <Option>Sonora</Option>
          <Option>Tamaulipas</Option>
          <Option>Puebla</Option>
          <Option>Ciudad de México</Option>
        </Combobox>
      </Field>
      <Field as="div" orientation="horizontal" label="Fecha de nacimiento" required>
        <DatePicker allowTextInput placeholder="Fecha de nacimiento" />
      </Field>
      <Divider />
      <Field as="div" orientation="horizontal" label="Carrera" required>
        <Combobox>
          <Option>Sistemas</Option>
          <Option>Administración</Option>
          <Option>Agrícola</Option>
          <Option>Industrial</Option>
          <Option>Mecatrónica</Option>
          <Option>Electromecánica</Option>
        </Combobox>
      </Field>
      <Field as="div" orientation="horizontal" label="Periodo de ingreso" required>
        <div>
          <Dropdown defaultValue={"ENE-JUN"} defaultSelectedOptions={["1"]}>
            <Option value="1">ENE-JUN</Option>
            <Option value="2">AGO-DIC</Option>
          </Dropdown>
          <Dropdown placeholder="AÑO">
            <Option>2020</Option>
            <Option>2021</Option>
            <Option>2022</Option>
            <Option>2023</Option>
          </Dropdown>
        </div>
      </Field>
      <Field as="div" orientation="horizontal" label="Periodo de egreso" required>
        <div>
          <Dropdown defaultValue={"ENE-JUN"} defaultSelectedOptions={["1"]}>
            <Option value="1">ENE-JUN</Option>
            <Option value="2">AGO-DIC</Option>
          </Dropdown>
          <Dropdown placeholder="AÑO">
            <Option>2020</Option>
            <Option>2021</Option>
            <Option>2022</Option>
            <Option>2023</Option>
          </Dropdown>
        </div>
      </Field>
    </div>
  );
};

export default StudentForm;
