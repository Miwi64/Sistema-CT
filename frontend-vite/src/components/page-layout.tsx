import React from "react";
import { NavMenu } from "./nav-menu";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <>
      <nav className="top-0 sticky z-20">
        <NavMenu />
      </nav>
      <main className="px-5">{children}</main>
    </>
  );
};

export default PageLayout;
