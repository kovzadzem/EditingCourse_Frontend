
import React, { useState } from "react";
import {
  FaArrowRight,
  FaPlay,
  FaTimes,
  FaVideo,
} from "react-icons/fa";
import "./Portfolio.css";

const projects = [
  {
    id: 1,
    category: "brand",
    label: "BRAND",
    title: "Editologia × Creator",
    logo: "E  D I T O L O G I A",
    image: "/images/portfolio/creator.png",
    secondImage: "/images/portfolio/brand-symbol.png",
    video: "https://www.youtube.com/embed/YOUTUBE_ID_HERE",
  },
  {
    id: 2,
    category: "course",
    label: "COURSE",
    title: "E d i t o l o g i a ",
    logo: "EDITOLOGIA",
    secondLine: "PRODUCTION",
    video: "https://www.youtube.com/embed/YOUTUBE_ID_HERE",
  },
  {
    id: 3,
    category: "backstage",
    label: "BACKSTAGE",
    title: "Creative Production",
    logo: "C C",
    image: "/images/portfolio/tbc-bank.png",
    video: "https://www.youtube.com/shorts/jizqW-P9SlM",
  },
  {
    id: 4,
    category: "brand",
    label: "BRAND",
    title: "Brand Project 02",
    logo: "T B I L I S I   A U T O   G A L E R Y",
    image: "/images/portfolio/brand-2.png",
    video: "https://www.youtube.com/shorts/6QBqW4cso3c",
  },
  {
    id: 5,
    category: "brand",
    label: "BRAND",
    title: "Brand Project 03",
    logo: "Z O O M E R",
    image: "/images/portfolio/brand-3.png",
    video: "https://www.youtube.com/shorts/vnL-V-BGtL0",
  },
  {
    id: 6,
    category: "brand",
    label: "BRAND",
    title: "Brand Project 04",
    logo: "Z E E K R",
    image: "/images/portfolio/brand-4.png",
    video: "https://www.youtube.com/shorts/9GIDRrhqp04",
  },
  {
    id: 7,
    category: "brand",
    label: "BRAND",
    title: "Brand Project 05",
    logo: "C C  X  R A C H A",
    image: "/images/portfolio/brand-5.png",
    video: "https://www.youtube.com/shorts/sgDyefpkJ3g",
  },
  {
    id: 8,
    category: "brand",
    label: "BRAND",
    title: "Brand Project 06",
    logo: "C C  X  K A P R I",
    image: "/images/portfolio/brand-6.png",
    video: "https://www.youtube.com/shorts/UPK7e-gsWrM",
  },
  {
    id: 9,
    category: "brand",
    label: "BRAND",
    title: "Brand Project 07",
    logo: "E D I T O L O G I A",
    image: "/images/portfolio/brand-7.png",
    video: "https://www.youtube.com/shorts/rCrLT-20IiM",
  },
  {
    id: 10,
    category: "brand",
    label: "BRAND",
    title: "Brand Project 08",
    logo: "V  O L V O  X  S T O C K T O N",
    image: "/images/portfolio/brand-8.png",
    video: "https://www.youtube.com/shorts/71PXAWOEwAQ",
  },
  {
    id: 11,
    category: "course",
    label: "COURSE",
    title: "Student Project",
    logo: "Z O O M E R",
    secondLine: "STUDENT PROJECT",
    video: "https://www.youtube.com/shorts/rmydmTt2VfE",
  },
  {
    id: 12,
    category: "backstage",
    label: "BACKSTAGE",
    title: "Behind The Scenes 02",
    logo: "C C  X  K A P R I",
    image: "/images/portfolio/backstage-2.png",
    video: "https://www.youtube.com/shorts/EFOxdDOKEP4",
  },
  {
    id: 13,
    category: "backstage",
    label: "BACKSTAGE",
    title: "Behind The Scenes 03",
    logo: "V O L V O",
    image: "/images/portfolio/backstage-3.png",
    video: "https://www.youtube.com/shorts/CPd6mPJYeTM",
  },
  {
    id: 14,
    category: "backstage",
    label: "BACKSTAGE",
    title: "Behind The Scenes 04",
    logo: "L B  X  R A F",
    image: "/images/portfolio/backstage-4.png",
    video: "https://www.youtube.com/watch?v=nhaz6w1VnuQ",
  },
  {
    id: 15,
    category: "event",
    label: "EVENT",
    title: "Creative Event",
    logo: "M A Z D A",
    image: "/images/portfolio/event.png",
    video: "https://www.youtube.com/shorts/ZBpaJ46xEz4",
  },
];

