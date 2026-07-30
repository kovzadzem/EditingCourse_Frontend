import "./Footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* LEFT */}

        <div className="footer-column">

          <h2 className="footer-logo">
            Edit<span>Academy</span>
          </h2>

          <p className="footer-text">
            ისწავლე Adobe Premiere Pro,
            Motion, Sound Design,
            Color Grading და Storytelling
            თანამედროვე სასწავლო გარემოში.
          </p>

        </div>

        {/* Navigation */}

        <div className="footer-column">

          <h3>ნავიგაცია</h3>

          <NavLink to="/">
            მთავარი
          </NavLink>

          <NavLink to="/live-courses">
            Live Courses
          </NavLink>

          <NavLink to="/recorded">
            ჩანაწერები
          </NavLink>

          <NavLink to="/syllabus">
            სილაბუსი
          </NavLink>

          <NavLink to="/portfolio">
            პორტფოლიო
          </NavLink>

        </div>

        {/* Courses */}

        <div className="footer-column">

          <h3>კურსები</h3>

          <p>Adobe Premiere Pro</p>

          <p>Motion Graphics</p>

          <p>Sound Design</p>

          <p>Color Grading</p>

          <p>Storytelling</p>

        </div>
                {/* Contact */}

        <div className="footer-column">

          <h3>კონტაქტი</h3>

          <a href="mailto:info@editacademy.ge">
            info@editacademy.ge
          </a>

          <a href="tel:+995555123456">
            +995 555 12 34 56
          </a>

          <p>
            თბილისი, საქართველო
          </p>

        </div>

      </div>

      {/* Bottom */}

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} EditAcademy.
          ყველა უფლება დაცულია.
        </p>

        <div className="footer-bottom-links">

          <NavLink to="/privacy">
            Privacy Policy
          </NavLink>

          <NavLink to="/terms">
            Terms of Service
          </NavLink>

        </div>

      </div>

    </footer>
  );
};

export default Footer;