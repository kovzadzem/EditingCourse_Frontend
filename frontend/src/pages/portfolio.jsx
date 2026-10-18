
import React, { useState } from "react";
import {
  FaArrowRight,
  FaPlay,
  FaCheck,
} from "react-icons/fa";
import "./Portfolio.css";

/* =========================================================
   BRANDS
   ლოგოების ფაილები მოათავსე:
   public/images/brands/brand-1.png
   public/images/brands/brand-2.png
   ...
   public/images/brands/brand-6.png
========================================================= */

const brands = [
  {
    name: "Brand 01",
    logo: "/images/brands/brand-1.png",
  },
  {
    name: "Brand 02",
    logo: "/images/brands/brand-2.png",
  },
  {
    name: "Brand 03",
    logo: "/images/brands/brand-3.png",
  },
  {
    name: "Brand 04",
    logo: "/images/brands/brand-4.png",
  },
  {
    name: "Brand 05",
    logo: "/images/brands/brand-5.png",
  },
  {
    name: "Brand 06",
    logo: "/images/brands/brand-6.png",
  },
];

/* =========================================================
   STUDENT WORKS
========================================================= */

const studentWorks = [
  {
    id: 1,
    image: "/images/student-1.jpg",
    title: "Commercial Edit",
    student: "სტუდენტის ნამუშევარი",
    category: "Commercial",
  },
  {
    id: 2,
    image: "/images/student-2.jpg",
    title: "Creative Story",
    student: "სტუდენტის ნამუშევარი",
    category: "Creative",
  },
  {
    id: 3,
    image: "/images/student-3.jpg",
    title: "Social Media Video",
    student: "სტუდენტის ნამუშევარი",
    category: "Social Media",
  },
  {
    id: 4,
    image: "/images/student-4.jpg",
    title: "Music Video",
    student: "სტუდენტის ნამუშევარი",
    category: "Music Video",
  },
  {
    id: 5,
    image: "/images/student-5.jpg",
    title: "Cinematic Edit",
    student: "სტუდენტის ნამუშევარი",
    category: "Cinematic",
  },
  {
    id: 6,
    image: "/images/student-6.jpg",
    title: "Brand Commercial",
    student: "სტუდენტის ნამუშევარი",
    category: "Commercial",
  },
];

/* =========================================================
   MENTOR WORKS
========================================================= */

const mentorWorks = [
  {
    id: 1,
    image: "/images/mentor-1.jpg",
    title: "Professional Commercial",
    category: "Commercial",
  },
  {
    id: 2,
    image: "/images/mentor-2.jpg",
    title: "Cinematic Storytelling",
    category: "Cinematic",
  },
  {
    id: 3,
    image: "/images/mentor-3.jpg",
    title: "Creative Campaign",
    category: "Creative",
  },
  {
    id: 4,
    image: "/images/mentor-4.jpg",
    title: "Music Video Production",
    category: "Music Video",
  },
];

