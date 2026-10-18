
import React, { useState } from "react";
import {
  FaArrowRight,
  FaPlay,
  FaTimes,
  FaVideo,
  FaLayerGroup,
} from "react-icons/fa";
import "./Portfolio.css";

const brands = Array.from({ length: 12 }, (_, i) => ({
  name: `Brand ${i + 1}`,
  src: `/images/brands/brand-${i + 1}.png`,
}));

const studentWorks = Array.from({ length: 6 }, (_, i) => ({
  id: `student-${i + 1}`,
  title: `სტუდენტის ნამუშევარი ${i + 1}`,
  category: "სტუდენტის პროექტი",
  video: `/Videos/student-${i + 1}.mp4`,
}));

const mentorWorks = Array.from({ length: 6 }, (_, i) => ({
  id: `mentor-${i + 1}`,
  title: `მენტორის ნამუშევარი ${i + 1}`,
  category: "მენტორის პროექტი",
  video: `/Videos/mentor-${i + 1}.mp4`,
}));

function Portfolio() {
  const [activeTab, setActiveTab] = useState("students");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [failedBrands, setFailedBrands] = useState([]);
  const [failedVideos, setFailedVideos] = useState([]);

  const works = activeTab === "students" ? studentWorks : mentorWorks;

  const handleBrandError = (src) => {
    setFailedBrands((prev) =>
      prev.includes(src) ? prev : [...prev, src]
    );
  };

  const handleVideoError = (id) => {
    setFailedVideos((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  return (
    <main className="portfolio-page">
      {/* HERO */}
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
              ვიდეომდე.
            </h1>

            <p className="portfolio-hero-description">
              აღმოაჩინე ჩვენი სტუდენტებისა და მენტორის ნამუშევრები.
              რეალური პროექტები, კრეატიული ხედვა და ვიდეომონტაჟის
              შესაძლებლობები ერთ სივრცეში.
            </p>

            <div className="portfolio-hero-actions">
              <a href="#portfolio-works" className="portfolio-primary-btn">
                ნამუშევრების ნახვა
                <FaArrowRight />
              </a>

              <div className="portfolio-hero-note">
                <span className="portfolio-note-icon">
                  <FaVideo />
                </span>
                <span>
                  <strong>12 ვიდეო</strong>
                  <small>სტუდენტები და მენტორი</small>
                </span>
              </div>
            </div>

            <div className="portfolio-hero-stats">
              <div>
                <strong>06</strong>
                <span>სტუდენტის ვიდეო</span>
              </div>
              <div>
                <strong>06</strong>
                <span>მენტორის ვიდეო</span>
              </div>
              <div>
                <strong>12</strong>
                <span>ბრენდის ლოგო</span>
              </div>
            </div>
          </div>

          <div className="portfolio-hero-visual">
            <div className="hero-visual-glow" />

            <div className="hero-floating-label hero-label-top">
              <span className="hero-label-icon">
                <FaLayerGroup />
              </span>
              <span>
                <strong>Creative Studio</strong>
                <small>შენი ხედვა, ჩვენი გამოცდილება</small>
              </span>
            </div>

            <button
              type="button"
              className="hero-video-card"
              onClick={() =>
                setSelectedVideo({
                  title: "მენტორის ნამუშევარი",
                  video: "/Videos/mentor-1.mp4",
                  id: "mentor-1",
                })
              }
              aria-label="მენტორის ვიდეოს ნახვა"
            >
              <video
                className="hero-background-video"
                src="/Videos/mentor-1.mp4"
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                onError={() => handleVideoError("hero-mentor")}
              />

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
                  <small>EDIT ACADEMY</small>
                  <strong>კრეატიულობა კადრში</strong>
                </span>
                <span className="hero-video-arrow">
                  <FaArrowRight />
                </span>
              </span>
            </button>

            <div className="hero-floating-label hero-label-bottom">
              <span className="hero-label-check">✦</span>
              <span>
                <strong>პრაქტიკული გამოცდილება</strong>
                <small>რეალური ვიდეოპროექტები</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="portfolio-brands">
        <div className="portfolio-container">
          <div className="brands-heading">
            <span className="portfolio-section-kicker">
              OUR CREATIVE WORLD
            </span>
            <h2>ბრენდები, რომლებიც გვაინსპირებს</h2>
            <p>
              ვიზუალური ისტორიები, განსხვავებული სტილი და კრეატიული იდეები.
            </p>
          </div>

          <div
            className="brands-marquee"
            aria-label="ბრენდების ლოგოები"
          >
            <div className="brands-track">
              {[...brands, ...brands].map((brand, index) => (
                <div
                  className="brand-item"
                  key={`${brand.src}-${index}`}
                  aria-hidden={index >= brands.length}
                >
                  {failedBrands.includes(brand.src) ? (
                    <span className="brand-fallback">
                      {brand.name}
                    </span>
                  ) : (
                    <img
                      src={brand.src}
                      alt={index < brands.length ? brand.name : ""}
                      loading="eager"
                      onError={() => handleBrandError(brand.src)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section
        className="portfolio-works"
        id="portfolio-works"
      >
        <div className="portfolio-container">
          <div className="portfolio-works-heading">
            <div>
              <span className="portfolio-section-kicker">
                SELECTED PROJECTS
              </span>
              <h2>
                ნამუშევრები<span>.</span>
              </h2>
              <p>
                თითოეული კადრის უკან დგას იდეა, შრომა და განვითარება.
              </p>
            </div>

            <div className="portfolio-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "students"}
                className={activeTab === "students" ? "active" : ""}
                onClick={() => setActiveTab("students")}
              >
                სტუდენტები
                <span>06</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "mentor"}
                className={activeTab === "mentor" ? "active" : ""}
                onClick={() => setActiveTab("mentor")}
              >
                მენტორი
                <span>06</span>
              </button>
            </div>
          </div>

          <div className="portfolio-video-grid">
            {works.map((work, index) => (
              <article className="portfolio-work-card" key={work.id}>
                <button
                  type="button"
                  className="portfolio-video-preview"
                  onClick={() => setSelectedVideo(work)}
                  aria-label={`${work.title} — ვიდეოს ნახვა`}
                >
                  {failedVideos.includes(work.id) ? (
                    <div className="video-unavailable">
                      <FaVideo />
                      <span>ვიდეო ვერ ჩაიტვირთა</span>
                      <small>{work.video}</small>
                    </div>
                  ) : (
                    <video
                      src={work.video}
                      preload="metadata"
                      muted
                      playsInline
                      onError={() => handleVideoError(work.id)}
                    />
                  )}

                  <span className="video-card-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="video-card-play">
                    <FaPlay />
                  </span>

                  <span className="video-card-open">
                    ვიდეოს ნახვა <FaArrowRight />
                  </span>
                </button>

                <div className="portfolio-work-info">
                  <div>
                    <span className="portfolio-work-category">
                      {work.category}
                    </span>
                    <h3>{work.title}</h3>
                  </div>
                  <span className="work-info-arrow">
                    <FaArrowRight />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {selectedVideo && (
        <div
          className="portfolio-modal"
          onClick={() => setSelectedVideo(null)}
          role="presentation"
        >
          <div
            className="portfolio-modal-content"
            role="dialog"
            aria-modal="true"
            aria-label={selectedVideo.title}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="portfolio-modal-header">
              <div>
                <span>EDIT ACADEMY · PORTFOLIO</span>
                <h3>{selectedVideo.title}</h3>
              </div>

              <button
                type="button"
                className="portfolio-modal-close"
                onClick={() => setSelectedVideo(null)}
                aria-label="დახურვა"
              >
                <FaTimes />
              </button>
            </div>

            <video
              key={selectedVideo.video}
              className="portfolio-modal-video"
              src={selectedVideo.video}
              controls
              autoPlay
              playsInline
              preload="auto"
              onError={() => handleVideoError(selectedVideo.id)}
            >
              თქვენი ბრაუზერი ვიდეოს დაკვრას ვერ ახერხებს.
            </video>
          </div>
        </div>
      )}
    </main>
  );
}

export default Portfolio;
