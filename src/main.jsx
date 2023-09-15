import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthorizationPage from "./pages/auth.page.jsx";
import AboutUsPage from "./pages/about-us.page.jsx";
import OurTeamPage from "./pages/our-team.page.jsx";
import ServicesPage from "./pages/services.page.jsx";
import FaqPage from "./pages/faq.page.jsx";
import ContactsPage from "./pages/contacts.page.jsx";
import { Layout } from "./components/layout.component.jsx";

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
    path: "/prisijungimas",
    element: (
      <Layout>
        <AuthorizationPage />,
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
    element: (
      <Layout>
        <AuthorizationPage />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
