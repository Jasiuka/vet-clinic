import { Hero } from "./components/hero.component";
import { Why } from "./components/why.component";
import Reviews from "./components/reviews.component";
import Services from "./components/services.component";
import AuthorizationPage from "./pages/auth.page";
import AppointmentPage from "./pages/appointment.page";
import HeaderHeroBackground from "./components/hero-header-background.component";

export const Home = () => {
  return (
    <>
      <HeaderHeroBackground />
      <Hero />
      <AuthorizationPage />
      <Why />
      <Services />
      <AppointmentPage />
      <Reviews />
    </>
  );
};

export default Home;
