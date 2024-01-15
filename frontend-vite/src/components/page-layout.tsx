import React from "react";
import { NavMenu } from "./nav-menu";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div>
      <div className="top-0 sticky z-20">
        <NavMenu />
      </div>
      <div className="px-5">{children}</div>
    </div>
  );
};

export default PageLayout;
