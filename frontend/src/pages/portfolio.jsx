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
    title: "Cinematic Brand Film",
    category: "ვიდეო მონტაჟი",
    type: "Video Editing",
    description:
      "ბრენდული ვიდეო თანამედროვე cinematic მონტაჟით, ფერის კორექციითა და sound design-ით.",
    tags: ["Premiere Pro", "Color Grading", "Sound Design"],
  },

  {
    id: 2,
    title: "Social Media Campaign",
    category: "სოციალური მედია",
    type: "Social Media",
    description:
      "Instagram Reels-ისა და TikTok-ისთვის შექმნილი დინამიკური მოკლე ვიდეოების სერია.",
    tags: ["Reels", "TikTok", "Motion"],
  },

  {
    id: 3,
    title: "Motion Typography",
    category: "Motion Design",
    type: "Motion Design",
    description:
      "თანამედროვე kinetic typography და ტექსტზე დაფუძნებული დინამიკური ანიმაციები.",
    tags: ["Keyframes", "Typography", "Animation"],
  },

  {
    id: 4,
    title: "Cinematic Color",
    category: "Color Grading",
    type: "Color Grading",
    description:
      "ვიდეოს ვიზუალური სტილის შექმნა Lumetri Color-ისა და cinematic color grading-ის გამოყენებით.",
    tags: ["Lumetri", "LUT", "Cinematic"],
  },

  {
    id: 5,
    title: "YouTube Content",
    category: "YouTube",
    type: "YouTube",
    description:
      "YouTube ვიდეოს სრული პოსტ-პროდაქშენი, მონტაჟი, sound design და ვიზუალური ეფექტები.",
    tags: ["YouTube", "Editing", "Effects"],
  },

  {
    id: 6,
    title: "Commercial Edit",
    category: "რეკლამა",
    type: "Commercial",
    description:
      "მოკლე სარეკლამო ვიდეო სწრაფი მონტაჟითა და თანამედროვე ვიზუალური ეფექტებით.",
    tags: ["Commercial", "Effects", "Editing"],
  },
];

const categories = [
  "ყველა",
  "ვიდეო მონტაჟი",
  "Motion Design",
  "Color Grading",
  "სოციალური მედია",
  "YouTube",
  "რეკლამა",
];

const Portfolio = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ყველა");
  const [selectedProject, setSelectedProject] = useState(null);

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

      {/* =========================================
          HERO
      ========================================= */}

      <div className="portfolio-hero">

        <div className="portfolio-hero-content">

          <span className="portfolio-eyebrow">
            EDIT ACADEMY / PORTFOLIO
          </span>

          <h1>
            იდეები,
            <br />
            რომლებიც <span>მოძრაობენ.</span>
          </h1>

          <p>
            გაეცანი ჩვენს პროექტებს, ვიდეოებს და
            ვიზუალურ ნამუშევრებს. აქ ნახავ იმ
            მიმართულებებს, რომლებსაც Edit Academy-ში
            შეისწავლი.
          </p>

        </div>

        <div className="portfolio-hero-side">

          <div className="portfolio-hero-index">
            06
          </div>

          <span>
            PROJECTS
          </span>

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
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="მოძებნე პროექტი..."
            aria-label="პროექტის ძებნა"
          />

          {search && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="ძიების გასუფთავება"
            >
              <FaTimes />
            </button>
          )}

        </div>


        {/* CATEGORIES */}

        <div className="portfolio-categories">

          {categories.map((category) => (
            <button
              type="button"
              key={category}
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
          PROJECT GRID
      ========================================= */}

      {filteredProjects.length > 0 ? (

        <div className="portfolio-grid">

          {filteredProjects.map((project, index) => (

            <article
              className={`portfolio-project-card ${
                index === 0
                  ? "portfolio-project-featured"
                  : ""
              }`}
              key={project.id}
            >

              {/* VISUAL */}

              <div className="project-visual">

                <div className="project-visual-bg">
                  <span>
                    {String(project.id).padStart(2, "0")}
                  </span>
                </div>

                <div className="project-play">
                  <FaPlay />
                </div>

                <span className="project-type">
                  {project.type}
                </span>

              </div>


              {/* CONTENT */}

              <div className="project-content">

                <div className="project-top">

                  <span className="project-number">
                    {String(project.id).padStart(2, "0")}
                  </span>

                  <button
                    type="button"
                    className="project-open"
                    onClick={() =>
                      setSelectedProject(project)
                    }
                    aria-label="პროექტის ნახვა"
                  >
                    <FaArrowUpRightFromSquare />
                  </button>

                </div>

                <span className="project-category">
                  {project.category}
                </span>

                <h3>
                  {project.title}
                </h3>

                <p>
                  {project.description}
                </p>


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

      ) : (

        /* =========================================
           EMPTY
        ========================================= */

        <div className="portfolio-empty">

          <div className="portfolio-empty-icon">
            <FaSearch />
          </div>

          <h3>
            პროექტი ვერ მოიძებნა
          </h3>

          <p>
            სცადე სხვა საძიებო სიტყვა ან კატეგორია.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setActiveCategory("ყველა");
            }}
          >
            ფილტრების გასუფთავება
          </button>

        </div>

      )}


      {/* =========================================
          CTA
      ========================================= */}

      <section className="portfolio-cta">

        <div>

          <span>
            HAVE A PROJECT IN MIND?
          </span>

          <h2>
            შენი იდეა შემდეგი
            <br />
            პროექტი შეიძლება იყოს.
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
          onClick={() =>
            setSelectedProject(null)
          }
        >

          <div
            className="portfolio-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="portfolio-modal-close"
              onClick={() =>
                setSelectedProject(null)
              }
              aria-label="დახურვა"
            >
              <FaTimes />
            </button>

            <div className="portfolio-modal-visual">

              <span>
                {String(
                  selectedProject.id
                ).padStart(2, "0")}
              </span>

              <FaPlay />

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