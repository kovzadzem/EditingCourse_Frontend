import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaLock,
  FaVideo,
  FaCheck,
  FaExternalLinkAlt,
  FaBookOpen,
  FaGraduationCap,
  FaPlay,
  FaArrowRight,
  FaRedoAlt,
} from "react-icons/fa";

import { supabase } from "../../supabase";
import "./recordings.css";

const COURSE_ID = "edit-academy-video-editing";

function isDirectVideoUrl(url = "") {
  try {
    const parsed = new URL(url);
    return /\.(mp4|webm|ogg|mov|m4v)$/i.test(parsed.pathname);
  } catch {
    return false;
  }
}

function isValidHttpUrl(url = "") {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function formatLessonNumber(number) {
  return String(number ?? 0).padStart(2, "0");
}

export default function Recordings() {
  const [lessons, setLessons] = useState([]);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRecordings = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const {
        data: { user: currentUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      setUser(currentUser ?? null);

      let adminUser = false;
      let accessGranted = false;

      if (currentUser) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", currentUser.id)
          .maybeSingle();

        if (profileError) throw profileError;

        adminUser = profile?.role === "admin";

        const { data: accessRows, error: accessError } = await supabase
          .from("course_access")
          .select("id, active, granted_at, expires_at")
          .eq("user_id", currentUser.id)
          .eq("course_id", COURSE_ID)
          .eq("active", true);

        if (accessError) throw accessError;

        const now = Date.now();

        accessGranted = (accessRows ?? []).some((access) => {
          const grantedAt = access.granted_at
            ? new Date(access.granted_at).getTime()
            : 0;

          const expiresAt = access.expires_at
            ? new Date(access.expires_at).getTime()
            : null;

          return (
            grantedAt <= now &&
            (expiresAt === null || expiresAt > now)
          );
        });
      }

      setIsAdmin(adminUser);
      setHasAccess(accessGranted);

      const { data: publishedLessons, error: lessonsError } =
        await supabase
          .from("lessons")
          .select(
            "id, title, description, lesson_number, video_path, is_published, created_at"
          )
          .eq("is_published", true)
          .order("lesson_number", { ascending: true });

      if (lessonsError) throw lessonsError;

      const results = (publishedLessons ?? []).map((lesson) => ({
        ...lesson,
        videoUrl: lesson.video_path || "",
      }));

      setLessons(results);

      setSelectedLessonId((previousId) => {
        if (results.some((lesson) => lesson.id === previousId)) {
          return previousId;
        }

        return results[0]?.id ?? null;
      });
    } catch (err) {
      console.error("ვიდეოების ჩატვირთვის შეცდომა:", err);

      setError(
        err?.message ||
          "ვიდეოების ჩატვირთვა ვერ მოხერხდა. სცადე ხელახლა."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecordings();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadRecordings();
    });

    return () => subscription.unsubscribe();
  }, [loadRecordings]);

  const selectedLesson = useMemo(
    () =>
      lessons.find((lesson) => lesson.id === selectedLessonId) ??
      lessons[0] ??
      null,
    [lessons, selectedLessonId]
  );

  const canWatch = isAdmin || hasAccess;

  const playableLessons = useMemo(
    () =>
      lessons.filter(
        (lesson) =>
          Boolean(lesson.videoUrl) &&
          isValidHttpUrl(lesson.videoUrl)
      ),
    [lessons]
  );

  const progress = lessons.length
    ? Math.round((playableLessons.length / lessons.length) * 100)
    : 0;

  if (loading) {
    return (
      <main className="recordings-page">
        <div className="recordings-shell">
          <div className="recordings-loading-top">
            <span className="recordings-kicker">
              EDITOLOGIA / LEARNING SPACE
            </span>

            <div className="recordings-loading-line" />
            <div className="recordings-skeleton-title" />
            <div className="recordings-skeleton-copy" />
          </div>

          <div className="recordings-skeleton-layout">
            <div className="recordings-skeleton-player" />

            <div className="recordings-skeleton-list">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="recordings-page">
      <div className="recordings-shell">
        <header className="recordings-header">
          <div className="recordings-heading">
            <div className="recordings-kicker">
              <span className="recordings-kicker-dot" />
              EDITOLOGIA
              <span className="recordings-kicker-divider">/</span>
              LEARNING SPACE
            </div>

            <h1>
              შენი ცოდნა
              <br />
              <span>შენი ტემპი</span>
            </h1>

            <p className="recordings-intro">
              ყველა ვიდეოგაკვეთილი ერთ სივრცეში. ისწავლე
              პრაქტიკულად, დაბრუნდი შენთვის მნიშვნელოვან თემებთან
              და განავითარე შენი უნარები.
            </p>
          </div>

          <div className="recordings-header-aside">
            <div className="recordings-edition">
              <span className="recordings-edition-icon">
                <FaGraduationCap />
              </span>

              <div>
                <span className="recordings-small-label">
                  YOUR LEARNING SPACE
                </span>
                <strong>Video Editing Academy</strong>
              </div>
            </div>

            <div className="recordings-header-stats">
              <div>
                <strong>{String(lessons.length).padStart(2, "0")}</strong>
                <span>გაკვეთილი</span>
              </div>

              <span className="recordings-stat-divider" />

              <div>
                <strong>{canWatch ? "PRO" : "01"}</strong>
                <span>{canWatch ? "სრული წვდომა" : "კურსი"}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="recordings-top-rule">
          <span>01</span>
          <span>კურსის ბიბლიოთეკა</span>
          <span className="recordings-top-rule-line" />
          <span>EDIT / LEARN / CREATE</span>
        </div>

        {isAdmin && (
          <div className="recordings-admin-banner">
            <FaCheck />
            <span>
              ადმინისტრატორის რეჟიმი — ყველა გამოქვეყნებული
              გაკვეთილი ხელმისაწვდომია.
            </span>
          </div>
        )}

        {error && (
  <div className="recordings-error" role="alert">
    <div>
      <strong>ვიდეოგაკვეთილებზე წვდომა შეზღუდულია</strong>
      <p>
        ვიდეოგაკვეთილებზე წვდომა გაგეხსნება რეგისტრაციის
        გავლისა და კურსის საფასურის გადახდის დადასტურების შემდეგ.
        გადახდის დადასტურებისთანავე შეძლებ ყველა გამოქვეყნებული
        გაკვეთილის ნახვას.
      </p>
    </div>
  </div>
)}

        {!error && lessons.length > 0 && (
          <>
            <section className="recordings-course-overview">
              <div className="recordings-overview-title">
                <span className="recordings-section-number">
                  A / 01
                </span>

                <div>
                  <h2>Video Editing</h2>
                  <p>პრაქტიკული სწავლა, ნაბიჯ-ნაბიჯ.</p>
                </div>
              </div>

              <div className="recordings-overview-progress">
                <div className="recordings-progress-labels">
                  <span>სასწავლო მასალები</span>
                  <strong>{lessons.length} გაკვეთილი</strong>
                </div>

                <div
                  className="recordings-progress-track"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                  aria-label="ვიდეომასალების ხელმისაწვდომობა"
                >
                  <span style={{ width: `${progress}%` }} />
                </div>

                <span className="recordings-progress-caption">
                  {canWatch
                    ? "შენი კურსი მზად არის გასაგრძელებლად."
                    : "გაკვეთილებზე წვდომისთვის საჭიროა აქტიური კურსი."}
                </span>
              </div>
            </section>

            <section className="recordings-learning-layout">
              <div className="recordings-main-column">
                <div className="recordings-player-heading">
                  <div>
                    <span className="recordings-section-number">
                      NOW LEARNING
                    </span>
                    <h2>გაკვეთილი</h2>
                  </div>

                  <span className="recordings-player-count">
                    {formatLessonNumber(
                      selectedLesson?.lesson_number || 1
                    )}
                    <span>
                      {" "}
                      / {formatLessonNumber(lessons.length)}
                    </span>
                  </span>
                </div>

                <article className="recordings-player-card">
                  <div
                    className={`recordings-player-stage ${
                      selectedLesson?.videoUrl && canWatch
                        ? "has-video"
                        : ""
                    }`}
                  >
                    {selectedLesson &&
                    canWatch &&
                    selectedLesson.videoUrl &&
                    isValidHttpUrl(selectedLesson.videoUrl) &&
                    isDirectVideoUrl(selectedLesson.videoUrl) ? (
                      <video
                        key={selectedLesson.id}
                        className="recordings-video-player"
                        controls
                        playsInline
                        preload="metadata"
                        src={selectedLesson.videoUrl}
                      >
                        შენი ბრაუზერი ვიდეოს დაკვრას ვერ ახერხებს.
                      </video>
                    ) : selectedLesson &&
                      canWatch &&
                      selectedLesson.videoUrl &&
                      isValidHttpUrl(selectedLesson.videoUrl) ? (
                      <div className="recordings-player-placeholder">
                        <span className="recordings-player-overline">
                          EDITOLOGIA / VIDEO LESSON
                        </span>

                        <span className="recordings-big-number">
                          {formatLessonNumber(
                            selectedLesson.lesson_number
                          )}
                        </span>

                        <div className="recordings-play-emblem">
                          <FaPlay />
                        </div>

                        <h3>გაკვეთილი მზად არის</h3>

                        <p>ვიდეოს სანახავად გახსენი გაკვეთილი.</p>

                        <a
                          href={selectedLesson.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="recordings-open-video"
                        >
                          ვიდეოს გახსნა
                          <FaExternalLinkAlt />
                        </a>
                      </div>
                    ) : (
                      <div className="recordings-player-placeholder">
                        <span className="recordings-player-overline">
                          EDITOLOGIA / VIDEO LESSON
                        </span>

                        <span className="recordings-big-number">
                          {formatLessonNumber(
                            selectedLesson?.lesson_number || 1
                          )}
                        </span>

                        <div className="recordings-play-emblem">
                          {canWatch ? <FaVideo /> : <FaLock />}
                        </div>

                        <span className="recordings-stage-label">
                          {canWatch
                            ? "COMING INTO FOCUS"
                            : "MEMBERS ONLY"}
                        </span>

                        <h3>
                          {selectedLesson
                            ? canWatch
                              ? "ვიდეო ჯერ არ არის დამატებული"
                              : "გააგრძელე შენი სწავლა"
                            : "აირჩიე გაკვეთილი"}
                        </h3>

                        <p>
                          {canWatch
                            ? "ამ გაკვეთილის ვიდეოს ბმული ჯერ არ არის მითითებული."
                            : user
                              ? "ამ მასალის სანახავად საჭიროა კურსზე აქტიური წვდომა."
                              : "შედი შენს ანგარიშში და მიიღე კურსზე წვდომა."}
                        </p>

                        {!canWatch && (
                          <a
                            href="/#pricing"
                            className="recordings-open-video"
                          >
                            კურსის ნახვა
                            <FaArrowRight />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="recordings-player-details">
                    <div className="recordings-player-title">
                      <span>
                        გაკვეთილი{" "}
                        {formatLessonNumber(
                          selectedLesson?.lesson_number || 1
                        )}
                      </span>

                      <h3>
                        {selectedLesson?.title || "ვიდეოგაკვეთილები"}
                      </h3>
                    </div>

                    <div className="recordings-player-status">
                      <span className={canWatch ? "is-accessible" : ""}>
                        {canWatch ? <FaCheck /> : <FaLock />}
                      </span>

                      {canWatch ? "წვდომა აქტიურია" : "ჩაკეტილი"}
                    </div>
                  </div>

                  {selectedLesson?.description && (
                    <div className="recordings-description">
                      <span className="recordings-section-number">
                        ABOUT THIS LESSON
                      </span>

                      <p>{selectedLesson.description}</p>
                    </div>
                  )}
                </article>

                {!canWatch && (
                  <section className="recordings-premium-lock">
                    <div className="recordings-premium-visual">
                      <div className="recordings-premium-orbit recordings-orbit-one" />
                      <div className="recordings-premium-orbit recordings-orbit-two" />

                      <div className="recordings-premium-symbol">
                        <FaLock />
                      </div>

                      <span className="recordings-premium-index">
                        E / 01
                      </span>

                      <span className="recordings-premium-caption">
                        EXCLUSIVE LEARNING SPACE
                      </span>
                    </div>

                    <div className="recordings-premium-content">
                      <span className="recordings-section-number">
                        <span className="recordings-premium-dot" />
                        YOUR NEXT CHAPTER STARTS HERE
                      </span>

                      <h2>
                        შენი შემდეგი
                        <br />
                        <span>დონე აქ იწყება.</span>
                      </h2>

                      <p>
                        მიიღე წვდომა ვიდეოგაკვეთილების სრულ
                        ბიბლიოთეკაზე, ისწავლე შენს ტემპში და
                        განავითარე პრაქტიკული ვიდეომონტაჟის უნარები.
                      </p>

                      <div className="recordings-premium-benefits">
                        <div>
                          <span className="recordings-benefit-number">
                            01
                          </span>
                          <span>ვიდეოგაკვეთილებზე წვდომა</span>
                          <FaCheck />
                        </div>

                        <div>
                          <span className="recordings-benefit-number">
                            02
                          </span>
                          <span>სწავლა შენს ტემპში</span>
                          <FaCheck />
                        </div>

                        <div>
                          <span className="recordings-benefit-number">
                            03
                          </span>
                          <span>პრაქტიკული ცოდნის განვითარება</span>
                          <FaCheck />
                        </div>
                      </div>

                      <a
                        href="/#pricing"
                        className="recordings-premium-cta"
                      >
                        <span>აღმოაჩინე კურსი</span>

                        <span className="recordings-premium-cta-icon">
                          <FaArrowRight />
                        </span>
                      </a>

                      <span className="recordings-premium-footnote">
                        EDITOLOGIA <span>·</span> LEARN WITH INTENTION
                      </span>
                    </div>
                  </section>
                )}
              </div>

              <aside className="recordings-sidebar">
                <div className="recordings-sidebar-heading">
                  <div>
                    <span className="recordings-section-number">
                      THE CURRICULUM
                    </span>
                    <h2>გაკვეთილები</h2>
                  </div>

                  <span className="recordings-sidebar-total">
                    {formatLessonNumber(lessons.length)}
                  </span>
                </div>

                <p className="recordings-sidebar-description">
                  აირჩიე თემა და განაგრძე სწავლა.
                </p>

                <div className="recordings-lesson-list">
                  {lessons.map((lesson) => {
                    const active = lesson.id === selectedLesson?.id;

                    const available =
                      canWatch &&
                      Boolean(lesson.videoUrl) &&
                      isValidHttpUrl(lesson.videoUrl);

                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        className={`recordings-lesson-item ${
                          active ? "is-active" : ""
                        } ${!canWatch ? "is-locked" : ""}`}
                        onClick={() => setSelectedLessonId(lesson.id)}
                        aria-current={active ? "true" : undefined}
                        aria-label={`გაკვეთილი ${lesson.lesson_number}: ${lesson.title}`}
                      >
                        <span className="recordings-lesson-number">
                          {available ? (
                            active ? (
                              <FaPlay />
                            ) : (
                              <FaCheck />
                            )
                          ) : !canWatch ? (
                            <FaLock />
                          ) : (
                            formatLessonNumber(lesson.lesson_number)
                          )}
                        </span>

                        <span className="recordings-lesson-copy">
                          <span className="recordings-lesson-overline">
                            LESSON{" "}
                            {formatLessonNumber(lesson.lesson_number)}
                          </span>

                          <strong>{lesson.title}</strong>

                          <span className="recordings-lesson-subtitle">
                            {!canWatch
                              ? "წვდომა საჭიროა"
                              : available
                                ? active
                                  ? "არჩეული გაკვეთილი"
                                  : "ხელმისაწვდომია"
                                : "ვიდეო ემატება"}
                          </span>
                        </span>

                        <FaArrowRight className="recordings-lesson-arrow" />
                      </button>
                    );
                  })}
                </div>

                <div className="recordings-sidebar-footer">
                  <span className="recordings-sidebar-footer-icon">
                    <FaBookOpen />
                  </span>

                  <div>
                    <strong>ისწავლე პრაქტიკით.</strong>
                    <p>
                      ყოველი გაკვეთილი ერთი ნაბიჯით გაწინაურებს.
                    </p>
                  </div>
                </div>
              </aside>
            </section>
          </>
        )}

        {!error && lessons.length === 0 && (
          <section className="recordings-empty">
            <span className="recordings-empty-icon">
              <FaVideo />
            </span>

            <span className="recordings-section-number">
              YOUR NEXT CHAPTER
            </span>

            <h2>აქ მალე ახალი გაკვეთილები გამოჩნდება.</h2>

            <p>
              როგორც კი ადმინისტრატორი ვიდეოგაკვეთილს გამოაქვეყნებს,
              მას აქ ნახავ.
            </p>
          </section>
        )}

        <footer className="recordings-footer">
          <span>EDITOLOGIA</span>
          <span>LEARN WITH INTENTION.</span>
        </footer>
      </div>
    </main>
  );
}