const filters = [
  { id: "all", label: "ALL" },
  { id: "brand", label: "BRAND" },
  { id: "course", label: "COURSE" },
  { id: "backstage", label: "BACKSTAGE" },
  { id: "event", label: "EVENT" },
];

/* YouTube ბმულის გარდაქმნა embed ფორმატში */
function getYoutubeEmbed(url) {
  if (!url) return "";

  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.replace(/^www\./, "");
    let videoId = "";

    if (hostname === "youtu.be") {
      videoId = parsed.pathname.split("/").filter(Boolean)[0] || "";
    } else if (
      [
        "youtube.com",
        "m.youtube.com",
        "youtube-nocookie.com",
      ].includes(hostname)
    ) {
      const segments = parsed.pathname.split("/").filter(Boolean);

      if (
        ["embed", "shorts", "live"].includes(segments[0]) &&
        segments[1]
      ) {
        videoId = segments[1];
      } else {
        videoId = parsed.searchParams.get("v") || "";
      }
    }

    if (!videoId || videoId === "YOUTUBE_ID_HERE") {
      return "";
    }

    const embedUrl = new URL(
      `https://www.youtube.com/embed/${videoId}`
    );

    embedUrl.searchParams.set("autoplay", "1");
    embedUrl.searchParams.set("rel", "0");
    embedUrl.searchParams.set("playsinline", "1");

    return embedUrl.toString();
  } catch {
    return "";
  }
}

