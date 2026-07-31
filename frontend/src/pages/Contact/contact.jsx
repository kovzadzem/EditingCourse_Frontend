import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebookF,
  FaPaperPlane,
  FaCheck,
} from "react-icons/fa";

import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSent(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    setTimeout(() => {
      setSent(false);
    }, 4000);
  };

  return (
    <section className="contact-page">

      {/* =========================
          HERO
      ========================= */}

      <div className="contact-hero">

        <div>

          <span className="contact-eyebrow">
            EDIT ACADEMY / CONTACT
          </span>

          <h1>
            მოდი
            <span> ვისაუბროთ.</span>
          </h1>

          <p>
            გაქვს კითხვა კურსთან დაკავშირებით,
            გინდა დამატებითი ინფორმაცია ან უბრალოდ
            გსურს ჩვენთან დაკავშირება?
          </p>

        </div>

      </div>


      {/* =========================
          CONTENT
      ========================= */}

      <div className="contact-layout">

        {/* LEFT */}

        <div className="contact-info">

          <span className="contact-section-label">
            GET IN TOUCH
          </span>

          <h2>
            როგორ დაგვიკავშირდე?
          </h2>

          <p>
            მოგვწერე ან დაგვიკავშირდი შენთვის
            სასურველი გზით. ჩვენი გუნდი დაგეხმარება
            კურსთან დაკავშირებულ ნებისმიერ კითხვაში.
          </p>


          {/* EMAIL */}

          <a
            href="mailto:info@editacademy.ge"
            className="contact-info-card"
          >

            <div className="contact-info-icon">
              <FaEnvelope />
            </div>

            <div>
              <span>EMAIL</span>
              <strong>
                info@editacademy.ge
              </strong>
            </div>

          </a>


          {/* PHONE */}

          <a
            href="tel:+995000000000"
            className="contact-info-card"
          >

            <div className="contact-info-icon">
              <FaPhone />
            </div>

            <div>
              <span>PHONE</span>
              <strong>
                +995 000 00 00 00
              </strong>
            </div>

          </a>


          {/* LOCATION */}

          <div className="contact-info-card">

            <div className="contact-info-icon">
              <FaMapMarkerAlt />
            </div>

            <div>
              <span>LOCATION</span>
              <strong>
                Online Academy
              </strong>
            </div>

          </div>


          {/* SOCIAL */}

          <div className="contact-socials">

            <span>
              FOLLOW US
            </span>

            <div>

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

            </div>

          </div>

        </div>


        {/* RIGHT / FORM */}

        <div className="contact-form-card">

          <div className="contact-form-header">

            <span>
              SEND MESSAGE
            </span>

            <h2>
              მოგვწერე
            </h2>

          </div>


          {sent ? (

            <div className="contact-success">

              <div>
                <FaCheck />
              </div>

              <h3>
                შეტყობინება გაიგზავნა!
              </h3>

              <p>
                მადლობა დაკავშირებისთვის.
                მალე დაგიკავშირდებით.
              </p>

            </div>

          ) : (

            <form onSubmit={handleSubmit}>

              <div className="contact-form-row">

                <label>

                  <span>
                    სახელი
                  </span>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="შეიყვანე სახელი"
                    required
                  />

                </label>


                <label>

                  <span>
                    Email
                  </span>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    required
                  />

                </label>

              </div>


              <label>

                <span>
                  ტელეფონი
                </span>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+995..."
                />

              </label>


              <label>

                <span>
                  შეტყობინება
                </span>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="მოგვწერე შენი შეკითხვა..."
                  rows="6"
                  required
                />

              </label>


              <button
                type="submit"
                className="contact-submit"
              >
                გაგზავნა
                <FaPaperPlane />
              </button>

            </form>

          )}

        </div>

      </div>


      {/* =========================
          BOTTOM INFO
      ========================= */}

      <div className="contact-bottom">

        <div>
          <strong>
            გაქვს კითხვა?
          </strong>

          <span>
            ხშირად დასმული კითხვები შეგიძლია
            ნახო ჩვენს შესახებ გვერდზე.
          </span>
        </div>

        <span className="contact-online">
          ONLINE
        </span>

      </div>

    </section>
  );
};

export default Contact;