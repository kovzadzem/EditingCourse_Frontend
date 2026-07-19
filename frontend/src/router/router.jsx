import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/home";
import Login from "../pages/Login/login";
import Register from "../pages/Register/register";
import Gallery from "../pages/Gallery/gallery";
import Contact from "../pages/Contact/contact";
import ForgotPassword from "../pages/Login/forgot-password";

import Dashboard from "../pages/Dashboard/dashboard";
import Courses from "../pages/Dashboard/courses";
import Lessons from "../pages/Dashboard/lessons";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "gallery",
        element: <Gallery />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
       {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
       path: "lessons",
        element: <Lessons />,
     },
    ],
  },
]);