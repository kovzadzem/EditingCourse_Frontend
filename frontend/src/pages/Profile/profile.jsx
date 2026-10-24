import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import "./profile.css";
import AssignmentCenter from "../../components/AssignmentCenter";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaSignOutAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaGraduationCap,
  FaShieldAlt,
  FaBookOpen,
  FaCalendarAlt,
  FaCreditCard,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaSyncAlt,
  FaCamera,
  FaTrashAlt,
  FaLock,
  FaPlayCircle,
  FaNewspaper,
} from "react-icons/fa";

const paymentLabels = {
  pending: "გადახდის მოლოდინში",
  paid: "გადახდილია",
  refunded: "თანხა დაბრუნებულია",
};

const statusLabels = {
  active: "აქტიური",
  paused: "შეჩერებული",
  completed: "დასრულებული",
};

const formatDate = (value) => {
  if (!value) return "არ არის მითითებული";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "არ არის მითითებული";
  }

  return date.toLocaleDateString("ka-GE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

function Profile() {
  const navigate = useNavigate();
  const avatarInputRef = useRef(null);

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [deletingAvatar, setDeletingAvatar] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [enrollments, setEnrollments] = useState([]);
  const [coursesById, setCoursesById] = useState({});
  const [batchesById, setBatchesById] = useState({});
  const [enrollmentLoading, setEnrollmentLoading] = useState(true);
  const [enrollmentError, setEnrollmentError] = useState("");

  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
  });

  // =====================================================
  // MY COURSES
  // =====================================================

  const loadEnrollments = useCallback(async (studentId) => {
    if (!studentId) {
      setEnrollmentLoading(false);
      return;
    }

    setEnrollmentLoading(true);
    setEnrollmentError("");

    try {
      const { data, error } = await supabase
        .from("student_courses")
        .select(
          "id, student_id, course_id, batch_id, payment_status, start_date, progress, status, assigned_at"
        )
        .eq("student_id", studentId)
        .order("assigned_at", { ascending: false });

      if (error) throw error;

      const records = data || [];
      setEnrollments(records);

      const courseIds = [
        ...new Set(records.map((item) => item.course_id).filter(Boolean)),
      ];

      const batchIds = [
        ...new Set(records.map((item) => item.batch_id).filter(Boolean)),
      ];

      if (courseIds.length > 0) {
        const { data: courses, error: courseError } = await supabase
          .from("courses")
          .select("id, title, description, duration_weeks")
          .in("id", courseIds);

        if (courseError) throw courseError;

        setCoursesById(
          Object.fromEntries(
            (courses || []).map((course) => [course.id, course])
          )
        );
      } else {
        setCoursesById({});
      }

      if (batchIds.length > 0) {
        const { data: batches, error: batchError } = await supabase
          .from("course_batches")
          .select(
            "id, course_id, batch_number, format, start_date, end_date"
          )
          .in("id", batchIds);

        if (batchError) throw batchError;

        setBatchesById(
          Object.fromEntries(
            (batches || []).map((batch) => [batch.id, batch])
          )
        );
      } else {
        setBatchesById({});
      }
    } catch (error) {
      console.error("ENROLLMENTS LOAD ERROR:", error);

      setEnrollmentError(
        error.message || "კურსების ჩატვირთვა ვერ მოხერხდა."
      );
    } finally {
      setEnrollmentLoading(false);
    }
  }, []);

  // =====================================================
  // NEWS
  // =====================================================

  const loadNews = useCallback(async () => {
    setNewsLoading(true);
    setNewsError("");

    try {
      const { data, error } = await supabase
        .from("news_posts")
        .select(
          "id, title, slug, excerpt, content, image_url, is_published, published_at, created_at, updated_at"
        )
        .eq("is_published", true)
        .order("published_at", {
          ascending: false,
          nullsFirst: false,
        });

      if (error) throw error;

      setNews(data || []);
    } catch (error) {
      console.error("NEWS LOAD ERROR:", error);

      setNewsError(
        error.message ||
          "სიახლეების ჩატვირთვა ვერ მოხერხდა. შეამოწმე Supabase-ის RLS პოლიტიკები."
      );
    } finally {
      setNewsLoading(false);
    }
  }, []);

  // =====================================================
  // LOAD PROFILE
  // =====================================================

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const {
        data: { user: currentUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (!currentUser) {
        navigate("/login", { replace: true });
        return;
      }

      setUser(currentUser);

      const { data, error } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, phone, role, avatar_url")
        .eq("id", currentUser.id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        throw new Error(
          "პროფილი ვერ მოიძებნა. შეამოწმე profiles ცხრილი."
        );
      }

      setProfile(data);

      setFormData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        phone: data.phone || "",
      });

      await Promise.all([
        loadEnrollments(currentUser.id),
        loadNews(),
      ]);
    } catch (error) {
      console.error("PROFILE LOAD ERROR:", error);

      setErrorMessage(
        error.message || "პროფილის ჩატვირთვა ვერ მოხერხდა."
      );
    } finally {
      setLoading(false);
    }
  }, [navigate, loadEnrollments, loadNews]);

  useEffect(() => {
    loadProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        navigate("/login", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [loadProfile, navigate]);

  // =====================================================
  // PROFILE FORM
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!user || saving) return;

    const firstName = formData.first_name.trim();
    const lastName = formData.last_name.trim();
    const phone = formData.phone.trim();

    if (firstName.length < 2 || lastName.length < 2) {
      setErrorMessage(
        "სახელი და გვარი მინიმუმ 2 სიმბოლოს უნდა შეიცავდეს."
      );
      return;
    }

    setSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({
          first_name: firstName,
          last_name: lastName,
          phone,
        })
        .eq("id", user.id)
        .select("id, first_name, last_name, phone, role, avatar_url")
        .single();

      if (error) throw error;

      setProfile(data);

      setFormData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        phone: data.phone || "",
      });

      setEditing(false);
      setSuccessMessage("ცვლილებები წარმატებით შეინახა.");
    } catch (error) {
      console.error("PROFILE SAVE ERROR:", error);

      setErrorMessage(error.message || "შენახვა ვერ მოხერხდა.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      phone: profile?.phone || "",
    });

    setEditing(false);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const startEditing = () => {
    setFormData({
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      phone: profile?.phone || "",
    });

    setEditing(true);
    setErrorMessage("");
    setSuccessMessage("");

    window.setTimeout(() => {
      document
        .getElementById("profile-personal-information")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  // =====================================================
  // AVATAR UPLOAD
  // =====================================================

  const handleAvatarUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file || !user || uploadingAvatar) return;

    setErrorMessage("");
    setSuccessMessage("");

    if (!file.type.startsWith("image/")) {
      setErrorMessage("აირჩიე სურათის ფაილი.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("ფოტოს მაქსიმალური ზომაა 5 MB.");
      return;
    }

    const extensionByType = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "image/gif": "gif",
    };

    const extension = extensionByType[file.type];

    if (!extension) {
      setErrorMessage("გამოიყენე JPG, PNG, WEBP ან GIF ფორმატი.");
      return;
    }

    setUploadingAvatar(true);

    const filePath = `${user.id}/avatar.${extension}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
          cacheControl: "3600",
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const avatarUrl = `${data.publicUrl}?t=${Date.now()}`;

      const { data: updatedProfile, error: updateError } =
        await supabase
          .from("profiles")
          .update({ avatar_url: avatarUrl })
          .eq("id", user.id)
          .select(
            "id, first_name, last_name, phone, role, avatar_url"
          )
          .single();

      if (updateError) throw updateError;

      setProfile(updatedProfile);
      setSuccessMessage("პროფილის ფოტო წარმატებით განახლდა.");
    } catch (error) {
      console.error("AVATAR UPLOAD ERROR:", error);

      setErrorMessage(
        error.message ||
          "ფოტოს ატვირთვა ვერ მოხერხდა. შეამოწმე avatars bucket-ის პარამეტრები."
      );
    } finally {
      setUploadingAvatar(false);
    }
  };

  // =====================================================
  // AVATAR DELETE
  // =====================================================

  const handleAvatarDelete = async () => {
    if (!user || !profile?.avatar_url || deletingAvatar) return;

    if (!window.confirm("ნამდვილად გსურს პროფილის ფოტოს წაშლა?")) {
      return;
    }

    setDeletingAvatar(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const publicMarker = "/storage/v1/object/public/avatars/";
      const urlWithoutQuery = profile.avatar_url.split("?")[0];
      const markerIndex = urlWithoutQuery.indexOf(publicMarker);

      if (markerIndex !== -1) {
        const encodedPath = urlWithoutQuery.slice(
          markerIndex + publicMarker.length
        );

        const filePath = decodeURIComponent(encodedPath);

        const { error: storageError } = await supabase.storage
          .from("avatars")
          .remove([filePath]);

        if (storageError) throw storageError;
      }

      const { data, error } = await supabase
        .from("profiles")
        .update({ avatar_url: null })
        .eq("id", user.id)
        .select("id, first_name, last_name, phone, role, avatar_url")
        .single();

      if (error) throw error;

      setProfile(data);
      setSuccessMessage("პროფილის ფოტო წაიშალა.");
    } catch (error) {
      console.error("AVATAR DELETE ERROR:", error);

      setErrorMessage(error.message || "ფოტოს წაშლა ვერ მოხერხდა.");
    } finally {
      setDeletingAvatar(false);
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setErrorMessage("სისტემიდან გასვლა ვერ მოხერხდა.");
      return;
    }

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login", { replace: true });
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="profile-page">
        <div className="profile-loading">
          <span className="profile-spinner" />
          <p>პროფილი იტვირთება...</p>
        </div>
      </main>
    );
  }

  // =====================================================
  // PROFILE ERROR
  // =====================================================

  if (!user || !profile) {
    return (
      <main className="profile-page">
        <section className="profile-card profile-error-card">
          <h1>პროფილის ჩატვირთვა ვერ მოხერხდა</h1>

          <p className="profile-message profile-message--error">
            {errorMessage || "მონაცემები ვერ მოიძებნა."}
          </p>

          <button
            type="button"
            className="profile-primary-btn"
            onClick={loadProfile}
          >
            ხელახლა ცდა
          </button>
        </section>
      </main>
    );
  }

  const fullName =
    `${profile.first_name || ""} ${profile.last_name || ""}`.trim() ||
    "მომხმარებელი";

  const initials =
    `${profile.first_name?.[0] || ""}${
      profile.last_name?.[0] || ""
    }`.toUpperCase() || "E";

  const isAdmin = profile.role === "admin";

  // =====================================================
  // MY COURSES PANEL
  // =====================================================

  const enrolledCoursesPanel = (
    <section className="profile-card profile-details profile-my-courses-panel">
      <div className="profile-section-heading">
        <div>
          <span className="profile-eyebrow">MY LEARNING</span>
          <h2>ჩემი კურსები</h2>
          <p>
            აქ გამოჩნდება მინიჭებული კურსები, გადახდის სტატუსი
            და სწავლის პროგრესი.
          </p>
        </div>

        <button
          type="button"
          className="profile-refresh-btn"
          onClick={() => loadEnrollments(user.id)}
          disabled={enrollmentLoading}
          aria-label="კურსების განახლება"
          title="კურსების განახლება"
        >
          <FaSyncAlt
            className={enrollmentLoading ? "profile-refresh-spin" : ""}
          />
        </button>
      </div>

      {enrollmentLoading ? (
        <div className="profile-course-empty">
          <span className="profile-spinner" />
          <p>კურსების მონაცემები იტვირთება...</p>
        </div>
      ) : enrollmentError ? (
        <div className="profile-message profile-message--error">
          <p>{enrollmentError}</p>

          <button
            type="button"
            className="profile-secondary-btn"
            onClick={() => loadEnrollments(user.id)}
          >
            ხელახლა ცდა
          </button>
        </div>
      ) : enrollments.length === 0 ? (
        <div className="profile-course-empty">
          <FaBookOpen />
          <h3>კურსი ჯერ არ გაქვს მინიჭებული</h3>
          <p>
            ადმინისტრატორის მიერ კურსის მინიჭების შემდეგ
            ინფორმაცია აქ გამოჩნდება.
          </p>
        </div>
      ) : (
        <div className="profile-course-list">
          {enrollments.map((enrollment) => {
            const course = coursesById[enrollment.course_id];
            const batch = batchesById[enrollment.batch_id];

            const progress = Math.min(
              100,
              Math.max(0, Number(enrollment.progress) || 0)
            );

            const isPaid = enrollment.payment_status === "paid";

            return (
              <article className="profile-course-card" key={enrollment.id}>
                <div className="profile-course-top">
                  <div className="profile-course-icon">
                    {isPaid ? <FaGraduationCap /> : <FaLock />}
                  </div>

                  <div className="profile-course-title">
                    <h3>{course?.title || "კურსი"}</h3>
                    <p>
                      {course?.description ||
                        "სასწავლო კურსი Editologia-ში"}
                    </p>
                  </div>

                  <span
                    className={`profile-course-status profile-course-status--${
                      enrollment.status || "active"
                    }`}
                  >
                    {statusLabels[enrollment.status] ||
                      enrollment.status ||
                      "აქტიური"}
                  </span>
                </div>

                <div className="profile-course-meta">
                  <div>
                    <FaBookOpen />
                    <span>
                      ნაკადი:{" "}
                      {batch
                        ? `#${batch.batch_number}`
                        : "არ არის მითითებული"}
                    </span>
                  </div>

                  <div>
                    <FaCalendarAlt />
                    <span>
                      ფორმატი:{" "}
                      {batch?.format === "online"
                        ? "ონლაინ"
                        : batch?.format === "classroom"
                          ? "აუდიტორია"
                          : "არ არის მითითებული"}
                    </span>
                  </div>

                  <div>
                    <FaClock />
                    <span>
                      დაწყება:{" "}
                      {formatDate(enrollment.start_date || batch?.start_date)}
                    </span>
                  </div>

                  <div>
                    <FaCalendarAlt />
                    <span>დასრულება: {formatDate(batch?.end_date)}</span>
                  </div>

                  <div>
                    <FaCreditCard />
                    <span>
                      გადახდა:{" "}
                      {paymentLabels[enrollment.payment_status] ||
                        enrollment.payment_status ||
                        "არ არის მითითებული"}
                    </span>
                  </div>

                  <div>
                    <FaCheckCircle />
                    <span>
                      ხანგრძლივობა:{" "}
                      {course?.duration_weeks
                        ? `${course.duration_weeks} კვირა`
                        : "არ არის მითითებული"}
                    </span>
                  </div>
                </div>

                {!isPaid ? (
                  <div className="profile-locked-course">
                    <div className="profile-locked-course-icon">
                      <FaLock />
                    </div>

                    <div>
                      <strong>კურსზე წვდომა შეზღუდულია</strong>
                      <p>
                        {enrollment.payment_status === "refunded"
                          ? "თანხა დაბრუნებულია. წვდომისთვის დაუკავშირდი ადმინისტრატორს."
                          : "კურსის მასალები გაიხსნება მხოლოდ გადახდის წარმატებით დადასტურების შემდეგ."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="profile-progress-section">
                    <div className="profile-progress-heading">
                      <span>
                        <FaChartLine />
                        სწავლის პროგრესი
                      </span>
                      <strong>{progress}%</strong>
                    </div>

                    <div
                      className="profile-progress-track"
                      role="progressbar"
                      aria-label={`${course?.title || "კურსის"} პროგრესი`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={progress}
                    >
                      <div
                        className="profile-progress-fill"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <p>
                      {progress === 100
                        ? "გილოცავ! კურსის პროგრესი დასრულებულია."
                        : progress === 0
                          ? "პროგრესი ჯერ არ განახლებულა."
                          : "პროგრესი ასახავს შენს სასწავლო შედეგს."}
                    </p>

                    <div className="profile-course-access-note">
                      <FaPlayCircle />
                      <span>
                        გადახდა დადასტურებულია. შენი კურსი აქტიურია.
                      </span>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );

  // =====================================================
  // PERSONAL INFORMATION PANEL
  // =====================================================

  const personalInformationPanel = (
    <section
      className="profile-card profile-details"
      id="profile-personal-information"
    >
      <div className="profile-section-heading">
        <div>
          <span className="profile-eyebrow">PERSONAL INFORMATION</span>
          <h2>პირადი ინფორმაცია</h2>
          <p>
            მართე შენი სახელისა და საკონტაქტო მონაცემების ინფორმაცია.
          </p>
        </div>

        <span className="profile-editing-label">
          <FaEdit />
          რედაქტირების რეჟიმი
        </span>
      </div>

      {errorMessage && (
        <div className="profile-message profile-message--error" role="alert">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="profile-message profile-message--success" role="status">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="profile-form-grid">
          <div className="profile-form-field">
            <label htmlFor="profile-first-name">სახელი</label>
            <div className="profile-input-wrap">
              <FaUser />
              <input
                id="profile-first-name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                disabled={saving}
                autoComplete="given-name"
                required
                minLength={2}
              />
            </div>
          </div>

          <div className="profile-form-field">
            <label htmlFor="profile-last-name">გვარი</label>
            <div className="profile-input-wrap">
              <FaUser />
              <input
                id="profile-last-name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                disabled={saving}
                autoComplete="family-name"
                required
                minLength={2}
              />
            </div>
          </div>

          <div className="profile-form-field profile-field-full">
            <label htmlFor="profile-email">ელ. ფოსტა</label>
            <div className="profile-input-wrap">
              <FaEnvelope />
              <input
                id="profile-email"
                type="email"
                value={user.email || ""}
                disabled
                autoComplete="email"
              />
            </div>
            <small>ელფოსტა ამ ფორმიდან არ იცვლება.</small>
          </div>

          <div className="profile-form-field profile-field-full">
            <label htmlFor="profile-phone">ტელეფონის ნომერი</label>
            <div className="profile-input-wrap">
              <FaPhone />
              <input
                id="profile-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                disabled={saving}
                autoComplete="tel"
                placeholder="+995 5XX XX XX XX"
              />
            </div>
          </div>
        </div>

        <div className="profile-form-actions">
          <button
            type="button"
            className="profile-secondary-btn"
            onClick={handleCancel}
            disabled={saving}
          >
            <FaTimes />
            გაუქმება
          </button>

          <button
            type="submit"
            className="profile-primary-btn"
            disabled={saving}
          >
            <FaSave />
            {saving ? "ინახება..." : "ცვლილებების შენახვა"}
          </button>
        </div>
      </form>

      <div className="profile-security-note">
        <FaShieldAlt />
        <p>
          შენი მონაცემები დაკავშირებულია შენს ანგარიშთან და ინახება
          Supabase-ში.
        </p>
      </div>
    </section>
  );

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <main className="profile-page">
      <div className="profile-container">
        <header className="profile-page-heading">
          <div>
            <span className="profile-eyebrow">EDITOLOGIA ACCOUNT</span>
            <h1>ჩემი პროფილი</h1>
            <p>
              შენი სივრცე — პირადი ინფორმაცია, კურსები და სწავლის
              პროგრესი.
            </p>
          </div>

          <button
            type="button"
            className="profile-logout-btn"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span>გასვლა</span>
          </button>
        </header>

        <div className="profile-layout">
          <aside className="profile-card profile-summary">
            <div className="profile-avatar-wrap">
              {profile.avatar_url ? (
                <img
                  className="profile-avatar-image"
                  src={profile.avatar_url}
                  alt={`${fullName}-ის პროფილის ფოტო`}
                />
              ) : (
                <div className="profile-avatar">{initials}</div>
              )}

              <button
                type="button"
                className="profile-avatar-camera"
                onClick={() => avatarInputRef.current?.click()}
                disabled={uploadingAvatar || deletingAvatar}
                aria-label="პროფილის ფოტოს შეცვლა"
                title="ფოტოს ატვირთვა ან შეცვლა"
              >
                {uploadingAvatar ? (
                  <span className="profile-mini-spinner" />
                ) : (
                  <FaCamera />
                )}
              </button>

              <input
                ref={avatarInputRef}
                className="profile-avatar-input"
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={handleAvatarUpload}
              />
            </div>

            <p className="profile-avatar-help">
              {uploadingAvatar
                ? "ფოტო იტვირთება..."
                : "დააჭირე კამერას ფოტოს შესაცვლელად"}
            </p>

            {profile.avatar_url && (
              <button
                type="button"
                className="profile-avatar-delete"
                onClick={handleAvatarDelete}
                disabled={deletingAvatar || uploadingAvatar}
              >
                <FaTrashAlt />
                {deletingAvatar ? "იშლება..." : "ფოტოს წაშლა"}
              </button>
            )}

            <h2>{fullName}</h2>
            <p className="profile-summary-email">{user.email}</p>

            <div className="profile-role">
              {isAdmin ? <FaShieldAlt /> : <FaGraduationCap />}
              <span>{isAdmin ? "ადმინისტრატორი" : "სტუდენტი"}</span>
            </div>

            <div className="profile-summary-divider" />

            <div className="profile-summary-note">
              <span className="profile-status-dot" />
              <span>ანგარიში აქტიურია</span>
            </div>

            <button
              type="button"
              className="profile-edit-left-btn"
              onClick={startEditing}
              disabled={editing}
            >
              <FaEdit />
              <span>
                {editing
                  ? "რედაქტირება მიმდინარეობს"
                  : "პროფილის რედაქტირება"}
              </span>
            </button>

            {isAdmin && (
              <button
                type="button"
                className="profile-admin-link"
                onClick={() => navigate("/admin")}
              >
                ადმინისტრატორის პანელი
              </button>
            )}
          </aside>

          {editing ? personalInformationPanel : enrolledCoursesPanel}
        </div>

        {successMessage && !editing && (
          <div
            className="profile-message profile-message--success profile-global-message"
            role="status"
          >
            {successMessage}
          </div>
        )}

        {errorMessage && !editing && (
          <div
            className="profile-message profile-message--error profile-global-message"
            role="alert"
          >
            {errorMessage}
          </div>
        )}

        {/* NEWS */}
        <section className="profile-courses profile-news-section">
          <div className="profile-courses-heading">
            <div>
              <span className="profile-eyebrow">LATEST UPDATES</span>
              <h2>სიახლეები და შეთავაზებები</h2>
              <p>
                ნახე Editologia-ს უახლესი სიახლეები და გამოქვეყნებული
                ინფორმაცია.
              </p>
            </div>

            <button
              type="button"
              className="profile-refresh-btn"
              onClick={loadNews}
              disabled={newsLoading}
              aria-label="სიახლეების განახლება"
              title="სიახლეების განახლება"
            >
              <FaSyncAlt
                className={newsLoading ? "profile-refresh-spin" : ""}
              />
              <span>განახლება</span>
            </button>
          </div>

          {newsError && (
            <div className="profile-message profile-message--error">
              <p>{newsError}</p>
              <button
                type="button"
                className="profile-secondary-btn"
                onClick={loadNews}
                disabled={newsLoading}
              >
                ხელახლა ცდა
              </button>
            </div>
          )}

          {newsLoading ? (
            <div className="profile-course-empty">
              <span className="profile-spinner" />
              <p>სიახლეები იტვირთება...</p>
            </div>
          ) : news.length === 0 ? (
            !newsError && (
              <div className="profile-course-empty">
                <FaNewspaper />
                <h3>სიახლეები ჯერ არ არის</h3>
                <p>
                  ადმინისტრატორის მიერ გამოქვეყნებული სიახლეები აქ
                  გამოჩნდება.
                </p>
              </div>
            )
          ) : (
            <div className="profile-course-list profile-news-list">
              {news.map((item) => {
                const newsDate = item.published_at || item.created_at;

                return (
                  <article
                    className="profile-course-card profile-news-card"
                    key={item.id}
                  >
                    {item.image_url && (
                      <div className="profile-news-image-wrap">
                        <img
                          className="profile-news-image"
                          src={item.image_url}
                          alt={item.title || "Editologia-ს სიახლე"}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    )}

                    <div className="profile-course-top">
                      <div className="profile-course-icon">
                        <FaNewspaper />
                      </div>

                      <div className="profile-course-title">
                        <h3>{item.title || "სიახლე"}</h3>
                        {newsDate && (
                          <p className="profile-news-date">
                            <FaCalendarAlt />
                            {formatDate(newsDate)}
                          </p>
                        )}
                      </div>
                    </div>

                    {item.excerpt && (
                      <p className="profile-news-excerpt">{item.excerpt}</p>
                    )}

                    {item.content && (
                      <div className="profile-news-content">
                        {item.content}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* ASSIGNMENTS */}
        {!isAdmin && (
          <section className="profile-courses profile-assignments-section">
            <div className="profile-courses-heading">
              <div>
                <span className="profile-eyebrow">MY LEARNING</span>
                <h2>ჩემი დავალებები</h2>
                <p>
                  ნახე ადმინისტრატორის მიერ გამოქვეყნებული დავალებები,
                  გაეცანი ინსტრუქციას და ატვირთე შენი ნამუშევარი.
                </p>
              </div>
            </div>

            <AssignmentCenter mode="student" />
          </section>
        )}
      </div>
    </main>
  );
}

export default Profile;