import { useMemo, useState } from "react";
import {
  FaSearch,
  FaPlay,
  FaTimes,
  FaArrowUpRightFromSquare,
} from "react-icons/fa";

import "./portfolio.css";

const projects = [
  {
    id: 1,
    title: "სტუდენტის პროექტი #1",
    category: "სტუდენტი",
    type: "Student",
    image: "/images/portfolio/student1.jpg",
    description:
      "Edit Academy-ის სტუდენტის მიერ შესრულებული პრაქტიკული ვიდეო მონტაჟი.",
    tags: ["Premiere Pro", "Student"],
  },

  {
    id: 2,
    title: "სტუდენტის პროექტი #2",
    category: "სტუდენტი",
    type: "Student",
    image: "/images/portfolio/student2.jpg",
    description:
      "კურსის ფარგლებში შექმნილი პროფესიონალური ვიდეო.",
    tags: ["Editing", "Student"],
  },

  {
    id: 3,
    title: "ლექტორის პროექტი #1",
    category: "ლექტორი",
    type: "Instructor",
    image: "/images/portfolio/teacher1.jpg",
    description:
      "ლექტორის პროფესიონალური კომერციული პროექტი.",
    tags: ["Commercial", "Instructor"],
  },

  {
    id: 4,
    title: "ლექტორის პროექტი #2",
    category: "ლექტორი",
    type: "Instructor",
    image: "/images/portfolio/teacher2.jpg",
    description:
      "პროფესიონალური ვიდეო მონტაჟი და Color Grading.",
    tags: ["Color", "Instructor"],
  },
];

const categories = [
  "ყველა",
  "სტუდენტი",
  "ლექტორი",
];

const Portfolio = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] =
    useState("ყველა");
  const [selectedProject, setSelectedProject] =
    useState(null);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "ყველა" ||
        project.category === activeCategory;

      const searchableText = [
        project.title,
        project.category,
        project.type,
        project.description,
        ...project.tags,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <section className="portfolio-page">

      <div className="portfolio-hero">

        <div className="portfolio-hero-content">

          <span className="portfolio-eyebrow">
            EDIT ACADEMY / PORTFOLIO
          </span>

          <h1>
            ჩვენი
            <br />
            <span>პორტფოლიო</span>
          </h1>

          <p>
            გაეცანი ჩვენი სტუდენტებისა და
            ლექტორების ნამუშევრებს.
          </p>

        </div>

        <div className="portfolio-hero-side">

          <div className="portfolio-hero-index">
            04
          </div>

          <span>PROJECTS</span>

        </div>

      </div>
            {/* =========================================
          TOOLBAR
      ========================================= */}

      <div className="portfolio-toolbar">

        <div className="portfolio-toolbar-top">

          <div>

            <span className="portfolio-section-label">
              OUR WORK
            </span>

            <h2>
              პროექტები
            </h2>

          </div>

          <span className="portfolio-result-count">
            {filteredProjects.length} პროექტი
          </span>

        </div>

        {/* SEARCH */}

        <div className="portfolio-search">

          <FaSearch />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="მოძებნე პროექტი..."
          />

          {search && (
            <button
              type="button"
              onClick={clearSearch}
            >
              <FaTimes />
            </button>
          )}

        </div>

        {/* CATEGORIES */}

        <div className="portfolio-categories">

          {categories.map((category) => (

            <button
              key={category}
              type="button"
              className={
                activeCategory === category
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveCategory(category)
              }
            >
              {category}
            </button>

          ))}

        </div>

      </div>

      {/* =========================================
          PROJECTS
      ========================================= */}

      <div className="portfolio-grid">

        {filteredProjects.map((project, index) => (

          <article
            key={project.id}
            className={`portfolio-project-card ${
              index === 0
                ? "portfolio-project-featured"
                : ""
            }`}
          >

            <div className="project-visual">

              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />

              <div className="project-play">
                <FaPlay />
              </div>

              <span className="project-type">
                {project.type}
              </span>

            </div>

            <div className="project-content">

              <div className="project-top">

                <span className="project-number">
                  {String(project.id).padStart(2, "0")}
                </span>

                <button
                  className="project-open"
                  onClick={() =>
                    setSelectedProject(project)
                  }
                >
                  <FaArrowUpRightFromSquare />
                </button>

              </div>

              <span className="project-category">
                {project.category}
              </span>

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <div className="project-tags">

                {project.tags.map((tag) => (
                  <span key={tag}>
                    {tag}
                  </span>
                ))}

              </div>

            </div>

          </article>

        ))}

      </div>
            {/* =========================================
          CTA
      ========================================= */}

      <section className="portfolio-cta">

        <div>

          <span>
            EDIT ACADEMY
          </span>

          <h2>
            შენიც შეიძლება
            <br />
            აღმოჩნდეს აქ.
          </h2>

        </div>

        <a href="/contact">
          დაგვიკავშირდი
          <span>↗</span>
        </a>

      </section>

      {/* =========================================
          MODAL
      ========================================= */}

      {selectedProject && (

        <div
          className="portfolio-modal-backdrop"
          onClick={() => setSelectedProject(null)}
        >

          <div
            className="portfolio-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="portfolio-modal-close"
              onClick={() => setSelectedProject(null)}
            >
              <FaTimes />
            </button>

            <div className="portfolio-modal-visual">

              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="project-image"
              />

            </div>

            <span className="project-category">
              {selectedProject.category}
            </span>

            <h2>
              {selectedProject.title}
            </h2>

            <p>
              {selectedProject.description}
            </p>

            <div className="project-tags">

              {selectedProject.tags.map((tag) => (
                <span key={tag}>
                  {tag}
                </span>
              ))}

            </div>

          </div>

        </div>

      )}

    </section>
  );
};

export default Portfolio;