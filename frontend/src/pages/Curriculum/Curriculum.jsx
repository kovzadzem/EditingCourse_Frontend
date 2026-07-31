import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  FaSearch,
  FaChevronDown,
  FaBookOpen,
  FaTimes,
  FaCheck,
} from "react-icons/fa";

import "./curriculum.css";


/* =========================================================
   CURRICULUM DATA
========================================================= */

const curriculumData = [
  {
    title: "ლექცია 01",
    subtitle:
      "Adobe Premiere Pro-ის გაცნობა და პროექტის შექმნა",
    topics: [
      "რა არის Adobe Premiere Pro",
      "პროგრამის ინტერფეისის მიმოხილვა",
      "სამუშაო სივრცის (Workspace) მოწყობა",
      "პროექტის შექმნა და შენახვა",
      "მედია ფაილების იმპორტი",
      "Project Panel-ის გამოყენება",
      "ფაილების ორგანიზება და Bin-ები",
    ],
  },

  {
    title: "ლექცია 02",
    subtitle: "Sequence & Tools",
    topics: [
      "Sequence-ის შექმნა",
      "Sequence-ის პარამეტრები",
      "Timeline-ის სრული მიმოხილვა",
      "Selection Tool",
      "Razor Tool",
      "Ripple Edit Tool",
      "Slip & Slide Tool",
      "Track Select Tool",
      "Timeline-ში ეფექტური მუშაობის ტექნიკები",
    ],
  },

  {
    title: "ლექცია 03",
    subtitle: "Effect Controls & Video Options",
    topics: [
      "Effect Controls Panel-ის მიმოხილვა",
      "Position",
      "Scale",
      "Rotation",
      "Opacity",
      "Anchor Point",
      "ვიდეო პარამეტრების მართვა",
      "Motion-ის საფუძვლები",
      "პრაქტიკული მაგალითები",
    ],
  },

  {
    title: "ლექცია 04",
    subtitle: "Motion Design, Graphs & Keyframes",
    topics: [
      "Keyframe-ის პრინციპები",
      "Smooth Animation",
      "Ease In / Ease Out",
      "Speed Graph",
      "Value Graph",
      "Motion Design-ის საფუძვლები",
      "დინამიკური ანიმაციების შექმნა",
      "თანამედროვე სოციალური მედიის ანიმაციები",
    ],
  },

  {
    title: "ლექცია 05",
    subtitle: "Text & Titles",
    topics: [
      "Essential Graphics Panel",
      "ტექსტის დამატება",
      "ტექსტის სტილიზაცია",
      "Typography-ის საფუძვლები",
      "Text Animation",
      "Kinetic Typography",
      "AI Titles",
      "თანამედროვე ტიტრების შექმნა",
    ],
  },

  {
    title: "ლექცია 06",
    subtitle: "Effects & Blending Modes",
    topics: [
      "Effects Panel-ის გამოყენება",
      "ყველაზე გამოყენებადი Effects",
      "Adjustment Layer",
      "Blend Modes",
      "Transition Effects",
      "Blur Effects",
      "Glow Effects",
      "პროფესიონალური ვიზუალური ეფექტების შექმნა",
    ],
  },

  {
    title: "ლექცია 07",
    subtitle: "Lumetri Color & Color Grading",
    topics: [
      "ფერის თეორიის საფუძვლები",
      "Lumetri Color-ის მიმოხილვა",
      "Basic Correction",
      "Curves",
      "Color Wheels",
      "HSL Secondary",
      "Color Matching",
      "Cinematic Color Grading",
      "LUT-ების გამოყენება",
    ],
  },

  {
    title: "ლექცია 08",
    subtitle: "Masking & Color Masking",
    topics: [
      "Masking-ის საფუძვლები",
      "Ellipse Mask",
      "Rectangle Mask",
      "Pen Tool Mask",
      "Object Tracking",
      "Background Blur",
      "Color Masking",
      "კონკრეტული ფერების კორექცია",
      "Creative Mask Transitions",
    ],
  },

  {
    title: "ლექცია 09",
    subtitle: "ვიდეო და აუდიოს სინქრონიზაცია",
    topics: [
      "ვიდეო და აუდიოს დაკავშირება",
      "Auto Sync",
      "Manual Sync",
      "Multicam Sync",
      "Waveform-ის გამოყენება",
      "Sync პრობლემების მოგვარება",
      "ინტერვიუს მონტაჟის პრაქტიკა",
    ],
  },

  {
    title: "ლექცია 10",
    subtitle: "Sound Design & Sound Effects",
    topics: [
      "აუდიოს დამუშავების საფუძვლები",
      "Sound Effects-ის გამოყენება",
      "Whoosh",
      "Impact",
      "Risers",
      "Ambience",
      "Audio Mixing",
      "Audio Levels",
      "პროფესიონალური Sound Design",
    ],
  },

  {
    title: "ლექცია 11",
    subtitle: "Green Screen, Nesting & Multicam",
    topics: [
      "Green Screen-ის პრინციპები",
      "Ultra Key Effect",
      "ფონის შეცვლა",
      "Spill Removal",
      "Nesting-ის გამოყენება",
      "კომპლექსური პროექტების ორგანიზება",
      "Multicam Editing",
      "ინტერვიუს მრავალკამერიანი მონტაჟი",
    ],
  },

  {
    title: "ლექცია 12",
    subtitle:
      "Render, Envato, Epidemic Sound & Export",
    topics: [
      "Render-ის პრინციპები",
      "Export Settings",
      "H.264",
      "YouTube Export",
      "TikTok Export",
      "Instagram Reels Export",
      "Proxy Workflow",
      "Envato Elements-ის გამოყენება",
      "Epidemic Sound-ის გამოყენება",
      "პროექტის საბოლოო მომზადება და ექსპორტი",
    ],
  },
];


