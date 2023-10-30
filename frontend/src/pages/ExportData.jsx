import {
  Button,
  Dropdown,
  Field,
  Option,
  Title1,
  makeStyles,
} from "@fluentui/react-components";
import {reports} from '../libs/constants'

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
    "> .content-container > .options-container": {
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

  const reportFormat = reports;

  return (
    <main className={styles.mainContainer}>
      <div className="title-container">
        <Title1 as="h1">Exportar Datos</Title1>
      </div>
      <div className="content-container">
        <div className="options-container">
          <Field size="large" orientation="horizontal" label={"Reporte"}>
            <Dropdown defaultValue={reportFormat[0].text} defaultSelectedOptions={[reportFormat[0].value]}>
              {reportFormat.map(({text, value}, index) => (<Option key={index} value={value}>{text}</Option>))}
            </Dropdown>
          </Field>
          <Field size="large" orientation="horizontal" label={"Formato"}>
            <Dropdown defaultValue={"Excel"} defaultSelectedOptions={["1"]}>
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
