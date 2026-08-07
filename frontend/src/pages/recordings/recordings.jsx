import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Recordings.css";

const recordingsData = [
  {
    id: 1,
    title: "Premiere Pro - პირველი ნაბიჯები",
    category: "Premiere Pro",
    module: "Editing",
    date: "24 ივლისი, 2026",
    duration: "1:42:18",
    lesson: "ლექცია 01",
    description:
      "Adobe Premiere Pro-ს ინტერფეისი, პროექტის შექმნა და სამუშაო სივრცის სწორად ორგანიზება.",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "Timeline & Professional Editing",
    category: "Editing",
    module: "Premiere Pro",
    date: "27 ივლისი, 2026",
    duration: "1:28:42",
    lesson: "ლექცია 02",
    description:
      "Timeline-ის პროფესიონალური გამოყენება, cuts, transitions და editing workflow.",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Sound Design საფუძვლები",
    category: "Sound",
    module: "Audio",
    date: "30 ივლისი, 2026",
    duration: "1:16:35",
    lesson: "ლექცია 03",
    description:
      "ხმის გაწმენდა, levels, background noise და პროფესიონალური sound design.",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "Color Correction & Grading",
    category: "Color",
    module: "Color",
    date: "2 აგვისტო, 2026",
    duration: "1:34:20",
    lesson: "ლექცია 04",
    description:
      "Color correction-ის საფუძვლები და კადრის პროფესიონალური ვიზუალური დამუშავება.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    title: "Motion & Keyframes",
    category: "Motion",
    module: "Motion",
    date: "5 აგვისტო, 2026",
    duration: "1:21:11",
    lesson: "ლექცია 05",
    description:
      "Keyframes, animation და motion principles Premiere Pro-ში.",
    image:
     "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    title: "Storytelling ვიდეოში",
    category: "Storytelling",
    module: "Story",
    date: "8 აგვისტო, 2026",
    duration: "1:12:48",
    lesson: "ლექცია 06",
    description:
      "როგორ შევქმნათ ემოციური და საინტერესო ვიდეო მონტაჟის საშუალებით.",
    image:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 7,
    title: "Advanced Editing Workflow",
    category: "Editing",
    module: "Premiere Pro",
    date: "11 აგვისტო, 2026",
    duration: "1:48:09",
    lesson: "ლექცია 07",
    description:
      "სწრაფი და ეფექტური პროფესიონალური editing workflow.",
    image:
       "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 8,
    title: "Final Project Review",
    category: "Project",
    module: "Final",
    date: "15 აგვისტო, 2026",
    duration: "1:55:27",
    lesson: "ლექცია 08",
    description:
      "სტუდენტების საბოლოო პროექტების განხილვა და პროფესიონალური feedback.",
    image:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=900&q=80",
  },
];

const categories = [
  "ყველა",
  "Premiere Pro",
  "Editing",
  "Sound",
  "Color",
  "Motion",
  "Storytelling",
  "Project",
];

