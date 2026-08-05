import { NavLink } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaArrowUp,
  FaArrowRight,
} from "react-icons/fa";

import "./Footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="site-footer">

      {/* =========================
          TOP CTA
      ========================= */}

      <div className="footer-container">

        <div className="footer-cta">

          <div className="footer-cta-content">

            <span className="footer-eyebrow">
              EDIT ACADEMY
            </span>

            <h2>
              შექმენი შენი
              <span> მომავალი.</span>
            </h2>

            <p>
              ისწავლე ვიდეო მონტაჟი პრაქტიკულად
              და შექმენი პროფესიონალური კონტენტი.
            </p>

          </div>

          <NavLink
            to="/register"
            className="footer-cta-button"
          >
            დაიწყე სწავლა
            <FaArrowRight />
          </NavLink>

        </div>


        {/* =========================
            MAIN FOOTER
        ========================= */}

        <div className="footer-main">

          {/* BRAND */}

          <div className="footer-brand">

            <NavLink
              to="/"
              className="footer-logo"
            >
              Edit<span>Ologia</span>
            </NavLink>

            <p>
              თანამედროვე ონლაინ აკადემია
              მათთვის, ვისაც სურს ვიდეო მონტაჟის
              პროფესიონალურად სწავლა.
            </p>

            <div className="footer-socials">

              <a
                href="#"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>

            </div>

          </div>


          {/* NAVIGATION */}

          <div className="footer-column">

            <h3>
              ნავიგაცია
            </h3>

            <NavLink to="/">
              მთავარი
            </NavLink>

            <NavLink to="/livecourses">
              Live Courses
            </NavLink>

            <NavLink to="/recordings">
              ჩანაწერები
            </NavLink>

            <NavLink to="/curriculum">
              სილაბუსი
            </NavLink>

          </div>


          {/* COMPANY */}

          <div className="footer-column">

            <h3>
              ედიტოლოგია
            </h3>

            <NavLink to="/about">
              ჩვენს შესახებ
            </NavLink>

            <NavLink to="/portfolio">
              პორტფოლიო
            </NavLink>

            <NavLink to="/gallery">
              გალერეა
            </NavLink>

            <NavLink to="/contact">
              კონტაქტი
            </NavLink>

          </div>


          {/* CONTACT */}

          <div className="footer-column footer-contact">

            <h3>
              დაგვიკავშირდი
            </h3>

            <a href="mailto:info@editacademy.ge">
              info@editologia.ge
            </a>

            <a href="tel:+995000000000">
              +995 000 00 00 00
            </a>

            <span>
              ონლაინ სწავლება
            </span>

          </div>

        </div>


        {/* =========================
            BOTTOM
        ========================= */}

        <div className="footer-bottom">

          <p>
            © {new Date().getFullYear()} EditOlogia.
            ყველა უფლება დაცულია.
          </p>

          <div className="footer-bottom-links">

            <a href="#">
              კონფიდენციალურობა
            </a>

            <a href="#">
              წესები და პირობები
            </a>

          </div>

          <button
            type="button"
            className="footer-top-button"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <FaArrowUp />
          </button>

        </div>

      </div>

    </footer>
  );
};

export default Footer;