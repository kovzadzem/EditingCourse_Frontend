
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// მთავარი გვერდი
import Home from "../pages/Home/home";

// Live კურსები
import VideoEditing from "../pages/LiveCourses/VideoEditing/VideoEditing";
import Videography from "../pages/LiveCourses/Videography/Videography";

// ავტორიზაცია
import Login from "../pages/Login/login";
import Register from "../pages/Register/register";
import ForgotPassword from "../pages/Login/forgot-password";
import ResetPassword from "../pages/ResetPassword/reset-password";

// ზოგადი გვერდები
import Gallery from "../pages/Gallery/gallery";
import Contact from "../pages/Contact/contact";
import About from "../pages/About/about";
import Portfolio from "../pages/Portfolio/Portfolio";
import Partnership from "../pages/Partnership/partnership";

// სასწავლო პროგრამები
import VideoEditingCurriculum from "../pages/Curriculum/VideoEditing/VideoEditing";
import VideographyCurriculum from "../pages/Curriculum/Videography/Videography";

// პროფილი და ადმინისტრირება
import Profile from "../pages/Profile/profile";
import Admin from "../pages/Admin/Admin";
import RoleRoute from "../components/RoleRoute";

// ჩანაწერები
import Recordings from "../pages/recordings/recordings";

// დავალებები
import AssignmentCenter from "../components/AssignmentCenter";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // მთავარი გვერდი
      {
        index: true,
        element: <Home />,
      },

      // LIVE COURSES
      {
        path: "livecourses/video-editing",
        element: <VideoEditing />,
      },
      {
        path: "livecourses/videography",
        element: <Videography />,
      },

      // AUTHENTICATION
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
      {
        path: "reset-password",
        element: <ResetPassword />,
      },

      // GENERAL PAGES
      {
        path: "gallery",
        element: <Gallery />,
      },
      {
        path: "contact",
        element: <Contact />,
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
        path: "partnership",
        element: <Partnership />,
      },

      // CURRICULUM
      {
        path: "curriculum/video-editing",
        element: <VideoEditingCurriculum />,
      },
      {
        path: "curriculum/videography",
        element: <VideographyCurriculum />,
      },

      // RECORDINGS
      {
        path: "recordings",
        element: <Recordings />,
      },

      // STUDENT PROFILE
      {
        path: "profile",
        element: (
          <RoleRoute allowedRole="student">
            <Profile />
          </RoleRoute>
        ),
      },

      // ADMIN PANEL
      {
        path: "admin",
        element: (
          <RoleRoute allowedRole="admin">
            <Admin />
          </RoleRoute>
        ),
      },

      // ASSIGNMENTS
      {
        path: "assignments",
        element: <AssignmentCenter />,
      },
    ],
  },
]);
