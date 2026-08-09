import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import Pricing from "../Pricing/Pricing";
import "./Home.css";

/* =====================================================
   FLOATING CARD
===================================================== */

function FloatingCard({ title, value, type, position, index }) {
  return (
    <motion.div
      className={`floating-card ${position}`}
      animate={{
        y: [0, -8, 0],
        rotateZ: [0, 1, 0, -1, 0],
        rotateY: [0, 2, 0, -2, 0],
      }}
      transition={{
        duration: 5 + index * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.4,
      }}
      whileHover={{
        scale: 1.06,
        y: -10,
      }}
    >
      <div className="floating-card-top">
        <span>{title}</span>

        <div className="floating-icon">
          {type === "lessons" && "▦"}
          {type === "students" && "●"}
          {type === "progress" && "↗"}
          {type === "status" && "✓"}
        </div>
      </div>

      <strong>{value}</strong>

      {type === "lessons" && (
        <div className="floating-lines">
          <span />
          <span />
          <span />
        </div>
      )}

      {type === "students" && (
        <div className="student-dots">
          <span />
          <span />
          <span />
          <span />
        </div>
      )}

      {type === "progress" && (
        <div className="floating-progress">
          <span />
        </div>
      )}

      {type === "status" && (
        <div className="status-indicator">
          <span />
          Available now
        </div>
      )}
    </motion.div>
  );
}


/* =====================================================
   HERO VISUAL
===================================================== */

