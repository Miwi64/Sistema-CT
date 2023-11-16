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
import { careers } from '../libs/constants'
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
});

const CertificateForm = ({setSelectedValue}) => {
  const styles = useStyles();
  const careersList = careers;
  return (
    <div className={styles.formContainer}>
      <Field orientation="horizontal" as="div" label={"Estudiante"} required>
        <Input
          placeholder="Buscar..."
          contentBefore={<Search16Regular />}
          contentAfter={
            <Button onClick={() => {setSelectedValue("est")}} appearance="transparent" icon={<Add16Regular />}>
              Agregar
            </Button>
          }
        />
      </Field>
      <Field orientation="horizontal" as="div" label={"Numero de folio"} required>
        <Input />
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

export default CertificateForm;
