
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { supabase } from "../../supabase";
import "./Header.css";

/* =========================================================
   SVG ICONS
========================================================= */

function SunIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20.2 15.4A8.5 8.5 0 0 1 8.6 3.8 8.5 8.5 0 1 0 20.2 15.4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   HEADER
========================================================= */

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* AUTH */

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (mounted) {
        setIsLoggedIn(!!session);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  /* THEME */

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  /* SYSTEM THEME */

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleSystemTheme = (event) => {
      const savedTheme = localStorage.getItem("theme");

      if (!savedTheme) {
        setDarkMode(event.matches);
      }
    };

    mediaQuery.addEventListener("change", handleSystemTheme);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemTheme);
    };
  }, []);

  /* SCROLL */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* RESIZE */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* ESCAPE */

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

  /* HELPERS */

  const closeMenu = () => setMenuOpen(false);

  const navLinkClass = ({ isActive }) =>
    isActive ? "active" : "";

  return (
    <>
      <header
        className={`home-header ${scrolled ? "scrolled" : ""}`}
      >
        <div className="home-header-wrapper">
          {/* LOGO — LEFT */}

          <NavLink
            to="/"
            className="logo"
            onClick={closeMenu}
          >
            Edit<span>Ologia</span>
          </NavLink>

          {/* DESKTOP NAV */}

          <nav className="desktop-nav">
            <NavLink
              to="/livecourses/video-editing"
              className={({ isActive }) =>
                `nav-dropdown-trigger ${isActive ? "active" : ""}`
              }
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
              to="/curriculum/video-editing"
              className={({ isActive }) =>
                `nav-dropdown-trigger ${isActive ? "active" : ""}`
              }
              onClick={closeMenu}
            >
              სილაბუსი
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

          {/* RIGHT SIDE — THEME + AUTH + BURGER */}

          <div className="home-header-right">
            <button
              type="button"
              className="home-theme-btn"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label={
                darkMode
                  ? "Switch to light theme"
                  : "Switch to dark theme"
              }
              title={
                darkMode
                  ? "Light mode"
                  : "Dark mode"
              }
            >
              <span className="theme-icon">
                {darkMode ? (
                  <SunIcon size={20} />
                ) : (
                  <MoonIcon size={20} />
                )}
              </span>
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
              className={`burger ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}

      <nav
        id="mobile-navigation"
        className={`mobile-menu ${menuOpen ? "show" : ""}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <NavLink
          to="/livecourses/video-editing"
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
          to="/curriculum/video-editing"
          className={navLinkClass}
          onClick={closeMenu}
        >
          სილაბუსი
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

        <div className="mobile-menu-divider" />

        {isLoggedIn ? (
          <NavLink to="/profile" onClick={closeMenu}>
            პროფილი
          </NavLink>
        ) : (
          <NavLink to="/register" onClick={closeMenu}>
            რეგისტრაცია
          </NavLink>
        )}
      </nav>

      {/* OVERLAY */}

      <div
        className={`mobile-overlay ${menuOpen ? "show" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </>
  );
};

export default Header;
