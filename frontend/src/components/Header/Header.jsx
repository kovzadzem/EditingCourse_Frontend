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

  /* =========================================================
     AUTH
  ========================================================= */

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

  /* =========================================================
     THEME
  ========================================================= */

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";

    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem("theme", theme);
  }, [darkMode]);

  /* =========================================================
     SYSTEM THEME
  ========================================================= */

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

    mediaQuery.addEventListener(
      "change",
      handleSystemTheme
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleSystemTheme
      );
    };
  }, []);

  /* =========================================================
     SCROLL
  ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* =========================================================
     RESIZE
  ========================================================= */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMenuOpen(false);
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  /* =========================================================
     ESCAPE
  ========================================================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "active" : "";

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}

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

          {/* =================================================
              DESKTOP NAV
          ================================================= */}

          <nav className="desktop-nav">

            {/* LIVE COURSES */}

            <div className="nav-dropdown">

              <span className="nav-dropdown-trigger">
                Live Courses
              </span>

              <div className="nav-dropdown-menu">

                {/* VIDEO EDITING */}

                <NavLink
                  to="/livecourses/video-editing"
                  onClick={closeMenu}
                >
                  <div className="dropdown-item-icon">
                    🎬
                  </div>

                  <div className="dropdown-item-content">
                    <strong>
                      ვიდეო ედითინგი
                    </strong>

                    <span>
                      ვიდეო მონტაჟის კურსი
                    </span>
                  </div>
                </NavLink>

                {/* VIDEOGRAPHY */}

                <NavLink
                  to="/livecourses/videography"
                  onClick={closeMenu}
                >
                  <div className="dropdown-item-icon">
                    🎥
                  </div>

                  <div className="dropdown-item-content">
                    <strong>
                      ვიდეოგრაფია
                    </strong>

                    <span>
                      ვიდეოგრაფიის კურსი
                    </span>
                  </div>
                </NavLink>

              </div>
            </div>

            {/* RECORDINGS */}

            <NavLink
              to="/recordings"
              className={navLinkClass}
              onClick={closeMenu}
            >
              ჩანაწერები
            </NavLink>

            {/* =================================================
                SYLLABUS
            ================================================= */}

            <div className="nav-dropdown">

              <span className="nav-dropdown-trigger">
                სილაბუსი
              </span>

              <div className="nav-dropdown-menu">

                <NavLink
                  to="/curriculum/video-editing"
                  onClick={closeMenu}
                >
                  <div className="dropdown-item-icon">
                    🎬
                  </div>

                  <div className="dropdown-item-content">
                    <strong>
                      ვიდეო ედითინგი
                    </strong>

                    <span>
                      სასწავლო პროგრამა
                    </span>
                  </div>
                </NavLink>

                <NavLink
                  to="/curriculum/videography"
                  onClick={closeMenu}
                >
                  <div className="dropdown-item-icon">
                    🎥
                  </div>

                  <div className="dropdown-item-content">
                    <strong>
                      ვიდეოგრაფია
                    </strong>

                    <span>
                      სასწავლო პროგრამა
                    </span>
                  </div>
                </NavLink>

              </div>
            </div>

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

          {/* =================================================
              RIGHT
          ================================================= */}

          <div className="home-header-right">

            {/* THEME */}

            <button
              type="button"
              className="home-theme-btn"
              onClick={() =>
                setDarkMode(
                  (prev) => !prev
                )
              }
              aria-label="Toggle theme"
            >
              <span>
                {darkMode ? "☀" : "☾"}
              </span>
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
              className={`burger ${
                menuOpen ? "active" : ""
              }`}
              onClick={() =>
                setMenuOpen(
                  (prev) => !prev
                )
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

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <div
        className={`mobile-menu ${
          menuOpen ? "show" : ""
        }`}
      >

        {/* LIVE COURSES */}

        <div className="mobile-dropdown">

          <div className="mobile-dropdown-title">
            Live Courses
          </div>

          {/* VIDEO EDITING */}

          <NavLink
            to="/livecourses/video-editing"
            onClick={closeMenu}
          >
            🎬
            <span>ვიდეო ედითინგი</span>
          </NavLink>

          {/* VIDEOGRAPHY */}

          <NavLink
            to="/livecourses/videography"
            onClick={closeMenu}
          >
            🎥
            <span>ვიდეოგრაფია</span>
          </NavLink>

        </div>

        {/* RECORDINGS */}

        <NavLink
          to="/recordings"
          className={navLinkClass}
          onClick={closeMenu}
        >
          ჩანაწერები
        </NavLink>

        {/* SYLLABUS */}

        <div className="mobile-dropdown">

          <div className="mobile-dropdown-title">
            სილაბუსი
          </div>

          <NavLink
            to="/curriculum/video-editing"
            onClick={closeMenu}
          >
            🎬
            <span>ვიდეო ედითინგი</span>
          </NavLink>

          <NavLink
            to="/curriculum/videography"
            onClick={closeMenu}
          >
            🎥
            <span>ვიდეოგრაფია</span>
          </NavLink>

        </div>

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

        <div className="mobile-menu-divider" />

        {/* AUTH */}

        {isLoggedIn ? (
          <NavLink
            to="/profile"
            onClick={closeMenu}
          >
            პროფილი
          </NavLink>
        ) : (
          <NavLink
            to="/register"
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