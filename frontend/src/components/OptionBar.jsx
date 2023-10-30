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
  Toolbar,
  ToolbarButton,
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
    paddingBottom: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "> div": {
      display: "flex",
      flexWrap: "wrap",
      rowGap: "15px",
    },
    "> div > .select-options": {
      display: "none",
    },
  },
  control: {
    maxWidth: "300px",
  },
});

const OptionBar = () => {
  const searchCriteria = [
    { value: "ncontrol", text: "Número de control" },
    { value: "nombre", text: "Nombre" },
    { value: "apat", text: "Apellido Paterno" },
    { value: "amat", text: "Apellido Materno" },
  ];
  const documents = [{value: "titulo", text: "Título"}, {value: "cert", text: "Certificado"}];
  const sex = [{value: "M", text: "Masculino"}, {value: "F", text: "Femenino"}];
  const initialState = {
    criteria: [searchCriteria[0].value],
    careers: careers.map(({ value }) => value),
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
            {multiselect ? (
              list.map(({ value, text }, index) => (
                <MenuItemCheckbox key={index} name={groupName} value={value}>
                  {text}
                </MenuItemCheckbox>
              ))
            ) : (
              list.map(({ value, text }, index) => (
                <MenuItemRadio key={index} name={groupName} value={value}>
                  {text}
                </MenuItemRadio>
              ))
            )}
          </MenuList>
        </MenuPopover>
      </Menu>
    );
  };

  const styles = useStyles();

  return (
    <>
      <section className={styles.navContainer}>
        <Toolbar as="div" size="large">
          <Input appearance="underline" contentBefore={<Search16Regular />} />
          {menu(
            searchCriteria,
            null,
            "criteria",
            <MoreHorizontal16Regular />,
            false
          )}
          <ToolbarDivider />
          {menu(careers, "Carreras", "careers", null, true)}
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
          <ToolbarDivider />
          <Button appearance="transparent" icon={<Add16Filled />}>
            Agregar
          </Button>
          <Button appearance="transparent" icon={<CheckboxChecked16Regular />}>
            Seleccionar
          </Button>
          <ToolbarDivider />

          <div className="select-options">
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
      </section>
    </>
  );
};

export default OptionBar;
