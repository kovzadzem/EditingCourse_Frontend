import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // დროებით false
  const isLoggedIn = false;

  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);

  }, []);

  const toggleTheme = () => {
    document.body.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  return (

    <>
      <header
        className={`home-header ${scrolled ? "scrolled" : ""}`}
      >

        <div className="home-header-wrapper">

          <NavLink
            to="/"
            className="logo"
          >
            Edit<span>Academy</span>
          </NavLink>

          <nav className="desktop-nav">

            <NavLink to="/live-courses">
              Live Courses
            </NavLink>

            <NavLink to="/recorded">
              ჩანაწერები
            </NavLink>

            <NavLink to="/syllabus">
              სილაბუსი
            </NavLink>

            <NavLink to="/about">
              ჩვენს შესახებ
            </NavLink>

            <NavLink to="/portfolio">
              პორტფოლიო
            </NavLink>

          </nav>

          <div className="home-header-right">

            <button
              className="home-theme-btn"
              onClick={toggleTheme}
            >
              {darkMode ? "☀" : "☾"}
            </button>

            {
              isLoggedIn ? (

                <NavLink
                  className="home-profile-btn"
                  to="/profile"
                >
                  პროფილი
                </NavLink>

              ) : (

                <NavLink
                  className="home-register-btn"
                  to="/register"
                >
                  რეგისტრაცია
                </NavLink>

              )
            }
                        {/* Burger */}

            <div
              className={`burger ${menuOpen ? "active" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >

              <span></span>
              <span></span>
              <span></span>

            </div>

          </div>

        </div>

      </header>

      {/* Mobile Menu */}

      <div
        className={`mobile-menu ${menuOpen ? "show" : ""}`}
      >

        <NavLink
          to="/live-courses"
          onClick={() => setMenuOpen(false)}
        >
          Live Courses
        </NavLink>

        <NavLink
          to="/recorded"
          onClick={() => setMenuOpen(false)}
        >
          ჩანაწერები
        </NavLink>

        <NavLink
          to="/syllabus"
          onClick={() => setMenuOpen(false)}
        >
          სილაბუსი
        </NavLink>

        <NavLink
          to="/about"
          onClick={() => setMenuOpen(false)}
        >
          ჩვენს შესახებ
        </NavLink>

        <NavLink
          to="/portfolio"
          onClick={() => setMenuOpen(false)}
        >
          პორტფოლიო
        </NavLink>

        {
          isLoggedIn ? (

            <NavLink
              to="/profile"
              onClick={() => setMenuOpen(false)}
            >
              პროფილი
            </NavLink>

          ) : (

            <NavLink
              to="/register"
              onClick={() => setMenuOpen(false)}
            >
              რეგისტრაცია
            </NavLink>

          )
        }

      </div>

    </>

  );

};

export default Header;