/* =========================================================
   PORTFOLIO COMPONENT
========================================================= */

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("students");
  const [selectedWork, setSelectedWork] = useState(null);

  const works =
    activeTab === "students" ? studentWorks : mentorWorks;

  return (
    <main className="portfolio-page">
      {/* =====================================================
          1. HERO SECTION
      ===================================================== */}

      <section className="portfolio-hero">
        <div className="portfolio-container portfolio-hero-inner">
          <div className="portfolio-hero-content">
            <span className="portfolio-overline">
              EDIT ACADEMY · PORTFOLIO
            </span>

            <h1>
              რეალური
              <br />
              <span>ნამუშევრები.</span>
            </h1>

            <p className="portfolio-hero-description">
              ნახე ჩვენი სტუდენტებისა და მენტორის ნამუშევრები,
              გაიცანი მათი სტილი და აღმოაჩინე ვიდეომონტაჟის
              შესაძლებლობები.
            </p>

            <a href="#portfolio-works" className="portfolio-hero-button">
              ნამუშევრების ნახვა
              <FaArrowRight aria-hidden="true" />
            </a>

            <div className="portfolio-hero-stats">
              <div className="portfolio-stat">
                <strong>01</strong>
                <span>სტუდენტები</span>
              </div>

              <div className="portfolio-stat">
                <strong>02</strong>
                <span>მენტორი</span>
              </div>

              <div className="portfolio-stat">
                <strong>03</strong>
                <span>რეალური პროექტები</span>
              </div>
            </div>
          </div>

          <div className="portfolio-hero-visual">
            <div className="portfolio-hero-image">
              <img
                src="/images/portfolio-hero.jpg"
                alt="ვიდეომონტაჟის ნამუშევარი"
              />

              <div className="portfolio-hero-image-overlay">
                <span className="portfolio-play-icon">
                  <FaPlay aria-hidden="true" />
                </span>

                <div className="portfolio-hero-image-caption">
                  <span>EDIT ACADEMY</span>
                  <strong>Creative in every frame.</strong>
                </div>
              </div>
            </div>

            <div className="portfolio-hero-decoration">
              <span>EDIT</span>
              <span>CREATE</span>
              <span>REPEAT</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          2. BRANDS SECTION
          მნიშვნელოვანია: ეს სექცია HERO-ს შემდეგაა
          და STUDENTS / MENTOR ტაბების გარეთაა.
      ===================================================== */}

      <section className="portfolio-brands-after-hero">
        <div className="portfolio-container portfolio-brands-inner">
          <div className="portfolio-brands-heading">
            <div>
              <span className="portfolio-brands-eyebrow">
                TRUSTED BY
              </span>

              <h2 className="portfolio-brands-title">
                ბრენდები, რომლებთანაც ვმუშაობთ
              </h2>
            </div>

            <p className="portfolio-brands-description">
              კრეატიულობა, ხარისხი და ვიზუალური ისტორიები,
              რომლებიც სხვადასხვა ბრენდს აერთიანებს.
            </p>
          </div>

          <div className="portfolio-brands-grid">
            {brands.map((brand) => (
              <div className="portfolio-brand-card" key={brand.name}>
                <img
                  className="portfolio-brand-logo"
                  src={brand.logo}
                  alt={brand.name}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    event.currentTarget.parentElement.classList.add(
                      "portfolio-brand-card-empty"
                    );
                  }}
                />

                <span className="portfolio-brand-fallback">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          3. STUDENTS / MENTOR PORTFOLIO
          აქ იწყება ორი ტაბი.
      ===================================================== */}

      <section
        className="portfolio-section"
        id="portfolio-works"
      >
        <div className="portfolio-container">
          <div className="portfolio-section-heading">
            <span className="portfolio-overline">
              OUR PORTFOLIO
            </span>

            <h2>
              იდეები, რომლებიც
              <br />
              <span>ცოცხლდება.</span>
            </h2>

            <p>
              აირჩიე სტუდენტების ან მენტორის ნამუშევრები და
              გაეცანი სხვადასხვა სტილსა და პროექტს.
            </p>
          </div>

          {/* TABS */}

          <div className="portfolio-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "students"}
              className={
                activeTab === "students"
                  ? "portfolio-tab active"
                  : "portfolio-tab"
              }
              onClick={() => {
                setActiveTab("students");
                setSelectedWork(null);
              }}
            >
              სტუდენტები
              <span>{studentWorks.length}</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "mentor"}
              className={
                activeTab === "mentor"
                  ? "portfolio-tab active"
                  : "portfolio-tab"
              }
              onClick={() => {
                setActiveTab("mentor");
                setSelectedWork(null);
              }}
            >
              მენტორი
              <span>{mentorWorks.length}</span>
            </button>
          </div>

          {/* TAB INTRO */}

          <div className="portfolio-tab-intro">
            <div>
              <span className="portfolio-tab-eyebrow">
                {activeTab === "students"
                  ? "STUDENT PROJECTS"
                  : "MENTOR PROJECTS"}
              </span>

              <h3>
                {activeTab === "students"
                  ? "ჩვენი სტუდენტების ნამუშევრები"
                  : "მენტორის ნამუშევრები"}
              </h3>
            </div>

            <p>
              {activeTab === "students"
                ? "სწავლით მიღებული ცოდნა პრაქტიკაში."
                : "პროფესიული გამოცდილება და შემოქმედებითი ხედვა."}
            </p>
          </div>

          {/* WORKS GRID */}

          <div className="portfolio-works-grid">
            {works.map((work) => (
              <button
                type="button"
                className="portfolio-work-card"
                key={`${activeTab}-${work.id}`}
                onClick={() => setSelectedWork(work)}
                aria-label={`${work.title} — დეტალების ნახვა`}
              >
                <div className="portfolio-work-image">
                  <img
                    src={work.image}
                    alt={work.title}
                    loading="lazy"
                  />

                  <span className="portfolio-work-category">
                    {work.category}
                  </span>

                  <span className="portfolio-work-open">
                    <FaArrowRight aria-hidden="true" />
                  </span>
                </div>

                <div className="portfolio-work-info">
                  <div>
                    <h4>{work.title}</h4>

                    {activeTab === "students" && (
                      <p>{work.student}</p>
                    )}
                  </div>

                  <FaArrowRight
                    className="portfolio-work-arrow"
                    aria-hidden="true"
                  />
                </div>
              </button>
            ))}
          </div>

          {/* =================================================
              MENTOR PROFILE
              ბრენდების სექცია აქ აღარ უნდა ჩასვა.
          ================================================= */}

          {activeTab === "mentor" && (
            <section className="portfolio-mentor-profile">
              <div className="portfolio-mentor-image">
                <img
                  src="/images/mentor-profile.jpg"
                  alt="Edit Academy-ის მენტორი"
                  loading="lazy"
                />
              </div>

              <div className="portfolio-mentor-content">
                <span className="portfolio-overline">
                  MEET YOUR MENTOR
                </span>

                <h3>ნიკა ამაშუკელი</h3>

                <p>
                  ვიდეომონტაჟის მენტორი, რომელიც სტუდენტებს
                  პრაქტიკული პროექტებითა და ინდივიდუალური
                  მიდგომით ეხმარება პროფესიული უნარების
                  განვითარებაში.
                </p>

                <ul className="portfolio-mentor-features">
                  <li>
                    <FaCheck aria-hidden="true" />
                    პრაქტიკაზე დაფუძნებული სწავლება
                  </li>

                  <li>
                    <FaCheck aria-hidden="true" />
                    რეალურ პროექტებზე მუშაობა
                  </li>

                  <li>
                    <FaCheck aria-hidden="true" />
                    ინდივიდუალური უკუკავშირი
                  </li>
                </ul>

                <a
                  href="/contact"
                  className="portfolio-mentor-button"
                >
                  დაგვიკავშირდი
                  <FaArrowRight aria-hidden="true" />
                </a>
              </div>
            </section>
          )}

          {/* BOTTOM CTA */}

          <div className="portfolio-bottom">
            <div>
              <span className="portfolio-overline">
                YOUR TURN
              </span>

              <h3>
                მზად ხარ შენი ისტორიის
                <br />
                შესაქმნელად?
              </h3>
            </div>

            <a href="/courses" className="portfolio-bottom-button">
              კურსების ნახვა
              <FaArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          4. WORK MODAL
      ===================================================== */}

      {selectedWork && (
        <div
          className="portfolio-modal-backdrop"
          role="presentation"
          onClick={() => setSelectedWork(null)}
        >
          <div
            className="portfolio-modal"
            role="dialog"
            aria-modal="true"
            aria-label={selectedWork.title}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="portfolio-modal-close"
              onClick={() => setSelectedWork(null)}
              aria-label="დახურვა"
            >
              ×
            </button>

            <img
              src={selectedWork.image}
              alt={selectedWork.title}
            />

            <div className="portfolio-modal-info">
              <span>{selectedWork.category}</span>
              <h3>{selectedWork.title}</h3>

              {selectedWork.student && (
                <p>{selectedWork.student}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
