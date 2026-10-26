
import React, { useState } from "react";
import {
  FaArrowRight,
  FaPlay,
  FaTimes,
  FaVideo,
} from "react-icons/fa";
import "./Portfolio.css";

/*
  ჩაანაცვლე YOUTUBE_ID_HERE შესაბამისი ვიდეოს ID-ით.
  მაგალითად:
  https://www.youtube.com/watch?v=ABC123
  ID არის ABC123.

  ლოგოები მოათავსე public/images/portfolio/ საქაღალდეში.
*/

const projects = [
  {
    id: 1,
    category: "brand",
    label: "BRAND",
    title: "Editologia × Creator",
    logo: "EDITOLOGIA",
    image: "/images/portfolio/creator.png",
    secondImage: "/images/portfolio/brand-symbol.png",
    video: "https://www.youtube.com/embed/YOUTUBE_ID_HERE",
  },
  {
    id: 2,
    category: "course",
    label: "COURSE",
    title: "Editologia Production",
    logo: "EDITOLOGIA",
    secondLine: "PRODUCTION",
    video: "https://www.youtube.com/embed/YOUTUBE_ID_HERE",
  },
  {
    id: 3,
    category: "backstage",
    label: "BACKSTAGE",
    title: "Creative Production",
    logo: "CC",
    image: "/images/portfolio/tbc-bank.png",
    video: "https://www.youtube.com/embed/YOUTUBE_ID_HERE",
  },
  {
    id: 4,
    category: "brand",
    label: "BRAND",
    title: "Brand Project 02",
    logo: "EDITOLOGIA",
    image: "/images/portfolio/brand-2.png",
    video: "https://www.youtube.com/embed/YOUTUBE_ID_HERE",
  },
  {
    id: 5,
    category: "brand",
    label: "BRAND",
    title: "Brand Project 03",
    logo: "EDITOLOGIA",
    image: "/images/portfolio/brand-3.png",
    video: "https://www.youtube.com/embed/YOUTUBE_ID_HERE",
  },
  {
    id: 6,
    category: "brand",
    label: "BRAND",
    title: "Brand Project 04",
    logo: "EDITOLOGIA",
    image: "/images/portfolio/brand-4.png",
    video: "https://www.youtube.com/embed/YOUTUBE_ID_HERE",
  },
  {
    id: 7,
    category: "brand",
    label: "BRAND",
    title: "Brand Project 05",
    logo: "EDITOLOGIA",
    image: "/images/portfolio/brand-5.png",
    video: "https://www.youtube.com/embed/YOUTUBE_ID_HERE",
  },
  {
    id: 8,
    category: "brand",
    label: "BRAND",
    title: "Brand Project 06",
    logo: "EDITOLOGIA",
    image: "/images/portfolio/brand-6.png",
    video: "https://www.youtube.com/embed/YOUTUBE_ID_HERE",
  },
  {
    id: 9,
    category: "brand",
    label: "BRAND",
    title: "Brand Project 07",
    logo: "EDITOLOGIA",
    image: "/images/portfolio/brand-7.png",
    video: "https://www.youtube.com/embed/YOUTUBE_ID_HERE",
  },
  {
    id: 10,
    category: "brand",
    label: "BRAND",
    title: "Brand Project 08",
    logo: "EDITOLOGIA",
    image: "/images/portfolio/brand-8.png",
    video: "https://www.youtube.com/embed/YOUTUBE_ID_HERE",
  },
  {
    id: 11,
    category: "course",
    label: "COURSE",
    title: "Student Project",
    logo: "EDITOLOGIA",
    secondLine: "STUDENT PROJECT",
    video: "https://www.youtube.com/embed/YOUTUBE_ID_HERE",
  },
  {
    id: 12,
    category: "backstage",
    label: "BACKSTAGE",
    title: "Behind The Scenes 02",
    logo: "EDITOLOGIA",
    image: "/images/portfolio/backstage-2.png",
    video: "https://www.youtube.com/embed/YOUTUBE_ID_HERE",
  },
  {
    id: 13,
    category: "backstage",
    label: "BACKSTAGE",
    title: "Behind The Scenes 03",
    logo: "EDITOLOGIA",
    image: "/images/portfolio/backstage-3.png",
    video: "https://www.youtube.com/embed/YOUTUBE_ID_HERE",
  },
  {
    id: 14,
    category: "backstage",
    label: "BACKSTAGE",
    title: "Behind The Scenes 04",
    logo: "EDITOLOGIA",
    image: "/images/portfolio/backstage-4.png",
    video: "https://www.youtube.com/embed/YOUTUBE_ID_HERE",
  },
  {
    id: 15,
    category: "event",
    label: "EVENT",
    title: "Creative Event",
    logo: "EDITOLOGIA",
    image: "/images/portfolio/event.png",
    video: "https://www.youtube.com/embed/YOUTUBE_ID_HERE",
  },
];

const filters = [
  { id: "all", label: "ALL" },
  { id: "brand", label: "BRAND" },
  { id: "course", label: "COURSE" },
  { id: "backstage", label: "BACKSTAGE" },
  { id: "event", label: "EVENT" },
];

function getYoutubeEmbed(url) {
  if (!url) return "";

  if (url.includes("/embed/")) {
    return url;
  }

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    }

    const id = parsed.searchParams.get("v");

    if (id) {
      return `https://www.youtube.com/embed/${id}`;
    }

    return url;
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
    brand: projects.filter((p) => p.category === "brand").length,
    course: projects.filter((p) => p.category === "course").length,
    backstage: projects.filter((p) => p.category === "backstage").length,
    event: projects.filter((p) => p.category === "event").length,
  };

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
            className="portfolio-modal-content"
            role="dialog"
            aria-modal="true"
            aria-label={selectedProject.title}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="portfolio-modal-header">
              <div>
                <span>EDITOLOGIA · {selectedProject.label}</span>
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

            {getYoutubeEmbed(selectedProject.video).includes(
              "YOUTUBE_ID_HERE"
            ) || !getYoutubeEmbed(selectedProject.video) ? (
              <div className="reference-video-placeholder">
                <FaVideo />
                <strong>YouTube ვიდეო ჯერ არ არის მითითებული</strong>
                <span>
                  შეცვალე YOUTUBE_ID_HERE შენი ვიდეოს ID-ით.
                </span>
              </div>
            ) : (
              <iframe
                key={selectedProject.id}
                className="portfolio-modal-video reference-youtube-player"
                src={`${getYoutubeEmbed(selectedProject.video)}?autoplay=1&rel=0`}
                title={selectedProject.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default Portfolio;
