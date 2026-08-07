import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  const location = useLocation();

  const hideLayout = [
    "/login",
    "/register",
    "/forgot-password",
    "/dashboard",
    "/calendar",
    "/courses",
    "/offlinecourse",
    "/payments",
    "/students",
    "/syllabus",
  ];

  return (
    <>
      {!hideLayout.includes(location.pathname) && <Header />}

      <main>
        <Outlet />
      </main>

      {!hideLayout.includes(location.pathname) && <Footer />}
    </>
  );
};

export default MainLayout;