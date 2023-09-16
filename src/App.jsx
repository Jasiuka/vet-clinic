import { Hero } from "./sections/hero.section";
import { Why } from "./sections/why-us.section";
import Reviews from "./sections/reviews.section";
import Services from "./sections/services.section";
import AppointmentPage from "./pages/appointment.page";
import HeaderHeroBackground from "./components/hero-header-background.component";

export const Home = () => {
  return (
    <main>
      <HeaderHeroBackground />
      <Hero />
      <Why />
      <Services />
      <AppointmentPage />
      <Reviews />
    </main>
  );
};

export default Home;
