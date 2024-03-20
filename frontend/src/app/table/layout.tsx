import { NavMenu, NavMobile } from "@/components/nav-menu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="top-0 sticky z-20">
        <NavMenu />
        <NavMobile />
      </nav>
      <main className="px-5">{children}</main>
    </>
  );
}
