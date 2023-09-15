import Footer from "./footer.component";
import { Header } from "./header.component";
import PropType from "prop-types";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropType.node,
};

export default Layout;
