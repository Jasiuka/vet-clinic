import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./App.jsx";
import "./base.style.css";
import "./common.style.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthenticationPage from "./pages/authentication/auth.page.jsx";
import AboutUsPage from "./pages/about-us/about-us.page.jsx";
import OurTeamPage from "./pages/our-team/our-team.page.jsx";
import ServicesPage from "./pages/services/services.page.jsx";
import FaqPage from "./pages/faq/faq.page.jsx";
import ContactsPage from "./pages/contacts/contacts.page.jsx";
import AppointmentRegistration from "./pages/appointment/registration-route/appointment-registration.page.jsx";
import { Layout } from "./components/layout.component.jsx";

// const AuthenticationPage = lazy(() =>
//   import("./pages/authentication/auth.page.jsx")
// );
// const AboutUsPage = lazy(() => import("./pages/about-us/about-us.page.jsx"));
// const OurTeamPage = lazy(() => import("./pages/our-team/our-team.page.jsx"));
// const ServicesPage = lazy(() => import("./pages/services/services.page.jsx"));
// const FaqPage = lazy(() => import("./pages/faq/faq.page.jsx"));
// const ContactsPage = lazy(() => import("./pages/contacts/contacts.page.jsx"));

// Redux
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import AppointmentPage from "./pages/appointment/appointment.page.jsx";
import ShopPage from "./pages/shop/shop.page.jsx";
import Pets from "./pages/auth-users/pets/pets.page.jsx";
import PetPage from "./pages/auth-users/pets/pet-page/pet-page.jsx";
import CartPage from "./pages/shop/cart/cart.page.jsx";
import Control from "./pages/admin/control.page.jsx";
import Checkout from "./pages/shop/checkout/checkout.page.jsx";
import VetAppointments from "./pages/vets/vet-appointments.page.jsx";

// STRIPE
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Orders from "./pages/auth-users/order.page.jsx";
import { Header } from "./components/header/header.component.jsx";
const stripePromise = loadStripe(
  "pk_test_51ELPw0GnhsO4RtFa7HIILjcjS8WMtFTtPk7NkTZJtQS4r4fySmUFsaQdNWS0WvcBrPygfHn2D97wgL1I9Wwnoaek00ATsqQQSM"
);
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/apie-mus",
    element: (
      <Layout>
        <AboutUsPage />
      </Layout>
    ),
  },
  {
    path: "/komanda",
    element: (
      <Layout>
        <OurTeamPage />
      </Layout>
    ),
  },
  {
    path: "/paslaugos",
    element: (
      <Layout>
        <ServicesPage />
      </Layout>
    ),
  },
  {
    path: "/duk",
    element: (
      <Layout>
        <FaqPage />
      </Layout>
    ),
  },
  {
    path: "/kontaktai",
    element: (
      <Layout>
        <ContactsPage />
      </Layout>
    ),
  },
  {
    path: "/prisijungti",
    element: <AuthenticationPage />,
  },
  {
    path: "/vizitas",
    element: (
      <Layout>
        <AppointmentPage />
      </Layout>
    ),
  },
  {
    path: "/vizitas/registracija/:id",
    element: (
      <Layout>
        <AppointmentRegistration />
      </Layout>
    ),
  },
  {
    path: "/parduotuve",
    element: (
      <Layout>
        <ShopPage />
      </Layout>
    ),
  },

  {
    path: "mano-augintiniai",
    element: (
      <Layout>
        <Pets />
      </Layout>
    ),
  },

  {
    path: "/augintinis/:name/:id",
    element: (
      <Layout>
        <PetPage />
      </Layout>
    ),
  },
  {
    path: "/krepselis",
    element: (
      <Layout>
        <CartPage />
      </Layout>
    ),
  },
  {
    path: "/uzsakymas-informacija",
    element: (
      <Layout>
        <Elements stripe={stripePromise}>
          <Checkout />
        </Elements>
      </Layout>
    ),
  },
  {
    path: "/valdymas",
    element: (
      <>
        <Header />
        <Control />
      </>
    ),
  },
  {
    path: "/gydytojas/vizitai",
    element: (
      <Layout>
        <VetAppointments />
      </Layout>
    ),
  },
  {
    path: "/uzsakymai",
    element: (
      <Layout>
        <Orders />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
