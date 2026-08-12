import { useState } from "react";
import { FaPlus, FaCheck } from "react-icons/fa";

import "./about.css";

const faqData = [
  {
    question: "ლეპტოპი ან კომპიუტერი დამჭირდება?",
    answer:
      "დიახ. კურსის სრულფასოვნად გასავლელად დაგჭირდება ლეპტოპი ან კომპიუტერი, რომელზეც შეძლებ Adobe Premiere Pro-ის გამოყენებას და პრაქტიკული დავალებების შესრულებას.",
  },
  {
    question: "კურსი ონლაინ არის?",
    answer:
      "დიახ. კურსის ფორმატის მიხედვით შესაძლებელია ონლაინ სწავლა და მასალებზე დისტანციური წვდომა.",
  },
  {
    question: "რა ღირს კურსი?",
    answer:
      "კურსის მიმდინარე ღირებულებისა და გადახდის პირობების შესახებ ინფორმაცია შეგიძლია იხილო კურსის გვერდზე.",
  },
  {
    question: "გამოცდილება საჭიროა?",
    answer:
      "არა. კურსი შექმნილია როგორც დამწყებთათვის, ასევე მათთვის, ვისაც ვიდეო მონტაჟის გარკვეული გამოცდილება უკვე აქვს.",
  },
  {
    question: "სამსახურს დამაწყებინებთ?",
    answer:
      "კურსი გაძლევს პრაქტიკულ ცოდნასა და უნარებს, რომლებიც დაგეხმარება პროფესიულ განვითარებასა და პირველი სამუშაო შესაძლებლობების მოძიებაში.",
  },
  {
    question: "სერთიფიკატს გასცემთ?",
    answer:
      "დიახ. კურსის წარმატებით დასრულების შემდეგ მიიღებ სერთიფიკატს.",
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

      {/* =====================================================
          HERO — ძველი დიზაინი
      ===================================================== */}

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
            მომავალი
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
            </a>

            <a
              href="#faq"
              className="about-secondary-btn"
            >
              ხშირად დასმული კითხვები
            </a>

          </div>

        </div>


        {/* ძველი VISUAL CARD */}

        <div className="about-hero-visual">

          <div className="visual-card visual-card-main">

            <video
              src="/Videos/hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls
            />

            <span className="visual-number">
              01
            </span>

            <div className="visual-play">
              
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
              სტუდენტი
            </small>

          </div>

        </div>

      </section>


      {/* =====================================================
          INTRO — ძველი დიზაინი
      ===================================================== */}

      <section className="about-intro">

        <div className="about-section-label">
          <span>01</span>
          ჩვენს შესახებ
        </div>

        <div className="about-intro-content">

          <h2>
            ცოდნა, რომელიც
            <br />
            <span>პრაქტიკაში მუშაობს</span>
          </h2>

          <div className="about-intro-text">

            <p>
              ჩვენ გვჯერა, რომ ვიდეო მონტაჟის სწავლა
              მხოლოდ თეორიის დამახსოვრებას არ ნიშნავს.
              მთავარი არის პრაქტიკა, სწორი მიდგომა და
              რეალურ პროექტებზე მუშაობა.
            </p>

            <p>
              სწორედ ამიტომ შევქმენით Edit Academy -
              სივრცე, სადაც შეგიძლია ეტაპობრივად
              შეისწავლო ვიდეო მონტაჟი და მიიღო ის
              ცოდნა, რომელიც რეალურ სამუშაო გარემოში
              გამოგადგება.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          VALUES — ძველი სტილი
      ===================================================== */}

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


      {/* =====================================================
          NIKA / CO-FOUNDER
          ძველი visual card-ის სტილი
      ===================================================== */}

      <section className="about-nika">

        <div className="about-section-label">
          <span>02</span>
          ჩვენი გუნდი
        </div>


        <div className="nika-layout">

          {/* PHOTO CARD */}

          <div className="nika-visual">

            <div className="nika-image-card">

              <img
                src="/images/CO.jpg"
                alt="Nika - Co-founder of Edit Academy"
              />

              <div className="nika-image-overlay">

                <span className="nika-number">
                  02
                </span>

                <div className="nika-image-bottom">

                  <strong>
                    CO
                    <br />
                    FOUNDER
                  </strong>

                  <span>
                    EDIT ACADEMY
                  </span>

                </div>

              </div>

            </div>


            <div className="nika-small-card">

              <span>
                EDIT ACADEMY
              </span>

              <strong>
                Lecture
              </strong>

              <small>
                ნიკა ამაშუკელი
              </small>

            </div>

          </div>


          {/* TEXT */}

          <div className="nika-content">

            <span className="nika-eyebrow">
              CO-FOUNDER
            </span>

            <h2>
              რატომ შეიქმნა
              <br />
              <span>Edit Academy?</span>
            </h2>

            <p>
              Edit Academy შეიქმნა იდეით, რომ ვიდეო
              მონტაჟის სწავლა უფრო პრაქტიკული,
              თანამედროვე და რეალურ სამუშაო პროცესთან
              ახლოს ყოფილიყო.
            </p>

            <p>
              ჩვენ გვინდა, რომ სტუდენტმა კურსის
              დასრულებისას მხოლოდ პროგრამის ფუნქციები
              კი არ იცოდეს, არამედ შეძლოს საკუთარი
              იდეის რეალურ პროექტად გადაქცევა.
            </p>


            <div className="nika-info">

              <div>
                <strong>100+</strong>
                <span>სტუდენტი</span>
              </div>

              <div>
                <strong>PRO</strong>
                <span>ორიენტირებული სწავლება</span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PARTNER
      ===================================================== */}

      <section className="about-partner">

        <div className="about-section-label">
          <span>03</span>
          პარტნიორობა
        </div>


        <div className="partner-content">

          <div className="partner-heading">

  <span className="partner-eyebrow">
    PARTNERSHIP
  </span>

  <h2>
    დაგვიმეგობრდი.
    <br />
    <span>გახდი ჩვენი პარტნიორი.</span>
  </h2>

  <p>
    გახდი Edit Academy-ის მეგობარი კომპანია
    და მიიღე განსაკუთრებული პირობები
    თანამშრომლების პროფესიული განვითარებისთვის.
  </p>

  <a
    href="/partnership"
    className="partner-join-btn"
  >
    შემოგვიერთდი
  </a>

