import Footer from "./components/footer.component";
import { Header } from "./components/header.component";
import { Hero } from "./components/hero.component";
import { Why } from "./components/why.component";
import Reviews from "./components/reviews.component";
import Services from "./components/services.component";
import AuthorizationPage from "./components/auth.page";

export const Home = () => {
  return (
    <div>
      <div className="header-hero__background">
        <Header />
        <Hero />
      </div>
      <AuthorizationPage />
      <Why />
      <Services />
      <Reviews />
      <Footer />
    </div>
  );
};

export default Home;
