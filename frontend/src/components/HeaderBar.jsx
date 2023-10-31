import { Avatar, Text, makeStyles, tokens } from "@fluentui/react-components";
import {
  AlertRegular,
  GridRegular,
  SettingsRegular,
} from "@fluentui/react-icons";
import React, { useState } from "react";
import MenuSideBar from "./MenuSideBar";
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
    "> .title-container": {
      width: "95%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "100%",
      marginLeft: "10px",
    },
    "> .title-container > h1": {
      whiteSpace: "nowrap",
      overflowX: "hidden",
      textOverflow: "ellipsis",
    },
    "> .title-container > .options-container": {
      display: "flex",
      height: "100%",
    },
    "> .button-container": {
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

const HeaderBar = () => {
  const [openMenu, setOpenMenu] = useState({menu: false, account: false});
  const styles = useStyle();
  return (
    <>
      <header className={styles.headerContainer}>
        <div
          onClick={() => {
            setOpenMenu({...openMenu, menu: !openMenu.menu});
          }}
          className="button-container"
        >
          <GridRegular fontSize={30} />
        </div>
        <div className="title-container">
          <Text as="h1" size={600}>
            Títulos y Certificados
          </Text>
          <div className="options-container">
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
      {openMenu.menu && <MenuSideBar />}
      {openMenu.account && <AccountMenu />}
    </>
  );
};

export default HeaderBar;
