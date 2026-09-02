import { useState } from "react";
import {
  FaArrowRight,
  FaCheck,
  FaPlus,
} from "react-icons/fa";

import "./about.css";

const whyCards = [
  {
    id: 0,
    number: "01",
    label: "LEARN",
    title: "ისწავლე",
    highlight: "პრაქტიკით",
    text: "ვიდეო მონტაჟს თავიდანვე რეალურ პროექტებზე მუშაობით ისწავლი.",
    points: [
      "Adobe Premiere Pro",
      "რეალური პროექტები",
      "პრაქტიკული დავალებები",
    ],
  },
  {
    id: 1,
    number: "02",
    label: "CREATE",
    title: "შექმენი",
    highlight: "პორტფოლიო",
    text: "კურსის განმავლობაში შექმნი ნამუშევრებს, რომლებიც შენს პორტფოლიოს შეავსებს.",
    points: [
      "რეალური ნამუშევრები",
      "კრეატიული პროექტები",
      "პირადი სტილი",
    ],
  },
  {
    id: 2,
    number: "03",
    label: "GROW",
    title: "დაიწყე",
    highlight: "კარიერა",
    text: "მიიღებ ცოდნასა და უნარებს, რომლებიც დაგეხმარება პროფესიულ განვითარებაში.",
    points: [
      "პროფესიული უნარები",
      "კარიერული მიმართულება",
      "სერტიფიკატი",
    ],
  },
];

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
  const [activeWhy, setActiveWhy] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq((current) =>
      current === index ? null : index
    );
  };

  return (
    <main className="about-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="about-hero">

        <div className="about-hero-top">

          <div className="about-mini-logo">
            EDIT<span>ACADEMY</span>
          </div>

          <div className="about-hero-tag">
            CREATIVE EDUCATION
          </div>

        </div>


        <div className="about-hero-content">

          <div className="about-hero-text">

            <span className="about-small-label">
              VIDEO EDITING ACADEMY
            </span>

            <h1>
              შექმენი
              <br />
              <span>შენი</span>
              <br />
              მომავალი.
            </h1>

            <p>
              ისწავლე ვიდეო მონტაჟი პრაქტიკულად,
              შექმენი საკუთარი სტილი და აქციე
              შენი იდეები რეალურ ნამუშევრებად.
            </p>


            <div className="about-hero-actions">

              <a
                href="/livecourses"
                className="about-main-button"
              >
                <span>კურსების ნახვა</span>

                <i>
                  <FaArrowRight />
                </i>
              </a>


              <a
                href="#faq"
                className="about-faq-button"
              >
                ხშირად დასმული კითხვები

                <span>↓</span>
              </a>

            </div>

          </div>


          <div className="about-hero-media">

            <div className="about-video">

              <video
                src="/Videos/hero.mp4"
                autoPlay
                muted
                loop
                playsInline
              />

              <div className="about-video-overlay" />

              <div className="about-video-top">
                <span>EDIT ACADEMY</span>
                <span>2026</span>
              </div>

              <div className="about-video-bottom">
                <span>CREATE</span>
                <strong>YOUR STORY.</strong>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY EDIT ACADEMY
      ===================================================== */}

      <section className="why-section">

        <div className="why-heading">

          <div>

            <span className="section-label">
              WHY EDIT ACADEMY
            </span>

            <h2>
              ისწავლე.
              <br />
              შექმენი.
              <br />
              <span>განვითარდი.</span>
            </h2>

          </div>


          <p>
            ჩვენ არ გვინდა უბრალოდ ვიდეო
            მონტაჟი გასწავლოთ. გვინდა,
            რეალურად შეგიქმნათ შესაძლებლობა
            შექმნათ საკუთარი გზა.
          </p>

        </div>


        <div className="why-card-area">

          <div className="why-card-stack">

            {whyCards.map((card, index) => {

              const position =
                (index - activeWhy + whyCards.length) %
                whyCards.length;

              return (
                <article
                  key={card.id}
                  className={`why-card why-card-${position}`}
                  onClick={() => setActiveWhy(index)}
                >

                  <div className="why-card-top">

                    <span>
                      {card.number}
                    </span>

                    <span>
                      {card.label}
                    </span>

                  </div>


                  <div className="why-card-main">

                    <div className="why-card-icon">
                      <FaArrowRight />
                    </div>

                    <h3>
                      {card.title}
                      <br />
                      <span>
                        {card.highlight}
                      </span>
                    </h3>

                  </div>


                  <div className="why-card-bottom">

                    <p>
                      {card.text}
                    </p>

                    <div className="why-card-points">

                      {card.points.map((point) => (

                        <span key={point}>
                          <FaCheck />
                          {point}
                        </span>

                      ))}

                    </div>

                  </div>

                </article>
              );
            })}

          </div>


          <div className="why-card-navigation">

            {whyCards.map((card, index) => (

              <button
                key={card.id}
                type="button"
                className={
                  activeWhy === index
                    ? "active"
                    : ""
                }
                onClick={() => setActiveWhy(index)}
              >

                <span>
                  0{index + 1}
                </span>

                {card.label}

              </button>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          FAQ
      ===================================================== */}

      <section
        className="faq-section"
        id="faq"
      >

        <div className="faq-heading">

          <div>

            <span className="section-label">
              FREQUENTLY ASKED
            </span>

            <h2>
              კითხვები?
              <br />
              <span>
                აქ არის პასუხები.
              </span>
            </h2>

          </div>


          <div className="faq-heading-badge">

            <span>FAQ</span>

            <small>
              ყველაზე ხშირად
              დასმული კითხვები
            </small>

          </div>

        </div>


        <div className="faq-cards">

          {faqData.map((faq, index) => {

            const isOpen = openFaq === index;

            return (
              <article
                className={`faq-card ${
                  isOpen
                    ? "faq-card-open"
                    : ""
                }`}
                key={faq.question}
              >

                <button
                  type="button"
                  className="faq-card-question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >

                  <span className="faq-card-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="faq-card-title">
                    {faq.question}
                  </span>

                  <span className="faq-card-plus">
                    <FaPlus />
                  </span>

                </button>


                <div className="faq-card-answer">

                  <div className="faq-answer-inner">

                    <div className="faq-answer-line" />

                    <p>
                      {faq.answer}
                    </p>

                  </div>

                </div>

              </article>
            );

          })}

        </div>

      </section>


      {/* =====================================================
          CONTACT
      ===================================================== */}

      <section className="contact-section">

        <div className="contact-card">

          <div className="contact-left">

            <span className="section-label">
              CONTACT
            </span>

            <h2>
              დაგვიკავშირდი
            </h2>

            <p>
              გაქვს კითხვა კურსზე ან გინდა
              სწავლა დაიწყო? მოგვწერე.
            </p>

          </div>


          <div className="contact-right">

            <div className="contact-links">

              {/* EMAIL */}

              <a
                href="mailto:Amashukelinika5@gmail.com"
              >

                <div className="contact-link-icon">
                  @
                </div>

                <div className="contact-link-content">

                  <span>
                    EMAIL
                  </span>

                  <strong>
                    Amashukelinika5@gmail.com
                  </strong>

                </div>

                <b>
                  ↗
                </b>

              </a>


              {/* PHONE */}

              <a
                href="tel:+995595036986"
              >

                <div className="contact-link-icon">
                  ☎
                </div>

                <div className="contact-link-content">

                  <span>
                    PHONE
                  </span>

                  <strong>
                    595 03 69 86
                  </strong>

                </div>

                <b>
                  ↗
                </b>

              </a>


              {/* INSTAGRAM */}

              <a
                href="https://www.instagram.com/editologia0/"
                target="_blank"
                rel="noopener noreferrer"
              >

                <div className="contact-link-icon">
                  ◎
                </div>

                <div className="contact-link-content">

                  <span>
                    INSTAGRAM
                  </span>

                  <strong>
                    @editologia0
                  </strong>

                </div>

                <b>
                  ↗
                </b>

              </a>


              {/* FACEBOOK */}

              <a
                href="https://www.facebook.com/profile.php?id=61588131500547"
                target="_blank"
                rel="noopener noreferrer"
              >

                <div className="contact-link-icon">
                  f
                </div>

                <div className="contact-link-content">

                  <span>
                    FACEBOOK
                  </span>

                  <strong>
                    Editologia
                  </strong>

                </div>

                <b>
                  ↗
                </b>

              </a>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default About;