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

// Redux
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
//
import AppointmentPage from "./pages/appointment/appointment.page.jsx";
import ShopPage from "./pages/shop/shop.page.jsx";
import Pets from "./pages/auth-users/pets/pets.page.jsx";
import PetPage from "./pages/auth-users/pets/pet-page/pet-page.jsx";
import CartPage from "./pages/shop/cart/cart.page.jsx";
import Control from "./pages/admin/control.page.jsx";
import Checkout from "./pages/shop/checkout/checkout.page.jsx";
import VetAppointments from "./pages/vets/vet-appointments.page.jsx";
import CheckoutConfirmed from "./pages/shop/checkout/checkout-confirmed.component.jsx";

// STRIPE
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Orders from "./pages/auth-users/orders/orders.page.jsx";
import NotFoundPage from "./pages/error/not-found.page.jsx";
import TempPage from "./temp.page.jsx";
import SignupSuccess from "./pages/signup-success/signup-success.page.jsx";
const stripePromise = loadStripe(
  "pk_test_51ELPw0GnhsO4RtFa7HIILjcjS8WMtFTtPk7NkTZJtQS4r4fySmUFsaQdNWS0WvcBrPygfHn2D97wgL1I9Wwnoaek00ATsqQQSM"
);
const router = createBrowserRouter([
  {
    path: "/temp",
    element: (
      <Layout noFooter={false}>
        <TempPage />
      </Layout>
    ),
  },
  {
    path: "/",
    element: (
      <Layout noFooter={false}>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/apie-mus",
    element: (
      <Layout noFooter={false}>
        <AboutUsPage />
      </Layout>
    ),
  },
  {
    path: "/komanda",
    element: (
      <Layout noFooter={false}>
        <OurTeamPage />
      </Layout>
    ),
  },
  {
    path: "/paslaugos",
    element: (
      <Layout noFooter={false}>
        <ServicesPage />
      </Layout>
    ),
  },
  {
    path: "/duk",
    element: (
      <Layout noFooter={false}>
        <FaqPage />
      </Layout>
    ),
  },
  {
    path: "/kontaktai",
    element: (
      <Layout noFooter={false}>
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
      <Layout noFooter={false}>
        <AppointmentPage />
      </Layout>
    ),
  },
  {
    path: "/vizitas/registracija/:id",
    element: (
      <Layout noFooter={false}>
        <AppointmentRegistration />
      </Layout>
    ),
  },
  {
    path: "/parduotuve",
    element: (
      <Layout noFooter={false}>
        <ShopPage />
      </Layout>
    ),
  },

  {
    path: "mano-augintiniai",
    element: (
      <Layout noFooter={false}>
        <Pets />
      </Layout>
    ),
  },

  {
    path: "/augintinis/:name/:id",
    element: (
      <Layout noFooter={false}>
        <PetPage />
      </Layout>
    ),
  },
  {
    path: "/krepselis",
    element: (
      <Layout noFooter={false}>
        <CartPage />
      </Layout>
    ),
  },
  {
    path: "/uzsakymas-informacija",
    element: (
      <Layout noFooter={false}>
        <Elements stripe={stripePromise}>
          <Checkout />
        </Elements>
      </Layout>
    ),
  },
  {
    path: "/uzsakymas-patvirtintas",
    element: (
      <Layout noFooter={false}>
        <CheckoutConfirmed />
      </Layout>
    ),
  },
  {
    path: "/valdymas",
    element: (
      <>
        <Layout noFooter={true}>
          <Control />
        </Layout>
      </>
    ),
  },
  {
    path: "/gydytojas/vizitai",
    element: (
      <Layout noFooter={false}>
        <VetAppointments />
      </Layout>
    ),
  },
  {
    path: "/uzsakymai",
    element: (
      <Layout noFooter={false}>
        <Orders />
      </Layout>
    ),
  },
  {
    path: "registracijos-patvirtinimas/:email",
    element: (
      <Layout noFooter={false}>
        <SignupSuccess />
      </Layout>
    ),
  },
  {
    path: "/nerastas",
    element: <NotFoundPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
