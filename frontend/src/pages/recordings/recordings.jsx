import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaCheck,
  FaChevronRight,
  FaClock,
  FaLock,
  FaPlay,
  FaPause,
  FaVideo,
} from "react-icons/fa";

import "./Recordings.css";

const LESSONS = [
  {
    id: 1,
    title: "ვიდეო მონტაჟის საფუძვლები",
    duration: "42:00",
    preview: true,
  },
  {
    id: 2,
    title: "Premiere Pro — სამუშაო გარემო",
    duration: "48:00",
  },
  {
    id: 3,
    title: "Timeline და მონტაჟის ლოგიკა",
    duration: "51:00",
  },
  {
    id: 4,
    title: "Cut, Trim და ძირითადი ინსტრუმენტები",
    duration: "44:00",
  },
  {
    id: 5,
    title: "ფერების კორექცია",
    duration: "46:00",
  },
  {
    id: 6,
    title: "აუდიოს დამუშავება",
    duration: "39:00",
  },
  {
    id: 7,
    title: "Transitions და ეფექტები",
    duration: "43:00",
  },
  {
    id: 8,
    title: "Titles, Text და Animation",
    duration: "47:00",
  },
  {
    id: 9,
    title: "Speed Ramping და Slow Motion",
    duration: "41:00",
  },
  {
    id: 10,
    title: "პროფესიონალური Color Grading",
    duration: "52:00",
  },
  {
    id: 11,
    title: "Sound Design",
    duration: "45:00",
  },
  {
    id: 12,
    title: "ვიდეოს ვიზუალური სტილი",
    duration: "49:00",
  },
  {
    id: 13,
    title: "რეალური პროექტის აწყობა",
    duration: "56:00",
  },
  {
    id: 14,
    title: "Final Edit — პროექტის დასრულება",
    duration: "53:00",
  },
  {
    id: 15,
    title: "PRO Workflow — სრული სამუშაო პროცესი",
    duration: "61:00",
  },
];

const parseDuration = (duration) => {
  const [minutes, seconds] = duration.split(":").map(Number);

  return minutes * 60 + seconds;
};