function HeroVisual() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
  });

  const rotateX = useTransform(
    smoothY,
    [-0.5, 0.5],
    [8, -8]
  );

  const rotateY = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-10, 10]
  );

  const moveX = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-12, 12]
  );

  const moveY = useTransform(
    smoothY,
    [-0.5, 0.5],
    [-12, 12]
  );

  function handleMouseMove(event) {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width;

    const y =
      (event.clientY - rect.top) / rect.height;

    mouseX.set(x - 0.5);
    mouseY.set(y - 0.5);
  }

  function resetMouse() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const cards = [
    {
      title: "Lessons",
      value: "12",
      type: "lessons",
      position: "card-top-left",
    },
    {
      title: "Students",
      value: "1.2K",
      type: "students",
      position: "card-top-right",
    },
    {
      title: "Progress",
      value: "85%",
      type: "progress",
      position: "card-bottom-left",
    },
    {
      title: "Course",
      value: "Live",
      type: "status",
      position: "card-bottom-right",
    },
  ];

  return (
    <div
      className="hero-visual"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMouse}
    >
      <motion.div
        className="hero-glow"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="hero-glow-secondary"
        animate={{
          x: [-20, 20, -20],
          y: [15, -15, 15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="hero-dashboard"
        style={{
          rotateX,
          rotateY,
          x: moveX,
          y: moveY,
        }}
        initial={{
          opacity: 0,
          scale: 0.85,
          y: 60,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.9,
          ease: "easeOut",
        }}
      >
        <div className="dashboard-header">
          <div className="dashboard-dots">
            <span />
            <span />
            <span />
          </div>

          <div className="dashboard-title">
            VIDEO EDITING
          </div>

          <div className="dashboard-number">
            01 / 12
          </div>
        </div>

        <div className="dashboard-video">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src="/videos/hero-video.mp4"
              type="video/mp4"
            />
          </video>

          <div className="video-overlay" />

          <div className="video-play">
            ▶
          </div>

          <div className="video-label">
            <span>
              PREMIERE PRO
            </span>

            <strong>
              Introduction to Video Editing
            </strong>
          </div>
        </div>

        <div className="dashboard-progress">
          <span />
        </div>

        <div className="dashboard-footer">
          <div>
            <small>
              CURRENT LESSON
            </small>

            <strong>
              Introduction to Premiere Pro
            </strong>
          </div>

          <div className="dashboard-time">
            08:42
          </div>
        </div>
      </motion.div>

      {cards.map((card, index) => (
        <FloatingCard
          key={card.title}
          {...card}
          index={index}
        />
      ))}
    </div>
  );
}


/* =====================================================
   REVIEWS DATA
===================================================== */

const reviews = [
  {
    name: "ანა კაპანაძე",
    role: "კურსდამთავრებული",
    avatar: "/images/reviews/ana.jpg",
    text:
      "ყველას ვინც ვიდეო ედიტინგით ხარ დაინტერესებული, გირჩევთ ამ კურსს. ყველაფერი ძალიან მარტივად და გასაგებად არის ახსნილი.",
  },
  {
    name: "ელენე ხუციშვილი",
    role: "კურსდამთავრებული",
    avatar: "/images/reviews/elene.jpg",
    text:
      "პრემიერის სწავლა თუ ნულიდან გინდა დაიწყო, ეს კურსი ნამდვილად კარგი არჩევანია. დეტალურად და გასაგებად ხსნიან ყველაფერს.",
  },
  {
    name: "თორნიკე მაჭიაძე",
    role: "კურსდამთავრებული",
    avatar: "/images/reviews/tornike.jpg",
    text:
      "თუ ვიდეო ედიტინგის სწავლა გინდა, ამ კურსს გირჩევ. მასწავლებელი ძალიან კარგად ხსნის ყველაფერს და პრაქტიკაც ბევრია.",
  },
  {
    name: "თაკო ბერიძე",
    role: "კურსდამთავრებული",
    avatar: "/images/reviews/tako.jpg",
    text:
      "საინტერესო და რაც მთავარია პრაქტიკული ინფორმაცია. კურსის დასრულების შემდეგ ბევრად უფრო თავდაჯერებული გავხდი.",
  },
  {
    name: "ელენე ორჯონიკიძე",
    role: "კურსდამთავრებული",
    avatar: "/images/reviews/elene.jpg",
    text:
      "Highly recommended! ყველაფერი ძალიან კარგად იყო ახსნილი და პრაქტიკული დავალებებიც ძალიან დამეხმარა.",
  },
  {
    name: "ზურა მახათაძე",
    role: "კურსდამთავრებული",
    avatar: "/images/reviews/zura.jpg",
    text:
      "თავსის საკმაოდ პროფესიონალი ლექტორი! ყველა დეტალს ძალიან კარგად ხსნის და პრაქტიკულად გვაჩვენებს.",
  },
  {
    name: "მათე ჭიჭია",
    role: "კურსდამთავრებული",
    avatar: "/images/reviews/mate.jpg",
    text:
      "10/10 რეკომენდაცია ვისაც 0-დან სურს ვიდეო ედიტინგის შესწავლა.",
  },
  {
    name: "გიგა დავითაძე",
    role: "კურსდამთავრებული",
    avatar: "/images/reviews/giga.jpg",
    text:
      "ნამდვილად კარგი გამოცდილება იყო. ძალიან ბევრ ახალ რამეს გავეცანი.",
  },
];


/* =====================================================
   REVIEW CARD
===================================================== */

function ReviewCard({ review }) {
  return (
    <article className="review-card">
      <div className="review-user">
        <img
          src={review.avatar}
          alt={review.name}
        />

        <div>
          <h3>
            {review.name}
          </h3>

          <span>
            {review.role}
          </span>
        </div>
      </div>

      <div className="review-stars">
        ★★★★★
      </div>

      <p>
        {review.text}
      </p>
    </article>
  );
}


/* =====================================================
   REVIEWS
===================================================== */

function Reviews() {
  const firstRow = reviews.slice(0, 4);
  const secondRow = reviews.slice(4, 8);

  const firstRowLoop = [
    ...firstRow,
    ...firstRow,
    ...firstRow,
  ];

  const secondRowLoop = [
    ...secondRow,
    ...secondRow,
    ...secondRow,
  ];

  return (
    <section className="reviews-section">
      <div className="reviews-heading">
        <span>
          STUDENT REVIEWS
        </span>

        <h2>
          რას ამბობენ
          <br />
          ჩვენი სტუდენტები?
        </h2>
      </div>

      <div className="reviews-wall">

        {/* ROW 1 */}
        <div className="reviews-row reviews-row-one">
          {firstRowLoop.map((review, index) => (
            <ReviewCard
              key={`first-${review.name}-${index}`}
              review={review}
            />
          ))}
        </div>

        {/* ROW 2 */}
        <div className="reviews-row reviews-row-two">
          {secondRowLoop.map((review, index) => (
            <ReviewCard
              key={`second-${review.name}-${index}`}
              review={review}
            />
          ))}
        </div>

      </div>
    </section>
  );
}


/* =====================================================
   HOME
===================================================== */

export default function Home() {
  const rotatingWords = [
    "კრეატიულად",
    "თავისუფლად",
    "თანამედროვედ",
    "შენებურად",
  ];

  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(
        (current) =>
          (current + 1) % rotatingWords.length
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="home">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="hero">

        <div className="hero-content">

          <span className="hero-label">
            VIDEO EDITING ACADEMY
          </span>

          <h1 className="hero-title">
            ისწავლე ვიდეოს შექმნა

            <br />

            <span
              className="rotating-word-wrapper"
              aria-live="polite"
            >
              <motion.span
                key={wordIndex}
                className="rotating-word"
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                }}
              >
                {rotatingWords[wordIndex]}
              </motion.span>
            </span>
          </h1>

          <p>
            პრაქტიკული ონლაინ კურსები ვიდეომონტაჟში
            Premiere Pro, ხმა, ფერი და Storytelling.
          </p>

          <div className="hero-buttons">

            <Link
              to="/"
              className="primary-btn"
            >
              კურსის ნახვა
            </Link>

            <Link
              to="/"
              className="secondary-btn"
            >
              Live კურსები
            </Link>

          </div>

          <div className="hero-stats">

            <div>
              <strong>
                12
              </strong>

              <span>
                ლექცია
              </span>
            </div>

            <div>
              <strong>
                365
              </strong>

              <span>
                დღე წვდომა
              </span>
            </div>

            <div>
              <strong>
                100%
              </strong>

              <span>
                პრაქტიკული
              </span>
            </div>

          </div>

        </div>

        <HeroVisual />

      </section>


      {/* =================================================
          PRICING
      ================================================= */}

      <Pricing />


      {/* =================================================
          REVIEWS
      ================================================= */}

      <Reviews />

    </main>
  );
}