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
      aria-hidden="true"
    >
      <path
        d="M8 5.9C8 5.1 8.9 4.6 9.6 5.05L19 11.3C19.65 11.73 19.65 12.67 19 13.1L9.6 19.35C8.9 19.8 8 19.3 8 18.5V5.9Z"
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
   STAT CARD
===================================================== */

function StatCard({
  number,
  label,
  description,
  type,
}) {
  return (
    <motion.div
      className={`stat-card stat-card-${type}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.4,
      }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <span className="stat-card-label">
        {label}
      </span>

      <strong className="stat-card-number">
        {type === "level" ? (
          <>
            <span>0</span>
            <span className="stat-card-arrow">
              →
            </span>
            <span className="stat-card-pro">
              PRO
            </span>
          </>
        ) : (
          <>
            <AnimatedNumber value={number} />

            {(type === "lessons" ||
              type === "students") &&
              "+"}
          </>
        )}
      </strong>

      <small className="stat-card-desc">
        {description}
      </small>

      <div className="stat-card-bar">
        <motion.span
          initial={{ width: 0 }}
          whileInView={{
            width: `${
              type === "level"
                ? 90
                : type === "lessons"
                  ? 75
                  : type === "students"
                    ? 60
                    : 100
            }%`,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </div>
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
        y: [0, -7, 0],
      }}
      transition={{
        duration: 5 + index * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.35,
      }}
      whileHover={{
        scale: 1.04,
      }}
    >
      <div className="floating-card-top">
        <span>{title}</span>
      </div>

      {value && <strong>{value}</strong>}

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
          <small>LIVE COURSE</small>
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

  return `${String(minutes).padStart(
    2,
    "0"
  )}:${String(secs).padStart(2, "0")}`;
}

/* =====================================================
   VIDEO PLAYER
===================================================== */

function VideoPlayer() {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] =
    useState(false);

  const [currentTime, setCurrentTime] =
    useState(0);

  const [duration, setDuration] =
    useState(0);

  const [isMuted, setIsMuted] =
    useState(true);

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

  const toggleMute = () => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = !video.muted;

    setIsMuted(video.muted);
  };

  const handleSeek = (event) => {
    const video = videoRef.current;

    if (!video) return;

    const newTime = Number(
      event.target.value
    );

    video.currentTime = newTime;

    setCurrentTime(newTime);
  };

  return (
    <div className="dashboard-video-wrapper">
      <div
        className="dashboard-video"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          className="hero-video"
          muted={isMuted}
          playsInline
          preload="metadata"
          onLoadedMetadata={(event) =>
            setDuration(
              event.currentTarget.duration
            )
          }
          onTimeUpdate={(event) =>
            setCurrentTime(
              event.currentTarget.currentTime
            )
          }
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source
            src="/Videos/hero-video.mp4"
            type="video/mp4"
          />

          Your browser does not support the
          video element.
        </video>

        <div className="video-overlay" />

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

        <div className="video-label">
          <span>PREMIERE PRO</span>

          <strong>
            ვიდეო მონტაჟის საფუძვლები
          </strong>
        </div>

        <div className="video-duration">
          {formatTime(duration)}
        </div>
      </div>

      <div
        className="video-controls"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
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
                ? `${
                    (currentTime / duration) *
                    100
                  }%`
                : "0%",
          }}
          aria-label="Video progress"
        />

        <div className="video-controls-bottom">
          <div className="video-controls-left">
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
                <PauseIcon size={17} />
              ) : (
                <PlayIcon size={17} />
              )}
            </button>

            <span className="video-time">
              {formatTime(currentTime)} /{" "}
              {formatTime(duration)}
            </span>
          </div>

          <button
            type="button"
            className="control-button"
            onClick={toggleMute}
            aria-label={
              isMuted
                ? "Unmute video"
                : "Mute video"
            }
          >
            {isMuted ? (
              <MuteIcon size={17} />
            ) : (
              <VolumeIcon size={17} />
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
    [4, -4]
  );

  const rotateY = useTransform(
    smoothX,
    [-0.5, 0.5],
    [-6, 6]
  );

  const handleMouseMove = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    mouseX.set(
      (event.clientX - rect.left) /
        rect.width -
        0.5
    );

    mouseY.set(
      (event.clientY - rect.top) /
        rect.height -
        0.5
    );
  };

  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const cards = [
    {
      title: "12+ ლექცია",
      type: "lessons",
      position: "card-top-left",
    },
    {
      title: "8+ წლის გამოცდილება",
      type: "students",
      position: "card-top-right",
    },
    {
      title: "1 წელი წვდომა",
      type: "progress",
      position: "card-bottom-left",
    },
    {
      title: "Live კურსი",
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
      <div className="hero-glow" />

      <div className="hero-glow-secondary" />

      <motion.div
        className="hero-dashboard"
        style={{
          rotateX,
          rotateY,
        }}
        initial={{
          opacity: 0,
          scale: 0.94,
          y: 30,
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

        <VideoPlayer />

        <div className="dashboard-footer">
          <div>
            <small>
              მიმდინარე გაკვეთილი
            </small>

            <strong>
              შესავალი Premiere Pro-ში
            </strong>
          </div>

          <span>→</span>
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
   HOME
===================================================== */

export default function Home() {
  const rotatingWords = [
    "0-იდან",
    "მარტივად",
    "პროფესიონალურ დონეზე",
    "6 კვირაში",
    "აუდიტორიაში",
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
    <main className="home-page">
      <section className="hero">
        <div className="hero-background-glow hero-background-glow-one" />

        <div className="hero-background-glow hero-background-glow-two" />

        <div className="hero-inner">
          <div className="hero-content">
            <motion.span
              className="hero-label"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <span className="hero-label-bar" />

              VIDEO EDITING ACADEMY
            </motion.span>

            <motion.h1
              className="hero-title"
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.1,
              }}
            >
              <span className="hero-title-main">
                <span>ისწავლე ვიდეო</span>

                <span>მონტაჟი</span>
              </span>

              <span className="rotating-line">
                <motion.span
                  key={wordIndex}
                  className="rotating-word"
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [
                      0.16,
                      1,
                      0.3,
                      1,
                    ],
                  }}
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              className="hero-description"
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.25,
              }}
            >
              ისწავლე ვიდეო მონტაჟი 0-დან
              პროფესიონალურ დონემდე, Offline
              ან Online დასწრებით, პრაქტიკული
              დავალებებით და ლექტორის ფიდბექით
              თითოეულ დავალებაზე.
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.35,
              }}
            >
              <Link
                to="/pricing"
                className="primary-btn"
              >
                კურსის ნახვა

                <span>→</span>
              </Link>

              <Link
                to="/live-courses"
                className="secondary-btn"
              >
                Live კურსები
              </Link>
            </motion.div>

            <div className="hero-note">
              <span className="hero-note-dot" />

              <span>
                დაიწყე სწავლა დღესვე
              </span>
            </div>
          </div>

          <HeroVisual />
        </div>
      </section>

      <section className="stats-strip">
        <StatCard
          number={12}
          label="ლექცია"
          description="პრაქტიკული პროგრამა"
          type="lessons"
        />

        <StatCard
          number={15}
          label="სტუდენტი"
          description="მაქსიმუმ ჯგუფში"
          type="students"
        />

        <StatCard
          number={1}
          label="წელი"
          description="სრული წვდომა"
          type="access"
        />

        <StatCard
          label="დონე"
          description="ნულიდან პროფესიონალამდე"
          type="level"
        />
      </section>

      <section id="pricing">
        <Pricing />
      </section>
    </main>
  );
}