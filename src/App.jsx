import { Hero } from "./pages/main/sections/hero/hero.section";
import { Why } from "./pages/main/sections/why-us/why-us.section";
import Reviews from "./pages/main/sections/reviews/reviews.section";
import Services from "./pages/main/sections/services/services.section";
import AppointmentPage from "./pages/appointment/appointment.page";
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
