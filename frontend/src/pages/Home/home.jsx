import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  animate,
} from "framer-motion";

import Pricing from "../Pricing/Pricing";
import "./Home.css";

/* =====================================================
   ICONS
===================================================== */

function PlayIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 5.5V18.5C8 19.3 8.9 19.8 9.6 19.35L19 13.1C19.65 12.67 19.65 11.73 19 11.3L9.6 5.05C8.9 4.6 8 5.1 8 5.9V5.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PauseIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="7"
        y="5"
        width="3.5"
        height="14"
        rx="1.5"
        fill="currentColor"
      />
      <rect
        x="13.5"
        y="5"
        width="3.5"
        height="14"
        rx="1.5"
        fill="currentColor"
      />
    </svg>
  );
}

function VolumeIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 9.5V14.5H8L13 19V5L8 9.5H4Z"
        fill="currentColor"
      />

      <path
        d="M16 8C17.35 9.1 18 10.45 18 12C18 13.55 17.35 14.9 16 16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M18.5 5.8C20.45 7.45 21.5 9.55 21.5 12C21.5 14.45 20.45 16.55 18.5 18.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MuteIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 9.5V14.5H8L13 19V5L8 9.5H4Z"
        fill="currentColor"
      />

      <path
        d="M16 9L21 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M21 9L16 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* =====================================================
   ANIMATED NUMBER
===================================================== */

function AnimatedNumber({ value, duration = 1.2 }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],

      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [value, duration]);

  return <>{displayValue}</>;
}

/* =====================================================
   PREMIUM STAT
===================================================== */

