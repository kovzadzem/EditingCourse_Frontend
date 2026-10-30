
import React, { useEffect, useState } from "react";
import {
  FaArrowDown,
  FaArrowRight,
  FaCheck,
  FaPlay,
  FaTimes,
  FaLink,
  FaUpload,
} from "react-icons/fa";
import { supabase } from "../../../supabase";
import "./VideoEditing.css";

const curriculumData = [
  {
    number: "01",
    category: "FOUNDATION",
    title: "ვიდეო მონტაჟის საფუძვლები",
    description:
      "ვიდეო მონტაჟის ძირითადი პრინციპები, სამუშაო გარემო და პროფესიონალური workflow.",
    topics: [
      "ვიდეო მონტაჟის პრინციპები",
      "სამუშაო გარემო",
      "ფაილების ორგანიზება",
      "სწორი workflow",
    ],
  },
  {
    number: "02",
    category: "SOFTWARE",
    title: "მონტაჟის პროგრამა",
    description:
      "პროგრამის ინტერფეისის და ძირითადი ინსტრუმენტების სრულად გაცნობა.",
    topics: ["Interface", "Timeline", "Tools", "Project Settings"],
  },
  {
    number: "03",
    category: "CUT & EDIT",
    title: "Cut & Edit",
    description: "კადრების სწორად დაჭრა, აწყობა და ვიდეოს ისტორიის შექმნა.",
    topics: ["Cutting", "Trim", "Transitions", "Timeline Editing"],
  },
  {
    number: "04",
    category: "RHYTHM",
    title: "კადრის რიტმი",
    description:
      "როგორ შევქმნათ დინამიკური და საინტერესო ვიდეო მხოლოდ მონტაჟის საშუალებით.",
    topics: ["Pacing", "Rhythm", "Storytelling", "Dynamic Editing"],
  },
  {
    number: "05",
    category: "SOUND",
    title: "აუდიო & Sound Design",
    description:
      "ხმის დამუშავება და Sound Design-ის გამოყენება ვიდეოს გასაძლიერებლად.",
    topics: ["Audio Editing", "Sound Effects", "Music", "Mixing"],
  },
  {
    number: "06",
    category: "COLOR",
    title: "Color Correction",
    description:
      "ვიდეოს ფერის კორექციისა და ტექნიკურად სწორი გამოსახულების შექმნა.",
    topics: ["Color Correction", "Exposure", "White Balance", "Skin Tones"],
  },
  {
    number: "07",
    category: "GRADING",
    title: "Color Grading",
    description:
      "საბაზისო კორექციიდან საკუთარი ვიზუალური სტილის შექმნამდე.",
    topics: ["Look Development", "Creative Grade", "Contrast", "Color Style"],
  },
  {
    number: "08",
    category: "MOTION",
    title: "Motion & Effects",
    description:
      "მოძრავი ელემენტების, ტექსტისა და ვიზუალური ეფექტების გამოყენება.",
    topics: ["Keyframes", "Motion", "Text Animation", "Visual Effects"],
  },
  {
    number: "09",
    category: "WORKFLOW",
    title: "პროფესიონალური Workflow",
    description:
      "როგორ ვიმუშაოთ რეალურ პროექტებზე სწრაფად და ორგანიზებულად.",
    topics: [
      "Project Organization",
      "Workflow",
      "Efficiency",
      "Professional Setup",
    ],
  },
  {
    number: "10",
    category: "PROJECT",
    title: "რეალური პროექტი",
    description:
      "ყველა ნასწავლი ტექნიკის გამოყენება ერთ რეალურ პროექტში.",
    topics: ["Project Planning", "Editing", "Sound", "Color"],
  },
  {
    number: "11",
    category: "PORTFOLIO",
    title: "პორტფოლიო",
    description:
      "პროფესიონალური ნამუშევრის შექმნა და მისი სწორად წარმოდგენა.",
    topics: ["Portfolio Piece", "Presentation", "Export", "Final Polish"],
  },
  {
    number: "12",
    category: "FINAL PROJECT",
    title: "Final Project",
    description:
      "კურსის საბოლოო პროექტი — ყველაფერი, რაც ვისწავლეთ, ერთ ნამუშევარში.",
    topics: ["Final Edit", "Professional Review", "Export", "Portfolio Ready"],
  },
];

const getYouTubeId = (url) => {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace(/^www\./, "");

    if (hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1).split("/")[0] || null;
    }

    if (
      ["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(
        hostname
      )
    ) {
      if (parsedUrl.pathname === "/watch") {
        return parsedUrl.searchParams.get("v");
      }

      const match = parsedUrl.pathname.match(
        /^\/(embed|shorts|live)\/([^/?]+)/
      );

      return match ? match[2] : null;
    }
  } catch {
    return null;
  }

  return null;
};