/* =========================================================
   HIGHLIGHT HELPER
========================================================= */

const HighlightText = ({
  text,
  query,
}) => {
  if (!query.trim()) {
    return text;
  }

  const escapedQuery = query.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );

  const parts = text.split(
    new RegExp(`(${escapedQuery})`, "gi")
  );

  return parts.map((part, index) => {
    const isMatch =
      part.toLowerCase() ===
      query.trim().toLowerCase();

    if (isMatch) {
      return (
        <mark key={index}>
          {part}
        </mark>
      );
    }

    return part;
  });
};


/* =========================================================
   CURRICULUM
========================================================= */

const Curriculum = () => {

  const [search, setSearch] = useState("");

  const [openLesson, setOpenLesson] =
    useState(null);

  const searchRef = useRef(null);


  /* =======================================================
     SEARCH SHORTCUT
  ======================================================= */

  useEffect(() => {
    const handleKeyboard = (event) => {

      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();

        searchRef.current?.focus();
      }


      if (
        event.key === "Escape" &&
        document.activeElement ===
          searchRef.current
      ) {
        setSearch("");
      }
    };


    window.addEventListener(
      "keydown",
      handleKeyboard
    );


    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard
      );
    };
  }, []);


  /* =======================================================
     FILTER
  ======================================================= */

  const filteredLessons = useMemo(() => {

    const query =
      search.trim().toLowerCase();


    if (!query) {
      return curriculumData;
    }


    return curriculumData.filter(
      (lesson) => {

        const text = [
          lesson.title,
          lesson.subtitle,
          ...lesson.topics,
        ]
          .join(" ")
          .toLowerCase();


        return text.includes(query);
      }
    );

  }, [search]);


  /* =======================================================
     SEARCH RESULT TOPIC COUNT
  ======================================================= */

  const matchingTopicCount = useMemo(() => {

    if (!search.trim()) {
      return 0;
    }


    const query =
      search.trim().toLowerCase();


    return curriculumData.reduce(
      (total, lesson) => {

        const lessonMatches =
          lesson.subtitle
            .toLowerCase()
            .includes(query);


        const topicMatches =
          lesson.topics.filter((topic) =>
            topic.toLowerCase().includes(query)
          ).length;


        return (
          total +
          topicMatches +
          (lessonMatches ? 1 : 0)
        );

      },
      0
    );

  }, [search]);


  /* =======================================================
     TOGGLE
  ======================================================= */

  const toggleLesson = (index) => {

    setOpenLesson((current) =>
      current === index
        ? null
        : index
    );
  };


  /* =======================================================
     CLEAR
  ======================================================= */

  const clearSearch = () => {
    setSearch("");
    searchRef.current?.focus();
  };


  return (
    <main className="curriculum-page">


      {/* =================================================
          HERO
      ================================================= */}

      <section className="curriculum-hero">

        <div className="curriculum-hero-glow" />

        <div className="curriculum-hero-content">

          <div className="curriculum-label">
            EDIT ACADEMY
          </div>


          <h1>
            სასწავლო გეგმა
          </h1>


          <p>
            კურსის სრული პროგრამა ერთ სივრცეში.
            გაეცანი თითოეულ ლექციას და იმ
            უნარებს, რომლებსაც სწავლის პროცესში
            ეტაპობრივად დაეუფლები.
          </p>

        </div>


        <div className="curriculum-stats">

          <div className="curriculum-stat">
            <strong>12</strong>
            <span>ლექცია</span>
          </div>


          <div className="curriculum-stat">
            <strong>90+</strong>
            <span>თემა</span>
          </div>


          <div className="curriculum-stat">
            <strong>100%</strong>
            <span>პრაქტიკა</span>
          </div>

        </div>

      </section>


      {/* =================================================
          SEARCH
      ================================================= */}

      <section className="curriculum-search-section">

        <div className="curriculum-search-top">

          <div>

            <span className="search-eyebrow">
              კურსის ძიება
            </span>

            <h2>
              იპოვე საჭირო თემა
            </h2>

          </div>


          <span className="lesson-result-count">

            {filteredLessons.length}

            <span>
              {" "} / {curriculumData.length}
            </span>

            {" "}ლექცია

          </span>

        </div>


        <div
          className={`curriculum-search ${
            search
              ? "has-value"
              : ""
          }`}
        >

          <div className="search-icon">
            <FaSearch />
          </div>


          <input
            ref={searchRef}
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="მოძებნე ლექცია, თემა ან ინსტრუმენტი..."
            aria-label="სასწავლო გეგმის ძიება"
          />


          {!search && (
            <div className="search-shortcut">
              <span>⌘</span>
              <span>K</span>
            </div>
          )}


          {search && (
            <button
              type="button"
              className="search-clear"
              onClick={clearSearch}
              aria-label="ძიების გასუფთავება"
            >
              <FaTimes />
            </button>
          )}

        </div>


        {search && (

          <div className="search-feedback">

            <div className="search-feedback-left">

              <span className="search-status-dot" />

              ძიება:

              <strong>
                “{search}”
              </strong>

            </div>


            <span>
              {matchingTopicCount} შედეგი
            </span>

          </div>

        )}

      </section>


      {/* =================================================
          LESSONS
      ================================================= */}

      <section className="curriculum-list">

        {filteredLessons.map(
          (lesson, index) => {

            const isOpen =
              openLesson === index;


            return (
              <article
                className={`curriculum-lesson ${
                  isOpen
                    ? "lesson-open"
                    : ""
                }`}
                key={lesson.title}
              >

                <button
                  type="button"
                  className="lesson-header"
                  onClick={() =>
                    toggleLesson(index)
                  }
                  aria-expanded={isOpen}
                >

                  <div className="lesson-left">

                    <div className="lesson-counter">
                      {String(
                        curriculumData.indexOf(
                          lesson
                        ) + 1
                      ).padStart(2, "0")}
                    </div>


                    <div className="lesson-heading">

                      <span className="lesson-label">

                        <HighlightText
                          text={lesson.title}
                          query={search}
                        />

                      </span>


                      <h2>

                        <HighlightText
                          text={lesson.subtitle}
                          query={search}
                        />

                      </h2>

                    </div>

                  </div>


                  <div className="lesson-right">

                    <span className="lesson-topic-count">
                      {lesson.topics.length} თემა
                    </span>


                    <span className="lesson-toggle">

                      <FaChevronDown />

                    </span>

                  </div>

                </button>


                {/* =================================================
                    TOPICS
                ================================================= */}

                <div
                  className={`lesson-content ${
                    isOpen
                      ? "show"
                      : ""
                  }`}
                >

                  <div className="topics-grid">

                    {lesson.topics.map(
                      (topic, topicIndex) => (

                        <div
                          className="curriculum-topic"
                          key={`${lesson.title}-${topicIndex}`}
                        >

                          <span className="topic-check">
                            <FaCheck />
                          </span>


                          <span className="topic-number">
                            {String(
                              topicIndex + 1
                            ).padStart(2, "0")}
                          </span>


                          <p>

                            <HighlightText
                              text={topic}
                              query={search}
                            />

                          </p>

                        </div>

                      )
                    )}

                  </div>

                </div>

              </article>
            );
          }
        )}

      </section>


      {/* =================================================
          EMPTY
      ================================================= */}

      {filteredLessons.length === 0 && (

        <section className="curriculum-empty">

          <div className="empty-icon">
            <FaBookOpen />
          </div>


          <h2>
            შედეგი ვერ მოიძებნა
          </h2>


          <p>
            სცადე სხვა სიტყვით ან თემის
            სახელით მოძებნა.
          </p>


          <button
            type="button"
            onClick={clearSearch}
          >
            ძიების გასუფთავება
          </button>

        </section>

      )}

    </main>
  );
};


export default Curriculum;