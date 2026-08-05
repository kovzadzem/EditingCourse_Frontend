import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import "./LiveCourses.css";

const courses = [
  {
    id: 1,
    title: "Video Editing - Beginner",
    category: "დამწყები",
    level: "Beginner",
    description:
      "ნულიდან ისწავლე პროფესიონალური ვიდეო მონტაჟი Adobe Premiere Pro-ში.",
    duration: "8 კვირა",
    lessons: "16 ლექცია",
    date: "15 სექტემბერი, 2026",
    time: "19:00 - 21:00",
    location: "თბილისი • Creative Studio",
    seats: 12,
    available: 5,
    price: "450 ₾",
    accent: "purple",
    tag: "ყველაზე მოთხოვნადი",
  },
  {
    id: 2,
    title: "Advanced Editing",
    category: "Advanced",
    level: "Advanced",
    description:
      "გააუმჯობესე მონტაჟის ტექნიკა და შექმენი პროფესიონალური ვიდეო პროექტები.",
    duration: "6 კვირა",
    lessons: "12 ლექცია",
    date: "3 ოქტომბერი, 2026",
    time: "18:30 - 20:30",
    location: "თბილისი • Creative Studio",
    seats: 10,
    available: 3,
    price: "520 ₾",
    accent: "orange",
    tag: "Advanced",
  },
  {
    id: 3,
    title: "Color & Storytelling",
    category: "Color",
    level: "Intermediate",
    description:
      "ფერის კორექცია, ვიზუალური სტილი და storytelling ვიდეოს ემოციის გასაძლიერებლად.",
    duration: "5 კვირა",
    lessons: "10 ლექცია",
    date: "20 ოქტომბერი, 2026",
    time: "19:00 - 21:00",
    location: "თბილისი • Creative Studio",
    seats: 12,
    available: 8,
    price: "390 ₾",
    accent: "pink",
    tag: "ახალი",
  },
  {
    id: 4,
    title: "Sound Design for Video",
    category: "Sound",
    level: "Intermediate",
    description:
      "ხმის დიზაინი, მუსიკა, ეფექტები და პროფესიონალური აუდიო workflow.",
    duration: "4 კვირა",
    lessons: "8 ლექცია",
    date: "5 ნოემბერი, 2026",
    time: "18:00 - 20:00",
    location: "თბილისი • Creative Studio",
    seats: 10,
    available: 6,
    price: "350 ₾",
    accent: "blue",
    tag: "Sound",
  },
];

const categories = [
  "ყველა",
  "დამწყები",
  "Advanced",
  "Color",
  "Sound",
];

function CourseVisual({ accent, number }) {
  return (
    <div className={`course-visual ${accent}`}>
      <div className="visual-grid"></div>

      <div className="visual-circle"></div>

      <div className="visual-number">
        0{number}
      </div>

      <div className="visual-label">
        LIVE COURSE
      </div>

      <div className="visual-play">
        <span>▶</span>
      </div>
    </div>
  );
}