export default function VideoEditing() {
  const [activeLesson, setActiveLesson] = useState(null);

  const [isAdmin, setIsAdmin] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [localPreviewUrl, setLocalPreviewUrl] = useState("");

  const [videoLoading, setVideoLoading] = useState(true);
  const [savingVideo, setSavingVideo] = useState(false);
  const [videoError, setVideoError] = useState("");
  const [videoSuccess, setVideoSuccess] = useState("");

  const youtubeId = getYouTubeId(youtubeUrl.trim());

  // ლოკალური ვიდეოს preview
  useEffect(() => {
    if (!videoFile) {
      setLocalPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(videoFile);
    setLocalPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [videoFile]);

  // ვიდეოს და მომხმარებლის ჩატვირთვა
  useEffect(() => {
    let mounted = true;

    const loadCourseVideo = async () => {
      try {
        setVideoLoading(true);
        setVideoError("");

        // 1. ვიდეო იტვირთება ავტორიზაციისგან დამოუკიდებლად
        const { data: videoData, error: videoFetchError } = await supabase
          .from("course_videos")
          .select("*")
          .eq("id", 1)
          .maybeSingle();

        if (videoFetchError) {
          throw videoFetchError;
        }

        if (mounted) {
          setCurrentVideo(videoData || null);
          setYoutubeUrl(
            videoData?.video_type === "youtube"
              ? videoData.video_url || ""
              : ""
          );
        }

        // 2. ავტორიზაცია მოწმდება ცალკე
        // getSession() არ აგდებს AuthSessionMissingError-ს,
        // როდესაც მომხმარებელს აქტიური სესია არ აქვს.
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Session loading error:", sessionError);
          return;
        }

        // 3. თუ მომხმარებელი შესულია, ვამოწმებთ ადმინისტრატორია თუ არა
        if (session?.user) {
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", session.user.id)
            .maybeSingle();

          if (profileError) {
            console.error("Profile loading error:", profileError);
          }

          if (mounted) {
            setIsAdmin(profile?.role === "admin");
          }
        } else if (mounted) {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Course video loading error:", error);

        if (mounted) {
          setVideoError(
            "ვიდეოს ჩატვირთვა ვერ მოხერხდა. გადაამოწმე მონაცემთა ბაზის უფლებები."
          );
        }
      } finally {
        if (mounted) {
          setVideoLoading(false);
        }
      }
    };

    loadCourseVideo();

    return () => {
      mounted = false;
    };
  }, []);

  const handleYouTubeChange = (event) => {
    setYoutubeUrl(event.target.value);
    setVideoFile(null);
    setVideoError("");
    setVideoSuccess("");
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setVideoError("გთხოვ, აირჩიე ვიდეოფაილი.");
      event.target.value = "";
      return;
    }

    setVideoFile(file);
    setYoutubeUrl("");
    setVideoError("");
    setVideoSuccess("");
    event.target.value = "";
  };

  // YouTube ვიდეოს შენახვა
  const saveYouTubeVideo = async () => {
    if (!isAdmin || !youtubeUrl.trim()) return;

    const id = getYouTubeId(youtubeUrl.trim());

    if (!id) {
      setVideoError("შეიყვანე სწორი YouTube ბმული.");
      return;
    }

    setSavingVideo(true);
    setVideoError("");
    setVideoSuccess("");

    try {
      const { data, error } = await supabase
        .from("course_videos")
        .upsert(
          {
            id: 1,
            video_type: "youtube",
            video_url: youtubeUrl.trim(),
            storage_path: null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        )
        .select()
        .single();

      if (error) throw error;

      setCurrentVideo(data);
      setVideoFile(null);
      setVideoSuccess("YouTube ვიდეო წარმატებით შეინახა.");
    } catch (error) {
      console.error("YouTube save error:", error);
      setVideoError("ბმულის შენახვა ვერ მოხერხდა. გადაამოწმე უფლებები.");
    } finally {
      setSavingVideo(false);
    }
  };

  // ვიდეოფაილის ატვირთვა Supabase Storage-ში
  const uploadVideo = async () => {
    if (!isAdmin || !videoFile) return;

    setSavingVideo(true);
    setVideoError("");
    setVideoSuccess("");

    let uploadedPath = null;

    try {
      const extension = videoFile.name.split(".").pop() || "mp4";
      const filePath = `main-course-video-${Date.now()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("course-videos")
        .upload(filePath, videoFile, {
          upsert: false,
          contentType: videoFile.type,
        });

      if (uploadError) throw uploadError;

      uploadedPath = filePath;

      const { data: publicData } = supabase.storage
        .from("course-videos")
        .getPublicUrl(filePath);

      const { data, error } = await supabase
        .from("course_videos")
        .upsert(
          {
            id: 1,
            video_type: "storage",
            video_url: publicData.publicUrl,
            storage_path: filePath,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        )
        .select()
        .single();

      if (error) throw error;

      setCurrentVideo(data);
      setVideoFile(null);
      setYoutubeUrl("");
      setVideoSuccess(
        "ვიდეო წარმატებით აიტვირთა და სტუდენტებისთვის ხელმისაწვდომია."
      );
    } catch (error) {
      console.error("Video upload error:", error);

      if (uploadedPath) {
        await supabase.storage
          .from("course-videos")
          .remove([uploadedPath]);
      }

      setVideoError(
        "ვიდეოს ატვირთვა ვერ მოხერხდა. გადაამოწმე Storage-ის უფლებები."
      );
    } finally {
      setSavingVideo(false);
    }
  };

  const openLesson = (index) => {
    setActiveLesson(index);
    document.body.classList.add("ve-modal-open");
  };

  const closeLesson = () => {
    setActiveLesson(null);
    document.body.classList.remove("ve-modal-open");
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") closeLesson();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.classList.remove("ve-modal-open");
    };
  }, []);

  const currentYoutubeId =
    currentVideo?.video_type === "youtube"
      ? getYouTubeId(currentVideo.video_url)
      : null;

  return (
    <main className="ve-page">
      <section className="ve-hero">
        <div className="ve-container">
          <div className="ve-hero-top">
            <span>LIVE COURSE</span>
            <span className="ve-hero-top-center">VIDEO EDITING</span>
            <span>2026</span>
          </div>

          <div className="ve-hero-main">
            <div className="ve-hero-left">
              <div className="ve-eyebrow">
                <span />
                PROFESSIONAL VIDEO EDITING
              </div>

              <h1>
                <span>EDIT</span>
                <span className="ve-outline">CREATE</span>
                <span className="ve-gold-text">INSPIRE</span>
              </h1>

              <p className="ve-hero-description">
                ისწავლე პროფესიონალური ვიდეო მონტაჟი ნულიდან რეალურ
                პროექტებამდე და შექმენი შენი საკუთარი ვიზუალური სტილი.
              </p>

              <div className="ve-hero-actions">
                <a href="#ve-curriculum" className="ve-primary-button">
                  <span>კურსის პროგრამა</span>
                  <i>
                    <FaArrowDown />
                  </i>
                </a>

                <div className="ve-hero-stats">
                  <div>
                    <strong>12</strong>
                    <span>MODULES</span>
                  </div>

                  <div className="ve-stat-divider" />

                  <div>
                    <strong>06</strong>
                    <span>WEEKS</span>
                  </div>

                  <div className="ve-stat-divider" />

                  <div>
                    <strong>PRO</strong>
                    <span>LEVEL</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="ve-hero-visual">
              <div className="ve-video-player">
                <div className="ve-video-top">
                  <div>
                    <span className="ve-video-live-dot" />
                    <span>VIDEO PREVIEW</span>
                  </div>
                  <span>EDIT ACADEMY</span>
                </div>

                <div className="ve-video-screen">
                  {videoLoading ? (
                    <div className="ve-video-placeholder">
                      <span>ვიდეო იტვირთება...</span>
                    </div>
                  ) : localPreviewUrl ? (
                    <video
                      src={localPreviewUrl}
                      controls
                      playsInline
                      className="ve-video-element"
                    />
                  ) : currentVideo?.video_type === "storage" &&
                    currentVideo.video_url ? (
                    <video
                      key={currentVideo.video_url}
                      src={currentVideo.video_url}
                      controls
                      playsInline
                      className="ve-video-element"
                    />
                  ) : currentYoutubeId ? (
                    <iframe
                      key={currentYoutubeId}
                      src={`https://www.youtube-nocookie.com/embed/${currentYoutubeId}?rel=0`}
                      title="Video Editing Course"
                      className="ve-video-element"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <div className="ve-video-placeholder">
                      <div className="ve-video-placeholder-content">
                        <div className="ve-video-play-icon">
                          <FaPlay />
                        </div>
                        <span>VIDEO EDITING COURSE</span>
                        <strong>YOUR LESSON STARTS HERE</strong>
                      </div>
                    </div>
                  )}
                </div>

                {isAdmin && (
                  <div className="ve-admin-video-panel">
                    <div className="ve-admin-label">
                      <span className="ve-admin-dot" />
                      ADMIN VIDEO MANAGEMENT
                    </div>

                    <div className="ve-video-input-wrap">
                      <FaLink />
                      <input
                        type="url"
                        value={youtubeUrl}
                        onChange={handleYouTubeChange}
                        placeholder="ჩასვი YouTube ვიდეოს ბმული..."
                        aria-label="YouTube ვიდეოს ბმული"
                      />
                    </div>

                    <button
                      type="button"
                      className="ve-admin-save-button"
                      onClick={saveYouTubeVideo}
                      disabled={savingVideo || !youtubeUrl.trim()}
                    >
                      <FaLink />
                      {savingVideo ? "ინახება..." : "ბმულის შენახვა"}
                    </button>

                    <label className="ve-upload-button">
                      <FaUpload />
                      <span>
                        {videoFile
                          ? videoFile.name
                          : "ვიდეოფაილის არჩევა"}
                      </span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                      />
                    </label>

                    {videoFile && (
                      <button
                        type="button"
                        className="ve-admin-save-button"
                        onClick={uploadVideo}
                        disabled={savingVideo}
                      >
                        <FaUpload />
                        {savingVideo ? "იტვირთება..." : "ვიდეოს ატვირთვა"}
                      </button>
                    )}

                    {localPreviewUrl && (
                      <button
                        type="button"
                        className="ve-admin-cancel-button"
                        onClick={() => setVideoFile(null)}
                      >
                        <FaTimes />
                        არჩევის გაუქმება
                      </button>
                    )}
                  </div>
                )}

                {videoError && (
                  <p className="ve-video-error">{videoError}</p>
                )}

                {videoSuccess && (
                  <p className="ve-video-success">
                    <FaCheck />
                    {videoSuccess}
                  </p>
                )}
              </div>
            </div>
          </div>

        
        </div>
      </section>

      <section className="ve-curriculum" id="ve-curriculum">
        <div className="ve-container">
          <div className="ve-curriculum-header">
            <div>
              <span className="ve-section-number">01 / CURRICULUM</span>
              <h2>
                LEARN
                <span>TO EDIT</span>
              </h2>
            </div>

            <div className="ve-curriculum-description">
              <span>12 MODULES</span>
              <p>
                კურსი აერთიანებს მონტაჟის ტექნიკას, storytelling-ს,
                sound design-ს, color-სა და რეალურ პროექტებზე მუშაობას.
              </p>
            </div>
          </div>

          <div className="ve-card-grid">
            {curriculumData.map((lesson, index) => (
              <button
                type="button"
                className="ve-course-card"
                key={lesson.number}
                onClick={() => openLesson(index)}
              >
                <div className="ve-card-bg-number">{lesson.number}</div>

                <div className="ve-card-top">
                  <span className="ve-card-number">{lesson.number}</span>
                  <span className="ve-card-category">{lesson.category}</span>
                  <span className="ve-card-arrow">
                    <FaArrowRight />
                  </span>
                </div>

                <div className="ve-card-icon">
                  <FaPlay />
                </div>

                <div className="ve-card-body">
                  <h3>{lesson.title}</h3>
                  <p>{lesson.description}</p>
                </div>

                <div className="ve-card-bottom">
                  <span>VIEW MODULE</span>
                  <div className="ve-card-line">
                    <span />
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="ve-curriculum-footer">
            <div className="ve-footer-line">
              <span />
            </div>

            <div className="ve-footer-info">
              <span>12 MODULES</span>
              <strong>FROM RAW FOOTAGE TO FINAL CUT</strong>
            </div>

            <div className="ve-footer-arrow">
              <FaArrowRight />
            </div>
          </div>
        </div>
      </section>

      {activeLesson !== null && (
        <div
          className="ve-card-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeLesson();
          }}
        >
          <div
            className="ve-active-card"
            role="dialog"
            aria-modal="true"
            aria-label={curriculumData[activeLesson].title}
          >
            <button
              type="button"
              className="ve-close-button"
              onClick={closeLesson}
              aria-label="Close"
            >
              <FaTimes />
            </button>

            <div className="ve-active-number">
              {curriculumData[activeLesson].number}
            </div>

            <div className="ve-active-top">
              <span>{curriculumData[activeLesson].category}</span>
              <div className="ve-active-icon">
                <FaPlay />
              </div>
            </div>

            <div className="ve-active-content">
              <h3>{curriculumData[activeLesson].title}</h3>
              <p>{curriculumData[activeLesson].description}</p>
            </div>

            <div className="ve-active-divider" />

            <div className="ve-active-learning">
              <span>WHAT YOU WILL LEARN</span>
              <div className="ve-active-topics">
                {curriculumData[activeLesson].topics.map(
                  (topic, topicIndex) => (
                    <div className="ve-active-topic" key={topic}>
                      <span>
                        {String(topicIndex + 1).padStart(2, "0")}
                      </span>
                      <strong>{topic}</strong>
                      <FaCheck />
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="ve-active-footer">
              <div>
                <span>PRACTICAL EXPERIENCE</span>
                <strong>რეალურ პროექტზე მუშაობა</strong>
              </div>
              <FaArrowRight />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
