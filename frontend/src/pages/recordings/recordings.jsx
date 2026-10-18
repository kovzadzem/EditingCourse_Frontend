import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaCheck,
  FaChevronRight,
  FaClock,
  FaLock,
  FaVideo,
} from "react-icons/fa";

import "./Recordings.css";

const LESSONS = [
  {
    id: 1,
    title: "ვიდეო მონტაჟის საფუძვლები",
    duration: "42:00",
    // ჩასვი ამ ჩანაწერის ვიდეოს URL. გამოიყენე დაცული/ხელმოწერილი URL.
    videoUrl: "",
  },
  {
    id: 2,
    title: "Premiere Pro — სამუშაო გარემო",
    duration: "48:00",
    // ჩასვი ამ ჩანაწერის ვიდეოს URL. გამოიყენე დაცული/ხელმოწერილი URL.
    videoUrl: "",
  },
  {
    id: 3,
    title: "Timeline და მონტაჟის ლოგიკა",
    duration: "51:00",
    // ჩასვი ამ ჩანაწერის ვიდეოს URL. გამოიყენე დაცული/ხელმოწერილი URL.
    videoUrl: "",
  },
  {
    id: 4,
    title: "Cut, Trim და ძირითადი ინსტრუმენტები",
    duration: "44:00",
    // ჩასვი ამ ჩანაწერის ვიდეოს URL. გამოიყენე დაცული/ხელმოწერილი URL.
    videoUrl: "",
  },
  {
    id: 5,
    title: "ფერების კორექცია",
    duration: "46:00",
    // ჩასვი ამ ჩანაწერის ვიდეოს URL. გამოიყენე დაცული/ხელმოწერილი URL.
    videoUrl: "",
  },
  {
    id: 6,
    title: "აუდიოს დამუშავება",
    duration: "39:00",
    // ჩასვი ამ ჩანაწერის ვიდეოს URL. გამოიყენე დაცული/ხელმოწერილი URL.
    videoUrl: "",
  },
  {
    id: 7,
    title: "Transitions და ეფექტები",
    duration: "43:00",
    // ჩასვი ამ ჩანაწერის ვიდეოს URL. გამოიყენე დაცული/ხელმოწერილი URL.
    videoUrl: "",
  },
  {
    id: 8,
    title: "Titles, Text და Animation",
    duration: "47:00",
    // ჩასვი ამ ჩანაწერის ვიდეოს URL. გამოიყენე დაცული/ხელმოწერილი URL.
    videoUrl: "",
  },
  {
    id: 9,
    title: "Speed Ramping და Slow Motion",
    duration: "41:00",
    // ჩასვი ამ ჩანაწერის ვიდეოს URL. გამოიყენე დაცული/ხელმოწერილი URL.
    videoUrl: "",
  },
  {
    id: 10,
    title: "პროფესიონალური Color Grading",
    duration: "52:00",
    // ჩასვი ამ ჩანაწერის ვიდეოს URL. გამოიყენე დაცული/ხელმოწერილი URL.
    videoUrl: "",
  },
  {
    id: 11,
    title: "Sound Design",
    duration: "45:00",
    // ჩასვი ამ ჩანაწერის ვიდეოს URL. გამოიყენე დაცული/ხელმოწერილი URL.
    videoUrl: "",
  },
  {
    id: 12,
    title: "ვიდეოს ვიზუალური სტილი",
    duration: "49:00",
    // ჩასვი ამ ჩანაწერის ვიდეოს URL. გამოიყენე დაცული/ხელმოწერილი URL.
    videoUrl: "",
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
  // Demo mode lets you test the UI without a backend or a real bank transaction.
  // Open this page with ?demo=1. Never use demo mode as production payment proof.
  const pageQuery = new URLSearchParams(window.location.search);
  // Also support HashRouter URLs such as /#/recordings?demo=1.
  const hashQuery = window.location.hash.includes("?")
    ? new URLSearchParams(window.location.hash.split("?").slice(1).join("?"))
    : new URLSearchParams();
  const demoMode = pageQuery.get("demo") === "1" || hashQuery.get("demo") === "1";
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
  const [showRegistration, setShowRegistration] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [showDemoCheckout, setShowDemoCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [registration, setRegistration] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  // Access is read from the server; never grant access from a URL query parameter.
  useEffect(() => {
    if (demoMode) return undefined;
    let cancelled = false;
    fetch("/api/courses/access", { credentials: "include" })
      .then((response) => {
        if (!response.ok) throw new Error("წვდომის შემოწმება ვერ მოხერხდა");
        return response.json();
      })
      .then((data) => {
        if (!cancelled && data?.hasAccess === true) setHasAccess(true);
      })
      .catch(() => {
        // Fail closed: course remains locked if the server cannot verify access.
        if (!cancelled) setHasAccess(false);
      });
    return () => { cancelled = true; };
  }, []);

  // After returning from TBC, ask the backend to verify the order status.
  useEffect(() => {
    if (demoMode) return undefined;
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("orderId");
    if (!orderId) return;

    let cancelled = false;
    fetch(`/api/payments/status?orderId=${encodeURIComponent(orderId)}`, {
      credentials: "include",
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) throw new Error("გადახდის სტატუსი ვერ შემოწმდა");
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (data?.status === "paid" && data?.hasAccess === true) {
          setHasAccess(true);
          window.history.replaceState({}, "", window.location.pathname);
        } else if (data?.status === "pending") {
          setCheckoutError("გადახდა ჯერ არ დადასტურებულა. რამდენიმე წამში განაახლე გვერდი.");
        } else {
          setCheckoutError("გადახდა არ დადასტურდა. კურსი კვლავ ჩაკეტილია.");
        }
      })
      .catch(() => {
        if (!cancelled) setCheckoutError("გადახდის სტატუსის შემოწმება ვერ მოხერხდა. სცადე მოგვიანებით.");
      });
    return () => { cancelled = true; };
  }, []);

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

  const [videoDuration, setVideoDuration] = useState(0);
  const videoRef = useRef(null);

  const activeLesson = useMemo(() => {
    return (
      LESSONS.find((lesson) => lesson.id === activeLessonId) ||
      LESSONS[0]
    );
  }, [activeLessonId]);

  const activeDuration = videoDuration || parseDuration(activeLesson.duration);

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
    ? (LESSONS.find((lesson) => !completedLessons.includes(lesson.id))?.id ?? LESSONS.length)
    : 0;

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
        setVideoDuration(0);
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

    const isPreview = false;

    // Once payment is verified, all 12 video recordings are available.
    const isLocked = !hasAccess;

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
    setVideoDuration(0);
  };

  /*
   * =====================================================
   * BUY COURSE
   * =====================================================
   */

  const handleBuyCourse = () => {
    setCheckoutError("");
    setShowRegistration(true);
  };

  const handleRegistrationChange = (event) => {
    const { name, value } = event.target;
    setRegistration((previous) => ({ ...previous, [name]: value }));
  };

  const handleRegistrationSubmit = async (event) => {
    event.preventDefault();
    setCheckoutLoading(true);
    setCheckoutError("");

    // Explicitly simulated checkout for visual/flow testing only.
    // It does not contact TBC, charge money, or persist access.
    if (demoMode) {
      setCheckoutLoading(false);
      setShowDemoCheckout(true);
      return;
    }

    try {
      // Backend validates the customer, creates the order and requests a TBC checkout URL.
      const response = await fetch("/api/checkout/start", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: "edit-academy-video-editing",
          customer: registration,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.checkoutUrl) {
        throw new Error(data?.message || "გადახდის გვერდის გახსნა ვერ მოხერხდა. სცადე თავიდან.");
      }

      // Only redirect to the checkout URL returned by our trusted backend.
      const checkoutUrl = new URL(data.checkoutUrl);
      if (checkoutUrl.protocol !== "https:") {
        throw new Error("გადახდის მისამართი არასწორია.");
      }
      window.location.assign(checkoutUrl.toString());
    } catch (error) {
      setCheckoutError(error.message || "შეცდომა მოხდა. სცადე თავიდან.");
      setCheckoutLoading(false);
    }
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
    setVideoDuration(0);

  };

  return (
    <main className="recordings-page">
      {demoMode && (
        <div className="demo-mode-banner" role="status">
          <strong>DEMO რეჟიმი</strong>
          <span>ტესტირების სიმულაციაა — TBC-სთან კავშირი და რეალური გადახდა არ სრულდება.</span>
        </div>
      )}

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
            12 ვიდეოჩანაწერი,
            რომელიც დაგეხმარება ვიდეო მონტაჟის
            სწავლაში 0-დან პროფესიონალურ დონემდე.
          </p>

        </div>


        <div className="header-meta">

          <div className="meta-item">
            <strong>12</strong>
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
            ? "გადახდის დადასტურების შემდეგ დაიწყება შენი პროგრესის დაგროვება."
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
                <span>/12</span>
              </div>

            </div>


            {/* REAL VIDEO PLAYER: ვიდეოների URL-ները լրացրու LESSONS զանգվածում */}
            <div className="video-stage video-stage-real">
              {hasAccess && activeLesson.videoUrl ? (
                <video
                  ref={videoRef}
                  className="course-video-player"
                  src={activeLesson.videoUrl}
                  controls
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={(event) => setVideoDuration(event.currentTarget.duration || 0)}
                  onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime || 0)}
                  onEnded={() => handleLessonComplete(activeLesson.id)}
                >
                  შენი ბრაუზერი ვიდეოს დაკვრას არ უჭერს მხარს.
                </video>
              ) : (
                <div className="video-stage-content">
                  <div className="stage-kicker">EDIT ACADEMY</div>
                  <h2>{activeLesson.title}</h2>
                  <p>
                    {!hasAccess
                      ? "ვიდეოს სანახავად შეიძინე კურსი."
                      : "ამ ჩანაწერის ვიდეოს ბმული ჯერ არ არის დამატებული."}
                  </p>
                  <button
                    type="button"
                    className="stage-play"
                    onClick={hasAccess ? undefined : handleBuyCourse}
                    aria-label={hasAccess ? "ვიდეო მიუწვდომელია" : "კურსის შეძენა"}
                    disabled={hasAccess}
                  >
                    <FaLock />
                  </button>
                </div>
              )}
              <div className="stage-number">{String(activeLesson.id).padStart(2, "0")}</div>
            </div>

            {/* VIDEO PROGRESS */}
            <div className="video-controls">
              <div className="video-time">{formatTime(currentTime)}</div>
              <div className="video-track">
                <div className="video-track-fill" style={{ width: `${videoProgress}%` }} />
              </div>
              <div className="video-time">{videoDuration ? formatTime(videoDuration) : activeLesson.duration}</div>
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
                {videoDuration ? formatTime(videoDuration) : activeLesson.duration}
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
                  წვდომას ყველა 12 ვიდეოჩანაწერზე ერთი წლის
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
                  disabled={checkoutLoading}
                >
                  {demoMode ? "გადახდის დემო-ტესტი" : "კურსის შეძენა"}
                  <FaChevronRight />
                </button>

              </div>

            </div>

          )}

          {!hasAccess && showRegistration && (
            <form className="registration-card" onSubmit={handleRegistrationSubmit}>
              <div className="registration-heading">
                <span>ნაბიჯი 1 / 2</span>
                <h3>რეგისტრაცია და გადახდა</h3>
                <p>{demoMode ? "შეავსე მონაცემები და შემდეგ გამოჩნდება სატესტო გადახდის ფანჯარა." : "შეავსე მონაცემები. შემდეგ გადახდის დასასრულებლად გადახვალ TBC-ის უსაფრთხო გვერდზე."}</p>
              </div>

              <label>
                სახელი და გვარი
                <input
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  value={registration.fullName}
                  onChange={handleRegistrationChange}
                  required
                  minLength={2}
                  maxLength={120}
                  placeholder="მაგ. ნინო ნადირაძე"
                />
              </label>

              <label>
                ელფოსტა
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={registration.email}
                  onChange={handleRegistrationChange}
                  required
                  maxLength={254}
                  placeholder="you@example.com"
                />
              </label>

              <label>
                ტელეფონის ნომერი
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={registration.phone}
                  onChange={handleRegistrationChange}
                  required
                  minLength={6}
                  maxLength={30}
                  placeholder="+995 5XX XX XX XX"
                />
              </label>

              {checkoutError && <p className="checkout-error" role="alert">{checkoutError}</p>}

              <button className="registration-submit" type="submit" disabled={checkoutLoading}>
                {checkoutLoading ? "გადამისამართება..." : "რეგისტრაცია და გადახდა — 450 ₾"}
                {!checkoutLoading && <FaChevronRight />}
              </button>
              <p className="registration-note">
                {demoMode
                  ? "DEMO რეჟიმში შეგიძლია წარმატებული და წარუმატებელი გადახდის სცენარების გამოცდა."
                  : "კურსზე წვდომა ჩაირთვება მხოლოდ მას შემდეგ, რაც სერვერი TBC-ისგან გადახდას დაადასტურებს."}
              </p>
            </form>
          )}

          {demoMode && showDemoCheckout && !hasAccess && (
            <section className="demo-checkout-card" aria-label="სატესტო გადახდა">
              <div className="demo-checkout-icon"><FaLock /></div>
              <span className="demo-checkout-eyebrow">SIMULATED CHECKOUT</span>
              <h3>TBC გადახდის სატესტო ფანჯარა</h3>
              <p>ეს მხოლოდ დიზაინისა და მომხმარებლის გზის ტესტია. ბარათის მონაცემები არ შეიყვანო — რეალური ბანკის გვერდი არ გახსნილა.</p>
              <div className="demo-checkout-summary">
                <span>Edit Academy — 12 ვიდეოჩანაწერი</span>
                <strong>450 ₾</strong>
              </div>
              <button
                type="button"
                className="demo-payment-success"
                onClick={() => {
                  setHasAccess(true);
                  setShowDemoCheckout(false);
                  setShowRegistration(false);
                  setCheckoutError("");
                }}
              >
                სატესტო წარმატებული გადახდა
              </button>
              <button
                type="button"
                className="demo-payment-fail"
                onClick={() => {
                  setShowDemoCheckout(false);
                  setCheckoutError("სატესტო გადახდა უარყოფილია. კურსი კვლავ ჩაკეტილია.");
                }}
              >
                სატესტო წარუმატებელი გადახდა
              </button>
              <p className="demo-checkout-footnote">წვდომა გაიხსნება მხოლოდ ამ ბრაუზერის მიმდინარე დემო-სესიაში.</p>
            </section>
          )}

          {checkoutError && !showRegistration && !hasAccess && (
            <p className="checkout-error" role="alert">{checkoutError}</p>
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
              {completedCount}/12
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
                        : hasAccess
                        ? "ვიდეოჩანაწერი"
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
                  : "ვიდეოჩანაწერები გაიხსნება გადახდის დადასტურების შემდეგ."}
              </p>

            </div>

          </div>




        </aside>

      </section>

    </main>
  );
}

export default Recordings;