import React from "react";
import Header from "../components/Header";

const DashboardLayout = ({children}) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default DashboardLayout;
