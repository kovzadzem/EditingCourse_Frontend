import React, { useState } from "react";
import {
  FaArrowRight,
  FaPlay,
  FaCheck,
  FaExternalLinkAlt,
} from "react-icons/fa";

import "./Portfolio.css";

const studentWorks = [
  {
    id: 1,
    image: "/images/student-1.jpg",
    title: "Social Media Campaign",
    student: "სტუდენტი 01",
    category: "Video Editing",
  },
  {
    id: 2,
    image: "/images/student-2.jpg",
    title: "Commercial Edit",
    student: "სტუდენტი 02",
    category: "Commercial",
  },
  {
    id: 3,
    image: "/images/student-3.jpg",
    title: "Cinematic Project",
    student: "სტუდენტი 03",
    category: "Cinematic",
  },
  {
    id: 4,
    image: "/images/student-4.jpg",
    title: "Short Form Content",
    student: "სტუდენტი 04",
    category: "Social Media",
  },
  {
    id: 5,
    image: "/images/student-5.jpg",
    title: "Brand Video",
    student: "სტუდენტი 05",
    category: "Branding",
  },
  {
    id: 6,
    image: "/images/student-6.jpg",
    title: "Creative Edit",
    student: "სტუდენტი 06",
    category: "Creative",
  },
];

const mentorWorks = [
  {
    id: 1,
    image: "/images/mentor-1.jpg",
    title: "Commercial Project",
    category: "Commercial",
  },
  {
    id: 2,
    image: "/images/mentor-2.jpg",
    title: "Creative Campaign",
    category: "Creative",
  },
  {
    id: 3,
    image: "/images/mentor-3.jpg",
    title: "Social Media Project",
    category: "Social Media",
  },
  {
    id: 4,
    image: "/images/mentor-4.jpg",
    title: "Cinematic Edit",
    category: "Cinematic",
  },
];

