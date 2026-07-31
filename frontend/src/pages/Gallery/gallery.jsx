import { useState } from "react";
import {
  FaPlay,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

import "./gallery.css";

const galleryItems = [
  {
    id: 1,
    category: "COURSE",
    title: "Adobe Premiere Pro",
    description: "ვიდეო მონტაჟის სამუშაო პროცესი",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    category: "EDITING",
    title: "Creative Editing",
    description: "თანამედროვე ვიდეო მონტაჟი",
    image:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    category: "COLOR",
    title: "Color Grading",
    description: "ფერის პროფესიონალური კორექცია",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    category: "CREATIVE",
    title: "Motion Design",
    description: "დინამიკური ვიზუალური ანიმაციები",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    category: "PROJECT",
    title: "Timeline Workflow",
    description: "პროფესიონალური სამუშაო პროცესი",
    image:
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 6,
    category: "COURSE",
    title: "Creative Studio",
    description: "სასწავლო გარემო და პრაქტიკა",
    image:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1200&q=85",
  },
];

const filters = [
  "ყველა",
  "COURSE",
  "EDITING",
  "COLOR",
  "CREATIVE",
  "PROJECT",
];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("ყველა");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems =
    activeFilter === "ყველა"
      ? galleryItems
      : galleryItems.filter(
          (item) => item.category === activeFilter
        );

  const currentIndex = selectedImage
    ? filteredItems.findIndex(
        (item) => item.id === selectedImage.id
      )
    : -1;

  const openNext = () => {
    if (!filteredItems.length) return;

    const nextIndex =
      currentIndex === filteredItems.length - 1
        ? 0
        : currentIndex + 1;

    setSelectedImage(filteredItems[nextIndex]);
  };

  const openPrevious = () => {
    if (!filteredItems.length) return;

    const previousIndex =
      currentIndex <= 0
        ? filteredItems.length - 1
        : currentIndex - 1;

    setSelectedImage(filteredItems[previousIndex]);
  };

  return (
    <section className="gallery-page">

      {/* HERO */}

      <div className="gallery-hero">

        <div className="gallery-hero-content">

          <span className="gallery-eyebrow">
            EDIT ACADEMY / GALLERY
          </span>

          <h1>
            ჩვენი
            <span> ნამუშევრები.</span>
          </h1>

          <p>
            გაეცანი EditAcademy-ის კრეატიულ სამყაროს,
            სასწავლო პროცესს და ვიდეო მონტაჟთან
            დაკავშირებულ პროექტებს.
          </p>

        </div>

        <div className="gallery-hero-number">
          <strong>06</strong>
          <span>PROJECTS</span>
        </div>

      </div>


      {/* FILTERS */}

      <div className="gallery-toolbar">

        <div className="gallery-filters">

          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={
                activeFilter === filter
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveFilter(filter)
              }
            >
              {filter}
            </button>
          ))}

        </div>

        <span className="gallery-count">
          {filteredItems.length} ნამუშევარი
        </span>

      </div>


      {/* GALLERY GRID */}

      <div className="gallery-grid">

        {filteredItems.map((item, index) => (

          <article
            className={`gallery-card gallery-card-${index + 1}`}
            key={item.id}
            onClick={() => setSelectedImage(item)}
          >

            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
            />

            <div className="gallery-card-overlay">

              <div className="gallery-card-top">
                <span>
                  {item.category}
                </span>

                <span className="gallery-card-play">
                  <FaPlay />
                </span>
              </div>

              <div className="gallery-card-info">

                <h2>
                  {item.title}
                </h2>

                <p>
                  {item.description}
                </p>

              </div>

            </div>

          </article>

        ))}

      </div>


      {/* BOTTOM CTA */}

      <div className="gallery-cta">

        <div>

          <span>
            READY TO CREATE?
          </span>

          <h2>
            შენი პროექტი
            <br />
            შეიძლება იყოს შემდეგი.
          </h2>

        </div>

        <NavLink
          to="/contact"
          className="gallery-cta-button"
        >
          დაგვიკავშირდი
          <FaArrowRight />
        </NavLink>

      </div>


      {/* LIGHTBOX */}

      {selectedImage && (

        <div
          className="gallery-lightbox"
          onClick={() => setSelectedImage(null)}
        >

          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={() =>
              setSelectedImage(null)
            }
            aria-label="Close"
          >
            <FaTimes />
          </button>


          <button
            type="button"
            className="gallery-lightbox-prev"
            onClick={(event) => {
              event.stopPropagation();
              openPrevious();
            }}
            aria-label="Previous"
          >
            <FaChevronLeft />
          </button>


          <div
            className="gallery-lightbox-content"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
            />

            <div className="gallery-lightbox-caption">

              <span>
                {selectedImage.category}
              </span>

              <h2>
                {selectedImage.title}
              </h2>

              <p>
                {selectedImage.description}
              </p>

            </div>

          </div>


          <button
            type="button"
            className="gallery-lightbox-next"
            onClick={(event) => {
              event.stopPropagation();
              openNext();
            }}
            aria-label="Next"
          >
            <FaChevronRight />
          </button>

        </div>

      )}

    </section>
  );
};

export default Gallery;