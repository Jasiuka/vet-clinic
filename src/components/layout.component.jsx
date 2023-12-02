import Footer from "./footer/footer.component";
import { Header } from "./header/header.component";
import PropType from "prop-types";
import ScrollToTop from "./scrollToTop.component";
import NotificationsList from "./notifications/notificationsList.component";
// import ScrollToTopButton from "./scrollToTopButton.component";

export const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <NotificationsList />
      {children}
      <Footer />
      <ScrollToTop />
    </>
  );
};

Layout.propTypes = {
  children: PropType.node,
};

export default Layout;
