
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import "./Admin.css";

const initialBatch = {
  course_id: "",
  batch_number: "1",
  format: "online",
  start_date: "",
  end_date: "",
};

const initialCourse = {
  title: "",
  description: "",
  duration_weeks: "6",
  is_active: true,
};

const initialNews = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  image_url: "",
  is_published: false,
};

const requestStatusLabels = {
  pending: "განხილვის მოლოდინში",
  approved: "დადასტურებული",
  rejected: "უარყოფილი",
};

const requestStatusClasses = {
  pending: "pending",
  approved: "approved",
  rejected: "rejected",
};

export default function Admin() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [offerings, setOfferings] = useState([]);
  const [news, setNews] = useState([]);
  const [courseRequests, setCourseRequests] = useState([]);

  const [batchForm, setBatchForm] = useState(initialBatch);
  const [courseForm, setCourseForm] = useState(initialCourse);
  const [newsForm, setNewsForm] = useState(initialNews);

  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editingNewsId, setEditingNewsId] = useState(null);

  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [activeTab, setActiveTab] = useState("students");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [updatingRequestId, setUpdatingRequestId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const notify = (message) => {
    setSuccess(message);
    setError("");
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error("გთხოვ, ხელახლა გაიარე ავტორიზაცია.");
      }

      const { data: adminProfile, error: profileError } =
        await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

      if (profileError || adminProfile?.role !== "admin") {
        throw new Error("ამ გვერდის ნახვის უფლება არ გაქვს.");
      }

      const [
        profilesResult,
        coursesResult,
        batchesResult,
        enrollmentsResult,
        offeringsResult,
        newsResult,
        requestsResult,
      ] = await Promise.all([
        supabase
          .from("profiles")
          .select("id, first_name, last_name, phone, role")
          .order("first_name"),

        supabase
          .from("courses")
          .select("id, title, description, duration_weeks, is_active")
          .order("title"),

        supabase
          .from("course_batches")
          .select(
            "id, course_id, batch_number, format, start_date, end_date, is_active"
          )
          .order("batch_number"),

        supabase
          .from("student_courses")
          .select(
            "id, student_id, course_id, batch_id, payment_status, start_date, progress, status, assigned_at"
          )
          .order("assigned_at", { ascending: false }),

        // საჭიროა არსებული სტუდენტური მოთხოვნების დეტალებისთვის.
        // შეთავაზებების მართვის ჩანართი ამოღებულია.
        supabase
          .from("course_offerings")
          .select("*")
          .order("created_at", { ascending: false }),

        supabase
          .from("news_posts")
          .select("*")
          .order("created_at", { ascending: false }),

        supabase
          .from("course_requests")
          .select("id, student_id, course_offering_id, status, created_at")
          .order("created_at", { ascending: false }),
      ]);

      const results = [
        profilesResult,
        coursesResult,
        batchesResult,
        enrollmentsResult,
        offeringsResult,
        newsResult,
        requestsResult,
      ];

      const failed = results.find((result) => result.error);

      if (failed) {
        throw new Error(failed.error.message);
      }

      setStudents(profilesResult.data || []);
      setCourses(coursesResult.data || []);
      setBatches(batchesResult.data || []);
      setEnrollments(enrollmentsResult.data || []);
      setOfferings(offeringsResult.data || []);
      setNews(newsResult.data || []);
      setCourseRequests(requestsResult.data || []);

      const availableCourses = coursesResult.data || [];
      const defaultCourse =
        availableCourses.find((course) => course.is_active)?.id ||
        availableCourses[0]?.id ||
        "";

      setBatchForm((previous) => ({
        ...previous,
        course_id: previous.course_id || defaultCourse,
      }));
    } catch (err) {
      setError(err.message || "მონაცემების ჩატვირთვა ვერ მოხერხდა.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const studentName = (studentId) => {
    const student = students.find((item) => item.id === studentId);

    if (!student) return "მომხმარებელი";

    return (
      `${student.first_name || ""} ${student.last_name || ""}`.trim() ||
      "სახელი მითითებული არ არის"
    );
  };

  const courseName = (courseId) =>
    courses.find((item) => item.id === courseId)?.title ||
    "კურსი მითითებული არ არის";

  const batchName = (batchId) => {
    const batch = batches.find((item) => item.id === batchId);

    if (!batch) return "ნაკადი მითითებული არ არის";

    return `№${batch.batch_number} · ${
      batch.format === "online" ? "ონლაინ" : "აუდიტორია"
    }`;
  };

  const formatDate = (date) => {
    if (!date) return "არ არის მითითებული";

    return new Date(date).toLocaleDateString("ka-GE");
  };

  const formatDateTime = (date) => {
    if (!date) return "არ არის მითითებული";

    return new Date(date).toLocaleString("ka-GE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =====================================================
  // სტუდენტების კურსის მოთხოვნები
  // =====================================================

  const updateCourseRequest = async (request, newStatus) => {
    if (updatingRequestId) return;

    const messages = {
      approved: "სტუდენტის მოთხოვნა დადასტურდა.",
      rejected: "სტუდენტის მოთხოვნა უარყოფილია.",
      pending: "მოთხოვნა ხელახლა განხილვის მოლოდინშია.",
    };

    const confirmed = window.confirm(
      newStatus === "approved"
        ? `დაადასტურო ${studentName(request.student_id)}-ის მოთხოვნა?`
        : newStatus === "rejected"
          ? `უარყო ${studentName(request.student_id)}-ის მოთხოვნა?`
          : "დააბრუნო მოთხოვნა განხილვის მოლოდინში?"
    );

    if (!confirmed) return;

    setUpdatingRequestId(request.id);
    setError("");
    setSuccess("");

    try {
      const { error: updateError } = await supabase
        .from("course_requests")
        .update({ status: newStatus })
        .eq("id", request.id);

      if (updateError) throw updateError;

      setCourseRequests((previous) =>
        previous.map((item) =>
          item.id === request.id
            ? { ...item, status: newStatus }
            : item
        )
      );

      notify(messages[newStatus] || "მოთხოვნა განახლდა.");
    } catch (err) {
      setError(
        err.message ||
          "მოთხოვნის სტატუსის განახლება ვერ მოხერხდა."
      );
    } finally {
      setUpdatingRequestId(null);
    }
  };

  // =====================================================
  // კურსების მართვა
  // =====================================================

  const saveCourse = async (event) => {
    event.preventDefault();

    if (saving) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (!courseForm.title.trim()) {
        throw new Error("შეიყვანე კურსის სახელი.");
      }

      const duration = Number(courseForm.duration_weeks);

      if (!Number.isInteger(duration) || duration < 1) {
        throw new Error("ხანგრძლივობა უნდა იყოს მინიმუმ 1 კვირა.");
      }

      const payload = {
        title: courseForm.title.trim(),
        description: courseForm.description.trim(),
        duration_weeks: duration,
        is_active: courseForm.is_active,
      };

      const result = editingCourseId
        ? await supabase
            .from("courses")
            .update(payload)
            .eq("id", editingCourseId)
        : await supabase.from("courses").insert(payload);

      if (result.error) throw result.error;

      const wasEditing = Boolean(editingCourseId);

      setCourseForm(initialCourse);
      setEditingCourseId(null);

      notify(wasEditing ? "კურსი განახლდა." : "ახალი კურსი დაემატა.");

      await loadData();
    } catch (err) {
      setError(err.message || "კურსის შენახვა ვერ მოხერხდა.");
    } finally {
      setSaving(false);
    }
  };

  const editCourse = (course) => {
    setEditingCourseId(course.id);

    setCourseForm({
      title: course.title || "",
      description: course.description || "",
      duration_weeks: String(course.duration_weeks ?? 6),
      is_active: Boolean(course.is_active),
    });

    setActiveTab("courses");
    setError("");
    setSuccess("");
  };

  const toggleCourse = async (course) => {
    setError("");
    setSuccess("");

    const { error: updateError } = await supabase
      .from("courses")
      .update({ is_active: !course.is_active })
      .eq("id", course.id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    notify(
      course.is_active ? "კურსი გამორთულია." : "კურსი გააქტიურდა."
    );

    await loadData();
  };

  // =====================================================
  // ნაკადების მართვა
  // =====================================================

  const createBatch = async (event) => {
    event.preventDefault();

    if (saving) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (!batchForm.course_id) {
        throw new Error("აირჩიე კურსი.");
      }

      if (
        batchForm.start_date &&
        batchForm.end_date &&
        batchForm.end_date < batchForm.start_date
      ) {
        throw new Error(
          "დასრულების თარიღი დაწყების თარიღზე ადრე ვერ იქნება."
        );
      }

      const { error: insertError } = await supabase
        .from("course_batches")
        .insert({
          course_id: batchForm.course_id,
          batch_number: Number(batchForm.batch_number),
          format: batchForm.format,
          start_date: batchForm.start_date || null,
          end_date: batchForm.end_date || null,
          is_active: true,
        });

      if (insertError) throw insertError;

      setBatchForm((previous) => ({
        ...initialBatch,
        course_id: previous.course_id,
      }));

      notify("ახალი ნაკადი წარმატებით შეიქმნა.");
      await loadData();
    } catch (err) {
      setError(
        err.code === "23505"
          ? "ამ ნომრის ნაკადი ამ ფორმატით უკვე არსებობს."
          : err.message || "ნაკადის შექმნა ვერ მოხერხდა."
      );
    } finally {
      setSaving(false);
    }
  };

  const toggleBatch = async (batch) => {
    setError("");
    setSuccess("");

    const { error: updateError } = await supabase
      .from("course_batches")
      .update({ is_active: !batch.is_active })
      .eq("id", batch.id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    notify(
      batch.is_active ? "ნაკადი გამორთულია." : "ნაკადი გააქტიურდა."
    );

    await loadData();
  };

  // =====================================================
  // სტუდენტისთვის კურსის მინიჭება
  // =====================================================

  const assignCourse = async (event) => {
    event.preventDefault();

    if (saving) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const batch = batches.find((item) => item.id === selectedBatch);

      if (!selectedStudent || !batch) {
        throw new Error("აირჩიე სტუდენტი და ნაკადი.");
      }

      const { error: insertError } = await supabase
        .from("student_courses")
        .insert({
          student_id: selectedStudent,
          course_id: batch.course_id,
          batch_id: batch.id,
          payment_status: "pending",
          start_date: batch.start_date || null,
          progress: 0,
          status: "active",
        });

      if (insertError) throw insertError;

      setSelectedStudent("");
      setSelectedBatch("");

      notify("კურსი სტუდენტს მიენიჭა.");
      await loadData();
    } catch (err) {
      setError(
        err.code === "23505"
          ? "ეს სტუდენტი უკვე დამატებულია ამ ნაკადში."
          : err.message || "კურსის მინიჭება ვერ მოხერხდა."
      );
    } finally {
      setSaving(false);
    }
  };

  const updateEnrollment = async (id, changes) => {
    setError("");
    setSuccess("");

    const { error: updateError } = await supabase
      .from("student_courses")
      .update(changes)
      .eq("id", id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    notify("ცვლილებები შენახულია.");
    await loadData();
  };

  // =====================================================
  // სიახლეების მართვა
  // =====================================================

  const resetNewsForm = () => {
    setEditingNewsId(null);
    setNewsForm(initialNews);
  };

  const saveNews = async (event) => {
    event.preventDefault();

    if (saving) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (!newsForm.title.trim()) {
        throw new Error("შეიყვანე სიახლის სათაური.");
      }

      if (!newsForm.content.trim()) {
        throw new Error("შეიყვანე სიახლის ტექსტი.");
      }

      const shouldPublish = newsForm.is_published;

      const payload = {
        title: newsForm.title.trim(),
        slug: newsForm.slug.trim() || null,
        excerpt: newsForm.excerpt.trim(),
        content: newsForm.content.trim(),
        image_url: newsForm.image_url.trim(),
        is_published: shouldPublish,
        published_at: shouldPublish
          ? new Date().toISOString()
          : null,
        updated_at: new Date().toISOString(),
      };

      const result = editingNewsId
        ? await supabase
            .from("news_posts")
            .update(payload)
            .eq("id", editingNewsId)
        : await supabase.from("news_posts").insert(payload);

      if (result.error) throw result.error;

      const wasEditing = Boolean(editingNewsId);

      resetNewsForm();

      notify(
        shouldPublish
          ? wasEditing
            ? "სიახლე განახლდა და გამოქვეყნებულია."
            : "სიახლე დაემატა და გამოქვეყნებულია."
          : "სიახლე მონახაზად შეინახა."
      );

      await loadData();
    } catch (err) {
      setError(
        err.code === "23505"
          ? "ეს URL უკვე გამოყენებულია. შეცვალე სიახლის slug."
          : err.message || "სიახლის შენახვა ვერ მოხერხდა."
      );
    } finally {
      setSaving(false);
    }
  };

  const editNews = (item) => {
    setEditingNewsId(item.id);

    setNewsForm({
      title: item.title || "",
      slug: item.slug || "",
      excerpt: item.excerpt || "",
      content: item.content || "",
      image_url: item.image_url || "",
      is_published: Boolean(item.is_published),
    });

    setActiveTab("news");
    setError("");
    setSuccess("");
  };

  const toggleNewsPublished = async (item) => {
    setError("");
    setSuccess("");

    const publish = !item.is_published;

    const { error: updateError } = await supabase
      .from("news_posts")
      .update({
        is_published: publish,
        published_at: publish
          ? new Date().toISOString()
          : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", item.id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    notify(publish ? "სიახლე გამოქვეყნდა." : "სიახლე დამალულია.");
    await loadData();
  };

  const deleteNews = async (item) => {
    const confirmed = window.confirm(
      `ნამდვილად გსურს სიახლის წაშლა: "${item.title}"?`
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    const { error: deleteError } = await supabase
      .from("news_posts")
      .delete()
      .eq("id", item.id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    if (editingNewsId === item.id) resetNewsForm();

    notify("სიახლე წაიშალა.");
    await loadData();
  };

  if (loading) {
    return (
      <main className="admin-page">
        <div className="admin-message">იტვირთება...</div>
      </main>
    );
  }

  const pendingRequests = courseRequests.filter(
    (request) => request.status === "pending"
  );

  return (
    <main className="admin-page">
      <div className="admin-container">
        <header className="admin-heading">
          <div>
            <span className="admin-eyebrow">EDITOLOGIA</span>
            <h1>ადმინისტრატორის პანელი</h1>
            <p>
              მართე კურსები, მოთხოვნები, ნაკადები, სიახლეები და სტუდენტები.
            </p>
          </div>

          <button
            className="admin-refresh"
            type="button"
            onClick={loadData}
          >
            განახლება
          </button>
        </header>

        {error && (
          <div className="admin-alert admin-alert-error">{error}</div>
        )}

        {success && (
          <div className="admin-alert admin-alert-success">{success}</div>
        )}

        <section className="admin-stats">
          <article className="admin-stat">
            <span>სტუდენტები</span>
            <strong>
              {students.filter((item) => item.role !== "admin").length}
            </strong>
          </article>

          <article className="admin-stat">
            <span>კურსები</span>
            <strong>{courses.length}</strong>
          </article>

          <article className="admin-stat">
            <span>ნაკადები</span>
            <strong>{batches.length}</strong>
          </article>

          <article className="admin-stat">
            <span>ჩარიცხვები</span>
            <strong>{enrollments.length}</strong>
          </article>

          <article className="admin-stat">
            <span>ახალი მოთხოვნები</span>
            <strong>{pendingRequests.length}</strong>
          </article>
        </section>

        <nav className="admin-tabs">
          {[
            ["students", "სტუდენტები"],
            ["requests", `კურსის მოთხოვნები (${pendingRequests.length})`],
            ["courses", "კურსები"],
            ["batches", "ნაკადები"],
            ["assign", "კურსის მინიჭება"],
            ["news", "სიახლეები"],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={activeTab === id ? "active" : ""}
              onClick={() => setActiveTab(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* =====================================================
            სტუდენტების კურსის მოთხოვნები
        ===================================================== */}

        {activeTab === "requests" && (
          <section className="admin-panel">
            <div className="admin-requests-heading">
              <div>
                <h2>სტუდენტების კურსის მოთხოვნები</h2>
                <p>
                  აქ გამოჩნდება სტუდენტების მიერ პროფილიდან გაგზავნილი
                  მოთხოვნები.
                </p>
              </div>

              <button
                type="button"
                className="admin-refresh"
                onClick={loadData}
              >
                მოთხოვნების განახლება
              </button>
            </div>

            <div className="admin-request-summary">
              <div>
                <span>ყველა მოთხოვნა</span>
                <strong>{courseRequests.length}</strong>
              </div>

              <div>
                <span>განსახილველი</span>
                <strong>{pendingRequests.length}</strong>
              </div>

              <div>
                <span>დადასტურებული</span>
                <strong>
                  {
                    courseRequests.filter(
                      (request) => request.status === "approved"
                    ).length
                  }
                </strong>
              </div>

              <div>
                <span>უარყოფილი</span>
                <strong>
                  {
                    courseRequests.filter(
                      (request) => request.status === "rejected"
                    ).length
                  }
                </strong>
              </div>
            </div>

            {courseRequests.length === 0 ? (
              <div className="admin-empty admin-requests-empty">
                <h3>მოთხოვნები ჯერ არ არის</h3>
                <p>
                  სტუდენტის მიერ გაგზავნილი მოთხოვნა აქ გამოჩნდება, როცა
                  Supabase-ში წარმატებით შეინახება.
                </p>
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>სტუდენტი</th>
                      <th>კურსი</th>
                      <th>შეთავაზება</th>
                      <th>ფორმატი</th>
                      <th>ფასი</th>
                      <th>თარიღი</th>
                      <th>სტატუსი</th>
                      <th>მოქმედება</th>
                    </tr>
                  </thead>

                  <tbody>
                    {courseRequests.map((request) => {
                      const offering = offerings.find(
                        (item) => item.id === request.course_offering_id
                      );

                      const isUpdating = updatingRequestId === request.id;

                      return (
                        <tr key={request.id}>
                          <td>
                            <strong>{studentName(request.student_id)}</strong>
                            <p className="admin-request-id">
                              ID: {request.student_id}
                            </p>
                          </td>

                          <td>
                            {offering
                              ? courseName(offering.course_id)
                              : "—"}
                          </td>

                          <td>{offering?.name || "—"}</td>

                          <td>{offering?.format || "—"}</td>

                          <td>
                            {offering
                              ? `${Number(offering.price).toLocaleString(
                                  "ka-GE"
                                )} ₾`
                              : "—"}
                          </td>

                          <td>{formatDateTime(request.created_at)}</td>

                          <td>
                            <span
                              className={`admin-request-status admin-request-status--${
                                requestStatusClasses[request.status] ||
                                "pending"
                              }`}
                            >
                              {requestStatusLabels[request.status] ||
                                request.status}
                            </span>
                          </td>

                          <td>
                            {request.status === "pending" ? (
                              <div className="admin-request-actions">
                                <button
                                  type="button"
                                  className="admin-request-approve"
                                  disabled={Boolean(updatingRequestId)}
                                  onClick={() =>
                                    updateCourseRequest(request, "approved")
                                  }
                                >
                                  {isUpdating
                                    ? "იცვლება..."
                                    : "დადასტურება"}
                                </button>

                                <button
                                  type="button"
                                  className="admin-request-reject"
                                  disabled={Boolean(updatingRequestId)}
                                  onClick={() =>
                                    updateCourseRequest(request, "rejected")
                                  }
                                >
                                  უარყოფა
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                className="admin-refresh"
                                disabled={Boolean(updatingRequestId)}
                                onClick={() =>
                                  updateCourseRequest(
                                    request,
                                    request.status === "approved"
                                      ? "pending"
                                      : "approved"
                                  )
                                }
                              >
                                ხელახლა განხილვა
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <p className="admin-request-note">
              შენიშვნა: მოთხოვნის დადასტურება თავისთავად არ ადასტურებს
              გადახდას და არ ანიჭებს ფასიან ჩანაწერებზე წვდომას.
            </p>
          </section>
        )}

        {/* =====================================================
            კურსების მართვა
        ===================================================== */}

        {activeTab === "courses" && (
          <section className="admin-panel">
            <h2>
              {editingCourseId
                ? "კურსის რედაქტირება"
                : "ახალი კურსის დამატება"}
            </h2>

            <form className="admin-form" onSubmit={saveCourse}>
              <label className="admin-full">
                კურსის სახელი
                <input
                  required
                  value={courseForm.title}
                  onChange={(event) =>
                    setCourseForm({
                      ...courseForm,
                      title: event.target.value,
                    })
                  }
                  placeholder="მაგ. ვიდეო ედითინგი"
                />
              </label>

              <label className="admin-full">
                აღწერა
                <textarea
                  rows="4"
                  value={courseForm.description}
                  onChange={(event) =>
                    setCourseForm({
                      ...courseForm,
                      description: event.target.value,
                    })
                  }
                  placeholder="კურსის მოკლე აღწერა"
                />
              </label>

              <label>
                ხანგრძლივობა (კვირა)
                <input
                  type="number"
                  min="1"
                  required
                  value={courseForm.duration_weeks}
                  onChange={(event) =>
                    setCourseForm({
                      ...courseForm,
                      duration_weeks: event.target.value,
                    })
                  }
                />
              </label>

              <label>
                სტატუსი
                <select
                  value={courseForm.is_active ? "active" : "inactive"}
                  onChange={(event) =>
                    setCourseForm({
                      ...courseForm,
                      is_active: event.target.value === "active",
                    })
                  }
                >
                  <option value="active">აქტიური</option>
                  <option value="inactive">გამორთული</option>
                </select>
              </label>

              <div className="admin-offering-actions admin-full">
                <button
                  type="submit"
                  className="admin-primary"
                  disabled={saving}
                >
                  {saving
                    ? "ინახება..."
                    : editingCourseId
                      ? "ცვლილებების შენახვა"
                      : "კურსის დამატება"}
                </button>

                {editingCourseId && (
                  <button
                    type="button"
                    className="admin-refresh"
                    onClick={() => {
                      setEditingCourseId(null);
                      setCourseForm(initialCourse);
                    }}
                  >
                    გაუქმება
                  </button>
                )}
              </div>
            </form>

            <h2 className="admin-subheading">არსებული კურსები</h2>

            {courses.length === 0 ? (
              <p className="admin-empty">
                კურსები ჯერ არ არის დამატებული.
              </p>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>კურსი</th>
                      <th>ხანგრძლივობა</th>
                      <th>სტატუსი</th>
                      <th>მოქმედება</th>
                    </tr>
                  </thead>

                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id}>
                        <td>
                          <strong>{course.title}</strong>
                          {course.description && <p>{course.description}</p>}
                        </td>

                        <td>{course.duration_weeks || "—"} კვირა</td>
                        <td>{course.is_active ? "აქტიური" : "გამორთული"}</td>

                        <td>
                          <div className="admin-offering-actions">
                            <button
                              type="button"
                              className="admin-refresh"
                              onClick={() => editCourse(course)}
                            >
                              რედაქტირება
                            </button>

                            <button
                              type="button"
                              className="admin-refresh"
                              onClick={() => toggleCourse(course)}
                            >
                              {course.is_active ? "გამორთვა" : "გააქტიურება"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* =====================================================
            ნაკადების მართვა
        ===================================================== */}

        {activeTab === "batches" && (
          <section className="admin-panel">
            <h2>ახალი ნაკადის შექმნა</h2>

            <form className="admin-form" onSubmit={createBatch}>
              <label className="admin-full">
                კურსი
                <select
                  required
                  value={batchForm.course_id}
                  onChange={(event) =>
                    setBatchForm({
                      ...batchForm,
                      course_id: event.target.value,
                    })
                  }
                >
                  <option value="">აირჩიე კურსი</option>
                  {courses
                    .filter((course) => course.is_active)
                    .map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                </select>
              </label>

              <label>
                ნაკადის ნომერი
                <input
                  type="number"
                  min="1"
                  required
                  value={batchForm.batch_number}
                  onChange={(event) =>
                    setBatchForm({
                      ...batchForm,
                      batch_number: event.target.value,
                    })
                  }
                />
              </label>

              <label>
                ფორმატი
                <select
                  value={batchForm.format}
                  onChange={(event) =>
                    setBatchForm({
                      ...batchForm,
                      format: event.target.value,
                    })
                  }
                >
                  <option value="online">ონლაინ</option>
                  <option value="classroom">აუდიტორია</option>
                </select>
              </label>

              <label>
                დაწყების თარიღი
                <input
                  type="date"
                  value={batchForm.start_date}
                  onChange={(event) =>
                    setBatchForm({
                      ...batchForm,
                      start_date: event.target.value,
                    })
                  }
                />
              </label>

              <label>
                დასრულების თარიღი
                <input
                  type="date"
                  value={batchForm.end_date}
                  onChange={(event) =>
                    setBatchForm({
                      ...batchForm,
                      end_date: event.target.value,
                    })
                  }
                />
              </label>

              <button
                type="submit"
                className="admin-primary"
                disabled={saving}
              >
                {saving ? "ინახება..." : "ნაკადის შექმნა"}
              </button>
            </form>

            <h2 className="admin-subheading">არსებული ნაკადები</h2>

            {batches.length === 0 ? (
              <p className="admin-empty">
                ნაკადები ჯერ არ არის დამატებული.
              </p>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>კურსი</th>
                      <th>ნაკადი</th>
                      <th>ფორმატი</th>
                      <th>დაწყება</th>
                      <th>დასრულება</th>
                      <th>სტატუსი</th>
                      <th>მოქმედება</th>
                    </tr>
                  </thead>

                  <tbody>
                    {batches.map((batch) => (
                      <tr key={batch.id}>
                        <td>{courseName(batch.course_id)}</td>
                        <td>№{batch.batch_number}</td>
                        <td>
                          {batch.format === "online"
                            ? "ონლაინ"
                            : "აუდიტორია"}
                        </td>
                        <td>{formatDate(batch.start_date)}</td>
                        <td>{formatDate(batch.end_date)}</td>
                        <td>{batch.is_active ? "აქტიური" : "გამორთული"}</td>
                        <td>
                          <button
                            type="button"
                            className="admin-refresh"
                            onClick={() => toggleBatch(batch)}
                          >
                            {batch.is_active ? "გამორთვა" : "გააქტიურება"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* =====================================================
            სიახლეები
        ===================================================== */}

        {activeTab === "news" && (
          <section className="admin-panel">
            <h2>
              {editingNewsId
                ? "სიახლის რედაქტირება"
                : "ახალი სიახლის დამატება"}
            </h2>

            <form className="admin-form" onSubmit={saveNews}>
              <label className="admin-full">
                სათაური
                <input
                  required
                  value={newsForm.title}
                  onChange={(event) =>
                    setNewsForm({
                      ...newsForm,
                      title: event.target.value,
                    })
                  }
                  placeholder="სიახლის სათაური"
                />
              </label>

              <label className="admin-full">
                URL slug (არასავალდებულო)
                <input
                  value={newsForm.slug}
                  onChange={(event) =>
                    setNewsForm({
                      ...newsForm,
                      slug: event.target.value,
                    })
                  }
                  placeholder="მაგ. new-video-editing-course"
                />
              </label>

              <label className="admin-full">
                მოკლე აღწერა
                <textarea
                  rows="2"
                  value={newsForm.excerpt}
                  onChange={(event) =>
                    setNewsForm({
                      ...newsForm,
                      excerpt: event.target.value,
                    })
                  }
                  placeholder="ტექსტი სიახლეების ბარათისთვის"
                />
              </label>

              <label className="admin-full">
                სრული ტექსტი
                <textarea
                  rows="7"
                  required
                  value={newsForm.content}
                  onChange={(event) =>
                    setNewsForm({
                      ...newsForm,
                      content: event.target.value,
                    })
                  }
                  placeholder="სიახლის სრული შინაარსი"
                />
              </label>

              <label className="admin-full">
                ფოტოს URL (არასავალდებულო)
                <input
                  type="url"
                  value={newsForm.image_url}
                  onChange={(event) =>
                    setNewsForm({
                      ...newsForm,
                      image_url: event.target.value,
                    })
                  }
                  placeholder="https://..."
                />
              </label>

              {newsForm.image_url && (
                <div className="admin-full">
                  <p>ფოტოს წინასწარი ნახვა</p>
                  <img
                    src={newsForm.image_url}
                    alt="სიახლის წინასწარი ნახვა"
                    style={{
                      display: "block",
                      maxWidth: "100%",
                      maxHeight: "240px",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}

              <label className="admin-full">
                გამოქვეყნება
                <select
                  value={newsForm.is_published ? "published" : "draft"}
                  onChange={(event) =>
                    setNewsForm({
                      ...newsForm,
                      is_published: event.target.value === "published",
                    })
                  }
                >
                  <option value="draft">მონახაზი — საიტზე არ ჩანს</option>
                  <option value="published">გამოქვეყნებული</option>
                </select>
              </label>

              <div className="admin-offering-actions admin-full">
                <button
                  type="submit"
                  className="admin-primary"
                  disabled={saving}
                >
                  {saving
                    ? "ინახება..."
                    : editingNewsId
                      ? "ცვლილებების შენახვა"
                      : "სიახლის დამატება"}
                </button>

                {editingNewsId && (
                  <button
                    type="button"
                    className="admin-refresh"
                    onClick={resetNewsForm}
                  >
                    გაუქმება
                  </button>
                )}
              </div>
            </form>

            <h2 className="admin-subheading">არსებული სიახლეები</h2>

            {news.length === 0 ? (
              <p className="admin-empty">
                სიახლეები ჯერ არ არის დამატებული.
              </p>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>სათაური</th>
                      <th>თარიღი</th>
                      <th>სტატუსი</th>
                      <th>მოქმედება</th>
                    </tr>
                  </thead>

                  <tbody>
                    {news.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <strong>{item.title}</strong>
                          {item.excerpt && <p>{item.excerpt}</p>}
                        </td>

                        <td>
                          {formatDate(item.published_at || item.created_at)}
                        </td>

                        <td>
                          {item.is_published
                            ? "გამოქვეყნებული"
                            : "მონახაზი"}
                        </td>

                        <td>
                          <div className="admin-offering-actions">
                            <button
                              type="button"
                              className="admin-refresh"
                              onClick={() => editNews(item)}
                            >
                              რედაქტირება
                            </button>

                            <button
                              type="button"
                              className="admin-refresh"
                              onClick={() => toggleNewsPublished(item)}
                            >
                              {item.is_published ? "დამალვა" : "გამოქვეყნება"}
                            </button>

                            <button
                              type="button"
                              className="admin-refresh"
                              onClick={() => deleteNews(item)}
                            >
                              წაშლა
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* =====================================================
            სტუდენტები და ჩარიცხვები
        ===================================================== */}

        {activeTab === "students" && (
          <section className="admin-panel">
            <h2>სტუდენტების კურსები</h2>

            {enrollments.length === 0 ? (
              <p className="admin-empty">
                ჩარიცხვები ჯერ არ არის. შექმენი კურსი, ნაკადი და მიანიჭე
                კურსი სტუდენტს.
              </p>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>სტუდენტი</th>
                      <th>კურსი / ნაკადი</th>
                      <th>გადახდა</th>
                      <th>დაწყება</th>
                      <th>პროგრესი</th>
                      <th>სტატუსი</th>
                    </tr>
                  </thead>

                  <tbody>
                    {enrollments.map((item) => (
                      <tr key={item.id}>
                        <td>{studentName(item.student_id)}</td>

                        <td>
                          <strong>{courseName(item.course_id)}</strong>
                          <br />
                          {batchName(item.batch_id)}
                        </td>

                        <td>
                          <select
                            value={item.payment_status || "pending"}
                            onChange={(event) =>
                              updateEnrollment(item.id, {
                                payment_status: event.target.value,
                              })
                            }
                          >
                            <option value="pending">მოლოდინში</option>
                            <option value="paid">გადახდილია</option>
                            <option value="refunded">დაბრუნებულია</option>
                          </select>
                        </td>

                        <td>
                          <input
                            type="date"
                            value={item.start_date || ""}
                            onChange={(event) =>
                              updateEnrollment(item.id, {
                                start_date: event.target.value || null,
                              })
                            }
                          />
                        </td>

                        <td>
                          <div className="admin-progress">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={item.progress ?? 0}
                              onChange={(event) => {
                                const raw = event.target.value;

                                setEnrollments((previous) =>
                                  previous.map((enrollment) =>
                                    enrollment.id === item.id
                                      ? {
                                          ...enrollment,
                                          progress:
                                            raw === ""
                                              ? ""
                                              : Math.min(
                                                  100,
                                                  Math.max(0, Number(raw))
                                                ),
                                        }
                                      : enrollment
                                  )
                                );
                              }}
                              onBlur={(event) =>
                                updateEnrollment(item.id, {
                                  progress: Math.min(
                                    100,
                                    Math.max(
                                      0,
                                      Number(event.target.value) || 0
                                    )
                                  ),
                                })
                              }
                            />
                            <span>%</span>
                          </div>
                        </td>

                        <td>
                          <select
                            value={item.status || "active"}
                            onChange={(event) =>
                              updateEnrollment(item.id, {
                                status: event.target.value,
                              })
                            }
                          >
                            <option value="active">აქტიური</option>
                            <option value="paused">შეჩერებული</option>
                            <option value="completed">დასრულებული</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* =====================================================
            სტუდენტისთვის კურსის მინიჭება
        ===================================================== */}

        {activeTab === "assign" && (
          <section className="admin-panel">
            <h2>სტუდენტისთვის კურსის მინიჭება</h2>

            <form className="admin-form" onSubmit={assignCourse}>
              <label className="admin-full">
                სტუდენტი
                <select
                  required
                  value={selectedStudent}
                  onChange={(event) => setSelectedStudent(event.target.value)}
                >
                  <option value="">აირჩიე სტუდენტი</option>

                  {students
                    .filter((student) => student.role !== "admin")
                    .map((student) => (
                      <option key={student.id} value={student.id}>
                        {studentName(student.id)}
                      </option>
                    ))}
                </select>
              </label>

              <label className="admin-full">
                ნაკადი
                <select
                  required
                  value={selectedBatch}
                  onChange={(event) => setSelectedBatch(event.target.value)}
                >
                  <option value="">აირჩიე ნაკადი</option>

                  {batches
                    .filter((batch) => batch.is_active)
                    .map((batch) => (
                      <option key={batch.id} value={batch.id}>
                        {courseName(batch.course_id)} · {batchName(batch.id)}
                      </option>
                    ))}
                </select>
              </label>

              <button
                type="submit"
                className="admin-primary"
                disabled={saving}
              >
                {saving ? "ინახება..." : "კურსის მინიჭება"}
              </button>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}
