import React from "react";
import HeaderBar from "../components/HeaderBar";

const DashboardLayout = ({children}) => {
  return (
    <>
      <HeaderBar />
      {children}
    </>
  );
};

export default DashboardLayout;
