import React, { useEffect, useState } from "react";
import {
  FaArrowDown,
  FaArrowRight,
  FaCamera,
  FaCheck,
  FaFilm,
  FaLightbulb,
  FaMicrophone,
  FaPlay,
  FaTimes,
} from "react-icons/fa";
import "./Videography.css";

const lessons = [
  {
    number: "01",
    category: "FOUNDATION",
    title: "ვიდეოგრაფიის საფუძვლები",
    description:
      "ვიდეოგრაფიის ძირითადი პრინციპები, კამერის მუშაობა და პროფესიონალური გადაღების საფუძვლები.",
    topics: [
      "ვიდეოგრაფიის პრინციპები",
      "კამერის საფუძვლები",
      "ფაილების ორგანიზება",
      "სწორი workflow",
    ],
    icon: FaCamera,
  },
  {
    number: "02",
    category: "CAMERA",
    title: "კამერა & Settings",
    description:
      "კამერის ძირითადი პარამეტრების შესწავლა და მათი სწორად გამოყენება სხვადასხვა სიტუაციაში.",
    topics: [
      "Camera Settings",
      "Frame Rate",
      "Shutter Speed",
      "ISO & Aperture",
    ],
    icon: FaCamera,
  },
  {
    number: "03",
    category: "COMPOSITION",
    title: "კადრი & Composition",
    description:
      "კადრის სწორად აგება, კომპოზიციის პრინციპები და ვიზუალურად საინტერესო გამოსახულების შექმნა.",
    topics: [
      "Composition",
      "Framing",
      "Rule of Thirds",
      "Visual Balance",
    ],
    icon: FaFilm,
  },
  {
    number: "04",
    category: "LIGHTING",
    title: "განათება",
    description:
      "სინათლის სწორად გამოყენება და პროფესიონალური ვიზუალის შექმნა სხვადასხვა გარემოში.",
    topics: [
      "Natural Light",
      "Artificial Light",
      "Three Point Lighting",
      "Light Control",
    ],
    icon: FaLightbulb,
  },
  {
    number: "05",
    category: "MOVEMENT",
    title: "კამერის მოძრაობა",
    description:
      "კამერის მოძრაობის ტექნიკები დინამიკური და კინემატოგრაფიული კადრების შესაქმნელად.",
    topics: [
      "Camera Movement",
      "Handheld",
      "Gimbal",
      "Tracking Shots",
    ],
    icon: FaFilm,
  },
  {
    number: "06",
    category: "AUDIO",
    title: "ხმა & Audio",
    description:
      "ხმის ჩაწერის საფუძვლები, მიკროფონების გამოყენება და სუფთა აუდიოს მიღება.",
    topics: [
      "Microphones",
      "Audio Recording",
      "Voice",
      "Sound Monitoring",
    ],
    icon: FaMicrophone,
  },
  {
    number: "07",
    category: "COLOR",
    title: "Color & Picture",
    description:
      "ფერის, ექსპოზიციისა და კამერის პროფილების გამოყენება პროფესიონალური გამოსახულებისთვის.",
    topics: [
      "White Balance",
      "Exposure",
      "Picture Profiles",
      "Color Management",
    ],
    icon: FaFilm,
  },
  {
    number: "08",
    category: "CINEMA",
    title: "Cinematic Video",
    description:
      "კინემატოგრაფიული ვიზუალის შექმნა კამერის, განათებისა და მოძრაობის კომბინაციით.",
    topics: [
      "Cinematic Look",
      "Depth",
      "Camera Angles",
      "Visual Storytelling",
    ],
    icon: FaFilm,
  },
  {
    number: "09",
    category: "WORKFLOW",
    title: "პროფესიონალური Workflow",
    description:
      "რეალურ პროექტებზე მუშაობის სრული პროცესი იდეიდან გადაღებამდე და მასალის ორგანიზებამდე.",
    topics: [
      "Project Planning",
      "Shot List",
      "Production Workflow",
      "File Management",
    ],
    icon: FaCamera,
  },
  {
    number: "10",
    category: "PRODUCTION",
    title: "რეალური გადაღება",
    description:
      "ყველა ნასწავლი ტექნიკის გამოყენება ერთ რეალურ ვიდეოგრაფიულ პროექტში.",
    topics: [
      "Pre-production",
      "Shooting",
      "Lighting",
      "Audio",
    ],
    icon: FaFilm,
  },
  {
    number: "11",
    category: "POST",
    title: "ვიდეოს დამუშავება",
    description:
      "გადაღებული მასალის სწორად დამუშავება და საბოლოო ვიდეოს პროფესიონალურ დონეზე მიყვანა.",
    topics: [
      "Footage Selection",
      "Basic Editing",
      "Color",
      "Sound",
    ],
    icon: FaPlay,
  },
  {
    number: "12",
    category: "FINAL PROJECT",
    title: "Final Project",
    description:
      "კურსის საბოლოო პროექტი — სრული ვიდეოგრაფიული ნამუშევარი იდეიდან საბოლოო შედეგამდე.",
    topics: [
      "Final Shoot",
      "Professional Review",
      "Final Edit",
      "Portfolio Ready",
    ],
    icon: FaFilm,
  },
];

