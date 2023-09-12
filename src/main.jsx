import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Header } from "./components/header.component.jsx";
import HeaderHeroBackground from "./components/hero-header-background.component.jsx";
import AuthorizationPage from "./pages/auth.page.jsx";
import AboutUsPage from "./pages/about-us.page.jsx";
import OurTeamPage from "./pages/our-team.page.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <HeaderHeroBackground />,
      },
    ],
  },
  {
    path: "/prisijungimas",
    element: <AuthorizationPage />,
  },
  {
    path: "/apie-mus",
    element: <AboutUsPage />,
  },
  {
    path: "/komanda",
    element: <OurTeamPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={router} />
  </React.StrictMode>
);
