import { Link } from "react-router-dom";
import "./partnership.css";

const benefits = [
  {
    title: "კორპორატიული პირობები",
    text: "სპეციალური ფასები გუნდის ზომის მიხედვით.",
  },
  {
    title: "მორგებული პროგრამა",
    text: "სწავლა თქვენი კომპანიის რეალურ საჭიროებებზე.",
  },
  {
    title: "მოქნილი ფორმატი",
    text: "ონლაინ, ოფლაინ და თქვენზე მორგებული გრაფიკი.",
  },
  {
    title: "მომზადებული კანდიდატები",
    text: "წვდომა Edit Academy-ის კურსდამთავრებულებზე.",
  },
];

const Partnership = () => {
  return (
    <main className="partnership-page">

      {/* =================================================
          SECTION 01 — HERO
      ================================================= */}

      <section className="partnership-hero">

        <div className="partnership-hero-content">

          <span className="partnership-label">
            პარტნიორობა
          </span>

          <h1>
            გახდი ჩვენი
            <br />
            <span>პარტნიორი კომპანია</span>
          </h1>

          <p>
            თანამშრომლების განვითარება, სპეციალური
            კორპორატიული პირობები და თქვენს კომპანიაზე
            მორგებული სწავლება.
          </p>

          <Link
            to="/contact"
            className="partnership-button"
          >
            შემოგვიერთდი
          </Link>

        </div>


        {/* PHOTO */}

        <div className="partnership-visual">

          <img
            src="/images/partnership.jpg"
            alt="Edit Academy"
          />

          <div className="partnership-visual-overlay">

            <span>
              EDIT ACADEMY
            </span>

            <strong>
              PARTNERSHIP
            </strong>

          </div>

        </div>

      </section>


      {/* =================================================
          SECTION 02 — BENEFITS
      ================================================= */}

      <section
        className="partnership-benefits"
        id="benefits"
      >

        <div className="benefits-heading">

          <span className="partnership-label">
            პარტნიორობა
          </span>

          <h2>
            პარტნიორობა,
            <br />
            <span>
              რომელიც შედეგს ქმნის
            </span>
          </h2>

        </div>


        {/* BENEFITS */}

        <div className="benefits-list">

          {benefits.map((benefit, index) => (

            <div
              className="benefit-row"
              key={benefit.title}
            >

              <span className="benefit-index">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3>
                {benefit.title}
              </h3>

              <p>
                {benefit.text}
              </p>

            </div>

          ))}

        </div>


        {/* FINAL CTA */}

        <div className="partnership-cta">

          <div>

            <h3>
              შევქმნათ საუკეთესო ერთად
            </h3>

          </div>

          <Link
            to="/contact"
            className="partnership-button"
          >
            დაგვიკავშირდი
          </Link>

        </div>

      </section>

    </main>
  );
};

export default Partnership;