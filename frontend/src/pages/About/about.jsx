import { useState } from "react";
import { FaArrowRight, FaPlus, FaCheck } from "react-icons/fa";

import "./about.css";

const faqData = [
  {
    question: "ლეპტოპი ან კომპიუტერი დამჭირდება კურსზე?",
    answer:
      "დიახ. კურსის სრულფასოვნად გასავლელად დაგჭირდება ლეპტოპი ან კომპიუტერი, რომელზეც შეძლებ Adobe Premiere Pro-ის გამოყენებას და პრაქტიკული დავალებების შესრულებას.",
  },
  {
    question: "კურსი ონლაინ არის?",
    answer:
      "დიახ, კურსი სრულად ონლაინ მიმდინარეობს. გაკვეთილებს გაივლი დისტანციურად და შეძლებ მასალებზე წვდომას სახლიდან.",
  },
  {
    question: "რა ღირს კურსი?",
    answer:
      "კურსის მიმდინარე ღირებულებისა და გადახდის პირობების შესახებ ინფორმაცია შეგიძლია გაიგო რეგისტრაციის ან კურსის გვერდიდან.",
  },
  {
    question: "გამოცდილება საჭიროა?",
    answer:
      "არა. კურსი შექმნილია როგორც დამწყებთათვის, ასევე მათთვის, ვისაც უკვე აქვს ვიდეო მონტაჟის გარკვეული გამოცდილება.",
  },
  {
    question: "სამსახურს დამაწყებინებთ?",
    answer:
      "კურსი გაძლევს პრაქტიკულ ცოდნასა და უნარებს, რომლებიც დაგეხმარება პროფესიულ განვითარებაში და პირველი სამუშაო შესაძლებლობების მოძიებაში.",
  },
  {
    question: "სერთიფიკატს გასცემთ?",
    answer:
      "დიახ, სერთიფიკატს მიიღებთ კურსის დასრულების შემდგომ.",
  },
];

const About = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq((current) =>
      current === index ? null : index
    );
  };

  return (
    <main className="about-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="about-hero">

        <div className="about-hero-content">

          <span className="about-eyebrow">
            EDIT ACADEMY
          </span>

          <h1>
            შექმენი შენი
            <br />
            <span>შემოქმედებითი</span>
            <br />
            მომავალი.
          </h1>

          <p>
            Edit Academy არის თანამედროვე ონლაინ
            საგანმანათლებლო სივრცე მათთვის, ვისაც
            სურს ვიდეო მონტაჟის პროფესიონალურად
            სწავლა და საკუთარი შესაძლებლობების
            განვითარება.
          </p>

          <div className="about-hero-actions">

            <a
              href="/livecourses"
              className="about-primary-btn"
            >
              კურსების ნახვა
              <FaArrowRight />
            </a>

            <a
              href="#faq"
              className="about-secondary-btn"
            >
              ხშირად დასმული კითხვები
            </a>

          </div>

        </div>


        {/* VISUAL */}

        <div className="about-hero-visual">

          <div className="visual-card visual-card-main">

            <span className="visual-number">
              01
            </span>

            <div className="visual-play">
              ▶
            </div>

            <div className="visual-bottom">

              <strong>
                VIDEO
                <br />
                EDITING
              </strong>

              <span>
                EDIT ACADEMY
              </span>

            </div>

          </div>


          <div className="visual-card visual-card-small">

            <span>
              CREATIVE
            </span>

            <strong>
              +100
            </strong>

            <small>
              პრაქტიკული თემა
            </small>

          </div>

        </div>

      </section>


      {/* =========================================
          INTRO / ABOUT
      ========================================= */}

      <section className="about-intro">

        <div className="about-section-label">
          <span>01</span>
          ჩვენს შესახებ
        </div>

        <div className="about-intro-content">

          <h2>
            ცოდნა, რომელიც
            <br />
            <span>პრაქტიკაში მუშაობს.</span>
          </h2>

          <div className="about-intro-text">

            <p>
              ჩვენ გვჯერა, რომ ვიდეო მონტაჟის სწავლა
              მხოლოდ თეორიის დამახსოვრებას არ ნიშნავს.
              მთავარი არის პრაქტიკა, სწორი მიდგომა და
              რეალურ პროექტებზე მუშაობა.
            </p>

            <p>
              სწორედ ამიტომ შევქმენით Edit Academy —
              სივრცე, სადაც შეგიძლია ეტაპობრივად
              შეისწავლო ვიდეო მონტაჟი და მიიღო ის
              ცოდნა, რომელიც რეალურ სამუშაო გარემოში
              გამოგადგება.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================
          VALUES
      ========================================= */}

      <section className="about-values">

        <div className="value-card">

          <span>01</span>

          <div className="value-icon">
            <FaCheck />
          </div>

          <h3>
            პრაქტიკული სწავლება
          </h3>

          <p>
            სწავლობ არა მხოლოდ თეორიას,
            არამედ რეალურ სამუშაო პროცესს.
          </p>

        </div>


        <div className="value-card">

          <span>02</span>

          <div className="value-icon">
            <FaCheck />
          </div>

          <h3>
            თანამედროვე პროგრამა
          </h3>

          <p>
            კურსის პროგრამა შექმნილია თანამედროვე
            ვიდეო ინდუსტრიის მოთხოვნების შესაბამისად.
          </p>

        </div>


        <div className="value-card">

          <span>03</span>

          <div className="value-icon">
            <FaCheck />
          </div>

          <h3>
            განვითარებაზე ორიენტირებული
          </h3>

          <p>
            მიიღებ ცოდნას, რომელიც დაგეხმარება
            საკუთარი პორტფოლიოსა და კარიერის შექმნაში.
          </p>

        </div>

      </section>


      {/* =========================================
          FAQ
      ========================================= */}

      <section
        className="about-faq"
        id="faq"
      >

        <div className="about-faq-heading">

          <div className="about-section-label">
            <span>02</span>
            ხშირად დასმული კითხვები
          </div>

          <h2>
            გაქვს კითხვა?
            <br />
            <span>აქ არის პასუხი.</span>
          </h2>

          <p>
            თუ კურსთან დაკავშირებით კითხვა გაქვს,
            დიდი ალბათობით პასუხს აქ იპოვი.
          </p>

        </div>


        <div className="faq-list">

          {faqData.map((faq, index) => {

            const isOpen = openFaq === index;

            return (
              <article
                className={`faq-item ${
                  isOpen ? "faq-open" : ""
                }`}
                key={faq.question}
              >

                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >

                  <div>

                    <span className="faq-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="faq-title">
                      {faq.question}
                    </span>

                  </div>

                  <span className="faq-toggle">
                    <FaPlus />
                  </span>

                </button>


                <div
                  className={`faq-answer ${
                    isOpen ? "show" : ""
                  }`}
                >
                  <p>
                    {faq.answer}
                  </p>
                </div>

              </article>
            );
          })}

        </div>

      </section>


      {/* =========================================
          FINAL CTA
      ========================================= */}

      <section className="about-cta">

        <div>

          <span>
            READY TO START?
          </span>

          <h2>
            შენი პირველი ნაბიჯი
            <br />
            იწყება აქ.
          </h2>

        </div>

        <a
          href="/register"
          className="about-cta-btn"
        >
          დაიწყე სწავლა
          <FaArrowRight />
        </a>

      </section>

    </main>
  );
};

export default About;