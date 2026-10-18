import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebookF,
  FaExternalLinkAlt,
} from "react-icons/fa";

import "./contact.css";

const Contact = () => {
  return (
    <section className="contact-page">
      <div className="contact-hero">
        <div className="contact-hero-content">
          <span className="contact-eyebrow">
            EDIT ACADEMY / CONTACT
          </span>

          <h1>
            მოდი
            <span> ვისაუბროთ</span>
          </h1>

          <p>
            გაქვს კითხვა ჩვენს კურსებზე?
            დაგვიკავშირდი შენთვის სასურველი გზით.
            სიამოვნებით გიპასუხებთ.
          </p>

          <div className="contact-hero-line">
            <span />
            <span>LET'S CONNECT</span>
          </div>
        </div>

        <div className="contact-hero-decoration">
          <div className="contact-orbit contact-orbit-one" />
          <div className="contact-orbit contact-orbit-two" />
          <div className="contact-orbit contact-orbit-three" />
          <div className="contact-orbit-center">E.</div>
        </div>
      </div>

      <div className="contact-content">
        <div className="contact-heading">
          <span className="contact-section-label">
            GET IN TOUCH
          </span>

          <h2>
            ჩვენთან დაკავშირება
            <span> მარტივია.</span>
          </h2>

          <p>
            აირჩიე შენთვის მოსახერხებელი საკონტაქტო არხი.
          </p>
        </div>

        <div className="contact-cards">
          <a
            href="mailto:info@editacademy.ge"
            className="contact-card"
          >
            <div className="contact-card-top">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <FaArrowUpRightFromSquare className="contact-arrow" />
            </div>

            <div className="contact-card-bottom">
              <span>EMAIL</span>
              <h3>ელფოსტა</h3>
              <p>info@editacademy.ge</p>
            </div>
          </a>

          <a
            href="tel:+995000000000"
            className="contact-card"
          >
            <div className="contact-card-top">
              <div className="contact-icon">
                <FaPhone />
              </div>
              <FaArrowUpRightFromSquare className="contact-arrow" />
            </div>

            <div className="contact-card-bottom">
              <span>PHONE</span>
              <h3>ტელეფონი</h3>
              <p>+995 000 00 00 00</p>
            </div>
          </a>

          <div className="contact-card contact-location-card">
            <div className="contact-card-top">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>
              <span className="contact-location-badge">
                ONLINE
              </span>
            </div>

            <div className="contact-card-bottom">
              <span>LOCATION</span>
              <h3>ონლაინ აკადემია</h3>
              <p>ისწავლე ნებისმიერი ადგილიდან.</p>
            </div>
          </div>
        </div>

        <div className="contact-social-panel">
          <div className="contact-social-text">
            <span className="contact-section-label">
              FOLLOW OUR JOURNEY
            </span>

            <h3>შეხვდი ჩვენს სამყაროს.</h3>

            <p>
              გამოგვყევი სოციალურ ქსელებში და
              თვალი ადევნე სიახლეებს.
            </p>
          </div>

          <div className="contact-social-links">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="contact-social-link"
            >
              <FaInstagram />
              <span>Instagram</span>
              <FaArrowUpRightFromSquare className="contact-social-arrow" />
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="contact-social-link"
            >
              <FaFacebookF />
              <span>Facebook</span>
              <FaArrowUpRightFromSquare className="contact-social-arrow" />
            </a>
          </div>
        </div>

        <div className="contact-footer">
          <span className="contact-footer-logo">
            Edit<span>Academy</span>
          </span>

          <span>შექმენი. განავითარე. გამოხატე.</span>
        </div>
      </div>
    </section>
  );
};

export default Contact;
