
import React, { useEffect, useState } from "react";
import {
  FaArrowDown,
  FaArrowRight,
  FaCheck,
  FaPlay,
  FaTimes,
} from "react-icons/fa";
import "./VideoEditing.css";

/*
  ვიდეოების მისამართები:
  ლოკალური ვიდეო: /Videos/lesson-01.mp4
  YouTube: https://www.youtube.com/watch?v=VIDEO_ID

  თუ videoUrl ცარიელია, გაკვეთილის ფანჯარაში
  გამოჩნდება ვიდეოს დამატების შეტყობინება.
*/

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
    videoUrl: "",
  },
  {
    number: "02",
    category: "SOFTWARE",
    title: "მონტაჟის პროგრამა",
    description:
      "პროგრამის ინტერფეისის და ძირითადი ინსტრუმენტების სრულად გაცნობა.",
    topics: ["Interface", "Timeline", "Tools", "Project Settings"],
    videoUrl: "",
  },
  {
    number: "03",
    category: "CUT & EDIT",
    title: "Cut & Edit",
    description:
      "კადრების სწორად დაჭრა, აწყობა და ვიდეოს ისტორიის შექმნა.",
    topics: ["Cutting", "Trim", "Transitions", "Timeline Editing"],
    videoUrl: "",
  },
  {
    number: "04",
    category: "RHYTHM",
    title: "კადრის რიტმი",
    description:
      "როგორ შევქმნათ დინამიკური და საინტერესო ვიდეო მხოლოდ მონტაჟის საშუალებით.",
    topics: ["Pacing", "Rhythm", "Storytelling", "Dynamic Editing"],
    videoUrl: "",
  },
  {
    number: "05",
    category: "SOUND",
    title: "აუდიო & Sound Design",
    description:
      "ხმის დამუშავება და Sound Design-ის გამოყენება ვიდეოს გასაძლიერებლად.",
    topics: ["Audio Editing", "Sound Effects", "Music", "Mixing"],
    videoUrl: "",
  },
  {
    number: "06",
    category: "COLOR",
    title: "Color Correction",
    description:
      "ვიდეოს ფერის კორექციისა და ტექნიკურად სწორი გამოსახულების შექმნა.",
    topics: ["Color Correction", "Exposure", "White Balance", "Skin Tones"],
    videoUrl: "",
  },
  {
    number: "07",
    category: "GRADING",
    title: "Color Grading",
    description:
      "საბაზისო კორექციიდან საკუთარი ვიზუალური სტილის შექმნამდე.",
    topics: ["Look Development", "Creative Grade", "Contrast", "Color Style"],
    videoUrl: "",
  },
  {
    number: "08",
    category: "MOTION",
    title: "Motion & Effects",
    description:
      "მოძრავი ელემენტების, ტექსტისა და ვიზუალური ეფექტების გამოყენება.",
    topics: ["Keyframes", "Motion", "Text Animation", "Visual Effects"],
    videoUrl: "",
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
    videoUrl: "",
  },
  {
    number: "10",
    category: "PROJECT",
    title: "რეალური პროექტი",
    description:
      "ყველა ნასწავლი ტექნიკის გამოყენება ერთ რეალურ პროექტში.",
    topics: ["Project Planning", "Editing", "Sound", "Color"],
    videoUrl: "",
  },
  {
    number: "11",
    category: "PORTFOLIO",
    title: "პორტფოლიო",
    description:
      "პროფესიონალური ნამუშევრის შექმნა და მისი სწორად წარმოდგენა.",
    topics: ["Portfolio Piece", "Presentation", "Export", "Final Polish"],
    videoUrl: "",
  },
  {
    number: "12",
    category: "FINAL PROJECT",
    title: "Final Project",
    description:
      "კურსის საბოლოო პროექტი — ყველაფერი, რაც ვისწავლეთ, ერთ ნამუშევარში.",
    topics: ["Final Edit", "Professional Review", "Export", "Portfolio Ready"],
    videoUrl: "",
  },
];

function getYouTubeEmbedUrl(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    let videoId = null;

    if (host === "youtu.be") {
      videoId = parsed.pathname.split("/").filter(Boolean)[0];
    } else if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtube-nocookie.com"
    ) {
      if (parsed.pathname === "/watch") {
        videoId = parsed.searchParams.get("v");
      } else {
        const match = parsed.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/);
        videoId = match?.[1] || null;
      }
    }

    return videoId
      ? `https://www.youtube-nocookie.com/embed/${videoId}`
      : null;
  } catch {
    return null;
  }
}