function PremiumStat({
  number,
  label,
  description,
  type,
}) {
  return (
    <motion.div
      className={`stats-strip-item stats-${type}`}
      initial={{
        opacity: 0,
        y: 18,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.4,
      }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* ICON */}

      {type === "lessons" && "▦"}
      {type === "students" && "◉"}
      {type === "access" && "◷"}
      {type === "level" && "✦"}

      <div className="stats-strip-content">
        <span className="stats-strip-label">
          {label}
        </span>

        <strong className="stats-strip-number">
          {type === "level" ? (
            <>
              <span>0</span>

              <span className="stats-arrow">
                →
              </span>

              <span className="stats-pro">
                PRO
              </span>
            </>
          ) : (
            <AnimatedNumber value={number} />
          )}
        </strong>

        <small>{description}</small>
      </div>

      {/* LESSONS PROGRESS */}

      {type === "lessons" && (
        <div className="stats-mini-line">
          <motion.span
            initial={{
              width: 0,
            }}
            whileInView={{
              width: "75%",
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.2,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </div>
      )}

      {/* ACCESS ORBIT */}

      {type === "access" && (
        <div className="stats-orbit">
          <motion.span
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      )}

      {/* LEVEL PROGRESS */}

      {type === "level" && (
        <div className="stats-level-progress">
          <motion.span
            initial={{
              width: 0,
            }}
            whileInView={{
              width: "90%",
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.4,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </div>
      )}
    </motion.div>
  );
}

/* =====================================================
   FLOATING CARD
===================================================== */

function FloatingCard({
  title,
  value,
  type,
  position,
  index,
}) {
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
          {type === "lessons" && ""}
          {type === "students" && ""}
          {type === "progress" && ""}
          {type === "status" && ""}
        </div>
      </div>

      <strong>{value}</strong>

      {/* LESSONS */}

      {type === "lessons" && (
        <div className="floating-lines">
          <span />
          <span />
          <span />
        </div>
      )}

      {/* STUDENTS */}

      {type === "students" && (
        <div className="student-dots">
          <span />
          <span />
          <span />
          <span />
        </div>
      )}

      {/* PROGRESS */}

      {type === "progress" && (
        <div className="floating-progress">
          <span />
        </div>
      )}

      {/* STATUS */}

      {type === "status" && (
        <div className="status-indicator">
          <span />
          Live course
        </div>
      )}
    </motion.div>
  );
}

/* =====================================================
   FORMAT TIME
===================================================== */

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${String(minutes).padStart(2, "0")}:${String(
    secs
  ).padStart(2, "0")}`;
}

/* =====================================================
   VIDEO PLAYER
===================================================== */

function VideoPlayer() {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  /* -----------------------------
     PLAY / PAUSE
  ----------------------------- */

  const togglePlay = async () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.log(
          "Video could not play:",
          error
        );
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  /* -----------------------------
     VIDEO EVENTS
  ----------------------------- */

  const handleLoadedMetadata = () => {
    const video = videoRef.current;

    if (!video) return;

    setDuration(video.duration);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (!video) return;

    setCurrentTime(video.currentTime);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  /* -----------------------------
     SEEK
  ----------------------------- */

  const handleSeek = (event) => {
    const video = videoRef.current;

    if (!video) return;

    const newTime = Number(event.target.value);

    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  /* -----------------------------
     MUTE
  ----------------------------- */

  const toggleMute = () => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = !video.muted;

    setIsMuted(video.muted);
  };

  return (
    <div className="dashboard-video-wrapper">

      {/* VIDEO */}

      <div
        className="dashboard-video"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          className="hero-video"
          playsInline
          preload="metadata"
          onLoadedMetadata={
            handleLoadedMetadata
          }
          onTimeUpdate={handleTimeUpdate}
          onPlay={handlePlay}
          onPause={handlePause}
        >
          <source
            src="/Videos/hero-video.mp4"
            type="video/mp4"
          />

          Your browser does not support the video
          element.
        </video>

        <div className="video-overlay" />

        {/* CENTER PLAY BUTTON */}

        <motion.button
          type="button"
          className={`video-play ${
            isPlaying ? "playing" : ""
          }`}
          onClick={(event) => {
            event.stopPropagation();
            togglePlay();
          }}
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.94,
          }}
          aria-label={
            isPlaying
              ? "Pause video"
              : "Play video"
          }
        >
          {isPlaying ? (
            <PauseIcon size={24} />
          ) : (
            <PlayIcon size={24} />
          )}
        </motion.button>

        {/* VIDEO LABEL */}

        <div className="video-label">
          <span>PREMIERE PRO</span>

          <strong>
            ვიდეო მონტაჟის საფუძვლები
          </strong>
        </div>
      </div>

      {/* VIDEO CONTROLS */}

      <div
        className="video-controls"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        {/* PROGRESS */}

        <input
          className="video-progress"
          type="range"
          min="0"
          max={duration || 0}
          step="0.01"
          value={currentTime}
          onChange={handleSeek}
          style={{
            "--progress":
              duration > 0
                ? `${(currentTime / duration) * 100}%`
                : "0%",
          }}
          aria-label="Video progress"
        />

        {/* BOTTOM CONTROLS */}

        <div className="video-controls-bottom">

          <div className="video-controls-left">

            {/* PLAY / PAUSE */}

            <button
              type="button"
              className="control-button"
              onClick={togglePlay}
              aria-label={
                isPlaying
                  ? "Pause video"
                  : "Play video"
              }
            >
              {isPlaying ? (
                <PauseIcon size={18} />
              ) : (
                <PlayIcon size={18} />
              )}
            </button>

            {/* TIME */}

            <span className="video-time">
              {formatTime(currentTime)}
              {" / "}
              {formatTime(duration)}
            </span>

          </div>

          {/* VOLUME */}

          <button
            type="button"
            className="control-button volume-button"
            onClick={toggleMute}
            aria-label={
              isMuted
                ? "Unmute video"
                : "Mute video"
            }
          >
            {isMuted ? (
              <MuteIcon size={18} />
            ) : (
              <VolumeIcon size={18} />
            )}
          </button>

        </div>
      </div>
    </div>
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

  /* -----------------------------
     MOUSE MOVE
  ----------------------------- */

  function handleMouseMove(event) {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
      rect.width;

    const y =
      (event.clientY - rect.top) /
      rect.height;

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
      title: "Groups",
      value: "15",
      type: "students",
      position: "card-top-right",
    },
    {
      title: "Access",
      value: "1 Year",
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

      {/* GLOW */}

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

      {/* DASHBOARD */}

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

        {/* HEADER */}

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

        {/* VIDEO */}

        <VideoPlayer />

        {/* FOOTER */}

        <div className="dashboard-footer">

          <div>
            <small>
              CURRENT LESSON
            </small>

            <strong>
              Introduction to Premiere Pro
            </strong>
          </div>

        </div>

      </motion.div>

      {/* FLOATING CARDS */}

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
   HOME
===================================================== */

export default function Home() {
  const rotatingWords = [
    "კრეატიულად",
    "პრაქტიკულად",
    "თავისუფლად",
    "შენებურად",
  ];

  const [wordIndex, setWordIndex] =
    useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(
        (current) =>
          (current + 1) %
          rotatingWords.length
      );
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <main>

      {/* =================================================
          HERO
      ================================================= */}

      <section className="hero">

        {/* LEFT */}

        <div className="hero-content">

          <motion.span
            className="hero-label"
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            VIDEO EDITING ACADEMY
          </motion.span>

          <motion.h1
            className="hero-title"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            ისწავლე ვიდეო მონტაჟი

            <br />

            <span className="rotating-word-wrapper">

              <motion.span
                key={wordIndex}
                className="rotating-word"
                initial={{
                  opacity: 0,
                  y: 18,
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {rotatingWords[wordIndex]}
              </motion.span>

            </span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            ისწავლე ვიდეო მონტაჟი 0-დან
            პროფესიონალურ დონემდე —
            პრაქტიკული კურსებით, რეალური
            ვიდეომასალით და თანამედროვე
            სამუშაო პროცესით.
          </motion.p>

          {/* BUTTONS */}

          <motion.div
            className="hero-buttons"
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
          >

            <Link
              to="/"
              className="primary-btn"
            >
              კურსის ნახვა
            </Link>

            <Link
              to="/live-courses"
              className="secondary-btn"
            >
              Live კურსები
            </Link>

          </motion.div>

        </div>

        {/* RIGHT */}

        <HeroVisual />

      </section>

      {/* =================================================
          STATS
      ================================================= */}

      <section className="stats-strip">

        <PremiumStat
          number={12}
          label="ლექცია"
          description="პრაქტიკული პროგრამა"
          type="lessons"
        />

        <PremiumStat
          number={15}
          label="სტუდენტი"
          description="მაქსიმუმ ჯგუფში"
          type="students"
        />

        <PremiumStat
          number={1}
          label="წელი"
          description="სრული წვდომა"
          type="access"
        />

        <PremiumStat
          label="დონე"
          description="ნულიდან პროფესიონალამდე"
          type="level"
        />

      </section>

      {/* =================================================
          PRICING
      ================================================= */}

      <Pricing />

    </main>
  );
}