import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import DevBanner from "./DevBanner";
import "../styles/common.css";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-column space-between" style={{minHeight:"100vh"}}>
      <DevBanner />
      <Header />
      <main className="flex-column flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;