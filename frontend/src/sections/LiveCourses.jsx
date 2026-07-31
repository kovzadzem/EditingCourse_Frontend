import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import "./LiveCourses.css";

const courses = [
  {
    id: 1,
    title: "Adobe Premiere Pro — სრული კურსი",
    category: "Video Editing",
    level: "Beginner",
    description:
      "ვიდეო მონტაჟის სრული პრაქტიკული კურსი ნულიდან. ისწავლი Premiere Pro-ს პროფესიონალურად გამოყენებას.",
    duration: "12 კვირა",
    lessons: "24 ლექცია",
    format: "Live",
    location: "თბილისი",
    price: 590,
    group: "Group 01",
    startDate: "15 სექტემბერი, 2026",
    schedule: "სამ / ხუთ — 19:00",
    maxStudents: 12,
    availableSeats: 4,
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },

  {
    id: 2,
    title: "Advanced Video Editing",
    category: "Video Editing",
    level: "Advanced",
    description:
      "პროფესიონალური მონტაჟის ტექნიკები, workflow, storytelling და რთული პროექტების აწყობა.",
    duration: "10 კვირა",
    lessons: "20 ლექცია",
    format: "Live",
    location: "თბილისი",
    price: 690,
    group: "Group 02",
    startDate: "22 სექტემბერი, 2026",
    schedule: "ორშ / ოთხ — 19:30",
    maxStudents: 10,
    availableSeats: 2,
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  },

  {
    id: 3,
    title: "Color Grading & Color Theory",
    category: "Color",
    level: "Intermediate",
    description:
      "ფერის კორექცია, grading, cinematic look და პროფესიონალური color workflow.",
    duration: "6 კვირა",
    lessons: "12 ლექცია",
    format: "Live",
    location: "თბილისი",
    price: 420,
    group: "Group 03",
    startDate: "1 ოქტომბერი, 2026",
    schedule: "სამ / ხუთ — 18:30",
    maxStudents: 12,
    availableSeats: 7,
    image:
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  },

  {
    id: 4,
    title: "Sound Design for Editors",
    category: "Sound",
    level: "Intermediate",
    description:
      "ხმის დიზაინი ვიდეოში, dialogue cleanup, effects, music და საბოლოო mix.",
    duration: "5 კვირა",
    lessons: "10 ლექცია",
    format: "Live",
    location: "თბილისი",
    price: 350,
    group: "Group 04",
    startDate: "8 ოქტომბერი, 2026",
    schedule: "შაბ — 15:00",
    maxStudents: 10,
    availableSeats: 5,
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  },

  {
    id: 5,
    title: "Motion & Visual Effects",
    category: "Motion",
    level: "Advanced",
    description:
      "Motion graphics, animation და ვიზუალური ეფექტების გამოყენება თანამედროვე ვიდეოებში.",
    duration: "8 კვირა",
    lessons: "16 ლექცია",
    format: "Live",
    location: "თბილისი",
    price: 520,
    group: "Group 05",
    startDate: "15 ოქტომბერი, 2026",
    schedule: "ორშ / ოთხ — 20:00",
    maxStudents: 12,
    availableSeats: 1,
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  },

  {
    id: 6,
    title: "Storytelling for Video",
    category: "Storytelling",
    level: "Beginner",
    description:
      "როგორ ააწყო ისტორია, სცენა და ემოცია ისე, რომ ვიდეოს მაყურებელი ბოლომდე გაყვეს.",
    duration: "4 კვირა",
    lessons: "8 ლექცია",
    format: "Live",
    location: "თბილისი",
    price: 290,
    group: "Group 06",
    startDate: "20 ოქტომბერი, 2026",
    schedule: "კვირა — 17:00",
    maxStudents: 15,
    availableSeats: 9,
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    featured: false,
  },
];

const categories = [
  "All",
  "Video Editing",
  "Color",
  "Sound",
  "Motion",
  "Storytelling",
];

const levels = ["All", "Beginner", "Intermediate", "Advanced"];

