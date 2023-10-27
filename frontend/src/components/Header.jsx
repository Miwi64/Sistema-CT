import { Avatar, Text, makeStyles, tokens } from "@fluentui/react-components";
import {
  AlertRegular,
  GridRegular,
  SettingsRegular,
} from "@fluentui/react-icons";
import React, { useState } from "react";
import MenuBar from "./MenuBar";
import AccountMenu from "./AccountMenu";

const useStyle = makeStyles({
  headerContainer: {
    position: "sticky",
    top: "0",
    zIndex: "6",
    display: "flex",
    width: "100%",
    height: "60px",
    color: "white",
    backgroundColor: tokens.colorBrandBackground,
    "> .titleContainer": {
      width: "95%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "100%",
      marginLeft: "10px",
    },
    "> .titleContainer > h1": {
      whiteSpace: "nowrap",
      overflowX: "hidden",
      textOverflow: "ellipsis",
    },
    "> .titleContainer > .optionsContainer": {
      display: "flex",
      height: "100%",
    },
    "> .buttonContainer": {
      backgroundColor: tokens.colorBrandBackgroundHover,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "5%",
      minWidth: "70px",
      transitionDuration: `${tokens.durationNormal}`,
      transitionProperty: "background-color",
      ":hover": {
        backgroundColor: tokens.colorBrandBackgroundSelected,
        cursor: "pointer",
      },
    },
  },
  buttonOptionsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "6%",
    minWidth: "40px",
    paddingLeft: "4px",
    paddingRight: "4px",
    transitionDuration: `${tokens.durationNormal}`,
    transitionProperty: "background-color",
    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundSelected,
      cursor: "pointer"
    },
  },
});

const Header = () => {
  const [openMenu, setOpenMenu] = useState({menu: false, account: false});
  const styles = useStyle();
  return (
    <>
      <header className={styles.headerContainer}>
        <div
          onClick={() => {
            setOpenMenu({...openMenu, menu: !openMenu.menu});
          }}
          className="buttonContainer"
        >
          <GridRegular fontSize={30} />
        </div>
        <div className="titleContainer">
          <Text as="h1" size={700}>
            Títulos y Certificados
          </Text>
          <div className="optionsContainer">
            <div onClick={() => {
            setOpenMenu({...openMenu, account: !openMenu.account});
          }} className={styles.buttonOptionsContainer}>
              <Avatar size={36} />
            </div>
            <div className={styles.buttonOptionsContainer}>
              <SettingsRegular fontSize={25} />
            </div>
          </div>
        </div>
      </header>
      {openMenu.menu && <MenuBar />}
      {openMenu.account && <AccountMenu />}
    </>
  );
};

export default Header;
