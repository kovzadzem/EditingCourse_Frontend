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

import VideoEditingCurriculum from "../pages/Curriculum/VideoEditing/VideoEditing";
import VideographyCurriculum from "../pages/Curriculum/Videography/Videography";
import Recordings from "../pages/recordings/recordings";
import About from "../pages/About/about";
import Portfolio from "../pages/Portfolio/Portfolio";
import Profile from "../pages/Profile/profile";
import Partnership from "../pages/Partnership/partnership";
import ResetPassword from "../pages/ResetPassword/reset-password";
import RoleRoute from "../components/RoleRoute";
import Admin from "../pages/Admin/Admin";

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
  path: "recordings",
  element: <Recordings />,
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
       {
        path: "RoleRoute",
        element: <components />,
      },
       {
        path: "Admin",
        element: <Admin />,
      },
           // =====================================================
      // STUDENT PROFILE
      // მხოლოდ student როლის მქონე მომხმარებელი
      // =====================================================

      {
        path: "profile",
        element: (
          <RoleRoute allowedRole="student">
            <Profile />
          </RoleRoute>
        ),
      },

      // =====================================================
      // ADMIN PANEL
      // მხოლოდ admin როლის მქონე მომხმარებელი
      // =====================================================

      {
        path: "admin",
        element: (
          <RoleRoute allowedRole="admin">
            <Admin />
          </RoleRoute>
        ),
      },
    ],
  },
]);