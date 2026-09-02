import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/home";

import VideoEditing from "../pages/LiveCourses/VideoEditing/VideoEditing";
import Videography from "../pages/LiveCourses/Videography/Videography";

import Login from "../pages/Login/login";
import Register from "../pages/Register/register";
import Gallery from "../pages/Gallery/gallery";
import Contact from "../pages/Contact/contact";
import ForgotPassword from "../pages/Login/forgot-password";

import Dashboard from "../pages/Dashboard/dashboard";
import Courses from "../pages/Dashboard/courses";
import Calendar from "../pages/Dashboard/calendar";
import OfflineCourse from "../pages/Dashboard/offlinecourse";
import Recordings from "../pages/recordings/recordings";
import Students from "../pages/Dashboard/students";
import Payments from "../pages/Dashboard/payments";

import VideoEditingCurriculum from "../pages/Curriculum/VideoEditing/VideoEditing";
import VideographyCurriculum from "../pages/Curriculum/Videography/Videography";

import About from "../pages/About/about";
import Portfolio from "../pages/Portfolio/Portfolio";
import Profile from "../pages/Profile/profile";
import Partnership from "../pages/Partnership/partnership";

import ResetPassword from "../pages/ResetPassword/reset-password";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [
      {
        index: true,
        element: <Home />,
      },

      /* =====================================================
         LIVE COURSES
      ===================================================== */

      {
        path: "livecourses/video-editing",
        element: <VideoEditing />,
      },

      {
        path: "livecourses/videography",
        element: <Videography />,
      },

      /* =====================================================
         AUTH
      ===================================================== */

      {
        path: "login",
        element: <Login />,
      },

      {
        path: "register",
        element: <Register />,
      },

      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },

      /* =====================================================
         GENERAL
      ===================================================== */

      {
        path: "gallery",
        element: <Gallery />,
      },

      {
        path: "contact",
        element: <Contact />,
      },

      /* =====================================================
         DASHBOARD
      ===================================================== */

      {
        path: "dashboard",
        element: <Dashboard />,
      },

      {
        path: "courses",
        element: <Courses />,
      },

      {
        path: "calendar",
        element: <Calendar />,
      },

      {
        path: "offlinecourse",
        element: <OfflineCourse />,
      },

      {
        path: "recordings",
        element: <Recordings />,
      },

      {
        path: "students",
        element: <Students />,
      },

      {
        path: "payments",
        element: <Payments />,
      },

      /* =====================================================
         OTHER PAGES
      ===================================================== */

{
  path: "curriculum/video-editing",
  element: <VideoEditingCurriculum />,
},

{
  path: "curriculum/videography",
  element: <VideographyCurriculum />,
},

      {
        path: "about",
        element: <About />,
      },

      {
        path: "Portfolio",
        element: <Portfolio />,
      },

      {
        path: "profile",
        element: <Profile />,
      },

      {
        path: "reset-password",
        element: <ResetPassword />,
      },

      {
        path: "partnership",
        element: <Partnership />,
      },
    ],
  },
]);