function ProjectLogo({ project }) {
  return (
    <div className={`reference-logo reference-logo-${project.id}`}>
      {project.image && (
        <img
          className="reference-partner-logo"
          src={project.image}
          alt=""
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      )}

      <div className="reference-logo-main">
        {project.id === 3 ? (
          <span className="reference-cc-logo">CC</span>
        ) : (
          <>
            <span className="reference-editologia-logo">
              {project.logo}
            </span>

            {project.secondLine && (
              <span className="reference-production-logo">
                {project.secondLine}
              </span>
            )}
          </>
        )}
      </div>

      {project.secondImage && (
        <img
          className="reference-symbol-logo"
          src={project.secondImage}
          alt=""
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      )}
    </div>
  );
}

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const visibleProjects =
    activeFilter === "all"
      ? projects
      : projects.filter(
          (project) => project.category === activeFilter
        );

  const counts = {
    all: projects.length,
    brand: projects.filter(
      (project) => project.category === "brand"
    ).length,
    course: projects.filter(
      (project) => project.category === "course"
    ).length,
    backstage: projects.filter(
      (project) => project.category === "backstage"
    ).length,
    event: projects.filter(
      (project) => project.category === "event"
    ).length,
  };

  const selectedVideo = selectedProject
    ? getYoutubeEmbed(selectedProject.video)
    : "";

  return (
    <main className="portfolio-page">
      <section className="portfolio-hero">
        <div className="portfolio-container portfolio-hero-grid">
          <div className="portfolio-hero-content">
            <span className="portfolio-eyebrow">
              <span className="eyebrow-dot" />
              EDIT ACADEMY · PORTFOLIO
            </span>

            <h1>
              იდეიდან
              <br />
              <span>შთამბეჭდავ</span>
              <br />
              ვიდეომდე
            </h1>

            <p className="portfolio-hero-description">
              აღმოაჩინე ჩვენი სტუდენტებისა და მენტორის ნამუშევრები.
              რეალური პროექტები, კრეატიული ხედვა და შესაძლებლობები
              ერთ სივრცეში.
            </p>

            <div className="portfolio-hero-actions">
              <a
                href="#portfolio-works"
                className="portfolio-primary-btn"
              >
                ნამუშევრების ნახვა <FaArrowRight />
              </a>

              <div className="portfolio-hero-note">
                <span className="portfolio-note-icon">
                  <FaVideo />
                </span>

                <span>
                  <strong>{projects.length} პროექტი</strong>
                  <small>სტუდენტები და მენტორი</small>
                </span>
              </div>
            </div>

            <div className="portfolio-hero-stats">
              <div>
                <strong>08</strong>
                <span>ბრენდი</span>
              </div>

              <div>
                <strong>02</strong>
                <span>კურსი</span>
              </div>

              <div>
                <strong>05</strong>
                <span>სხვა პროექტი</span>
              </div>
            </div>
          </div>

          <div className="portfolio-hero-visual">
            <button
              type="button"
              className="hero-video-card"
              onClick={() => setSelectedProject(projects[1])}
              aria-label="ვიდეოს ნახვა"
            >
              <div className="hero-video-overlay" />

              <span className="hero-video-top-tag">
                <span />
                FEATURED WORK
              </span>

              <span className="hero-play-button">
                <FaPlay />
              </span>

              <span className="hero-video-bottom">
                <span>
                  <small>EDITOLOGIA</small>
                  <strong>კრეატიულობა კადრში</strong>
                </span>

                <span className="hero-video-arrow">
                  <FaArrowRight />
                </span>
              </span>
            </button>
          </div>
        </div>
      </section>

      <section
        className="portfolio-works reference-works"
        id="portfolio-works"
      >
        <div className="portfolio-container reference-container">
          <div className="reference-filters" role="tablist">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter.id}
                className={
                  activeFilter === filter.id ? "active" : ""
                }
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
                <sup>{counts[filter.id]}</sup>
              </button>
            ))}
          </div>

          <div className="reference-card-grid">
            {visibleProjects.map((project) => (
              <button
                type="button"
                className="reference-project-card"
                key={project.id}
                onClick={() => setSelectedProject(project)}
                aria-label={`${project.title} — ვიდეოს ნახვა`}
              >
                <span className="reference-card-number">
                  {String(project.id).padStart(2, "0")}
                </span>

                <span className="reference-card-center">
                  <ProjectLogo project={project} />

                  <span className="reference-card-category">
                    {project.label}
                  </span>
                </span>

                <span className="reference-card-play">
                  <FaPlay />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div
          className="portfolio-modal"
          onClick={() => setSelectedProject(null)}
          role="presentation"
        >
          <div
            className={`portfolio-modal-content ${
              selectedVideo ? "has-youtube-video" : ""
            }`}
            role="dialog"
            aria-modal="true"
            aria-label={selectedProject.title}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="portfolio-modal-header">
              <div>
                <span>
                  EDITOLOGIA · {selectedProject.label}
                </span>

                <h3>{selectedProject.title}</h3>
              </div>

              <button
                type="button"
                className="portfolio-modal-close"
                onClick={() => setSelectedProject(null)}
                aria-label="დახურვა"
              >
                <FaTimes />
              </button>
            </div>

            {selectedVideo ? (
              <div className="portfolio-modal-player">
                <iframe
                  key={selectedProject.id}
                  className="portfolio-modal-video reference-youtube-player"
                  src={selectedVideo}
                  title={selectedProject.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="reference-video-placeholder">
                <FaVideo />

                <strong>
                  YouTube ვიდეო ჯერ არ არის მითითებული
                </strong>

                <span>
                  ამ პროექტისთვის დაამატე YouTube ვიდეოს სწორი ბმული.
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default Portfolio;
