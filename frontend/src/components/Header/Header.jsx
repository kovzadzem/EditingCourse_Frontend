import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { supabase } from "../../supabase";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [scrolled, setScrolled] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  const checkSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setIsLoggedIn(!!session);
  };

  checkSession();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      setIsLoggedIn(!!session);
    }
  );

  return () => {
    subscription.unsubscribe();
  };
}, []);

useEffect(() => {
  const theme = darkMode ? "dark" : "light";

  document.documentElement.setAttribute(
    "data-theme",
    theme
  );

  localStorage.setItem("theme", theme);
}, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 850) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "active" : "";

  return (
    <>
      <header
        className={`home-header ${
          scrolled ? "scrolled" : ""
        }`}
      >
        <div className="home-header-wrapper">

          {/* LOGO */}

          <NavLink
            to="/"
            className="logo"
            onClick={closeMenu}
          >
            Edit<span>Ologia</span>
          </NavLink>

          {/* DESKTOP NAVIGATION */}

          <nav className="desktop-nav">

            <NavLink
              to="/livecourses"
              className={navLinkClass}
              onClick={closeMenu}
            >
              Live Courses
            </NavLink>

            <NavLink
              to="/recordings"
              className={navLinkClass}
              onClick={closeMenu}
            >
              ჩანაწერები
            </NavLink>

            <NavLink
              to="/curriculum"
              className={navLinkClass}
              onClick={closeMenu}
            >
              სასწავლო გეგმა
            </NavLink>

            <NavLink
              to="/about"
              className={navLinkClass}
              onClick={closeMenu}
            >
              ჩვენს შესახებ
            </NavLink>

            <NavLink
              to="/Portfolio"
              className={navLinkClass}
              onClick={closeMenu}
            >
              პორტფოლიო
            </NavLink>

          </nav>

          {/* RIGHT */}

          <div className="home-header-right">

            <button
              type="button"
              className="home-theme-btn"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label="Toggle theme"
            >
              {darkMode ? "☀" : "☾"}
            </button>

            {isLoggedIn ? (
              <NavLink
                to="/profile"
                className="home-profile-btn"
                onClick={closeMenu}
              >
                პროფილი
              </NavLink>
            ) : (
              <NavLink
                to="/register"
                className="home-register-btn"
                onClick={closeMenu}
              >
                რეგისტრაცია
              </NavLink>
            )}

            <button
              type="button"
              className={`burger ${
                menuOpen ? "active" : ""
              }`}
              onClick={() =>
                setMenuOpen((prev) => !prev)
              }
              aria-label={
                menuOpen
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>

          </div>
        </div>
      </header>

      {/* MOBILE MENU */}

      <div
        className={`mobile-menu ${
          menuOpen ? "show" : ""
        }`}
      >

        <NavLink
          to="/livecourses"
          className={navLinkClass}
          onClick={closeMenu}
        >
          <span></span>
          Live Courses
        </NavLink>

        <NavLink
          to="/recordings"
          className={navLinkClass}
          onClick={closeMenu}
        >
          <span></span>
          ჩანაწერები
        </NavLink>

        <NavLink
          to="/curriculum"
          className={navLinkClass}
          onClick={closeMenu}
        >
          <span></span>
          სასწავლო გეგმა
        </NavLink>

        <NavLink
          to="/about"
          className={navLinkClass}
          onClick={closeMenu}
        >
          <span></span>
          ჩვენს შესახებ
        </NavLink>

        <NavLink
          to="/Portfolio"
          className={navLinkClass}
          onClick={closeMenu}
        >
          <span></span>
          პორტფოლიო
        </NavLink>

        <div className="mobile-menu-divider" />

        {isLoggedIn ? (
          <NavLink
            to="/profile"
            className={navLinkClass}
            onClick={closeMenu}
          >
            პროფილი
          </NavLink>
        ) : (
          <NavLink
            to="/register"
            className="mobile-register-link"
            onClick={closeMenu}
          >
            რეგისტრაცია
          </NavLink>
        )}

      </div>

      {/* OVERLAY */}

      <div
        className={`mobile-overlay ${
          menuOpen ? "show" : ""
        }`}
        onClick={closeMenu}
      />
    </>
  );
};

export default Header;