const brands = [
  "BRAND 01",
  "BRAND 02",
  "BRAND 03",
  "BRAND 04",
  "BRAND 05",
  "BRAND 06",
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("students");
  const [selectedWork, setSelectedWork] = useState(null);

  const works =
    activeTab === "students"
      ? studentWorks
      : mentorWorks;

  return (
    <main className="portfolio-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="portfolio-hero">

        <div className="portfolio-hero-grid" />

        <div className="portfolio-hero-glow" />

        <div className="portfolio-hero-inner">

          <div className="portfolio-hero-content">

            <div className="portfolio-overline">
              <span className="portfolio-overline-line" />

              EDIT ACADEMY

              <span className="portfolio-overline-dot" />

              PORTFOLIO
            </div>

            <h1>
              რეალური
              <br />
              <span>ნამუშევრები.</span>
            </h1>

            <p>
              აქ ნახავ Edit Academy-ს სტუდენტების
              და მენტორის რეალურ ვიდეო პროექტებს —
              იდეიდან საბოლოო შედეგამდე.
            </p>

            <div className="portfolio-hero-stats">

              <div className="portfolio-stat">
                <strong>100+</strong>
                <span>სტუდენტი</span>
              </div>

              <div className="portfolio-stat-line" />

              <div className="portfolio-stat">
                <strong>50+</strong>
                <span>პროექტი</span>
              </div>

              <div className="portfolio-stat-line" />

              <div className="portfolio-stat">
                <strong>PRO</strong>
                <span>მენტორი</span>
              </div>

            </div>

          </div>

          <div className="portfolio-hero-visual">

            <div className="portfolio-hero-card">

              <div className="portfolio-card-top">
                <span>EDIT ACADEMY</span>
                <span>2026 / PORTFOLIO</span>
              </div>

              <div className="portfolio-card-center">

                <span className="portfolio-card-small">
                  WORK
                </span>

                <span className="portfolio-card-word">
                  REAL
                </span>

                <span className="portfolio-card-word outline">
                  WORK
                </span>

              </div>

              <div className="portfolio-card-bottom">

                <span>STUDENTS</span>

                <FaArrowRight />

                <span>MENTOR</span>

              </div>

            </div>

            <div className="portfolio-floating-label">

              <FaPlay />

              <div>
                <strong>
                  ნამუშევრების ნახვა
                </strong>

                <span>
                  Explore the work
                </span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PORTFOLIO CONTENT
      ===================================================== */}

      <section className="portfolio-section">

        <div className="portfolio-container">

          <div className="portfolio-section-head">

            <div>
              <span className="portfolio-section-number">
                01
              </span>

              <span className="portfolio-section-label">
                Portfolio
              </span>
            </div>

            <span className="portfolio-section-count">
              SELECTED WORK
            </span>

          </div>


          {/* =================================================
              TABS
          ================================================= */}

          <div className="portfolio-tabs">

            <button
              type="button"
              className={
                activeTab === "students"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("students")
              }
            >

              <span>01</span>

              სტუდენტები

              <FaArrowRight />

            </button>

            <button
              type="button"
              className={
                activeTab === "mentor"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("mentor")
              }
            >

              <span>02</span>

              მენტორი

              <FaArrowRight />

            </button>

          </div>


          {/* =================================================
              INTRO
          ================================================= */}

          <div className="portfolio-intro">

            <div className="portfolio-intro-title">

              <span>
                {activeTab === "students"
                  ? "STUDENT WORK"
                  : "MENTOR WORK"}
              </span>

              <h2>
                {activeTab === "students"
                  ? "ის, რასაც ჩვენი სტუდენტები ქმნიან."
                  : "გამოცდილება, რომელიც შედეგში ჩანს."}
              </h2>

            </div>

            <p>
              {activeTab === "students"
                ? "სასწავლო პროცესში სტუდენტები მუშაობენ რეალურ პროექტებზე და ქმნიან საკუთარ ნამუშევრებს."
                : "ვიდეო მონტაჟის მიმართულებით შექმნილი პროფესიონალური პროექტების შერჩეული კოლექცია."}
            </p>

          </div>


          {/* =================================================
              WORK GRID
          ================================================= */}

          <div className="portfolio-grid">

            {works.map((work, index) => (

              <article
                className={`portfolio-work-card ${
                  index === 0 ? "large" : ""
                }`}
                key={work.id}
                onClick={() =>
                  setSelectedWork(work)
                }
              >

                <div className="portfolio-work-image">

                  <img
                    src={work.image}
                    alt={work.title}
                  />

                  <div className="portfolio-work-overlay">

                    <div className="portfolio-play">
                      <FaPlay />
                    </div>

                    <span>
                      VIEW PROJECT
                    </span>

                  </div>

                  <div className="portfolio-work-number">
                    0{index + 1}
                  </div>

                </div>


                <div className="portfolio-work-info">

                  <div>

                    <h3>
                      {work.title}
                    </h3>

                    <span>
                      {activeTab === "students"
                        ? work.student
                        : "Edit Academy"}
                    </span>

                  </div>

                  <div className="portfolio-category">
                    {work.category}
                  </div>

                </div>

              </article>

            ))}

          </div>


          {/* =================================================
              MENTOR ONLY
          ================================================= */}

          {activeTab === "mentor" && (
            <>

              {/* =================================================
                  MENTOR PROFILE
              ================================================= */}

              <section className="mentor-profile">

                <div className="mentor-profile-image">

                  <img
                    src="/images/mentor.jpg"
                    alt="მენტორი"
                  />

                  <div className="mentor-pro-badge">
                    PRO
                  </div>

                </div>


                <div className="mentor-profile-content">

                  <div className="mentor-overline">
                    ABOUT THE MENTOR
                  </div>

                  <h2>
                    გამოცდილება,
                    <br />
                    <span>რომელიც გასწავლი.</span>
                  </h2>

                  <p>
                    ვიდეო მონტაჟის სფეროში მიღებული
                    გამოცდილება გადმოტანილია პრაქტიკულ
                    სწავლებაში, რათა სტუდენტმა არა მხოლოდ
                    პროგრამა ისწავლოს, არამედ რეალურ
                    პროექტზე მუშაობაც შეძლოს.
                  </p>


                  <div className="mentor-features">

                    <div>
                      <span>
                        <FaCheck />
                      </span>

                      რეალური პროექტები
                    </div>

                    <div>
                      <span>
                        <FaCheck />
                      </span>

                      პროფესიონალური Workflow
                    </div>

                    <div>
                      <span>
                        <FaCheck />
                      </span>

                      პრაქტიკული სწავლება
                    </div>

                  </div>

                </div>

              </section>


              {/* =================================================
                  BRANDS — ONLY MENTOR
              ================================================= */}

              <section className="brands-section">

                <div className="brands-header">

                  <div>

                    <span>
                      02
                    </span>

                    <h2>
                      ბრენდები
                    </h2>

                  </div>

                  <p>
                    კომპანიები და პროექტები,
                    რომლებთანაც გვქონდა თანამშრომლობა.
                  </p>

                </div>


                <div className="brands-grid">

                  {brands.map((brand, index) => (

                    <div
                      className="brand-item"
                      key={brand}
                    >

                      <span className="brand-index">
                        0{index + 1}
                      </span>

                      <strong>
                        {brand}
                      </strong>

                      <FaExternalLinkAlt />

                    </div>

                  ))}

                </div>

              </section>

            </>
          )}


          {/* =================================================
              BOTTOM
          ================================================= */}

          <div className="portfolio-bottom">

            <span>
              EDIT ACADEMY
            </span>

            <span>
              SELECTED WORK / 2026
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          MODAL
      ===================================================== */}

      {selectedWork && (

        <div
          className="portfolio-modal"
          onClick={() =>
            setSelectedWork(null)
          }
        >

          <div
            className="portfolio-modal-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="portfolio-modal-close"
              type="button"
              onClick={() =>
                setSelectedWork(null)
              }
            >
              ×
            </button>

            <img
              src={selectedWork.image}
              alt={selectedWork.title}
            />

            <div className="portfolio-modal-info">

              <span>
                {selectedWork.category}
              </span>

              <h2>
                {selectedWork.title}
              </h2>

              <p>
                {activeTab === "students"
                  ? selectedWork.student
                  : "Edit Academy"}
              </p>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}