import Footer from "./components/footer.component";
import { Hero } from "./components/hero.component";
import { Why } from "./components/why.component";
import Reviews from "./components/reviews.component";
import Services from "./components/services.component";
import AuthorizationPage from "./pages/auth.page";
import AppointmentPage from "./pages/appointment.page";
import { Outlet } from "react-router-dom";

export const Home = () => {
  // useEffect(() => {
  //   fetch("/message")
  //     .then((response) => {
  //       return response.text();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     });
  // });

  return (
    <>
      <Outlet />
      <Hero />
      <AuthorizationPage />
      <Why />
      <Services />
      <AppointmentPage />
      <Reviews />
      <Footer />
    </>
  );
};

export default Home;
