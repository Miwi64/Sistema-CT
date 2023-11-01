import {
  Button,
  Field,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemCheckbox,
  MenuItemRadio,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Tab,
  TabList,
  Toolbar,
  ToolbarDivider,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import {
  Add16Filled,
  Calendar16Regular,
  CheckboxChecked16Regular,
  Delete16Filled,
  Dismiss16Filled,
  Document16Regular,
  Edit16Regular,
  MoreHorizontal16Regular,
  People16Regular,
  Save16Regular,
  Search16Regular,
} from "@fluentui/react-icons";
import React, { useState } from "react";
import { careers } from "../libs/constants";

const useStyles = makeStyles({
  navContainer: {
    position: "sticky",
    top: "0",
    zIndex: "7",
    backgroundColor: tokens.colorBrandBackground2,
    paddingTop: "10px",
    paddingRight: "10px",
    paddingLeft: "10px",
    paddingBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  tabContainer: {
    width: "fit-content",
    marginTop: "10px",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexWrap: "wrap",
    rowGap: "15px",
    paddingLeft: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingRight: "10px",
    borderTopRightRadius: "8px",
    borderTopLeftRadius: "8px",
    borderBottomRightRadius: "8px",
    borderBottomLeftRadius: "8px",
    boxShadow: tokens.shadow8
  },
  selectOptions: {
    display: "none"
  }
});

const OptionBar = () => {
  const searchCriteria = [
    { value: "ncontrol", text: "Número de control" },
    { value: "nombre", text: "Nombre" },
    { value: "apat", text: "Apellido Paterno" },
    { value: "amat", text: "Apellido Materno" },
  ];
  const documents = [
    { value: "titulo", text: "Título" },
    { value: "cert", text: "Certificado" },
  ];
  const careerList = careers;
  const sex = [
    { value: "M", text: "Masculino" },
    { value: "F", text: "Femenino" },
  ];
  const initialState = {
    criteria: [searchCriteria[0].value],
    careers: careerList.map(({ value }) => value),
    sex: ["M", "F"],
    docs: ["titulo", "cert"],
  };

  const [open, setOpen] = useState();
  const [checkedValues, setValues] = useState(initialState);
  const onChange = (_, { name, checkedItems }) => {
    setValues((s) => {
      return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems };
    });
  };

  const [selectedTabValue, setSelectedTabValue] = useState("main");

  const onTabSelect = (_, data) => {
    setSelectedTabValue(data.value);
  };

  const menu = (list, title, groupName, icon, multiselect) => {
    return (
      <Menu checkedValues={checkedValues} onCheckedValueChange={onChange}>
        <MenuTrigger disableButtonEnhancement>
          <Button appearance="transparent" icon={icon}>
            {title}
          </Button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            {multiselect
              ? list.map(({ value, text }, index) => (
                  <MenuItemCheckbox key={index} name={groupName} value={value}>
                    {text}
                  </MenuItemCheckbox>
                ))
              : list.map(({ value, text }, index) => (
                  <MenuItemRadio key={index} name={groupName} value={value}>
                    {text}
                  </MenuItemRadio>
                ))}
          </MenuList>
        </MenuPopover>
      </Menu>
    );
  };

  const filterTab = () => {
    return (
      <Toolbar className={styles.tabContainer} size="large">
        {menu(careerList, "Carreras", "careers", null, true)}
        {menu(documents, "Documento", "docs", <Document16Regular />, true)}
        {menu(sex, "Sexo", "sex", <People16Regular />, true)}
        <Popover
          withArrow
          trapFocus
          open={open === "first"}
          onOpenChange={(_, data) => setOpen(data.open ? "first" : undefined)}
        >
          <PopoverTrigger disableButtonEnhancement>
            <Button appearance="transparent" icon={<Calendar16Regular />}>
              Fecha
            </Button>
          </PopoverTrigger>
          <PopoverSurface>
            <Field label={"Desde"}>
              <DatePicker
                className={styles.control}
                allowTextInput
                placeholder="Fecha de inicio"
              />
            </Field>
            <br />
            <Field label={"Hasta"}>
              <DatePicker
                className={styles.control}
                allowTextInput
                placeholder="Fecha de fin"
              />
            </Field>
          </PopoverSurface>
        </Popover>
      </Toolbar>
    );
  };

  const mainTab = () => {
    return (
      <Toolbar className={styles.tabContainer} size="large">
        <Input appearance="underline" contentBefore={<Search16Regular />} />
        {menu(
          searchCriteria,
          null,
          "criteria",
          <MoreHorizontal16Regular />,
          false
        )}
        <ToolbarDivider />
        <Button as="a" href="/dashboard/import" appearance="transparent" icon={<Add16Filled />}>
          Agregar
        </Button>
        <Button appearance="transparent" icon={<CheckboxChecked16Regular />}>
          Seleccionar
        </Button>
        <ToolbarDivider />

        <div className={styles.selectOptions}>
          <Button appearance="transparent" icon={<Edit16Regular />}></Button>
          <Button appearance="transparent" icon={<Delete16Filled />}></Button>
          <Button appearance="transparent" icon={<Dismiss16Filled />}>
            Cerrar Selección
          </Button>
        </div>

        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <MenuButton appearance="primary" icon={<Save16Regular />}>
              Guardar como
            </MenuButton>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem>PDF</MenuItem>
              <MenuItem>Excel</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </Toolbar>
    );
  };

  const styles = useStyles();
  return (<section className={styles.navContainer}>
    <TabList  selectedValue={selectedTabValue} onTabSelect={onTabSelect}>
        <Tab id="main" value="main">
          Inicio
        </Tab>
        <Tab id="filter" value="filter">
          Filtros
        </Tab>
      </TabList>
      <div>
        {selectedTabValue === "main" && mainTab()}
        {selectedTabValue === "filter" && filterTab()}
      </div>
  </section>);
};

export default OptionBar;
