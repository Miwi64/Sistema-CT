import {
  Button,
  Combobox,
  Field,
  Input,
  Option,
  Textarea,
  makeStyles,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Add16Regular, Search16Regular } from "@fluentui/react-icons";
import React from "react";
import { studyPlans } from "../libs/constants";

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
});

const TitleForm = ({setSelectedValue}) => {
  const styles = useStyles();
  const plansList = studyPlans;

  return (
    <div className={styles.formContainer}>
      <Field orientation="horizontal" as="div" label={"Estudiante"} required>
        <Input
          placeholder="Buscar..."
          contentBefore={<Search16Regular />}
          contentAfter={
            <Button onClick={()=>{setSelectedValue("est")}} appearance="transparent" icon={<Add16Regular />}>
              Agregar
            </Button>
          }
        />
      </Field>
      <Field orientation="horizontal" as="div" label={"Numero de título"} required>
        <Input />
      </Field>
      <Field orientation="horizontal" as="div" label={"Numero de cédula"} required>
        <Input />
      </Field>
      <Field orientation="horizontal" as="div" label="Plan de estudios" required>
        <Input />
      </Field>
      <Field orientation="horizontal" as="div" label="Fecha del acto" required>
        <DatePicker allowTextInput placeholder="Fecha del acto" />
      </Field>
      <Field orientation="horizontal" as="div" label="Fecha de registro" required>
        <DatePicker allowTextInput placeholder="Fecha de registro" />
      </Field>
      <Field orientation="horizontal" as="div" label="Observaciones" hint={"Máximo 255 caracteres"}>
        <Textarea placeholder="Escribe aquí..." />
      </Field>
    </div>
  );
};

export default TitleForm;
