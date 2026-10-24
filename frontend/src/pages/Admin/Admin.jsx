
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import "./Admin.css";
import AssignmentCenter from "../../components/AssignmentCenter";

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

const initialVideo = {
  title: "",
  description: "",
  lesson_number: "1",
  video_path: "",
  is_published: false,
};

const isValidHttpUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
};

export default function Admin() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [offerings, setOfferings] = useState([]);
  const [news, setNews] = useState([]);
  const [lessons, setLessons] = useState([]);

  const [batchForm, setBatchForm] = useState(initialBatch);
  const [courseForm, setCourseForm] = useState(initialCourse);
  const [newsForm, setNewsForm] = useState(initialNews);
  const [videoForm, setVideoForm] = useState(initialVideo);

  const [videoSaving, setVideoSaving] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editingNewsId, setEditingNewsId] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [activeTab, setActiveTab] = useState("students");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const notify = (message) => {
    setSuccess(message);
    setError("");
  };

  // მონაცემების ჩატვირთვა

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

      const { data: adminProfile, error: profileError } = await supabase
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
        lessonsResult,
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

        supabase
          .from("course_offerings")
          .select("*")
          .order("created_at", { ascending: false }),

        supabase
          .from("news_posts")
          .select("*")
          .order("created_at", { ascending: false }),

        supabase
          .from("lessons")
          .select("*")
          .order("lesson_number", { ascending: true }),
      ]);

      const results = [
        profilesResult,
        coursesResult,
        batchesResult,
        enrollmentsResult,
        offeringsResult,
        newsResult,
        lessonsResult,
      ];

      const failed = results.find((result) => result.error);
      if (failed) throw new Error(failed.error.message);

      setStudents(profilesResult.data || []);
      setCourses(coursesResult.data || []);
      setBatches(batchesResult.data || []);
      setEnrollments(enrollmentsResult.data || []);
      setOfferings(offeringsResult.data || []);
      setNews(newsResult.data || []);
      setLessons(lessonsResult.data || []);

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

  // დამხმარე ფუნქციები

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

  // კურსების მართვა

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

    notify(course.is_active ? "კურსი გამორთულია." : "კურსი გააქტიურდა.");
    await loadData();
  };

  // ნაკადების მართვა

  const createBatch = async (event) => {
    event.preventDefault();
    if (saving) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (!batchForm.course_id) throw new Error("აირჩიე კურსი.");

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

    notify(batch.is_active ? "ნაკადი გამორთულია." : "ნაკადი გააქტიურდა.");
    await loadData();
  };

  // სტუდენტისთვის კურსის მინიჭება

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

  // სიახლეების მართვა

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
        published_at: shouldPublish ? new Date().toISOString() : null,
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
        published_at: publish ? new Date().toISOString() : null,
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
    if (!window.confirm(`ნამდვილად გსურს სიახლის წაშლა: "${item.title}"?`)) {
      return;
    }

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

  // ვიდეოს ბმულის შენახვა — ფაილის ატვირთვის გარეშე

  const uploadLesson = async (event) => {
    event.preventDefault();
    if (videoSaving) return;

    setVideoSaving(true);
    setError("");
    setSuccess("");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error("ხელახლა გაიარე ავტორიზაცია.");
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError || profile?.role !== "admin") {
        throw new Error("მხოლოდ ადმინისტრატორს შეუძლია გაკვეთილის დამატება.");
      }

      const title = videoForm.title.trim();
      const description = videoForm.description.trim();
      const videoUrl = videoForm.video_path.trim();
      const lessonNumber = Number(videoForm.lesson_number);

      if (!title) throw new Error("შეიყვანე გაკვეთილის სათაური.");
      if (!isValidHttpUrl(videoUrl)) {
        throw new Error("შეიყვანე სწორი ვიდეოს URL, რომელიც იწყება http:// ან https://-ით.");
      }

      if (!Number.isInteger(lessonNumber) || lessonNumber < 1) {
        throw new Error("გაკვეთილის ნომერი უნდა იყოს დადებითი მთელი რიცხვი.");
      }

      if (
        lessons.some(
          (lesson) => Number(lesson.lesson_number) === lessonNumber
        )
      ) {
        throw new Error("ეს გაკვეთილის ნომერი უკვე გამოყენებულია.");
      }

      const { error: insertError } = await supabase.from("lessons").insert({
        title,
        description,
        lesson_number: lessonNumber,
        video_path: videoUrl,
        is_published: videoForm.is_published,
      });

      if (insertError) throw insertError;

      setVideoForm({
        ...initialVideo,
        lesson_number: String(lessonNumber + 1),
      });

      notify(
        videoForm.is_published
          ? "გაკვეთილი წარმატებით გამოქვეყნდა."
          : "გაკვეთილი მონახაზად შეინახა."
      );

      await loadData();
    } catch (err) {
      setError(err.message || "გაკვეთილის შენახვა ვერ მოხერხდა.");
    } finally {
      setVideoSaving(false);
    }
  };

  const toggleLessonPublished = async (lesson) => {
    setError("");
    setSuccess("");

    const { error: updateError } = await supabase
      .from("lessons")
      .update({ is_published: !lesson.is_published })
      .eq("id", lesson.id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    notify(lesson.is_published ? "გაკვეთილი დაიმალა." : "გაკვეთილი გამოქვეყნდა.");
    await loadData();
  };

  const deleteLesson = async (lesson) => {
    if (!window.confirm(`ნამდვილად გსურს გაკვეთილის წაშლა: "${lesson.title}"?`)) {
      return;
    }

    setError("");
    setSuccess("");

    // გარე URL-ის წაშლისას Storage-ში არაფერს ვშლით.
    // ძველი Storage ფაილები შეგნებულად არ იშლება ავტომატურად.

    const { error: deleteError } = await supabase
      .from("lessons")
      .delete()
      .eq("id", lesson.id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    notify("გაკვეთილი წაიშალა.");
    await loadData();
  };

  // ჩატვირთვის ეკრანი

  if (loading) {
    return (
      <main className="admin-page">
        <div className="admin-message">იტვირთება...</div>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-container">
        <header className="admin-heading">
          <div>
            <span className="admin-eyebrow">EDITOLOGIA</span>
            <h1>ადმინისტრატორის პანელი</h1>
            <p>
              მართე კურსები, ნაკადები, ვიდეოები, სიახლეები, დავალებები და
              სტუდენტები.
            </p>
          </div>
          <button className="admin-refresh" type="button" onClick={loadData}>
            განახლება
          </button>
        </header>

        {error && <div className="admin-alert admin-alert-error">{error}</div>}
        {success && (
          <div className="admin-alert admin-alert-success">{success}</div>
        )}

        <section className="admin-stats">
          <article className="admin-stat">
            <span>სტუდენტები</span>
            <strong>{students.filter((item) => item.role !== "admin").length}</strong>
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
            <span>გაკვეთილები</span>
            <strong>{lessons.length}</strong>
          </article>
        </section>

        <nav className="admin-tabs">
          {[
            ["students", "სტუდენტები"],
            ["courses", "კურსები"],
            ["batches", "ნაკადები"],
            ["assign", "კურსის მინიჭება"],
            ["videos", "ვიდეოები"],
            ["assignments", "დავალებები"],
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

        {activeTab === "courses" && (
          <section className="admin-panel">
            <h2>{editingCourseId ? "კურსის რედაქტირება" : "ახალი კურსის დამატება"}</h2>
            <form className="admin-form" onSubmit={saveCourse}>
              <label className="admin-full">
                კურსის სახელი
                <input
                  required
                  value={courseForm.title}
                  onChange={(event) =>
                    setCourseForm({ ...courseForm, title: event.target.value })
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
                    setCourseForm({ ...courseForm, description: event.target.value })
                  }
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
                    setCourseForm({ ...courseForm, duration_weeks: event.target.value })
                  }
                />
              </label>
              <label>
                სტატუსი
                <select
                  value={courseForm.is_active ? "active" : "inactive"}
                  onChange={(event) =>
                    setCourseForm({ ...courseForm, is_active: event.target.value === "active" })
                  }
                >
                  <option value="active">აქტიური</option>
                  <option value="inactive">გამორთული</option>
                </select>
              </label>
              <div className="admin-offering-actions admin-full">
                <button type="submit" className="admin-primary" disabled={saving}>
                  {saving ? "ინახება..." : editingCourseId ? "ცვლილებების შენახვა" : "კურსის დამატება"}
                </button>
                {editingCourseId && (
                  <button type="button" className="admin-refresh" onClick={() => {
                    setEditingCourseId(null);
                    setCourseForm(initialCourse);
                  }}>
                    გაუქმება
                  </button>
                )}
              </div>
            </form>

            <h2 className="admin-subheading">არსებული კურსები</h2>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>კურსი</th><th>ხანგრძლივობა</th><th>სტატუსი</th><th>მოქმედება</th></tr></thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td><strong>{course.title}</strong><p>{course.description}</p></td>
                      <td>{course.duration_weeks || "—"} კვირა</td>
                      <td>{course.is_active ? "აქტიური" : "გამორთული"}</td>
                      <td><div className="admin-offering-actions">
                        <button type="button" className="admin-refresh" onClick={() => editCourse(course)}>რედაქტირება</button>
                        <button type="button" className="admin-refresh" onClick={() => toggleCourse(course)}>{course.is_active ? "გამორთვა" : "გააქტიურება"}</button>
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === "batches" && (
          <section className="admin-panel">
            <h2>ახალი ნაკადის შექმნა</h2>
            <form className="admin-form" onSubmit={createBatch}>
              <label className="admin-full">კურსი
                <select required value={batchForm.course_id} onChange={(event) => setBatchForm({ ...batchForm, course_id: event.target.value })}>
                  <option value="">აირჩიე კურსი</option>
                  {courses.filter((course) => course.is_active).map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}
                </select>
              </label>
              <label>ნაკადის ნომერი
                <input type="number" min="1" required value={batchForm.batch_number} onChange={(event) => setBatchForm({ ...batchForm, batch_number: event.target.value })} />
              </label>
              <label>ფორმატი
                <select value={batchForm.format} onChange={(event) => setBatchForm({ ...batchForm, format: event.target.value })}>
                  <option value="online">ონლაინ</option><option value="classroom">აუდიტორია</option>
                </select>
              </label>
              <label>დაწყების თარიღი
                <input type="date" value={batchForm.start_date} onChange={(event) => setBatchForm({ ...batchForm, start_date: event.target.value })} />
              </label>
              <label>დასრულების თარიღი
                <input type="date" value={batchForm.end_date} onChange={(event) => setBatchForm({ ...batchForm, end_date: event.target.value })} />
              </label>
              <button type="submit" className="admin-primary" disabled={saving}>{saving ? "ინახება..." : "ნაკადის შექმნა"}</button>
            </form>

            <h2 className="admin-subheading">არსებული ნაკადები</h2>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>კურსი</th><th>ნაკადი</th><th>ფორმატი</th><th>დაწყება</th><th>დასრულება</th><th>სტატუსი</th><th>მოქმედება</th></tr></thead>
                <tbody>
                  {batches.map((batch) => (
                    <tr key={batch.id}>
                      <td>{courseName(batch.course_id)}</td><td>№{batch.batch_number}</td><td>{batch.format === "online" ? "ონლაინ" : "აუდიტორია"}</td><td>{formatDate(batch.start_date)}</td><td>{formatDate(batch.end_date)}</td><td>{batch.is_active ? "აქტიური" : "გამორთული"}</td>
                      <td><button type="button" className="admin-refresh" onClick={() => toggleBatch(batch)}>{batch.is_active ? "გამორთვა" : "გააქტიურება"}</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === "videos" && (
          <section className="admin-panel">
            <h2>ვიდეოგაკვეთილის დამატება</h2>
            <p>ჩასვი ვიდეოს ბმული. ფაილის ატვირთვა საჭირო არ არის.</p>

            <form className="admin-form" onSubmit={uploadLesson}>
              <label className="admin-full">გაკვეთილის სათაური
                <input required value={videoForm.title} onChange={(event) => setVideoForm({ ...videoForm, title: event.target.value })} placeholder="მაგ. პირველი გაკვეთილი — მონტაჟის საფუძვლები" />
              </label>
              <label className="admin-full">აღწერა
                <textarea rows="3" value={videoForm.description} onChange={(event) => setVideoForm({ ...videoForm, description: event.target.value })} placeholder="გაკვეთილის მოკლე აღწერა" />
              </label>
              <label>გაკვეთილის ნომერი
                <input type="number" min="1" required value={videoForm.lesson_number} onChange={(event) => setVideoForm({ ...videoForm, lesson_number: event.target.value })} />
              </label>
              <label className="admin-full">ვიდეოს URL
                <input type="url" required value={videoForm.video_path} onChange={(event) => setVideoForm({ ...videoForm, video_path: event.target.value })} placeholder="https://..." />
              </label>
              <label className="admin-full">გამოქვეყნება
                <select value={videoForm.is_published ? "published" : "draft"} onChange={(event) => setVideoForm({ ...videoForm, is_published: event.target.value === "published" })}>
                  <option value="draft">მონახაზი — ჯერ არ გამოქვეყნდეს</option>
                  <option value="published">გამოქვეყნება</option>
                </select>
              </label>
              <button type="submit" className="admin-primary" disabled={videoSaving}>
                {videoSaving ? "ინახება..." : "გაკვეთილის შენახვა"}
              </button>
            </form>

            <h2 className="admin-subheading">გაკვეთილები</h2>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>№</th><th>სათაური</th><th>ბმული</th><th>სტატუსი</th><th>მოქმედება</th></tr></thead>
                <tbody>
                  {lessons.map((lesson) => (
                    <tr key={lesson.id}>
                      <td>{lesson.lesson_number}</td>
                      <td><strong>{lesson.title}</strong>{lesson.description && <p>{lesson.description}</p>}</td>
                      <td>{lesson.video_path && isValidHttpUrl(lesson.video_path) ? <a href={lesson.video_path} target="_blank" rel="noopener noreferrer">ვიდეოს ნახვა</a> : "ძველი Storage ფაილი"}</td>
                      <td>{lesson.is_published ? "გამოქვეყნებული" : "მონახაზი"}</td>
                      <td><div className="admin-offering-actions">
                        <button type="button" className="admin-refresh" onClick={() => toggleLessonPublished(lesson)}>{lesson.is_published ? "დამალვა" : "გამოქვეყნება"}</button>
                        <button type="button" className="admin-refresh" onClick={() => deleteLesson(lesson)}>წაშლა</button>
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === "students" && (
          <section className="admin-panel">
            <h2>სტუდენტების კურსები</h2>
            {enrollments.length === 0 ? (
              <p className="admin-empty">ჩარიცხვები ჯერ არ არის. შექმენი კურსი, ნაკადი და მიანიჭე კურსი სტუდენტს.</p>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>სტუდენტი</th><th>კურსი / ნაკადი</th><th>გადახდა</th><th>დაწყება</th><th>პროგრესი</th><th>სტატუსი</th></tr></thead>
                  <tbody>
                    {enrollments.map((item) => (
                      <tr key={item.id}>
                        <td>{studentName(item.student_id)}</td>
                        <td><strong>{courseName(item.course_id)}</strong><br />{batchName(item.batch_id)}</td>
                        <td><select value={item.payment_status || "pending"} onChange={(event) => updateEnrollment(item.id, { payment_status: event.target.value })}><option value="pending">მოლოდინში</option><option value="paid">გადახდილია</option><option value="refunded">დაბრუნებულია</option></select></td>
                        <td><input type="date" value={item.start_date || ""} onChange={(event) => updateEnrollment(item.id, { start_date: event.target.value || null })} /></td>
                        <td><div className="admin-progress"><input type="number" min="0" max="100" value={item.progress ?? 0} onChange={(event) => { const raw = event.target.value; setEnrollments((previous) => previous.map((enrollment) => enrollment.id === item.id ? { ...enrollment, progress: raw === "" ? "" : Math.min(100, Math.max(0, Number(raw))) } : enrollment)); }} onBlur={(event) => updateEnrollment(item.id, { progress: Math.min(100, Math.max(0, Number(event.target.value) || 0)) })} /><span>%</span></div></td>
                        <td><select value={item.status || "active"} onChange={(event) => updateEnrollment(item.id, { status: event.target.value })}><option value="active">აქტიური</option><option value="paused">შეჩერებული</option><option value="completed">დასრულებული</option></select></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {activeTab === "assign" && (
          <section className="admin-panel">
            <h2>სტუდენტისთვის კურსის მინიჭება</h2>
            <form className="admin-form" onSubmit={assignCourse}>
              <label className="admin-full">სტუდენტი
                <select required value={selectedStudent} onChange={(event) => setSelectedStudent(event.target.value)}>
                  <option value="">აირჩიე სტუდენტი</option>
                  {students.filter((student) => student.role !== "admin").map((student) => <option key={student.id} value={student.id}>{studentName(student.id)}</option>)}
                </select>
              </label>
              <label className="admin-full">ნაკადი
                <select required value={selectedBatch} onChange={(event) => setSelectedBatch(event.target.value)}>
                  <option value="">აირჩიე ნაკადი</option>
                  {batches.filter((batch) => batch.is_active).map((batch) => <option key={batch.id} value={batch.id}>{courseName(batch.course_id)} · {batchName(batch.id)}</option>)}
                </select>
              </label>
              <button type="submit" className="admin-primary" disabled={saving}>{saving ? "ინახება..." : "კურსის მინიჭება"}</button>
            </form>
          </section>
        )}

        {activeTab === "assignments" && (
          <section className="admin-panel admin-assignments-panel">
            <div className="admin-requests-heading">
              <div>
                <h2>დავალებები და ნამუშევრები</h2>
                <p>შექმენი დავალებები, მიუთითე ვადა და ვიდეომასალა, შემდეგ შეამოწმე სტუდენტების ჩაბარებული ნამუშევრები.</p>
              </div>
            </div>
            <AssignmentCenter mode="admin" />
          </section>
        )}

        {activeTab === "news" && (
          <section className="admin-panel">
            <h2>{editingNewsId ? "სიახლის რედაქტირება" : "ახალი სიახლის დამატება"}</h2>
            <form className="admin-form" onSubmit={saveNews}>
              <label className="admin-full">სათაური
                <input required value={newsForm.title} onChange={(event) => setNewsForm({ ...newsForm, title: event.target.value })} placeholder="სიახლის სათაური" />
              </label>
              <label className="admin-full">URL slug (არასავალდებულო)
                <input value={newsForm.slug} onChange={(event) => setNewsForm({ ...newsForm, slug: event.target.value })} placeholder="მაგ. new-video-editing-course" />
              </label>
              <label className="admin-full">მოკლე აღწერა
                <textarea rows="2" value={newsForm.excerpt} onChange={(event) => setNewsForm({ ...newsForm, excerpt: event.target.value })} placeholder="ტექსტი სიახლეების ბარათისთვის" />
              </label>
              <label className="admin-full">სრული ტექსტი
                <textarea rows="7" required value={newsForm.content} onChange={(event) => setNewsForm({ ...newsForm, content: event.target.value })} placeholder="სიახლის სრული შინაარსი" />
              </label>
              <label className="admin-full">ფოტოს URL (არასავალდებულო)
                <input type="url" value={newsForm.image_url} onChange={(event) => setNewsForm({ ...newsForm, image_url: event.target.value })} placeholder="https://..." />
              </label>
              {newsForm.image_url && (
                <div className="admin-full">
                  <p>ფოტოს წინასწარი ნახვა</p>
                  <img src={newsForm.image_url} alt="სიახლის წინასწარი ნახვა" style={{ display: "block", maxWidth: "100%", maxHeight: "240px", objectFit: "cover", borderRadius: "12px" }} onError={(event) => { event.currentTarget.style.display = "none"; }} />
                </div>
              )}
              <label className="admin-full">გამოქვეყნება
                <select value={newsForm.is_published ? "published" : "draft"} onChange={(event) => setNewsForm({ ...newsForm, is_published: event.target.value === "published" })}>
                  <option value="draft">მონახაზი — საიტზე არ ჩანს</option><option value="published">გამოქვეყნებული</option>
                </select>
              </label>
              <div className="admin-offering-actions admin-full">
                <button type="submit" className="admin-primary" disabled={saving}>{saving ? "ინახება..." : editingNewsId ? "ცვლილებების შენახვა" : "სიახლის დამატება"}</button>
                {editingNewsId && <button type="button" className="admin-refresh" onClick={resetNewsForm}>გაუქმება</button>}
              </div>
            </form>

            <h2 className="admin-subheading">არსებული სიახლეები</h2>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>სათაური</th><th>თარიღი</th><th>სტატუსი</th><th>მოქმედება</th></tr></thead>
                <tbody>
                  {news.map((item) => (
                    <tr key={item.id}>
                      <td><strong>{item.title}</strong>{item.excerpt && <p>{item.excerpt}</p>}</td>
                      <td>{formatDate(item.published_at || item.created_at)}</td>
                      <td>{item.is_published ? "გამოქვეყნებული" : "მონახაზი"}</td>
                      <td><div className="admin-offering-actions">
                        <button type="button" className="admin-refresh" onClick={() => editNews(item)}>რედაქტირება</button>
                        <button type="button" className="admin-refresh" onClick={() => toggleNewsPublished(item)}>{item.is_published ? "დამალვა" : "გამოქვეყნება"}</button>
                        <button type="button" className="admin-refresh" onClick={() => deleteNews(item)}>წაშლა</button>
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
