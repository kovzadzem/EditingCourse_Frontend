import { useMemo, useState } from "react";
import {
  FaSearch,
  FaTimes,
  FaPlay,
  FaArrowRight,
} from "react-icons/fa";

import "./Portfolio.css";

const projects = [
  {
    id: 1,
    title: "Cinematic Brand Film",
    category: "ვიდეო",
    type: "Video Production",
    description:
      "კინემატოგრაფიული სარეკლამო ვიდეო თანამედროვე ვიზუალური სტილით.",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Product Advertisement",
    category: "რეკლამა",
    type: "Advertising",
    description:
      "პროდუქტის სარეკლამო ვიდეო დინამიკური მონტაჟითა და ვიზუალური ეფექტებით.",
    image:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Motion Graphics Project",
    category: "Motion",
    type: "Motion Design",
    description:
      "Motion Design პროექტი თანამედროვე ანიმაციებითა და kinetic typography-ით.",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title: "Fashion Campaign",
    category: "ვიდეო",
    type: "Commercial",
    description:
      "Fashion კამპანიის ვიდეო თანამედროვე color grading-ით.",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    title: "Instagram Reels Pack",
    category: "Reels",
    type: "Content Creation",
    description:
      "ბრენდისთვის შექმნილი მოკლე ვიდეოების კოლექცია სოციალური მედიისთვის.",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
  },
];

const categories = [
  "ყველა",
  "ვიდეო",
  "Reels",
  "რეკლამა",
  "Motion",
];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("ყველა");
  const [search, setSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "ყველა" ||
        project.category === activeCategory;

      const searchableText = `
        ${project.title}
        ${project.category}
        ${project.type}
        ${project.description}
      `.toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <section className="portfolio-page">

      {/* HERO */}

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
            ნახე პროექტები, რომლებიც შეიქმნა ვიდეო
            მონტაჟის, Motion Design-ისა და თანამედროვე
            ვიზუალური storytelling-ის გამოყენებით.
          </p>

        </div>

        <div className="portfolio-hero-number">
          <strong>06</strong>
          <span>PROJECTS</span>
        </div>

      </div>


      {/* TOOLBAR */}

      <div className="portfolio-toolbar">

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


        <div className="portfolio-search">

          <FaSearch />

          <input
            type="text"
            placeholder="მოძებნე პროექტი..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
            >
              <FaTimes />
            </button>
          )}

        </div>

      </div>


      {/* PROJECT GRID */}

      {filteredProjects.length > 0 ? (

        <div className="portfolio-grid">

          {filteredProjects.map((project, index) => (

            <article
              className={`portfolio-card ${
                index === 0
                  ? "portfolio-card-featured"
                  : ""
              }`}
              key={project.id}
              onClick={() =>
                setSelectedProject(project)
              }
            >

              <div className="portfolio-image">

                <img
                  src={project.image}
                  alt={project.title}
                />

                <div className="portfolio-image-overlay">

                  <span className="portfolio-play">
                    <FaPlay />
                  </span>

                  <span className="portfolio-view">
                    ნახვა
                    <FaArrowRight />
                  </span>

                </div>

              </div>


              <div className="portfolio-card-info">

                <div>

                  <span className="portfolio-card-category">
                    {project.category}
                  </span>

                  <h2>
                    {project.title}
                  </h2>

                </div>

                <span className="portfolio-card-arrow">
                  <FaArrowRight />
                </span>

              </div>

            </article>

          ))}

        </div>

      ) : (

        <div className="portfolio-empty">

          <h2>პროექტი ვერ მოიძებნა</h2>

          <p>
            სცადე სხვა კატეგორია ან საძიებო სიტყვა.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setActiveCategory("ყველა");
            }}
          >
            ყველაფრის ჩვენება
          </button>

        </div>

      )}


      {/* MODAL */}

      {selectedProject && (

        <div
          className="portfolio-modal"
          onClick={() =>
            setSelectedProject(null)
          }
        >

          <div
            className="portfolio-modal-content"
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
            >
              <FaTimes />
            </button>

            <img
              src={selectedProject.image}
              alt={selectedProject.title}
            />

            <div className="portfolio-modal-info">

              <span>
                {selectedProject.category}
              </span>

              <h2>
                {selectedProject.title}
              </h2>

              <p>
                {selectedProject.description}
              </p>

              <small>
                {selectedProject.type}
              </small>

            </div>

          </div>

        </div>

      )}

    </section>
  );
};

export default Portfolio;