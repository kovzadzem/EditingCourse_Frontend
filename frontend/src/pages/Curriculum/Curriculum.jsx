import React, { useState } from "react";
import {
  FaArrowDown,
  FaArrowRight,
  FaCheck,
  FaPlay,
} from "react-icons/fa";
import "./Curriculum.css";

const curriculumData = [
  {
    number: "01",
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

export default function Curriculum() {
  const [activeLesson, setActiveLesson] = useState(null);

  const toggleLesson = (index) => {
    setActiveLesson((current) =>
      current === index ? null : index
    );
  };

  return (
    <main className="curriculum-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="curriculum-hero">

        <div className="curriculum-hero-grid" />

        <div className="curriculum-hero-inner">

          <div className="curriculum-hero-content">

            <div className="curriculum-overline">
              <span className="overline-line" />

              EDIT ACADEMY

              <span className="overline-dot" />

              CURRICULUM
            </div>

            <h1>
               სილაბუსი
            </h1>

            <p className="curriculum-hero-text">
              კურსის სრული სასწავლო პროგრამა,
              რომელიც აგებულია პრაქტიკაზე,
              რეალურ პროექტებსა და პროფესიონალურ
              ვიდეო მონტაჟის workflow-ზე.
            </p>

            <div className="curriculum-hero-info">

              <div className="hero-info-block">
                <strong>12</strong>
                <span>ლექცია</span>
              </div>

              <div className="hero-info-line" />

              <div className="hero-info-block">
                <strong>6</strong>
                <span>კვირა</span>
              </div>

              <div className="hero-info-line" />

              <div className="hero-info-block">
                <strong>0 → PRO</strong>
                <span>დონე</span>
              </div>

            </div>

          </div>


          {/* HERO VISUAL */}

          <div className="curriculum-hero-visual">

            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />

            <div className="hero-course-object">

              <div className="hero-object-header">
                <span>EDIT ACADEMY</span>

                <span className="hero-object-index">
                  01 — 12
                </span>
              </div>

              <div className="hero-object-main">

                <span className="hero-object-small">
                  VIDEO
                </span>

                <span className="hero-object-big">
                  EDIT
                </span>

                <span className="hero-object-big outline">
                  PRO
                </span>

              </div>

              <div className="hero-object-footer">

                <span>FROM ZERO</span>

                <FaArrowRight />

                <span>TO PROFESSIONAL</span>

              </div>

            </div>


            <div className="hero-mini-card">

              <div className="hero-mini-icon">
                <FaPlay />
              </div>

              <div>
                <strong>
                  პრაქტიკული სწავლება
                </strong>

                <span>
                  რეალურ პროექტებზე
                </span>
              </div>

            </div>

          </div>

        </div>


        <div className="hero-scroll">

          <span>
            SCROLL TO EXPLORE
          </span>

          <FaArrowDown />

        </div>

      </section>


      {/* =====================================================
          CURRICULUM
      ===================================================== */}

      <section className="curriculum-section">

        <div className="curriculum-container">

          <div className="curriculum-section-head">

            <div className="section-heading">

              <span className="section-number">
                01
              </span>

              <span className="section-label">
                სასწავლო გეგმა
              </span>

            </div>

            <span className="lesson-count">
              12 LESSONS
            </span>

          </div>


          <div className="curriculum-list">

            {curriculumData.map((lesson, index) => {

              const isActive =
                activeLesson === index;

              return (
                <article
                  className={`curriculum-row ${
                    isActive ? "active" : ""
                  }`}
                  key={lesson.number}
                >

                  <button
                    type="button"
                    className="curriculum-row-trigger"
                    onClick={() =>
                      toggleLesson(index)
                    }
                    aria-expanded={isActive}
                  >

                    <span className="lesson-number">
                      {lesson.number}
                    </span>

                    <span className="lesson-title">
                      {lesson.title}
                    </span>

                    <span className="lesson-action">

                      <span className="lesson-action-text">
                        {isActive
                          ? "დახურვა"
                          : "ნახვა"}
                      </span>

                      <span className="lesson-circle">
                        <FaArrowRight />
                      </span>

                    </span>

                  </button>


                  <div className="lesson-expand">

                    <div className="lesson-expand-inner">

                      <div className="lesson-description">

                        <span>
                          ABOUT THIS LESSON
                        </span>

                        <p>
                          {lesson.description}
                        </p>

                      </div>


                      <div className="lesson-details">

                        <span className="lesson-details-label">
                          თემები
                        </span>

                        <div className="lesson-topics">

                          {lesson.topics.map(
                            (topic) => (
                              <div
                                className="lesson-topic"
                                key={topic}
                              >

                                <span>
                                  <FaCheck />
                                </span>

                                {topic}

                              </div>
                            )
                          )}

                        </div>

                      </div>


                      <div className="lesson-preview">

                        <div className="preview-left">

                          <span className="preview-number">
                            {lesson.number}
                          </span>

                          <div>
                            <strong>
                              პრაქტიკული ლექცია
                            </strong>

                            <p>
                              დეტალური მასალა
                              კურსის ფარგლებში.
                            </p>
                          </div>

                        </div>

                        <div className="preview-play">
                          <FaPlay />
                        </div>

                      </div>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          END
      ===================================================== */}

      <section className="curriculum-end">

        <div className="curriculum-container">

          <div className="end-line" />

          <div className="end-content">
            <span>EDIT ACADEMY</span>
            <span>12 / 12</span>
          </div>

        </div>

      </section>

    </main>
  );
}