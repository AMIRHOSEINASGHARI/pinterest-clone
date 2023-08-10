// Components Imports
import { Navbar } from "../index";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen mt-20">{children}</div>
    </div>
  );
};

export default Layout;
