
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { supabase } from "../../supabase";

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

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "active" : "";

  return (
    <>
      {/* HEADER */}

      <header
        className={`home-header ${scrolled ? "scrolled" : ""}`}
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

          {/* DESKTOP NAV */}

          <nav className="desktop-nav">

            {/* LIVE COURSES */}

            <NavLink
              to="/livecourses/video-editing"
              className={({ isActive }) =>
                `nav-dropdown-trigger ${
                  isActive ? "active" : ""
                }`
              }
              onClick={closeMenu}
            >
              Live Courses
            </NavLink>

            {/* RECORDINGS */}

            <NavLink
              to="/recordings"
              className={navLinkClass}
              onClick={closeMenu}
            >
              ჩანაწერები
            </NavLink>

            {/* SYLLABUS */}

            <NavLink
              to="/curriculum/video-editing"
              className={({ isActive }) =>
                `nav-dropdown-trigger ${
                  isActive ? "active" : ""
                }`
              }
              onClick={closeMenu}
            >
              სილაბუსი
            </NavLink>

            {/* ABOUT */}

            <NavLink
              to="/about"
              className={navLinkClass}
              onClick={closeMenu}
            >
              ჩვენს შესახებ
            </NavLink>

            {/* PORTFOLIO */}

            <NavLink
              to="/Portfolio"
              className={navLinkClass}
              onClick={closeMenu}
            >
              პორტფოლიო
            </NavLink>

          </nav>

          {/* RIGHT SIDE */}

          <div className="home-header-right">

            {/* THEME */}

            <button
              type="button"
              className="home-theme-btn"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label={
                darkMode
                  ? "Switch to light theme"
                  : "Switch to dark theme"
              }
            >
              <span>{darkMode ? "☀" : "☾"}</span>
            </button>

            {/* AUTH */}

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

            {/* BURGER */}

            <button
              type="button"
              className={`burger ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={
                menuOpen ? "Close menu" : "Open menu"
              }
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
      >

        {/* LIVE COURSES */}

        <NavLink
          to="/livecourses/video-editing"
          className={navLinkClass}
          onClick={closeMenu}
          tabIndex={menuOpen ? 0 : -1}
        >
          Live Courses
        </NavLink>

        {/* RECORDINGS */}

        <NavLink
          to="/recordings"
          className={navLinkClass}
          onClick={closeMenu}
          tabIndex={menuOpen ? 0 : -1}
        >
          ჩანაწერები
        </NavLink>

        {/* SYLLABUS */}

        <NavLink
          to="/curriculum/video-editing"
          className={navLinkClass}
          onClick={closeMenu}
          tabIndex={menuOpen ? 0 : -1}
        >
          სილაბუსი
        </NavLink>

        {/* ABOUT */}

        <NavLink
          to="/about"
          className={navLinkClass}
          onClick={closeMenu}
          tabIndex={menuOpen ? 0 : -1}
        >
          ჩვენს შესახებ
        </NavLink>

        {/* PORTFOLIO */}

        <NavLink
          to="/Portfolio"
          className={navLinkClass}
          onClick={closeMenu}
          tabIndex={menuOpen ? 0 : -1}
        >
          პორტფოლიო
        </NavLink>

        <div className="mobile-menu-divider" />

        {/* AUTH */}

        {isLoggedIn ? (
          <NavLink
            to="/profile"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            პროფილი
          </NavLink>
        ) : (
          <NavLink
            to="/register"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
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