const formatTime = (seconds) => {
  const safeSeconds = Math.max(0, Math.floor(seconds || 0));

  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

function Recordings() {
  /*
   * =====================================================
   * TEMPORARY ACCESS
   * =====================================================
   *
   * false = კურსი არ არის ნაყიდი
   * true  = კურსი ნაყიდია
   *
   * მოგვიანებით ეს პირდაპირ Supabase-დან მოვა.
   */

  const [hasAccess, setHasAccess] = useState(false);

  /*
   * დასრულებული ლექციები
   */

  const [completedLessons, setCompletedLessons] = useState([]);

  /*
   * მიმდინარე ლექცია
   */

  const [activeLessonId, setActiveLessonId] = useState(1);

  /*
   * ვიდეოს მიმდინარე დრო
   */

  const [currentTime, setCurrentTime] = useState(0);

  /*
   * Play / Pause
   */

  const [isPlaying, setIsPlaying] = useState(false);

  const timerRef = useRef(null);

  const activeLesson = useMemo(() => {
    return (
      LESSONS.find((lesson) => lesson.id === activeLessonId) ||
      LESSONS[0]
    );
  }, [activeLessonId]);

  const activeDuration = parseDuration(activeLesson.duration);

  /*
   * =====================================================
   * PROGRESS
   * =====================================================
   */

  const completedCount = hasAccess
    ? completedLessons.length
    : 0;

  const courseProgress = Math.round(
    (completedCount / LESSONS.length) * 100
  );

  const videoProgress = Math.min(
    100,
    Math.round((currentTime / activeDuration) * 100)
  );

  /*
   * =====================================================
   * NEXT UNLOCKED LESSON
   * =====================================================
   */

  const nextLessonId = hasAccess
    ? Math.min(
        completedLessons.length + 1,
        LESSONS.length
      )
    : 0;

  /*
   * =====================================================
   * VIDEO SIMULATION
   * =====================================================
   *
   * სანამ ნამდვილ <video>-ს ჩავსვამთ,
   * ეს უბრალოდ ამოძრავებს progress-ს.
   */

  useEffect(() => {
    if (!isPlaying) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentTime((previous) => {
        const next = previous + 1;

        if (next >= activeDuration) {
          clearInterval(timerRef.current);

          setIsPlaying(false);

          handleLessonComplete(activeLesson.id);

          return activeDuration;
        }

        return next;
      });
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [isPlaying, activeDuration, activeLesson.id]);

  /*
   * =====================================================
   * COMPLETE LESSON
   * =====================================================
   */

  const handleLessonComplete = (lessonId) => {
    if (!hasAccess) return;

    setCompletedLessons((previous) => {
      if (previous.includes(lessonId)) {
        return previous;
      }

      return [...previous, lessonId].sort(
        (a, b) => a - b
      );
    });

    /*
     * შემდეგ ლექციაზე გადასვლა
     */

    if (lessonId < LESSONS.length) {
      setTimeout(() => {
        setActiveLessonId(lessonId + 1);
        setCurrentTime(0);
        setIsPlaying(false);
      }, 400);
    }
  };

  /*
   * =====================================================
   * LESSON STATUS
   * =====================================================
   */

  const getLessonStatus = (lesson) => {
    const isCompleted = completedLessons.includes(
      lesson.id
    );

    const isNext =
      hasAccess &&
      lesson.id === nextLessonId;

    const isPrevious =
      hasAccess &&
      lesson.id < nextLessonId;

    const isPreview =
      !hasAccess && lesson.id === 1;

    const isLocked =
      !isPreview &&
      !isCompleted &&
      !isNext;

    return {
      isCompleted,
      isNext,
      isPrevious,
      isPreview,
      isLocked,
    };
  };

  /*
   * =====================================================
   * SELECT LESSON
   * =====================================================
   */

  const selectLesson = (lesson) => {
    const status = getLessonStatus(lesson);

    if (status.isLocked) {
      return;
    }

    setActiveLessonId(lesson.id);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  /*
   * =====================================================
   * PLAY
   * =====================================================
   */

  const togglePlay = () => {
    if (!hasAccess && activeLesson.id !== 1) {
      return;
    }

    setIsPlaying((previous) => !previous);
  };

  /*
   * =====================================================
   * BUY COURSE
   * =====================================================
   */

  const handleBuyCourse = () => {
    setHasAccess(true);

    setCompletedLessons([]);

    setActiveLessonId(1);

    setCurrentTime(0);

    setIsPlaying(false);
  };

  /*
   * =====================================================
   * RESET — მხოლოდ development-ისთვის
   * =====================================================
   */

  const resetProgress = () => {
    setCompletedLessons([]);

    setActiveLessonId(1);

    setCurrentTime(0);

    setIsPlaying(false);
  };

  return (
    <main className="recordings-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="recordings-header">

        <div className="header-copy">

          <div className="recordings-label">
            <span className="label-dot" />
            EDIT ACADEMY / RECORDINGS
          </div>

          <h1>
            ჩანაწერები
          </h1>

          <p>
            წინასწარ მომზადებული 15 ჩანაწერი,
            რომელიც დაგეხმარება ვიდეო მონტაჟის
            სწავლაში 0-დან პროფესიონალურ დონემდე.
          </p>

        </div>


        <div className="header-meta">

          <div className="meta-item">
            <strong>15</strong>
            <span>ლექცია</span>
          </div>

          <div className="meta-line" />

          <div className="meta-item">
            <strong>1 წელი</strong>
            <span>წვდომა</span>
          </div>

        </div>

      </section>


      {/* =================================================
          COURSE PROGRESS
      ================================================= */}

      <section className="course-progress">

        <div className="progress-top">

          <div>

            <span>კურსის პროგრესი</span>

            <strong>
              {completedCount} / {LESSONS.length}
            </strong>

          </div>

          <strong className="progress-percent">
            {courseProgress}%
          </strong>

        </div>

        <div className="course-progress-track">

          <div
            className="course-progress-fill"
            style={{
              width: `${courseProgress}%`,
            }}
          />

        </div>

        <div className="progress-caption">

          {!hasAccess
            ? "კურსის შეძენის შემდეგ დაიწყება შენი პროგრესის დაგროვება."
            : completedCount === LESSONS.length
            ? "კურსი დასრულებულია — შესანიშნავი სამუშაოა."
            : `შემდეგი: ლექცია ${nextLessonId}`}

        </div>

      </section>


      {/* =================================================
          PLAYER AREA
      ================================================= */}

      <section className="learning-area">

        {/* =================================================
            PLAYER
        ================================================= */}

        <div className="player-column">

          <div className="player-card">

            <div className="player-head">

              <div className="player-course">
                <FaVideo />

                <span>
                  VIDEO COURSE
                </span>
              </div>

              <div className="player-index">
                {String(activeLesson.id).padStart(2, "0")}
                <span>/15</span>
              </div>

            </div>


            {/* PLAYER */}

            <div className="video-stage">

              <div className="video-noise" />

              <div className="video-stage-content">

                <div className="stage-kicker">
                  EDIT ACADEMY
                </div>

                <h2>
                  {activeLesson.title}
                </h2>

                <p>
                  {hasAccess
                    ? isPlaying
                      ? "ლექცია მიმდინარეობს..."
                      : "დააჭირე Play-ს გასაგრძელებლად."
                    : "ნახე პირველი ლექციის Preview."}
                </p>


                <button
                  type="button"
                  className="stage-play"
                  onClick={togglePlay}
                >

                  {isPlaying ? (
                    <FaPause />
                  ) : (
                    <FaPlay />
                  )}

                </button>

              </div>


              <div className="stage-number">
                {String(activeLesson.id).padStart(2, "0")}
              </div>

            </div>


            {/* VIDEO BAR */}

            <div className="video-controls">

              <div className="video-time">
                {formatTime(currentTime)}
              </div>

              <div className="video-track">

                <div
                  className="video-track-fill"
                  style={{
                    width: `${videoProgress}%`,
                  }}
                />

              </div>

              <div className="video-time">
                {activeLesson.duration}
              </div>

            </div>


            {/* VIDEO TITLE */}

            <div className="player-info">

              <div>

                <span>
                  ლექცია{" "}
                  {String(activeLesson.id).padStart(
                    2,
                    "0"
                  )}
                </span>

                <h2>
                  {activeLesson.title}
                </h2>

              </div>

              <div className="player-duration">
                <FaClock />
                {activeLesson.duration}
              </div>

            </div>

          </div>


          {/* =================================================
              PURCHASE CARD
          ================================================= */}

          {!hasAccess && (

            <div className="purchase-card">

              <div className="purchase-copy">

                <span>
                  სრული წვდომა
                </span>

                <h3>
                  ისწავლე ვიდეო მონტაჟი
                  <br />
                  <em>0-დან PRO-მდე.</em>
                </h3>

                <p>
                  კურსის შეძენის შემდეგ მიიღებ
                  წვდომას ყველა 15 ჩანაწერზე ერთი წლის
                  განმავლობაში.
                </p>

              </div>


              <div className="purchase-action">

                <div className="purchase-price">
                  <span>კურსის ფასი</span>
                  <strong>
                    450 <small>₾</small>
                  </strong>
                </div>

                <button
                  type="button"
                  onClick={handleBuyCourse}
                >
                  კურსის შეძენა
                  <FaChevronRight />
                </button>

              </div>

            </div>

          )}

        </div>


        {/* =================================================
            LESSON LIST
        ================================================= */}

        <aside className="lesson-column">

          <div className="lesson-column-head">

            <div>

              <span>
                COURSE CONTENT
              </span>

              <h2>
                ლექციები
              </h2>

            </div>

            <strong>
              {completedCount}/15
            </strong>

          </div>


          <div className="lesson-list">

            {LESSONS.map((lesson) => {

              const status =
                getLessonStatus(lesson);

              const isActive =
                activeLessonId === lesson.id;

              return (
                <button
                  key={lesson.id}
                  type="button"
                  className={[
                    "lesson-row",
                    isActive
                      ? "lesson-active"
                      : "",
                    status.isCompleted
                      ? "lesson-done"
                      : "",
                    status.isLocked
                      ? "lesson-locked"
                      : "",
                  ].join(" ")}
                  onClick={() =>
                    selectLesson(lesson)
                  }
                  disabled={status.isLocked}
                >

                  <div className="lesson-status">

                    {status.isCompleted ? (
                      <FaCheck />
                    ) : status.isLocked ? (
                      <FaLock />
                    ) : (
                      String(lesson.id).padStart(
                        2,
                        "0"
                      )
                    )}

                  </div>


                  <div className="lesson-main">

                    <div className="lesson-tag">

                      {status.isCompleted
                        ? "დასრულებული"
                        : status.isPreview
                        ? "PREVIEW"
                        : status.isNext
                        ? "შემდეგი ლექცია"
                        : "ჩაკეტილი"}

                    </div>

                    <h3>
                      {lesson.title}
                    </h3>

                  </div>


                  <div className="lesson-right">

                    <span>
                      {lesson.duration}
                    </span>

                    {!status.isLocked && (
                      <FaChevronRight />
                    )}

                  </div>

                </button>
              );
            })}

          </div>


          {/* =================================================
              ACCESS INFO
          ================================================= */}

          <div className="access-info">

            <div className="access-icon">
              {hasAccess ? (
                <FaCheck />
              ) : (
                <FaLock />
              )}
            </div>

            <div>

              <strong>
                {hasAccess
                  ? "კურსზე წვდომა აქტიურია"
                  : "კურსის ჩანაწერები ჩაკეტილია"}
              </strong>

              <p>
                {hasAccess
                  ? "ყოველი ლექციის დასრულების შემდეგ შემდეგი ავტომატურად გაიხსნება."
                  : "პირველი ლექციის Preview-ის ნახვა შეგიძლია კურსის შეძენამდე."}
              </p>

            </div>

          </div>


          {hasAccess && (
            <button
              type="button"
              className="reset-button"
              onClick={resetProgress}
            >
              Reset progress
            </button>
          )}

        </aside>

      </section>

    </main>
  );
}

export default Recordings;