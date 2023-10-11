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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
