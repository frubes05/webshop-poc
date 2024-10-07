import { Outlet } from "react-router-dom";
import Header from "../header/header";
import { Toaster } from "@/components/ui/toaster"

const Layout = () => (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  );

export default Layout;