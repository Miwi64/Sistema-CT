import React from "react";
import { NavMenu, NavMobile } from "./nav-menu";

interface PageLayoutProps {
  children?: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <>
      <nav className="top-0 sticky z-20">
        <NavMenu />
        <NavMobile />
      </nav>
      <main className="px-5">{children}</main>
    </>
  );
};

export default PageLayout;
