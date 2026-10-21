
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../supabase";
import "./Admin.css";

const initialBatch = {
  batch_number: "1",
  format: "online",
  start_date: "",
  end_date: "",
};

export default function Admin() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

  const [batchForm, setBatchForm] = useState(initialBatch);
  const [activeTab, setActiveTab] = useState("students");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const { data: { user }, error: authError } =
        await supabase.auth.getUser();

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
          .select("id, course_id, batch_number, format, start_date, end_date, is_active")
          .order("batch_number"),

        supabase
          .from("student_courses")
          .select("id, student_id, course_id, batch_id, payment_status, start_date, progress, status")
          .order("assigned_at", { ascending: false }),
      ]);

      const results = [
        profilesResult,
        coursesResult,
        batchesResult,
        enrollmentsResult,
      ];

      const failed = results.find((result) => result.error);

      if (failed) {
        throw new Error(
          failed.error.message ||
          "მონაცემების ჩატვირთვა ვერ მოხერხდა."
        );
      }

      setStudents(profilesResult.data || []);
      setCourses(coursesResult.data || []);
      setBatches(batchesResult.data || []);
      setEnrollments(enrollmentsResult.data || []);
    } catch (err) {
      setError(err.message || "დაფიქსირდა შეცდომა.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const notify = (message) => {
    setSuccess(message);
    setError("");
  };

  const createBatch = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const course = courses.find(
        (item) => item.is_active
      );

      if (!course) {
        throw new Error(
          "აქტიური კურსი ვერ მოიძებნა. ჯერ courses ცხრილში დაამატე ვიდეო ედითინგი."
        );
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
          course_id: course.id,
          batch_number: Number(batchForm.batch_number),
          format: batchForm.format,
          start_date: batchForm.start_date || null,
          end_date: batchForm.end_date || null,
        });

      if (insertError) throw insertError;

      setBatchForm(initialBatch);
      notify("ნაკადი წარმატებით შეიქმნა.");
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

  const assignCourse = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const batch = batches.find(
        (item) => item.id === selectedBatch
      );

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

  const studentName = (studentId) => {
    const student = students.find(
      (item) => item.id === studentId
    );

    if (!student) return "მომხმარებელი";

    return (
      `${student.first_name || ""} ${student.last_name || ""}`.trim() ||
      "სახელი მითითებული არ არის"
    );
  };

  const batchName = (batchId) => {
    const batch = batches.find(
      (item) => item.id === batchId
    );

    if (!batch) return "ნაკადი მითითებული არ არის";

    const format =
      batch.format === "online" ? "ონლაინ" : "აუდიტორია";

    return `ნაკადი №${batch.batch_number} · ${format}`;
  };

  const formatDate = (date) => {
    if (!date) return "არ არის მითითებული";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "ka-GE"
    );
  };

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
            <p>მართე სტუდენტები, კურსები და სასწავლო ნაკადები.</p>
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
          <div className="admin-alert admin-alert-error">
            {error}
          </div>
        )}

        {success && (
          <div className="admin-alert admin-alert-success">
            {success}
          </div>
        )}

        <section className="admin-stats">
          <article className="admin-stat">
            <span>სტუდენტები</span>
            <strong>{students.filter((s) => {
              return !enrollments.some(
                (e) => e.student_id === s.id
              );
            }).length + new Set(enrollments.map((e) => e.student_id)).size}</strong>
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
            <span>გადახდილია</span>
            <strong>
              {enrollments.filter(
                (item) => item.payment_status === "paid"
              ).length}
            </strong>
          </article>
        </section>

        <nav className="admin-tabs">
          <button
            type="button"
            className={activeTab === "students" ? "active" : ""}
            onClick={() => setActiveTab("students")}
          >
            სტუდენტები
          </button>

          <button
            type="button"
            className={activeTab === "batches" ? "active" : ""}
            onClick={() => setActiveTab("batches")}
          >
            ნაკადები
          </button>

          <button
            type="button"
            className={activeTab === "assign" ? "active" : ""}
            onClick={() => setActiveTab("assign")}
          >
            კურსის მინიჭება
          </button>
        </nav>

        {activeTab === "batches" && (
          <section className="admin-panel">
            <h2>ახალი ნაკადის შექმნა</h2>

            <form className="admin-form" onSubmit={createBatch}>
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
                className="admin-primary"
                type="submit"
                disabled={saving}
              >
                {saving ? "ინახება..." : "ნაკადის შექმნა"}
              </button>
            </form>

            <h2 className="admin-subheading">არსებული ნაკადები</h2>

            {batches.length === 0 ? (
              <p className="admin-empty">
                ნაკადები ჯერ არ შექმნილა.
              </p>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ნაკადი</th>
                      <th>ფორმატი</th>
                      <th>დაწყება</th>
                      <th>დასრულება</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batches.map((batch) => (
                      <tr key={batch.id}>
                        <td>№{batch.batch_number}</td>
                        <td>
                          {batch.format === "online"
                            ? "ონლაინ"
                            : "აუდიტორია"}
                        </td>
                        <td>{formatDate(batch.start_date)}</td>
                        <td>{formatDate(batch.end_date)}</td>
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
              <label className="admin-full">
                სტუდენტი
                <select
                  required
                  value={selectedStudent}
                  onChange={(event) =>
                    setSelectedStudent(event.target.value)
                  }
                >
                  <option value="">აირჩიე სტუდენტი</option>
                  {students
                    .filter((student) => {
                      return student.role !== "admin";
                    })
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
                  onChange={(event) =>
                    setSelectedBatch(event.target.value)
                  }
                >
                  <option value="">აირჩიე ნაკადი</option>
                  {batches
                    .filter((batch) => batch.is_active)
                    .map((batch) => (
                      <option key={batch.id} value={batch.id}>
                        ვიდეო ედითინგი · {batchName(batch.id)}
                      </option>
                    ))}
                </select>
              </label>

              <button
                className="admin-primary"
                type="submit"
                disabled={saving}
              >
                {saving ? "ინახება..." : "კურსის მინიჭება"}
              </button>
            </form>
          </section>
        )}

        {activeTab === "students" && (
          <section className="admin-panel">
            <h2>სტუდენტების კურსები</h2>

            {enrollments.length === 0 ? (
              <p className="admin-empty">
                ჩარიცხვები ჯერ არ არის. შექმენი ნაკადი და მიანიჭე
                კურსი სტუდენტს.
              </p>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>სტუდენტი</th>
                      <th>ნაკადი</th>
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
                        <td>{batchName(item.batch_id)}</td>

                        <td>
                          <select
                            value={item.payment_status}
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
                              value={item.progress}
                              onChange={(event) => {
                                const value = Number(event.target.value);
                                if (value >= 0 && value <= 100) {
                                  setEnrollments((previous) =>
                                    previous.map((enrollment) =>
                                      enrollment.id === item.id
                                        ? { ...enrollment, progress: value }
                                        : enrollment
                                    )
                                  );
                                }
                              }}
                              onBlur={(event) =>
                                updateEnrollment(item.id, {
                                  progress: Math.min(
                                    100,
                                    Math.max(0, Number(event.target.value))
                                  ),
                                })
                              }
                            />
                            <span>%</span>
                          </div>
                        </td>

                        <td>
                          <select
                            value={item.status}
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
      </div>
    </main>
  );
}
