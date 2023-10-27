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
  BinFullRegular,
  Calendar16Regular,
  CheckboxChecked16Regular,
  ClosedCaptionRegular,
  Delete16Filled,
  Dismiss16Filled,
  Document16Regular,
  Edit16Regular,
  List16Regular,
  MoreHorizontal16Regular,
  People16Regular,
  Save16Regular,
  Search16Regular,
  SelectObject20Regular,
} from "@fluentui/react-icons";
import React, { useState } from "react";

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
    "> div > .selectOptions": {
      display: "none",
    },
  },
  control: {
    maxWidth: "300px",
  },
});

const NavBar = () => {
  const [open, setOpen] = useState();
  const [checkedValues, setValues] = useState({
    buscar: ["ncontrol"],
    carreras: [
      "sistemas",
      "administracion",
      "agricola",
      "industrial",
      "electromecanica",
      "mecatronica",
    ],
    generos: ["M", "F"],
    docs: ["cert", "titulo"],
  });
  const onChange = (e, { name, checkedItems }) => {
    setValues((s) => {
      return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems };
    });
  };

  const searchMenu = () => {
    return (
      <Menu checkedValues={checkedValues} onCheckedValueChange={onChange}>
        <MenuTrigger disableButtonEnhancement>
          <Button appearance="transparent" icon={<MoreHorizontal16Regular />} />
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItemRadio name="buscar" value="ncontrol">
              Número de control
            </MenuItemRadio>
            <MenuItemRadio name="buscar" value="nombre">
              Nombre
            </MenuItemRadio>
            <MenuItemRadio name="buscar" value="apat">
              Apellido paterno
            </MenuItemRadio>
            <MenuItemRadio name="buscar" value="amat">
              Apellido Materno
            </MenuItemRadio>
          </MenuList>
        </MenuPopover>
      </Menu>
    );
  };

  const careerMenu = () => {
    return (
      <Menu checkedValues={checkedValues} onCheckedValueChange={onChange}>
        <MenuTrigger disableButtonEnhancement>
          <Button appearance="transparent">Carrera</Button>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItemCheckbox name="carreras" value="sistemas">
              Sistemas
            </MenuItemCheckbox>
            <MenuItemCheckbox name="carreras" value="administracion">
              Administración
            </MenuItemCheckbox>
            <MenuItemCheckbox name="carreras" value="agricola">
              Agrícola
            </MenuItemCheckbox>
            <MenuItemCheckbox name="carreras" value="industrial">
              Industrial
            </MenuItemCheckbox>
            <MenuItemCheckbox name="carreras" value="electromecanica">
              Electromecánica
            </MenuItemCheckbox>
            <MenuItemCheckbox name="carreras" value="mecatronica">
              Mecatrónica
            </MenuItemCheckbox>
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
          {searchMenu()}
          <ToolbarDivider />
          {careerMenu()}
          <Menu checkedValues={checkedValues} onCheckedValueChange={onChange}>
            <MenuTrigger disableButtonEnhancement>
              <Button appearance="transparent" icon={<Document16Regular />}>
                Documento
              </Button>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItemCheckbox name="docs" value="titulo">
                  Título
                </MenuItemCheckbox>
                <MenuItemCheckbox name="docs" value="cert">
                  Certificado
                </MenuItemCheckbox>
              </MenuList>
            </MenuPopover>
          </Menu>
          <Menu checkedValues={checkedValues} onCheckedValueChange={onChange}>
            <MenuTrigger disableButtonEnhancement>
              <Button appearance="transparent" icon={<People16Regular />}>
                Sexo
              </Button>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItemCheckbox name="generos" value="M">
                  Masculino
                </MenuItemCheckbox>
                <MenuItemCheckbox name="generos" value="F">
                  Femenino
                </MenuItemCheckbox>
              </MenuList>
            </MenuPopover>
          </Menu>
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
          <div className="selectOptions">
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

export default NavBar;