export default function Videography() {
  const [activeLesson, setActiveLesson] = useState(null);

  const openLesson = (index) => {
    setActiveLesson(index);
    document.body.classList.add("vg-modal-open");
  };

  const closeLesson = () => {
    setActiveLesson(null);
    document.body.classList.remove("vg-modal-open");
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLesson();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("vg-modal-open");
    };
  }, []);

  return (
    <main className="videography-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="vg-hero">

        <div className="vg-hero-noise" />
        <div className="vg-hero-glow vg-glow-one" />
        <div className="vg-hero-glow vg-glow-two" />

        <div className="vg-hero-lines">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="vg-container">

          <div className="vg-hero-top">

            <div className="vg-hero-label">
              LIVE COURSE
            </div>

            <div className="vg-hero-center-label">
              VIDEOGRAPHY
            </div>

            <div className="vg-hero-year">
              2026
            </div>

          </div>

          <div className="vg-hero-main">

            {/* LEFT SIDE */}

            <div className="vg-hero-left">

              <div className="vg-eyebrow">
                <span />
                PROFESSIONAL VIDEOGRAPHY
              </div>

              <h1>
                <span className="vg-title-line">
                  SHOOT.
                </span>

                <span className="vg-title-line vg-outline">
                  CREATE.
                </span>

                <span className="vg-title-line vg-purple">
                  INSPIRE.
                </span>
              </h1>

              <p className="vg-hero-description">
                ისწავლე პროფესიონალური ვიდეოგრაფია
                კამერის საფუძვლებიდან კინემატოგრაფიულ
                storytelling-მდე.
              </p>

              <div className="vg-hero-actions">

                <a
                  href="#curriculum"
                  className="vg-primary-button"
                >
                  <span>კურსის პროგრამა</span>

                  <i>
                    <FaArrowDown />
                  </i>
                </a>

                <div className="vg-hero-stats">

                  <div>
                    <strong>12</strong>
                    <span>MODULES</span>
                  </div>

                  <div className="vg-stat-divider" />

                  <div>
                    <strong>06</strong>
                    <span>WEEKS</span>
                  </div>

                  <div className="vg-stat-divider" />

                  <div>
                    <strong>PRO</strong>
                    <span>LEVEL</span>
                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT SIDE CAMERA */}

            <div className="vg-hero-visual">

              <div className="vg-visual-number">
                01
              </div>

              <div className="vg-camera">

                <div className="vg-camera-corner corner-tl" />
                <div className="vg-camera-corner corner-tr" />
                <div className="vg-camera-corner corner-bl" />
                <div className="vg-camera-corner corner-br" />

                <div className="vg-camera-screen">

                  <div className="vg-camera-top">

                    <span className="vg-record">
                      <i />
                      REC
                    </span>

                    <span>4K</span>

                    <span>24 FPS</span>

                  </div>

                  <div className="vg-camera-lens">

                    <div className="vg-lens-outer">

                      <div className="vg-lens-middle">

                        <div className="vg-lens-inner">
                          <span />
                        </div>

                      </div>

                    </div>

                  </div>

                  <div className="vg-focus-corners">

                    <span />
                    <span />
                    <span />
                    <span />

                  </div>

                  <div className="vg-camera-bottom">

                    <span>ISO 400</span>
                    <span>1/50</span>
                    <span>F2.8</span>

                  </div>

                </div>

              </div>

              <div className="vg-floating-card vg-floating-one">

                <span>CAMERA</span>
                <strong>MASTER</strong>

              </div>

              <div className="vg-floating-card vg-floating-two">

                <span>LIGHTING</span>
                <strong>CREATE</strong>

              </div>

            </div>

          </div>

          <div className="vg-hero-bottom">

            <span>SCROLL TO EXPLORE</span>

            <div className="vg-scroll-line">
              <span />
            </div>

            <span>01 / 12</span>

          </div>

        </div>

      </section>

      {/* =====================================================
          CURRICULUM
      ===================================================== */}

      <section
        className="vg-curriculum"
        id="curriculum"
      >

        <div className="vg-container">

          <div className="vg-curriculum-header">

            <div>

              <span className="vg-section-number">
                01 / CURRICULUM
              </span>

              <h2>
                LEARN
                <span>TO SHOOT.</span>
              </h2>

            </div>

            <div className="vg-curriculum-description">

              <span>12 MODULES</span>

              <p>
                კურსი შექმნილია იმისთვის, რომ
                თეორიასთან ერთად რეალურ გადაღებებზე
                იმუშაო და საკუთარი ვიზუალური სტილი შექმნა.
              </p>

            </div>

          </div>

          {/* CARDS */}

          <div className="vg-card-grid">

            {lessons.map((lesson, index) => {

              const Icon = lesson.icon;

              return (
                <button
                  type="button"
                  className={`vg-course-card ${
                    activeLesson === index
                      ? "vg-selected"
                      : ""
                  }`}
                  key={lesson.number}
                  onClick={() => openLesson(index)}
                >

                  <div className="vg-card-bg-number">
                    {lesson.number}
                  </div>

                  <div className="vg-card-top">

                    <span className="vg-card-number">
                      {lesson.number}
                    </span>

                    <span className="vg-card-category">
                      {lesson.category}
                    </span>

                    <span className="vg-card-plus">
                      <FaArrowRight />
                    </span>

                  </div>

                  <div className="vg-card-icon">
                    <Icon />
                  </div>

                  <div className="vg-card-body">

                    <h3>
                      {lesson.title}
                    </h3>

                    <p>
                      {lesson.description}
                    </p>

                  </div>

                  <div className="vg-card-bottom">

                    <span>
                      VIEW MODULE
                    </span>

                    <div className="vg-card-line">
                      <span />
                    </div>

                  </div>

                </button>
              );
            })}

          </div>

          <div className="vg-curriculum-footer">

            <div className="vg-footer-line">
              <span />
            </div>

            <div className="vg-footer-info">

              <span>12 MODULES</span>

              <strong>
                FROM IDEA TO FINAL FRAME.
              </strong>

            </div>

            <div className="vg-footer-arrow">
              <FaArrowRight />
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CARD MODAL / CARD COMES FORWARD
      ===================================================== */}

      {activeLesson !== null && (
        <div
          className="vg-card-overlay"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              closeLesson();
            }
          }}
        >

          <div
            className="vg-active-card"
            role="dialog"
            aria-modal="true"
          >

            <button
              type="button"
              className="vg-close-button"
              onClick={closeLesson}
              aria-label="Close"
            >
              <FaTimes />
            </button>

            <div className="vg-active-card-glow" />

            <div className="vg-active-card-number">
              {lessons[activeLesson].number}
            </div>

            <div className="vg-active-card-top">

              <span>
                {lessons[activeLesson].category}
              </span>

              <div className="vg-active-icon">
                {React.createElement(
                  lessons[activeLesson].icon
                )}
              </div>

            </div>

            <div className="vg-active-content">

              <h3>
                {lessons[activeLesson].title}
              </h3>

              <p>
                {lessons[activeLesson].description}
              </p>

            </div>

            <div className="vg-active-divider" />

            <div className="vg-active-learning">

              <span>
                WHAT YOU WILL LEARN
              </span>

              <div className="vg-active-topics">

                {lessons[activeLesson].topics.map(
                  (topic, topicIndex) => (
                    <div
                      className="vg-active-topic"
                      key={topic}
                    >

                      <span>
                        {String(
                          topicIndex + 1
                        ).padStart(2, "0")}
                      </span>

                      <strong>
                        {topic}
                      </strong>

                      <FaCheck />

                    </div>
                  )
                )}

              </div>

            </div>

            <div className="vg-active-footer">

              <div>

                <span>
                  PRACTICAL EXPERIENCE
                </span>

                <strong>
                  რეალურ პროექტზე მუშაობა
                </strong>

              </div>

              <FaArrowRight />

            </div>

          </div>

        </div>
      )}

    </main>
  );
}