const LiveCourses = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [sort, setSort] = useState("featured");

  const filteredCourses = useMemo(() => {
    let result = courses.filter((course) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        course.title.toLowerCase().includes(searchValue) ||
        course.description.toLowerCase().includes(searchValue) ||
        course.category.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === "All" || course.category === category;

      const matchesLevel =
        level === "All" || course.level === level;

      const matchesAvailability =
        availability === "All" ||
        (availability === "Available" && course.availableSeats > 0) ||
        (availability === "Almost Full" &&
          course.availableSeats > 0 &&
          course.availableSeats <= 2);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLevel &&
        matchesAvailability
      );
    });

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "seats") {
      result.sort((a, b) => a.availableSeats - b.availableSeats);
    }

    if (sort === "featured") {
      result.sort((a, b) => Number(b.featured) - Number(a.featured));
    }

    return result;
  }, [search, category, level, availability, sort]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setLevel("All");
    setAvailability("All");
    setSort("featured");
  };

  const getStatus = (seats) => {
    if (seats === 0) return "full";
    if (seats <= 2) return "almost";
    return "open";
  };

  const getStatusText = (seats) => {
    if (seats === 0) return "შევსებულია";
    if (seats <= 2) return "ბოლო ადგილები";
    return "რეგისტრაცია ღიაა";
  };

  return (
    <main className="live-page">

      {/* HERO */}

      <section className="live-hero">
        <div className="live-hero-content">

          <div className="live-eyebrow">
            <span></span>
            LIVE COURSES
          </div>

          <h1>
            ისწავლე.
            <br />
            <em>შექმენი.</em>
            <br />
            განავითარე.
          </h1>

          <p>
            პრაქტიკული Live კურსები ვიდეო მონტაჟში,
            Motion-ში, Sound-ში, Color-ში და Storytelling-ში.
          </p>

          <div className="hero-stats">
            <div>
              <strong>06</strong>
              <span>აქტიური კურსი</span>
            </div>

            <div>
              <strong>12</strong>
              <span>სტუდენტი ჯგუფში</span>
            </div>

            <div>
              <strong>100%</strong>
              <span>პრაქტიკული სწავლება</span>
            </div>
          </div>

        </div>

        <div className="hero-visual">
          <div className="hero-circle"></div>

          <div className="floating-card card-one">
            <span>LIVE</span>
            <strong>Premiere Pro</strong>
            <small>Group 01</small>
          </div>

          <div className="floating-card card-two">
            <span>01</span>
            <strong>Next class</strong>
            <small>19:00 · Tuesday</small>
          </div>
        </div>
      </section>

      {/* SEARCH */}

      <section className="courses-section">

        <div className="courses-top">

          <div>
            <span className="section-label">
              EXPLORE COURSES
            </span>

            <h2>
              აირჩიე შენი
              <br />
              <span>მიმართულება.</span>
            </h2>
          </div>

          <div className="search-box">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>

            <input
              type="text"
              placeholder="მოძებნე კურსი..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button onClick={() => setSearch("")}>
                ×
              </button>
            )}
          </div>

        </div>

        <div className="courses-layout">

          {/* FILTERS */}

          <aside className="filters">

            <div className="filters-heading">
              <span>FILTERS</span>

              <button onClick={clearFilters}>
                გასუფთავება
              </button>
            </div>

            <div className="filter-block">
              <h4>მიმართულება</h4>

              {categories.map((item) => (
                <button
                  key={item}
                  className={
                    category === item ? "active" : ""
                  }
                  onClick={() => setCategory(item)}
                >
                  <span>{item}</span>

                  {item !== "All" && (
                    <small>
                      {
                        courses.filter(
                          (course) =>
                            course.category === item
                        ).length
                      }
                    </small>
                  )}
                </button>
              ))}
            </div>

            <div className="filter-block">
              <h4>დონე</h4>

              {levels.map((item) => (
                <button
                  key={item}
                  className={
                    level === item ? "active" : ""
                  }
                  onClick={() => setLevel(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="filter-block">
              <h4>ადგილები</h4>

              <button
                className={
                  availability === "All"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setAvailability("All")
                }
              >
                ყველა
              </button>

              <button
                className={
                  availability === "Available"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setAvailability("Available")
                }
              >
                ხელმისაწვდომი
              </button>

              <button
                className={
                  availability === "Almost Full"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setAvailability("Almost Full")
                }
              >
                ბოლო ადგილები
              </button>
            </div>

          </aside>

          {/* RESULTS */}

          <div className="courses-results">

            <div className="results-header">

              <div>
                <strong>
                  {filteredCourses.length}
                </strong>

                <span>
                  კურსი მოიძებნა
                </span>
              </div>

              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
              >
                <option value="featured">
                  რეკომენდებული
                </option>

                <option value="price-low">
                  ფასი — დაბლიდან
                </option>

                <option value="price-high">
                  ფასი — მაღლიდან
                </option>

                <option value="seats">
                  თავისუფალი ადგილები
                </option>
              </select>

            </div>

            {filteredCourses.length === 0 ? (
              <div className="empty-state">

                <div className="empty-icon">
                  ⌕
                </div>

                <h3>
                  კურსი ვერ მოიძებნა
                </h3>

                <p>
                  სცადე სხვა საძიებო სიტყვა ან
                  შეცვალე ფილტრები.
                </p>

                <button onClick={clearFilters}>
                  ფილტრების გასუფთავება
                </button>

              </div>
            ) : (
              <div className="course-list">

                {filteredCourses.map((course) => {
                  const status = getStatus(
                    course.availableSeats
                  );

                  return (
                    <article
                      className={`course-card ${
                        course.featured
                          ? "featured"
                          : ""
                      }`}
                      key={course.id}
                    >

                      <div className="course-image">

                        <img
                          src={course.image}
                          alt={course.title}
                        />

                        <div className="image-overlay"></div>

                        <span className="live-badge">
                          LIVE
                        </span>

                        {course.featured && (
                          <span className="featured-badge">
                            FEATURED
                          </span>
                        )}

                      </div>

                      <div className="course-content">

                        <div className="course-meta">

                          <span>
                            {course.category}
                          </span>

                          <span>•</span>

                          <span>
                            {course.level}
                          </span>

                        </div>

                        <h3>
                          {course.title}
                        </h3>

                        <p>
                          {course.description}
                        </p>

                        <div className="course-info">

                          <div>
                            <small>
                              დაწყება
                            </small>

                            <strong>
                              {course.startDate}
                            </strong>
                          </div>

                          <div>
                            <small>
                              განრიგი
                            </small>

                            <strong>
                              {course.schedule}
                            </strong>
                          </div>

                          <div>
                            <small>
                              ლოკაცია
                            </small>

                            <strong>
                              {course.location}
                            </strong>
                          </div>

                        </div>

                        <div className="course-bottom">

                          <div className="seats">

                            <span
                              className={`status-dot ${status}`}
                            ></span>

                            <span>
                              {getStatusText(
                                course.availableSeats
                              )}
                            </span>

                            <strong>
                              {course.availableSeats}
                              /
                              {course.maxStudents}
                            </strong>

                          </div>

                          <div className="course-price">
                            <small>
                              ფასი
                            </small>

                            <strong>
                              ₾{course.price}
                            </strong>
                          </div>

                        </div>

                        <div className="course-actions">

                          <NavLink
                            to={`/live-courses/${course.id}`}
                            className="view-course"
                          >
                            კურსის ნახვა
                            <span>↗</span>
                          </NavLink>

                          <button
                            className="join-course"
                            disabled={
                              course.availableSeats === 0
                            }
                          >
                            {course.availableSeats === 0
                              ? "შევსებულია"
                              : "ჯგუფში ჩაწერა"}
                          </button>

                        </div>

                      </div>

                    </article>
                  );
                })}

              </div>
            )}

          </div>

        </div>
      </section>

      {/* BOTTOM CTA */}

      <section className="live-cta">

        <div>
          <span className="section-label">
            NOT SURE WHERE TO START?
          </span>

          <h2>
            არ იცი რომელი
            <br />
            კურსია შენთვის?
          </h2>
        </div>

        <NavLink to="/contact">
          დაგვიკავშირდი
          <span>↗</span>
        </NavLink>

      </section>

    </main>
  );
};

export default LiveCourses;