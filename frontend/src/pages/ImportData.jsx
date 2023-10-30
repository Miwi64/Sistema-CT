import { Button, Tab, TabList, Title1, makeStyles } from "@fluentui/react-components";
import React, { useState } from "react";
import CertificateForm from "../components/CertificateForm";
import StudentForm from "../components/StudentForm";
import TitleForm from "../components/TitleForm";
import { Folder20Filled } from "@fluentui/react-icons";

const useStyles = makeStyles({
  mainContainer: {
    direction: "flex",
    flexDirection: "column",
    height: "fit-content",
    paddingTop: "20px",
    paddingBottom: "20px",
    paddingLeft: "20px",
    paddingRight: "20px",
    "> .forms-container": {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      alignItems: "center",
      paddingBottom: "30px"
    },
    "> .title-container, .import-options-container": {
      display: "flex",
      width: "100%",
      flexDirection: "row",
      paddingBottom: "10px",
      justifyContent: "center",
    },
  },
});

const ImportData = () => {
  const [selectedValue, setSelectedValue] = useState("titulo");

  const onTabSelect = (_, data) => {
    setSelectedValue(data.value);
  };

  const styles = useStyles();
  return (
    <main className={styles.mainContainer}>
      <div className="title-container">
        <Title1 as="h1">Importar Datos</Title1>
      </div>
      <div className="import-options-container">
        <Button appearance="subtle" icon={<Folder20Filled />}>Importar Titulos desde Excel</Button>
        <Button appearance="subtle" icon={<Folder20Filled />}>Importar Certificados desde Excel</Button>
      </div>
      <TabList className="title-container" selectedValue={selectedValue} onTabSelect={onTabSelect}>
        <Tab id="titulo" value="titulo">
          Título
        </Tab>
        <Tab id="cert" value="cert">
          Certificado
        </Tab>
        <Tab id="est" value="est">
          Estudiante
        </Tab>
      </TabList>
      <div className="forms-container">
        {selectedValue === "cert" && <CertificateForm setSelectedValue={setSelectedValue} />}
        {selectedValue === "titulo" && <TitleForm setSelectedValue={setSelectedValue}/>}
        {selectedValue === "est" && <StudentForm />}
        <Button appearance="primary" size="large">Agregar</Button>
      </div>
    </main>
  );
};

export default ImportData;
