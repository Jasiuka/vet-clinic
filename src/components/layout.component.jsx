import Footer from "./footer/footer.component";
import { Header } from "./header/header.component";
import PropType from "prop-types";
import ScrollToTop from "./single-use/scrollToTop.component";
import NotificationsList from "./notifications/notificationsList.component";
import ScrollToTopButton from "./single-use/scrollToTopButton.component";
import ObserverPoint from "./single-use/observer-point.component";
import { useEffect, useState } from "react";

export const Layout = ({ children, noFooter }) => {
  const [isIntersecting, setIsIntersecting] = useState(true);

  const observerCallback = (entries) => {
    const [entry] = entries;
    setIsIntersecting(entry.isIntersecting);
  };

  useEffect(() => {
    const observerTargetElement = document.querySelector(".observer-point");

    const options = {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, options);
    if (observerTargetElement) observer.observe(observerTargetElement);

    return () => {
      if (observerTargetElement) observer.unobserve(observerTargetElement);
    };
  }, [isIntersecting]);

  return (
    <>
      <Header isIntersecting={isIntersecting} />
      <NotificationsList />
      <ObserverPoint />
      {children}
      {noFooter ? "" : <Footer />}
      <ScrollToTop />
      <ScrollToTopButton isIntersecting={isIntersecting} />
    </>
  );
};

Layout.propTypes = {
  children: PropType.node,
  noFooter: PropType.bool,
};

export default Layout;