export default function Recordings() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("ყველა");

  const filteredRecordings = useMemo(() => {
    return recordingsData.filter((recording) => {
      const matchesCategory =
        activeCategory === "ყველა" ||
        recording.category === activeCategory ||
        recording.module === activeCategory;

      const searchText = search.toLowerCase();

      const matchesSearch =
        recording.title.toLowerCase().includes(searchText) ||
        recording.description.toLowerCase().includes(searchText) ||
        recording.category.toLowerCase().includes(searchText) ||
        recording.module.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const featured =
    recordingsData.find((item) => item.featured) ||
    recordingsData[0];

  return (
    <main className="recordings-page">

      {/* HERO */}

      <section className="recordings-hero">
        <div className="recordings-hero-inner">

          <div className="recordings-breadcrumb">
            <NavLink to="./livecourses/livecourses.jsx">მთავარი</NavLink>
            <span>/</span>
            <span>ლაივ ჩანაწერები</span>
          </div>

          <div className="recordings-heading">

            <div>
              <span className="recordings-eyebrow">
                LIVE COURSE ARCHIVE
              </span>

              <h1>
                ლექციების
                <span> ჩანაწერები</span>
              </h1>

              <p>
                აქ იპოვი ლაივ კურსის ფარგლებში ჩატარებული
                ლექციების სრულ არქივს და ნებისმიერ დროს შეძლებ
                გავლილი მასალის გადახედვას.
              </p>
            </div>

            <div className="recordings-count">
              <strong>{recordingsData.length}</strong>
              <span>ჩანაწერი</span>
            </div>

          </div>

        </div>
      </section>

      {/* FEATURED */}

      <section className="featured-recording">

        <div className="featured-image">
          <img
            src={featured.image}
            alt={featured.title}
          />

          <div className="featured-overlay"></div>

          <div className="featured-play">
            <span>▶</span>
          </div>

          <div className="featured-duration">
            {featured.duration}
          </div>
        </div>

        <div className="featured-content">

          <span className="featured-label">
            ბოლო ჩანაწერი
          </span>

          <span className="featured-lesson">
            {featured.lesson}
          </span>

          <h2>{featured.title}</h2>

          <p>{featured.description}</p>

          <div className="featured-meta">
            <span>● {featured.category}</span>
            <span>◷ {featured.duration}</span>
            <span>▣ {featured.date}</span>
          </div>

          <button className="watch-featured">
            ▶ ნახვა
          </button>

        </div>

      </section>

      {/* CONTENT */}

      <section className="recordings-content">

        <div className="recordings-toolbar">

          <div className="category-filters">

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

          <div className="recordings-search">

            <span>⌕</span>

            <input
              type="text"
              placeholder="მოძებნე ჩანაწერი..."
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

        </div>

        {/* HEADER */}

        <div className="recordings-list-header">

          <div>
            <span className="section-mini-label">
              ARCHIVE
            </span>

            <h2>
              ყველა ჩანაწერი
            </h2>
          </div>

          <span>
            {filteredRecordings.length} შედეგი
          </span>

        </div>

        {/* GRID */}

        {filteredRecordings.length > 0 ? (

          <div className="recordings-grid">

            {filteredRecordings.map((recording, index) => (

              <article
                className="recording-card"
                key={recording.id}
                style={{
                  "--delay": `${index * 70}ms`,
                }}
              >

                <div className="recording-thumbnail">

                  <img
                    src={recording.image}
                    alt={recording.title}
                  />

                  <div className="thumbnail-overlay"></div>

                  <button className="recording-play">
                    ▶
                  </button>

                  <span className="recording-time">
                    {recording.duration}
                  </span>

                  <span className="recording-lesson">
                    {recording.lesson}
                  </span>

                </div>

                <div className="recording-info">

                  <div className="recording-topline">

                    <span>
                      {recording.category}
                    </span>

                    <span>
                      {recording.date}
                    </span>

                  </div>

                  <h3>
                    {recording.title}
                  </h3>

                  <p>
                    {recording.description}
                  </p>

                  <div className="recording-bottom">

                    <span className="recording-duration">
                      ◷ {recording.duration}
                    </span>

                    <button className="recording-watch">
                      ყურება <span>→</span>
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>

        ) : (

          <div className="no-recordings">

            <div className="no-recordings-icon">
              ⌕
            </div>

            <h3>
              ჩანაწერი ვერ მოიძებნა
            </h3>

            <p>
              შეცვალე საძიებო სიტყვა ან აირჩიე სხვა კატეგორია.
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

        )}

      </section>

      {/* ACCESS INFO */}

      <section className="recordings-access">

        <div className="access-icon">
          ▶
        </div>

        <div>
          <span>
            LIVE COURSE STUDENTS
          </span>

          <h3>
            ჩანაწერები ხელმისაწვდომია კურსის სტუდენტებისთვის
          </h3>

          <p>
            ლაივ კურსის შეძენის შემდეგ შენს პირად კაბინეტში
            ავტომატურად გამოჩნდება ყველა ხელმისაწვდომი
            ლექციის ჩანაწერი.
          </p>
        </div>

        <NavLink to="../LiveCourses">
          ლაივ კურსების ნახვა →
        </NavLink>

      </section>

    </main>
  );
}