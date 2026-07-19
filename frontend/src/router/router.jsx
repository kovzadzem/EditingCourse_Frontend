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
import Calendar from "../pages/Dashboard/calendar";
import OfflineCourse from "../pages/Dashboard/offlinecourse";
import Recordings from "../pages/Dashboard/recordings";
import Students from "../pages/Dashboard/students";
import Payments from "../pages/Dashboard/payments";
import Syllabus from "../pages/Dashboard/syllabus";

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
       path: "Calendar",
        element: <Calendar/>,
     },
      {
       path: "offlinecourse",
        element: <OfflineCourse/>,
     },

     {
       path: "recordings",
        element: <Recordings/>,
     },

     {
       path: "students",
        element: <Students/>,
     },
     {
       path: "payments",
        element: <Payments/>,
     },
     {
       path: "syllabus",
        element: <Syllabus/>,
     },
     {
       path: "contact",
        element: <Contact/>,
     },
    ],
  },
]);