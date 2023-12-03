import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.scrollY !== 0) {
      window.scrollTo(0, 10);
    }
  }, [pathname]);
};

export default ScrollToTop;