export default function LiveCourses() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] =
    useState("ყველა");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory =
        activeCategory === "ყველა" ||
        course.category === activeCategory;

      const searchValue = search.toLowerCase();

      const matchesSearch =
        course.title.toLowerCase().includes(searchValue) ||
        course.description
          .toLowerCase()
          .includes(searchValue) ||
        course.category
          .toLowerCase()
          .includes(searchValue);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <main className="live-page">

      {/* HERO */}

      <section className="live-hero">

        <div className="live-hero-content">

          <div className="live-eyebrow">
            <span></span>
            EDIT ACADEMY / LIVE
          </div>

          <h1>
            ისწავლე
            <br />
            <em>რეალურ გარემოში.</em>
          </h1>

          <p>
            ცოცხალი პრაქტიკული კურსები ვიდეო მონტაჟში -
            მცირე ჯგუფები, პროფესიონალი მენტორი და
            რეალური პროექტები.
          </p>

          <div className="hero-stats">

            <div>
              <strong>02</strong>
              <span>აქტიური ჯგუფი</span>
            </div>

            <div>
              <strong>12</strong>
              <span>მაქს. სტუდენტი</span>
            </div>

            <div>
              <strong>01</strong>
              <span>ლოკაცია</span>
            </div>

          </div>

        </div>

        <div className="live-hero-art">

          <div className="hero-orbit orbit-one"></div>
          <div className="hero-orbit orbit-two"></div>

          <div className="hero-card-main">

            <div className="hero-card-top">
              <span>LIVE</span>
              <span>2026 / 27</span>
            </div>

            <div className="hero-card-center">
              <span>EDIT</span>
              <strong>ACADEMY</strong>
            </div>

            <div className="hero-card-bottom">
              <span>VIDEO</span>
              <span>PRO</span>
            </div>

          </div>

          <div className="floating-info info-one">
            <span>●</span>
            Small Groups
          </div>

          <div className="floating-info info-two">
            1:1 Feedback
          </div>

        </div>

      </section>


      {/* SEARCH / FILTER */}

      <section className="course-browser">

        <div className="browser-top">

          <div>
            <span className="section-kicker">
              FIND YOUR COURSE
            </span>

            <h2>
              აირჩიე შენი მიმართულება
            </h2>
          </div>

          <div className="course-count">
            <strong>
              {filteredCourses.length}
            </strong>

            <span>
              კურსი
            </span>
          </div>

        </div>


        <div className="browser-controls">

          <div className="search-box">

            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
              />
              <path d="M16 16L21 21" />
            </svg>

            <input
              type="text"
              placeholder="მოძებნე კურსი..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="clear-search"
              >
                ×
              </button>
            )}

          </div>


          <div className="category-filter">

            {categories.map((category) => (
              <button
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

      </section>


      {/* COURSES */}

      <section className="courses-section">

        {filteredCourses.length === 0 ? (

          <div className="empty-courses">

            <div className="empty-icon">
              /
            </div>

            <h3>
              კურსი ვერ მოიძებნა
            </h3>

            <p>
              სცადე სხვა სიტყვა ან კატეგორია.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("ყველა");
              }}
            >
              ფილტრების გასუფთავება
            </button>

          </div>

        ) : (

          <div className="courses-list">

            {filteredCourses.map(
              (course, index) => {

                const percentage =
                  Math.round(
                    (course.available /
                      course.seats) *
                      100
                  );

                return (

                  <article
                    className="live-course"
                    key={course.id}
                  >

                    <CourseVisual
                      accent={course.accent}
                      number={index + 1}
                    />


                    <div className="course-content">

                      <div className="course-heading">

                        <div>

                          <div className="course-tag">
                            {course.tag}
                          </div>

                          <h3>
                            {course.title}
                          </h3>

                        </div>

                        <div className="course-price">
                          <span>
                            ფასი
                          </span>

                          <strong>
                            {course.price}
                          </strong>
                        </div>

                      </div>


                      <p className="course-description">
                        {course.description}
                      </p>


                      <div className="course-meta">

                        <div>
                          <span>LEVEL</span>
                          <strong>
                            {course.level}
                          </strong>
                        </div>

                        <div>
                          <span>DURATION</span>
                          <strong>
                            {course.duration}
                          </strong>
                        </div>

                        <div>
                          <span>LESSONS</span>
                          <strong>
                            {course.lessons}
                          </strong>
                        </div>

                      </div>


                      <div className="course-schedule">

                        <div className="schedule-item">

                          <span>
                            დაწყება
                          </span>

                          <strong>
                            {course.date}
                          </strong>

                        </div>

                        <div className="schedule-item">

                          <span>
                            დრო
                          </span>

                          <strong>
                            {course.time}
                          </strong>

                        </div>

                        <div className="schedule-item">

                          <span>
                            ლოკაცია
                          </span>

                          <strong>
                            {course.location}
                          </strong>

                        </div>

                      </div>


                      <div className="course-footer">

                        <div className="availability">

                          <div className="availability-header">

                            <span>
                              დარჩენილი ადგილები
                            </span>

                            <strong>
                              {course.available}
                              /
                              {course.seats}
                            </strong>

                          </div>

                          <div className="availability-bar">

                            <span
                              style={{
                                width: `${percentage}%`,
                              }}
                            ></span>

                          </div>

                        </div>


                        <NavLink
                          to={`/live-courses/${course.id}`}
                          className="course-button"
                        >
                          კურსის ნახვა

                          <span>
                            →
                          </span>
                        </NavLink>

                      </div>

                    </div>

                  </article>

                );
              }
            )}

          </div>

        )}

      </section>


      {/* BOTTOM CTA */}

      <section className="live-cta">

        <div>

          <span className="section-kicker">
            NOT SURE YET?
          </span>

          <h2>
            ვერ გადაწყვიტე
            <br />
            რომელი კურსია შენთვის?
          </h2>

        </div>

        <NavLink
          to="/contact"
          className="cta-button"
        >
          დაგვიკავშირდი
          <span>→</span>
        </NavLink>

      </section>

    </main>
  );
}