import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";

// .
import Navbar from "./Navbar";
import Footer from "./Footer";

interface IProps {
  children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <div className="xl:container m-auto">
      <Navbar />
      {children}
      <Footer />
      <Toaster
        containerStyle={{ fontSize: "0.9rem" }}
        toastOptions={{ duration: 2000 }}
      />
    </div>
  );
};

export default Layout;
