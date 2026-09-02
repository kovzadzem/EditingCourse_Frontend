import React, { useEffect, useState } from "react";
import {
  FaArrowDown,
  FaArrowRight,
  FaCheck,
  FaPlay,
  FaTimes,
} from "react-icons/fa";
import "./VideoEditing.css";

const curriculumData = [
  {
    number: "01",
    category: "FOUNDATION",
    title: "ვიდეო მონტაჟის საფუძვლები",
    description:
      "ვიდეო მონტაჟის ძირითადი პრინციპები, სამუშაო გარემო და პროფესიონალური workflow.",
    topics: [
      "ვიდეო მონტაჟის პრინციპები",
      "სამუშაო გარემო",
      "ფაილების ორგანიზება",
      "სწორი workflow",
    ],
  },
  {
    number: "02",
    category: "SOFTWARE",
    title: "მონტაჟის პროგრამა",
    description:
      "პროგრამის ინტერფეისის და ძირითადი ინსტრუმენტების სრულად გაცნობა.",
    topics: [
      "Interface",
      "Timeline",
      "Tools",
      "Project Settings",
    ],
  },
  {
    number: "03",
    category: "CUT & EDIT",
    title: "Cut & Edit",
    description:
      "კადრების სწორად დაჭრა, აწყობა და ვიდეოს ისტორიის შექმნა.",
    topics: [
      "Cutting",
      "Trim",
      "Transitions",
      "Timeline Editing",
    ],
  },
  {
    number: "04",
    category: "RHYTHM",
    title: "კადრის რიტმი",
    description:
      "როგორ შევქმნათ დინამიკური და საინტერესო ვიდეო მხოლოდ მონტაჟის საშუალებით.",
    topics: [
      "Pacing",
      "Rhythm",
      "Storytelling",
      "Dynamic Editing",
    ],
  },
  {
    number: "05",
    category: "SOUND",
    title: "აუდიო & Sound Design",
    description:
      "ხმის დამუშავება და Sound Design-ის გამოყენება ვიდეოს გასაძლიერებლად.",
    topics: [
      "Audio Editing",
      "Sound Effects",
      "Music",
      "Mixing",
    ],
  },
  {
    number: "06",
    category: "COLOR",
    title: "Color Correction",
    description:
      "ვიდეოს ფერის კორექციისა და ტექნიკურად სწორი გამოსახულების შექმნა.",
    topics: [
      "Color Correction",
      "Exposure",
      "White Balance",
      "Skin Tones",
    ],
  },
  {
    number: "07",
    category: "GRADING",
    title: "Color Grading",
    description:
      "საბაზისო კორექციიდან საკუთარი ვიზუალური სტილის შექმნამდე.",
    topics: [
      "Look Development",
      "Creative Grade",
      "Contrast",
      "Color Style",
    ],
  },
  {
    number: "08",
    category: "MOTION",
    title: "Motion & Effects",
    description:
      "მოძრავი ელემენტების, ტექსტისა და ვიზუალური ეფექტების გამოყენება.",
    topics: [
      "Keyframes",
      "Motion",
      "Text Animation",
      "Visual Effects",
    ],
  },
  {
    number: "09",
    category: "WORKFLOW",
    title: "პროფესიონალური Workflow",
    description:
      "როგორ ვიმუშაოთ რეალურ პროექტებზე სწრაფად და ორგანიზებულად.",
    topics: [
      "Project Organization",
      "Workflow",
      "Efficiency",
      "Professional Setup",
    ],
  },
  {
    number: "10",
    category: "PROJECT",
    title: "რეალური პროექტი",
    description:
      "ყველა ნასწავლი ტექნიკის გამოყენება ერთ რეალურ პროექტში.",
    topics: [
      "Project Planning",
      "Editing",
      "Sound",
      "Color",
    ],
  },
  {
    number: "11",
    category: "PORTFOLIO",
    title: "პორტფოლიო",
    description:
      "პროფესიონალური ნამუშევრის შექმნა და მისი სწორად წარმოდგენა.",
    topics: [
      "Portfolio Piece",
      "Presentation",
      "Export",
      "Final Polish",
    ],
  },
  {
    number: "12",
    category: "FINAL PROJECT",
    title: "Final Project",
    description:
      "კურსის საბოლოო პროექტი — ყველაფერი, რაც ვისწავლეთ, ერთ ნამუშევარში.",
    topics: [
      "Final Edit",
      "Professional Review",
      "Export",
      "Portfolio Ready",
    ],
  },
];

