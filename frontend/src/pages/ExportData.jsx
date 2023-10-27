import {
  Button,
  Combobox,
  Dropdown,
  Field,
  Option,
  Subtitle1,
  Tab,
  TabList,
  Title1,
  Title3,
  makeStyles,
} from "@fluentui/react-components";
import React, { useState } from "react";
//import CertificateForm from "../components/CertificateForm";
//import StudentForm from "../components/StudentForm";
//import TitleForm from "../components/TitleForm";

const useStyles = makeStyles({
  mainContainer: {
    direction: "flex",
    flexDirection: "column",
    height: "100vh",
    paddingTop: "20px",
    paddingBottom: "20px",
    paddingLeft: "20px",
    paddingRight: "20px",
    "> div": {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      alignItems: "center",
    },
    "> div > .options-container": {
      paddingTop: "30px",
      paddingBottom: "30px",
      display: "flex",
      flexDirection: "column",
      width: "100%",
      maxWidth: "700px",
      rowGap: "20px",
    },
  },
});

const ExportData = () => {
  const styles = useStyles();
  return (
    <main className={styles.mainContainer}>
      <div className="title-container">
        <Title1 as="h1">Exportar Datos</Title1>
      </div>
      <div className="content-container">
      <div className="options-container">
          <Field size="large" orientation="horizontal" label={"Reporte"}>
            <Dropdown defaultValue={'Gobierno'} defaultSelectedOptions={["1"]}>
              <Option value="1">Gobierno</Option>
              <Option value="2">Estadística 911</Option>
            </Dropdown>
          </Field>
          <Field size="large" orientation="horizontal" label={"Formato"}>
            <Dropdown defaultValue={'Excel'} defaultSelectedOptions={["1"]}>
              <Option value="1">Excel</Option>
              <Option value="2">PDF</Option>
            </Dropdown>
          </Field>
      </div>
      <Button appearance="primary" size="large">
        Exportar
      </Button>
      </div>
    </main>
  );
};

export default ExportData;
