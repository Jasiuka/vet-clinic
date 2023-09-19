import Footer from "./footer.component";
import { Header } from "./header.component";
import PropType from "prop-types";
import ScrollToTop from "./scrollToTop.component";
import ScrollToTopButton from "./scrollToTopButton.component";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ScrollToTop />
      <ScrollToTopButton />
    </>
  );
};

Layout.propTypes = {
  children: PropType.node,
};

export default Layout;