export default function VideoEditing() {
  const [activeLesson, setActiveLesson] = useState(null);

  const openLesson = (index) => {
    setActiveLesson(index);
    document.body.classList.add("ve-modal-open");
  };

  const closeLesson = () => {
    setActiveLesson(null);
    document.body.classList.remove("ve-modal-open");
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeLesson();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.classList.remove("ve-modal-open");
    };
  }, []);

  return (
    <main className="ve-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="ve-hero">

        <div className="ve-hero-noise" />
        <div className="ve-hero-glow ve-glow-one" />
        <div className="ve-hero-glow ve-glow-two" />

        <div className="ve-hero-lines">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="ve-container">

          <div className="ve-hero-top">

            <span>LIVE COURSE</span>

            <span className="ve-hero-top-center">
              VIDEO EDITING
            </span>

            <span>2026</span>

          </div>

          <div className="ve-hero-main">

            {/* LEFT */}

            <div className="ve-hero-left">

              <div className="ve-eyebrow">
                <span />
                PROFESSIONAL VIDEO EDITING
              </div>

              <h1>
                <span>EDIT.</span>

                <span className="ve-outline">
                  CREATE.
                </span>

                <span className="ve-purple">
                  INSPIRE.
                </span>
              </h1>

              <p className="ve-hero-description">
                ისწავლე პროფესიონალური ვიდეო მონტაჟი
                ნულიდან რეალურ პროექტებამდე და შექმენი
                შენი საკუთარი ვიზუალური სტილი.
              </p>

              <div className="ve-hero-actions">

                <a
                  href="#ve-curriculum"
                  className="ve-primary-button"
                >
                  <span>კურსის პროგრამა</span>

                  <i>
                    <FaArrowDown />
                  </i>
                </a>

                <div className="ve-hero-stats">

                  <div>
                    <strong>12</strong>
                    <span>MODULES</span>
                  </div>

                  <div className="ve-stat-divider" />

                  <div>
                    <strong>06</strong>
                    <span>WEEKS</span>
                  </div>

                  <div className="ve-stat-divider" />

                  <div>
                    <strong>PRO</strong>
                    <span>LEVEL</span>
                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT VISUAL */}

            <div className="ve-hero-visual">

              <div className="ve-visual-number">
                01
              </div>

              <div className="ve-editor-window">

                <div className="ve-window-top">

                  <span>
                    EDIT ACADEMY
                  </span>

                  <div>
                    <i />
                    <i />
                    <i />
                  </div>

                </div>

                <div className="ve-window-content">

                  <div className="ve-preview-screen">

                    <div className="ve-preview-grid" />

                    <div className="ve-preview-center">

                      <span>PLAY</span>

                      <div className="ve-play-circle">
                        <FaPlay />
                      </div>

                    </div>

                    <div className="ve-preview-rec">
                      <i />
                      REC
                    </div>

                    <div className="ve-preview-time">
                      00:24:18
                    </div>

                  </div>

                  <div className="ve-timeline">

                    <div className="ve-timeline-ruler">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>

                    <div className="ve-track">
                      <div className="ve-clip ve-clip-one">
                        VIDEO
                      </div>

                      <div className="ve-clip ve-clip-two">
                        B-ROLL
                      </div>

                    </div>

                    <div className="ve-track ve-track-second">
                      <div className="ve-clip ve-audio">
                        AUDIO
                      </div>
                    </div>

                    <div className="ve-playhead" />

                  </div>

                </div>

                <div className="ve-window-bottom">

                  <span>4K</span>
                  <span>24 FPS</span>
                  <span>01:24:08</span>

                </div>

              </div>

              <div className="ve-floating-card ve-floating-one">

                <span>EDITING</span>

                <strong>
                  MASTER
                </strong>

              </div>

              <div className="ve-floating-card ve-floating-two">

                <span>PROJECT</span>

                <strong>
                  CREATE
                </strong>

              </div>

            </div>

          </div>

          <div className="ve-hero-bottom">

            <span>
              SCROLL TO EXPLORE
            </span>

            <div className="ve-scroll-line">
              <span />
            </div>

            <span>
              01 / 12
            </span>

          </div>

        </div>

      </section>


      {/* =====================================================
          CURRICULUM
      ===================================================== */}

      <section
        className="ve-curriculum"
        id="ve-curriculum"
      >

        <div className="ve-container">

          <div className="ve-curriculum-header">

            <div>

              <span className="ve-section-number">
                01 / CURRICULUM
              </span>

              <h2>
                LEARN
                <span>TO EDIT.</span>
              </h2>

            </div>

            <div className="ve-curriculum-description">

              <span>12 MODULES</span>

              <p>
                კურსი აერთიანებს მონტაჟის ტექნიკას,
                storytelling-ს, sound design-ს,
                color-სა და რეალურ პროექტებზე მუშაობას.
              </p>

            </div>

          </div>


          {/* CARDS */}

          <div className="ve-card-grid">

            {curriculumData.map((lesson, index) => (

              <button
                type="button"
                className="ve-course-card"
                key={lesson.number}
                onClick={() => openLesson(index)}
              >

                <div className="ve-card-bg-number">
                  {lesson.number}
                </div>

                <div className="ve-card-top">

                  <span className="ve-card-number">
                    {lesson.number}
                  </span>

                  <span className="ve-card-category">
                    {lesson.category}
                  </span>

                  <span className="ve-card-arrow">
                    <FaArrowRight />
                  </span>

                </div>

                <div className="ve-card-icon">
                  <FaPlay />
                </div>

                <div className="ve-card-body">

                  <h3>
                    {lesson.title}
                  </h3>

                  <p>
                    {lesson.description}
                  </p>

                </div>

                <div className="ve-card-bottom">

                  <span>
                    VIEW MODULE
                  </span>

                  <div className="ve-card-line">
                    <span />
                  </div>

                </div>

              </button>

            ))}

          </div>


          <div className="ve-curriculum-footer">

            <div className="ve-footer-line">
              <span />
            </div>

            <div className="ve-footer-info">

              <span>
                12 MODULES
              </span>

              <strong>
                FROM RAW FOOTAGE TO FINAL CUT.
              </strong>

            </div>

            <div className="ve-footer-arrow">
              <FaArrowRight />
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CARD FORWARD MODAL
      ===================================================== */}

      {activeLesson !== null && (

        <div
          className="ve-card-overlay"
          onMouseDown={(event) => {

            if (
              event.target === event.currentTarget
            ) {
              closeLesson();
            }

          }}
        >

          <div
            className="ve-active-card"
            role="dialog"
            aria-modal="true"
          >

            <button
              type="button"
              className="ve-close-button"
              onClick={closeLesson}
              aria-label="Close"
            >
              <FaTimes />
            </button>

            <div className="ve-active-glow" />

            <div className="ve-active-number">
              {curriculumData[activeLesson].number}
            </div>

            <div className="ve-active-top">

              <span>
                {curriculumData[activeLesson].category}
              </span>

              <div className="ve-active-icon">
                <FaPlay />
              </div>

            </div>

            <div className="ve-active-content">

              <h3>
                {curriculumData[activeLesson].title}
              </h3>

              <p>
                {curriculumData[activeLesson].description}
              </p>

            </div>

            <div className="ve-active-divider" />

            <div className="ve-active-learning">

              <span>
                WHAT YOU WILL LEARN
              </span>

              <div className="ve-active-topics">

                {curriculumData[
                  activeLesson
                ].topics.map((topic, topicIndex) => (

                  <div
                    className="ve-active-topic"
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

                ))}

              </div>

            </div>

            <div className="ve-active-footer">

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