</div>

          <div className="partner-list">

            <div className="partner-row">

              <span>01</span>

              <div>
                <h3>
                  კორპორატიული შეთავაზებები
                </h3>

                <p>
                  სპეციალური პირობები კომპანიებისა
                  და მათი თანამშრომლებისთვის.
                </p>
              </div>

            </div>


            <div className="partner-row">

              <span>02</span>

              <div>
                <h3>
                  მორგებული სასწავლო პროგრამა
                </h3>

                <p>
                  კურსები და ტრენინგები კომპანიის
                  საჭიროებების შესაბამისად.
                </p>
              </div>

            </div>


            <div className="partner-row">

              <span>03</span>

              <div>
                <h3>
                  მოქნილი სწავლება
                </h3>

                <p>
                  სასწავლო ფორმატი, რომელიც
                  სამუშაო პროცესს არ აფერხებს.
                </p>
              </div>

            </div>


            <div className="partner-row">

              <span>04</span>

              <div>
                <h3>
                  რეკრუტინგის მხარდაჭერა
                </h3>

                <p>
                  წვდომა მომზადებულ და მოტივირებულ
                  კურსდამთავრებულებზე.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FAQ — ძველი დიზაინი
      ===================================================== */}

      <section
        className="about-faq"
        id="faq"
      >

        <div className="about-faq-heading">

          <div className="about-section-label">
            <span>04</span>
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


      {/* =====================================================
          CTA — ძველი დიზაინის პრინციპით
      ===================================================== */}

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
          href="/livecourses"
          className="about-cta-btn"
        >
          დაიწყე სწავლა
        </a>

      </section>

    </main>
  );
};

export default About;