function isLocalVideo(url) {
  return /\.(mp4|webm|ogg|mov)(?:$|[?#])/i.test(url || "");
}

function LessonVideo({ lesson }) {
  const videoUrl = lesson.videoUrl?.trim() || "";
  const youtubeUrl = getYouTubeEmbedUrl(videoUrl);
  const localVideo = isLocalVideo(videoUrl);

  if (youtubeUrl) {
    return (
      <iframe
        src={youtubeUrl}
        title={lesson.title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  if (localVideo) {
    return (
      <video
        src={videoUrl}
        controls
        playsInline
        preload="metadata"
      >
        შენი ბრაუზერი ვიდეოს დაკვრას ვერ ახერხებს.
      </video>
    );
  }

  return (
    <div className="ve-video-placeholder">
      <div className="ve-video-placeholder-icon">
        <FaPlay />
      </div>
      <strong>ვიდეო მალე დაემატება</strong>
      <p>
        ამ გაკვეთილის ვიდეოს საჩვენებლად დაამატე YouTube-ის ბმული
        ან MP4 ფაილის მისამართი.
      </p>
    </div>
  );
}

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
        setActiveLesson(null);
        document.body.classList.remove("ve-modal-open");
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.classList.remove("ve-modal-open");
    };
  }, []);

  const lesson = activeLesson !== null
    ? curriculumData[activeLesson]
    : null;

  return (
    <main className="ve-page">
      {/* HERO */}

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
            <span className="ve-hero-top-center">VIDEO EDITING</span>
            <span>2026</span>
          </div>

          <div className="ve-hero-main">
            {/* LEFT SIDE */}

            <div className="ve-hero-left">
              <div className="ve-eyebrow">
                <span />
                PROFESSIONAL VIDEO EDITING
              </div>

              <h1>
                <span>EDIT</span>
                <span className="ve-outline">CREATE</span>
                <span className="ve-purple">INSPIRE</span>
              </h1>

              <p className="ve-hero-description">
                ისწავლე პროფესიონალური ვიდეო მონტაჟი
                ნულიდან რეალურ პროექტებამდე და შექმენი
                შენი საკუთარი ვიზუალური სტილი.
              </p>

              <div className="ve-hero-actions">
                <a href="#ve-curriculum" className="ve-primary-button">
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

            {/* RIGHT SIDE — REAL VIDEO */}

            <div className="ve-hero-visual ve-hero-video-visual">
              <div className="ve-visual-number">01</div>

              <div className="ve-hero-video-frame">
                <div className="ve-hero-video-top">
                  <span>EDIT ACADEMY</span>

                  <div className="ve-video-status">
                    <span />
                    VIDEO PREVIEW
                  </div>
                </div>

                <div className="ve-hero-video-player">
                  <video
                    src="../public/videos/mentor-1.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    preload="metadata"
                    aria-label="ვიდეო მონტაჟის კურსის პრეზენტაცია"
                  >
                    შენი ბრაუზერი ვიდეოს დაკვრას ვერ ახერხებს.
                  </video>
                </div>

                <div className="ve-hero-video-bottom">
                  <span>VIDEO EDITING</span>
                  <span>4K · 24 FPS</span>
                </div>
              </div>

              <div className="ve-floating-card ve-floating-one">
                <span>EDITING</span>
                <strong>MASTER</strong>
              </div>

              <div className="ve-floating-card ve-floating-two">
                <span>YOUR FUTURE</span>
                <strong>CREATE</strong>
              </div>
            </div>
          </div>

          <div className="ve-hero-bottom">
            <span>LEARN BY DOING</span>
            <div className="ve-scroll-line">
              <span />
            </div>
            <span>SCROLL TO EXPLORE</span>
          </div>
        </div>
      </section>

      {/* CURRICULUM */}

      <section className="ve-curriculum" id="ve-curriculum">
        <div className="ve-container">
          <div className="ve-curriculum-header">
            <div>
              <span className="ve-section-number">01 / CURRICULUM</span>
              <h2>
                LEARN
                <span>TO EDIT</span>
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

          <div className="ve-card-grid">
            {curriculumData.map((item, index) => (
              <button
                type="button"
                className="ve-course-card"
                key={item.number}
                onClick={() => openLesson(index)}
                aria-label={`${item.title} — გაკვეთილის გახსნა`}
              >
                <div className="ve-card-bg-number">{item.number}</div>

                <div className="ve-card-top">
                  <span className="ve-card-number">{item.number}</span>
                  <span className="ve-card-category">{item.category}</span>
                  <span className="ve-card-arrow">
                    <FaArrowRight />
                  </span>
                </div>

                <div className="ve-card-icon">
                  <FaPlay />
                </div>

                <div className="ve-card-body">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>

                <div className="ve-card-bottom">
                  <span>VIEW MODULE</span>
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
              <span>12 MODULES</span>
              <strong>FROM RAW FOOTAGE TO FINAL CUT.</strong>
            </div>

            <div className="ve-footer-arrow">
              <FaArrowRight />
            </div>
          </div>
        </div>
      </section>

      {/* LESSON MODAL — INFO LEFT, VIDEO RIGHT */}

      {lesson && (
        <div
          className="ve-card-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeLesson();
            }
          }}
        >
          <div
            className="ve-active-card"
            role="dialog"
            aria-modal="true"
            aria-label={lesson.title}
          >
            <button
              type="button"
              className="ve-close-button"
              onClick={closeLesson}
              aria-label="დახურვა"
            >
              <FaTimes />
            </button>

            <div className="ve-active-glow" />
            <div className="ve-active-number">{lesson.number}</div>

            <div className="ve-active-top">
              <span>{lesson.category}</span>
              <div className="ve-active-icon">
                <FaPlay />
              </div>
            </div>

            <div className="ve-active-layout">
              <div className="ve-active-info">
                <div className="ve-active-content">
                  <h3>{lesson.title}</h3>
                  <p>{lesson.description}</p>
                </div>

                <div className="ve-active-divider" />

                <div className="ve-active-learning">
                  <span>WHAT YOU WILL LEARN</span>

                  <div className="ve-active-topics">
                    {lesson.topics.map((topic, index) => (
                      <div className="ve-active-topic" key={topic}>
                        <span>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <strong>{topic}</strong>
                        <FaCheck />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="ve-active-footer">
                  <div>
                    <span>PRACTICAL EXPERIENCE</span>
                    <strong>რეალურ პროექტზე მუშაობა</strong>
                  </div>
                  <FaArrowRight />
                </div>
              </div>

              <div className="ve-active-video-column">
                <div className="ve-video-heading">
                  <span>LESSON PREVIEW</span>
                  <span>{lesson.number} / 12</span>
                </div>

                <div className="ve-active-video">
                  <LessonVideo lesson={lesson} />
                </div>

                <p className="ve-video-caption">{lesson.title}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
