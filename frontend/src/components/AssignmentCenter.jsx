import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../supabase";
import "./AssignmentCenter.css";

const MATERIAL_BUCKET = "assignment-materials";
const SUBMISSION_BUCKET = "assignment-files";
const MAX_FILE_SIZE = 50 * 1024 * 1024;

const EMPTY_FORM = {
  title: "",
  description: "",
  instructions: "",
  due_date: "",
  batch_id: "",
  course_id: "",
  is_published: true,
  allow_resubmission: true,
};

const STATUS_LABELS = {
  submitted: "შესამოწმებელია",
  accepted: "მიღებულია",
  needs_revision: "შესასწორებელია",
  reviewed: "შემოწმებულია",
};

const STATUS_OPTIONS = [
  { value: "submitted", label: "შესამოწმებელია" },
  { value: "accepted", label: "მიღებულია" },
  { value: "needs_revision", label: "შესასწორებელია" },
  { value: "reviewed", label: "შემოწმებულია" },
];

function errorMessage(error) {
  return error?.message || error?.details || error?.hint || String(error);
}

function safeFileName(name = "file") {
  return name.replace(/[^\w.\-ა-ჰ]/g, "_");
}

function formatDate(value) {
  if (!value) return "მითითებული არ არის";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleString("ka-GE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function displayName(profile) {
  if (!profile) return "სახელი მიუწვდომელია";

  const name = [profile.first_name, profile.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();

  return name || "სახელი მითითებული არ არის";
}

function validGrade(value) {
  return (
    String(value).trim() !== "" &&
    Number.isFinite(Number(value)) &&
    Number(value) >= 0 &&
    Number(value) <= 100
  );
}

function getStatus(submission) {
  return submission?.status || "submitted";
}

function isReviewedStatus(status) {
  return ["accepted", "reviewed", "needs_revision"].includes(status);
}

function SectionHeader({ title, count, description }) {
  return (
    <div className="assignment-section-header">
      <div className="assignment-section-header__text">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>

      <span className="assignment-section-count">{count}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const normalized = STATUS_LABELS[status] ? status : "submitted";

  return (
    <span className={`assignment-status assignment-status--${normalized}`}>
      <span className="assignment-status__dot" />
      {STATUS_LABELS[normalized]}
    </span>
  );
}

export default function AssignmentCenter() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const [assignments, setAssignments] = useState([]);
  const [batches, setBatches] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [comments, setComments] = useState([]);
  const [profilesById, setProfilesById] = useState({});

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [savingAssignment, setSavingAssignment] = useState(false);
  const [uploadingAssignmentId, setUploadingAssignmentId] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [materialFiles, setMaterialFiles] = useState([]);

  const [submissionFiles, setSubmissionFiles] = useState({});
  const [submissionTexts, setSubmissionTexts] = useState({});
  const [submissionVideos, setSubmissionVideos] = useState({});

  const [reviewNotes, setReviewNotes] = useState({});
  const [reviewGrades, setReviewGrades] = useState({});
  const [savingFeedback, setSavingFeedback] = useState({});
  const [updatingStatus, setUpdatingStatus] = useState({});

  const [expandedAssignmentId, setExpandedAssignmentId] = useState(null);
  const [expandedSubmissionIds, setExpandedSubmissionIds] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const showError = (message) => {
    setError(message);
    setSuccess("");
  };

  const showSuccess = (message) => {
    setSuccess(message);
    setError("");
  };

  const loadData = useCallback(async (silent = false) => {
    if (silent) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const {
        data: { user: currentUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (!currentUser) {
        setUser(null);
        setIsAdmin(false);
        setAssignments([]);
        setBatches([]);
        setSubmissions([]);
        setAttachments([]);
        setComments([]);
        setProfilesById({});
        return;
      }

      setUser(currentUser);

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, first_name, last_name, role")
        .eq("id", currentUser.id)
        .maybeSingle();

      if (profileError) throw profileError;

      const admin = String(profile?.role || "").toLowerCase() === "admin";
      setIsAdmin(admin);

      let allowedBatchIds = [];

      if (admin) {
        const { data, error: batchError } = await supabase
          .from("course_batches")
          .select(
            "id, course_id, batch_number, format, start_date, end_date, is_active, created_at"
          )
          .order("created_at", { ascending: false });

        if (batchError) throw batchError;

        setBatches(data || []);
      } else {
        const { data, error: enrollmentError } = await supabase
          .from("student_courses")
          .select("batch_id")
          .eq("student_id", currentUser.id);

        if (enrollmentError) throw enrollmentError;

        allowedBatchIds = [
          ...new Set((data || []).map((item) => item.batch_id).filter(Boolean)),
        ];

        setBatches([]);
      }

      let assignmentQuery = supabase
        .from("assignments")
        .select("*")
        .order("created_at", { ascending: false });

      if (!admin) {
        assignmentQuery = assignmentQuery.eq("is_published", true);

        if (allowedBatchIds.length) {
          const batchFilter = allowedBatchIds.map((id) => `"${id}"`).join(",");

          assignmentQuery = assignmentQuery.or(
            `batch_id.in.(${batchFilter}),batch_id.is.null`
          );
        } else {
          assignmentQuery = assignmentQuery.is("batch_id", null);
        }
      }

      const { data: assignmentRows, error: assignmentError } =
        await assignmentQuery;

      if (assignmentError) throw assignmentError;

      const assignmentList = assignmentRows || [];
      setAssignments(assignmentList);

      const assignmentIds = assignmentList.map((item) => item.id);

      if (!assignmentIds.length) {
        setSubmissions([]);
        setAttachments([]);
        setComments([]);
        setProfilesById({});
        return;
      }

      let submissionQuery = supabase
        .from("submissions")
        .select("*")
        .in("assignment_id", assignmentIds)
        .order("submitted_at", { ascending: false });

      if (!admin) {
        submissionQuery = submissionQuery.eq("student_id", currentUser.id);
      }

      const { data: submissionRows, error: submissionError } =
        await submissionQuery;

      if (submissionError) throw submissionError;

      const submissionList = submissionRows || [];
      setSubmissions(submissionList);

      const { data: attachmentRows, error: attachmentError } = await supabase
        .from("assignment_attachments")
        .select("*")
        .in("assignment_id", assignmentIds);

      if (attachmentError) throw attachmentError;

      setAttachments(attachmentRows || []);

      const submissionIds = submissionList.map((item) => item.id);
      let commentRows = [];

      if (submissionIds.length) {
        const { data, error: commentError } = await supabase
          .from("assignment_comments")
          .select("*")
          .in("submission_id", submissionIds)
          .order("created_at", { ascending: true });

        if (commentError) throw commentError;

        commentRows = data || [];
      }

      setComments(commentRows);

      const userIds = [
        ...new Set(
          [
            currentUser.id,
            ...assignmentList.map((item) => item.created_by),
            ...submissionList.map((item) => item.student_id),
            ...(attachmentRows || []).map((item) => item.uploaded_by),
            ...commentRows.map((item) => item.author_id),
          ].filter(Boolean)
        ),
      ];

      if (userIds.length) {
        const { data: profileRows, error: usersError } = await supabase
          .from("profiles")
          .select("id, first_name, last_name, role, avatar_url")
          .in("id", userIds);

        if (usersError) throw usersError;

        setProfilesById(
          Object.fromEntries(
            (profileRows || []).map((item) => [item.id, item])
          )
        );
      } else {
        setProfilesById({});
      }
    } catch (err) {
      console.error("AssignmentCenter loadData:", err);
      showError(`მონაცემების ჩატვირთვა ვერ მოხერხდა: ${errorMessage(err)}`);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingAssignment(null);
    setMaterialFiles([]);
    setShowForm(false);
  };

  const startEdit = (assignment) => {
    setEditingAssignment(assignment);

    setForm({
      title: assignment.title || "",
      description: assignment.description || "",
      instructions: assignment.instructions || "",
      due_date: assignment.due_date
        ? assignment.due_date.slice(0, 16)
        : "",
      batch_id: assignment.batch_id || "",
      course_id: assignment.course_id || "",
      is_published: assignment.is_published ?? true,
      allow_resubmission: assignment.allow_resubmission ?? true,
    });

    setMaterialFiles([]);
    setShowForm(true);
    setError("");
    setSuccess("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveAssignment = async (event) => {
    event.preventDefault();

    if (!isAdmin || !user) {
      showError("მხოლოდ ადმინისტრატორს შეუძლია დავალების მართვა.");
      return;
    }

    if (!form.title.trim()) {
      showError("შეიყვანე დავალების სათაური.");
      return;
    }

    for (const file of materialFiles) {
      if (file.size > MAX_FILE_SIZE) {
        showError(`ფაილი "${file.name}" აღემატება 50 MB-ს.`);
        return;
      }
    }

    setSavingAssignment(true);
    setError("");
    setSuccess("");

    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      instructions: form.instructions.trim() || null,
      due_date: form.due_date
        ? new Date(form.due_date).toISOString()
        : null,
      batch_id: form.batch_id || null,
      course_id: form.course_id || null,
      is_published: Boolean(form.is_published),
      allow_resubmission: Boolean(form.allow_resubmission),
      updated_at: new Date().toISOString(),
    };

    const wasEditing = Boolean(editingAssignment);
    let assignmentId = editingAssignment?.id;
    const uploadedPaths = [];

    try {
      if (editingAssignment) {
        const { data, error: updateError } = await supabase
          .from("assignments")
          .update(payload)
          .eq("id", editingAssignment.id)
          .select("id");

        if (updateError) throw updateError;

        if (!data?.length) {
          throw new Error(
            "დავალება არ განახლებულა. გადაამოწმე Supabase-ის RLS პოლიტიკები."
          );
        }
      } else {
        const { data, error: insertError } = await supabase
          .from("assignments")
          .insert({
            ...payload,
            created_by: user.id,
          })
          .select("*")
          .single();

        if (insertError) throw insertError;

        assignmentId = data.id;
      }

      for (const file of materialFiles) {
        const path = `${assignmentId}/${crypto.randomUUID()}_${safeFileName(file.name)}`;

        const { error: uploadError } = await supabase.storage
          .from(MATERIAL_BUCKET)
          .upload(path, file, {
            upsert: false,
            contentType: file.type || "application/octet-stream",
          });

        if (uploadError) throw uploadError;

        uploadedPaths.push(path);

        const { error: metadataError } = await supabase
          .from("assignment_attachments")
          .insert({
            assignment_id: assignmentId,
            file_path: path,
            file_name: file.name,
            uploaded_by: user.id,
            file_type: file.type || null,
            file_size: file.size,
          });

        if (metadataError) throw metadataError;
      }

      resetForm();

      showSuccess(
        wasEditing
          ? "დავალება წარმატებით განახლდა."
          : "დავალება წარმატებით შეიქმნა."
      );

      await loadData(true);
    } catch (err) {
      console.error("Save assignment:", err);

      if (uploadedPaths.length) {
        await supabase.storage.from(MATERIAL_BUCKET).remove(uploadedPaths);
      }

      showError(`დავალების შენახვა ვერ მოხერხდა: ${errorMessage(err)}`);
    } finally {
      setSavingAssignment(false);
    }
  };

  const deleteAssignment = async (assignment) => {
    if (!isAdmin) return;

    if (!window.confirm(`წავშალოთ დავალება „${assignment.title}“?`)) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      const files = attachments.filter(
        (item) => item.assignment_id === assignment.id
      );

      const paths = files.map((item) => item.file_path).filter(Boolean);

      if (paths.length) {
        const { error: storageError } = await supabase.storage
          .from(MATERIAL_BUCKET)
          .remove(paths);

        if (storageError) throw storageError;
      }

      const { data, error: deleteError } = await supabase
        .from("assignments")
        .delete()
        .eq("id", assignment.id)
        .select("id");

      if (deleteError) throw deleteError;

      if (!data?.length) {
        throw new Error(
          "დავალება არ წაშლილა. გადაამოწმე Supabase-ის RLS პოლიტიკები."
        );
      }

      showSuccess("დავალება წაიშალა.");
      await loadData(true);
    } catch (err) {
      console.error("Delete assignment:", err);
      showError(`დავალების წაშლა ვერ მოხერხდა: ${errorMessage(err)}`);
    }
  };

  const submitWork = async (assignment) => {
    if (!user) {
      showError("ნამუშევრის გასაგზავნად ანგარიშში შესვლა აუცილებელია.");
      return;
    }

    const mySubmissions = submissions.filter(
      (item) =>
        item.assignment_id === assignment.id &&
        item.student_id === user.id
    );

    const canResubmit = Boolean(assignment.allow_resubmission);

    if (mySubmissions.length > 0 && !canResubmit) {
      showError("ამ დავალებაზე ხელახლა ჩაბარება დაშვებული არ არის.");
      return;
    }

    const latestSubmission = [...mySubmissions].sort(
      (a, b) =>
        new Date(b.submitted_at || 0) - new Date(a.submitted_at || 0)
    )[0];

    if (
      latestSubmission &&
      !["needs_revision"].includes(getStatus(latestSubmission))
    ) {
      showError(
        "ამ დავალებაზე ხელახლა ჩაბარება შესაძლებელია მხოლოდ მას შემდეგ, რაც მასწავლებელი შესწორებას მოითხოვს."
      );
      return;
    }

    if (
      assignment.due_date &&
      new Date(assignment.due_date) < new Date()
    ) {
      showError("ამ დავალების ჩაბარების ვადა გასულია.");
      return;
    }

    const files = submissionFiles[assignment.id] || [];
    const content = (submissionTexts[assignment.id] || "").trim();
    const video = (submissionVideos[assignment.id] || "").trim();

    if (!files.length && !content && !video) {
      showError("დამატე ტექსტი, ვიდეოს ბმული ან მინიმუმ ერთი ფაილი.");
      return;
    }

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        showError(`ფაილი "${file.name}" აღემატება 50 MB-ს.`);
        return;
      }
    }

    setUploadingAssignmentId(assignment.id);
    setError("");
    setSuccess("");

    const uploadedPaths = [];

    try {
      const { data: latestRows, error: latestError } = await supabase
        .from("submissions")
        .select("id, status, submitted_at")
        .eq("assignment_id", assignment.id)
        .eq("student_id", user.id)
        .order("submitted_at", { ascending: false })
        .limit(1);

      if (latestError) throw latestError;

      const latest = latestRows?.[0];

      if (
        latest &&
        (!assignment.allow_resubmission ||
          getStatus(latest) !== "needs_revision")
      ) {
        await loadData(true);
        showError(
          "დავალების ხელახლა ჩაბარება ამჟამად შეუძლებელია. გადაამოწმე სტატუსი."
        );
        return;
      }

      const previousVersion = latest
        ? Math.max(
            1,
            ...mySubmissions.map((item) => Number(item.version) || 1)
          )
        : 0;

      const version = previousVersion + 1;
      const rows = [];

      for (let index = 0; index < Math.max(files.length, 1); index += 1) {
        const file = files[index] || null;
        let path = null;

        if (file) {
          path = `${user.id}/${assignment.id}/${crypto.randomUUID()}_${safeFileName(file.name)}`;

          const { error: uploadError } = await supabase.storage
            .from(SUBMISSION_BUCKET)
            .upload(path, file, {
              upsert: false,
              contentType: file.type || "application/octet-stream",
            });

          if (uploadError) throw uploadError;

          uploadedPaths.push(path);
        }

        rows.push({
          assignment_id: assignment.id,
          student_id: user.id,
          content: index === 0 ? content : "",
          video_url: index === 0 ? video || null : null,
          file_path: path,
          file_name: file?.name || null,
          version,
          status: "submitted",
          submitted_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }

      const { error: insertError } = await supabase
        .from("submissions")
        .insert(rows);

      if (insertError) throw insertError;

      setSubmissionTexts((prev) => ({
        ...prev,
        [assignment.id]: "",
      }));

      setSubmissionVideos((prev) => ({
        ...prev,
        [assignment.id]: "",
      }));

      setSubmissionFiles((prev) => ({
        ...prev,
        [assignment.id]: [],
      }));

      showSuccess("ნამუშევარი წარმატებით გაიგზავნა.");
      setExpandedAssignmentId(null);

      await loadData(true);
    } catch (err) {
      console.error("Submit work:", err);

      if (uploadedPaths.length) {
        await supabase.storage.from(SUBMISSION_BUCKET).remove(uploadedPaths);
      }

      showError(`ნამუშევრის გაგზავნა ვერ მოხერხდა: ${errorMessage(err)}`);
    } finally {
      setUploadingAssignmentId(null);
    }
  };

  const reviewSubmission = async (submission, status) => {
    if (!isAdmin) return;

    setUpdatingStatus((prev) => ({
      ...prev,
      [submission.id]: true,
    }));

    setError("");
    setSuccess("");

    try {
      const { data, error: updateError } = await supabase
        .from("submissions")
        .update({
          status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", submission.id)
        .select("id");

      if (updateError) throw updateError;

      if (!data?.length) {
        throw new Error(
          "სტატუსი არ განახლებულა. გადაამოწმე RLS პოლიტიკები."
        );
      }

      showSuccess("ნამუშევრის სტატუსი განახლდა.");
      await loadData(true);
    } catch (err) {
      console.error("Review submission:", err);
      showError(`სტატუსის განახლება ვერ მოხერხდა: ${errorMessage(err)}`);
    } finally {
      setUpdatingStatus((prev) => ({
        ...prev,
        [submission.id]: false,
      }));
    }
  };

  const saveFeedback = async (submission) => {
    if (!isAdmin || !user) {
      showError("შეფასების შენახვის უფლება არ გაქვს.");
      return;
    }

    const text = (reviewNotes[submission.id] || "").trim();
    const gradeValue = reviewGrades[submission.id] ?? submission.grade ?? "";
    const gradeProvided = String(gradeValue).trim() !== "";

    if (!text && !gradeProvided) {
      showError("შეიყვანე კომენტარი ან ქულა.");
      return;
    }

    if (gradeProvided && !validGrade(gradeValue)) {
      showError("ქულა უნდა იყოს 0-დან 100-მდე.");
      return;
    }

    setSavingFeedback((prev) => ({
      ...prev,
      [submission.id]: true,
    }));

    setError("");
    setSuccess("");

    try {
      if (gradeProvided) {
        const { data, error: gradeError } = await supabase
          .from("submissions")
          .update({
            grade: Number(gradeValue),
            updated_at: new Date().toISOString(),
          })
          .eq("id", submission.id)
          .select("id, grade");

        if (gradeError) throw gradeError;

        if (!data?.length) {
          throw new Error(
            "ქულა არ განახლებულა. გადაამოწმე submissions ცხრილის RLS პოლიტიკები."
          );
        }
      }

      if (text) {
        const { error: commentError } = await supabase
          .from("assignment_comments")
          .insert({
            assignment_id: submission.assignment_id,
            submission_id: submission.id,
            author_id: user.id,
            body: text,
            comment: text,
          });

        if (commentError) throw commentError;
      }

      setReviewNotes((prev) => ({
        ...prev,
        [submission.id]: "",
      }));

      setReviewGrades((prev) => ({
        ...prev,
        [submission.id]: "",
      }));

      showSuccess("შეფასება წარმატებით შეინახა.");
      await loadData(true);
    } catch (err) {
      console.error("Save feedback:", err);
      showError(`შეფასების შენახვა ვერ მოხერხდა: ${errorMessage(err)}`);
    } finally {
      setSavingFeedback((prev) => ({
        ...prev,
        [submission.id]: false,
      }));
    }
  };

  const openStorageFile = async (bucket, path) => {
    if (!path) return;

    try {
      const { data, error: urlError } = await supabase.storage
        .from(bucket)
        .createSignedUrl(path, 600);

      if (urlError) throw urlError;

      window.open(data.signedUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Open storage file:", err);
      showError(`ფაილის გახსნა ვერ მოხერხდა: ${errorMessage(err)}`);
    }
  };

  const batchLabel = (batchId) => {
    if (!batchId) return "ყველა ნაკადი";

    const batch = batches.find((item) => item.id === batchId);

    if (!batch) return "კურსის ნაკადი";

    return `ნაკადი ${batch.batch_number}${
      batch.format ? ` (${batch.format})` : ""
    }`;
  };

  const toggleAssignment = (assignmentId) => {
    setExpandedAssignmentId((current) =>
      current === assignmentId ? null : assignmentId
    );
  };

  const toggleSubmission = (submissionId) => {
    setExpandedSubmissionIds((prev) => ({
      ...prev,
      [submissionId]: !prev[submissionId],
    }));
  };

  const mySubmissions = useMemo(
    () => submissions.filter((item) => item.student_id === user?.id),
    [submissions, user]
  );

  const getMyAssignmentSubmissions = (assignmentId) =>
    mySubmissions.filter((item) => item.assignment_id === assignmentId);

  const pendingAssignments = assignments.filter(
    (assignment) =>
      getMyAssignmentSubmissions(assignment.id).length === 0
  );

  const submittedAssignments = assignments.filter((assignment) =>
    getMyAssignmentSubmissions(assignment.id).some(
      (submission) => getStatus(submission) === "submitted"
    )
  );

  const reviewedAssignments = assignments.filter((assignment) =>
    getMyAssignmentSubmissions(assignment.id).some((submission) =>
      isReviewedStatus(getStatus(submission))
    )
  );

  const submittedWork = submissions.filter(
    (submission) => getStatus(submission) === "submitted"
  );

  const acceptedWork = submissions.filter(
    (submission) => getStatus(submission) === "accepted"
  );

  const revisionWork = submissions.filter(
    (submission) => getStatus(submission) === "needs_revision"
  );

  const reviewedWork = submissions.filter(
    (submission) => getStatus(submission) === "reviewed"
  );

  const filteredAssignments = assignments.filter((assignment) =>
    `${assignment.title || ""} ${assignment.description || ""}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim())
  );

  const getAssignmentSubmissions = (assignmentId) =>
    submissions.filter((item) => item.assignment_id === assignmentId);

  const renderAssignmentCard = (assignment) => {
    const assignmentSubmissions = getAssignmentSubmissions(assignment.id);
    const assignmentAttachments = attachments.filter(
      (item) => item.assignment_id === assignment.id
    );

    const studentSubmissions = assignmentSubmissions
      .filter((item) => item.student_id === user.id)
      .sort(
        (a, b) =>
          new Date(b.submitted_at || 0) - new Date(a.submitted_at || 0)
      );

    const latestStudentSubmission = studentSubmissions[0];
    const alreadySubmitted = !isAdmin && Boolean(latestStudentSubmission);
    const expanded = expandedAssignmentId === assignment.id;
    const author = profilesById[assignment.created_by];

    const canResubmit =
      !isAdmin &&
      assignment.allow_resubmission &&
      latestStudentSubmission &&
      getStatus(latestStudentSubmission) === "needs_revision";

    const isExpired =
      assignment.due_date &&
      new Date(assignment.due_date).getTime() < Date.now();

    return (
      <article
        className={`assignment-card ${
          expanded ? "assignment-card--expanded" : ""
        }`}
        key={assignment.id}
      >
        <button
          type="button"
          className="assignment-card__toggle"
          aria-expanded={expanded}
          onClick={() => toggleAssignment(assignment.id)}
        >
          <div className="assignment-card__main">
            <div className="assignment-card__topline">
              <span className="assignment-eyebrow">
                {isAdmin
                  ? batchLabel(assignment.batch_id)
                  : "პრაქტიკული დავალება"}
              </span>

              {isAdmin ? (
                <span
                  className={`assignment-publication ${
                    assignment.is_published ? "is-published" : "is-hidden"
                  }`}
                >
                  {assignment.is_published ? "გამოქვეყნებული" : "დამალული"}
                </span>
              ) : alreadySubmitted ? (
                <StatusBadge status={getStatus(latestStudentSubmission)} />
              ) : isExpired ? (
                <span className="assignment-publication is-hidden">
                  ვადა გასულია
                </span>
              ) : (
                <span className="assignment-publication is-published">
                  ჩასაბარებელია
                </span>
              )}
            </div>

            <h3 className="assignment-card__title">{assignment.title}</h3>

            {assignment.description && (
              <p className="assignment-card__description">
                {assignment.description}
              </p>
            )}

            <div className="assignment-card__meta">
              <span>
                <span aria-hidden="true">◷</span>
                {assignment.due_date
                  ? `ვადა: ${formatDate(assignment.due_date)}`
                  : "ვადა მითითებული არ არის"}
              </span>

              <span>
                <span aria-hidden="true">▤</span>
                {assignmentAttachments.length} სასწავლო მასალა
              </span>

              {isAdmin && (
                <span>
                  <span aria-hidden="true">↗</span>
                  {assignmentSubmissions.length} ჩაბარება
                </span>
              )}
            </div>
          </div>

          <span
            className={`assignment-card__chevron ${
              expanded ? "is-open" : ""
            }`}
            aria-hidden="true"
          >
            ↓
          </span>
        </button>

        {isAdmin && (
          <div className="assignment-card__admin-actions">
            <button type="button" onClick={() => startEdit(assignment)}>
              რედაქტირება
            </button>

            <button
              type="button"
              className="assignment-danger-button"
              onClick={() => deleteAssignment(assignment)}
            >
              წაშლა
            </button>
          </div>
        )}

        {expanded && (
          <div className="assignment-card__details">
            {assignment.instructions && (
              <div className="assignment-instructions">
                <h4>დავალების ინსტრუქცია</h4>
                <p>{assignment.instructions}</p>
              </div>
            )}

            <div className="assignment-detail-grid">
              <div>
                <span>დავალების ავტორი</span>
                <strong>{displayName(author)}</strong>
              </div>

              <div>
                <span>ჩაბარების ვადა</span>
                <strong>{formatDate(assignment.due_date)}</strong>
              </div>

              {isAdmin && (
                <div>
                  <span>ხელახლა ჩაბარება</span>
                  <strong>
                    {assignment.allow_resubmission ? "დაშვებულია" : "აკრძალულია"}
                  </strong>
                </div>
              )}
            </div>

            {assignmentAttachments.length > 0 && (
              <div className="assignment-materials">
                <h4>სასწავლო მასალები</h4>

                {assignmentAttachments.map((attachment) => (
                  <button
                    type="button"
                    className="assignment-file-link"
                    key={attachment.id}
                    onClick={() =>
                      openStorageFile(MATERIAL_BUCKET, attachment.file_path)
                    }
                  >
                    <span className="assignment-file-link__icon">↧</span>
                    <span>{attachment.file_name || "მასალის გახსნა"}</span>
                    <span className="assignment-file-link__action">
                      გახსნა
                    </span>
                  </button>
                ))}
              </div>
            )}

            {!isAdmin && (!alreadySubmitted || canResubmit) && (
              <div className="assignment-submit">
                <div className="assignment-submit__heading">
                  <div>
                    <span className="assignment-eyebrow">
                      {canResubmit ? "ხელახლა ჩაბარება" : "შენი ნამუშევარი"}
                    </span>
                    <h4>ნამუშევრის გაგზავნა</h4>
                  </div>
                </div>

                {isExpired && (
                  <div className="assignment-inline-warning">
                    ჩაბარების ვადა გასულია. გაგზავნა გამორთულია.
                  </div>
                )}

                <label className="assignment-field">
                  <span>აღწერა ან კომენტარი</span>
                  <textarea
                    rows={4}
                    value={submissionTexts[assignment.id] || ""}
                    onChange={(event) =>
                      setSubmissionTexts((prev) => ({
                        ...prev,
                        [assignment.id]: event.target.value,
                      }))
                    }
                    placeholder="აღწერე შენი ნამუშევარი..."
                  />
                </label>

                <label className="assignment-field">
                  <span>ვიდეოს ბმული</span>
                  <input
                    type="url"
                    value={submissionVideos[assignment.id] || ""}
                    onChange={(event) =>
                      setSubmissionVideos((prev) => ({
                        ...prev,
                        [assignment.id]: event.target.value,
                      }))
                    }
                    placeholder="https://..."
                  />
                </label>

                <label className="assignment-field">
                  <span>ფაილების დამატება</span>
                  <input
                    type="file"
                    multiple
                    onChange={(event) =>
                      setSubmissionFiles((prev) => ({
                        ...prev,
                        [assignment.id]: Array.from(event.target.files || []),
                      }))
                    }
                  />
                  <small>
                    ვიდეო, ფოტო, PDF და სხვა ფაილები. მაქსიმუმ 50 MB თითო
                    ფაილზე.
                  </small>
                </label>

                {(submissionFiles[assignment.id] || []).length > 0 && (
                  <ul className="assignment-selected-files">
                    {(submissionFiles[assignment.id] || []).map(
                      (file, index) => (
                        <li key={`${file.name}-${index}`}>
                          <span>{file.name}</span>
                          <small>
                            {(file.size / (1024 * 1024)).toFixed(1)} MB
                          </small>
                        </li>
                      )
                    )}
                  </ul>
                )}

                <button
                  type="button"
                  className="assignment-primary-button"
                  disabled={
                    uploadingAssignmentId === assignment.id || Boolean(isExpired)
                  }
                  onClick={() => submitWork(assignment)}
                >
                  {uploadingAssignmentId === assignment.id
                    ? "იგზავნება..."
                    : canResubmit
                      ? "შესწორებული ნამუშევრის გაგზავნა"
                      : "დავალების ჩაბარება"}
                </button>
              </div>
            )}

            {!isAdmin && alreadySubmitted && !canResubmit && (
              <div className="assignment-submission-complete">
                <span className="assignment-submission-complete__icon">✓</span>
                <div>
                  <strong>ნამუშევარი ჩაბარებულია</strong>
                  <p>
                    ქვემოთ შეგიძლია ნახო შენი ჩაბარება, შეფასება და
                    მასწავლებლის კომენტარები.
                  </p>
                </div>
              </div>
            )}

            {!isAdmin && studentSubmissions.length > 0 && (
              <div className="assignment-my-submissions">
                <h4>ჩემი ჩაბარებები</h4>

                {studentSubmissions.map((submission) => {
                  const feedbackItems = comments.filter(
                    (item) => item.submission_id === submission.id
                  );

                  const submissionExpanded =
                    expandedSubmissionIds[submission.id] !== false;

                  return (
                    <div
                      className="assignment-student-submission"
                      key={submission.id}
                    >
                      <button
                        type="button"
                        className="assignment-student-submission__toggle"
                        onClick={() => toggleSubmission(submission.id)}
                      >
                        <div>
                          <StatusBadge status={getStatus(submission)} />
                          <span>
                            {formatDate(submission.submitted_at)}
                          </span>
                        </div>
                        <span>{submissionExpanded ? "−" : "+"}</span>
                      </button>

                      {submissionExpanded && (
                        <div className="assignment-student-submission__body">
                          {submission.grade !== null &&
                            submission.grade !== undefined && (
                              <div className="assignment-grade">
                                <span>შენი შეფასება</span>
                                <strong>
                                  {submission.grade}
                                  <small>/100</small>
                                </strong>
                              </div>
                            )}

                          {submission.content && (
                            <div className="assignment-submission-content">
                              <h5>შენი კომენტარი</h5>
                              <p>{submission.content}</p>
                            </div>
                          )}

                          {submission.video_url && (
                            <a
                              className="assignment-external-link"
                              href={submission.video_url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              ვიდეოს ნახვა ↗
                            </a>
                          )}

                          {submission.file_path && (
                            <button
                              type="button"
                              className="assignment-file-link"
                              onClick={() =>
                                openStorageFile(
                                  SUBMISSION_BUCKET,
                                  submission.file_path
                                )
                              }
                            >
                              ↧ {submission.file_name || "ჩაბარებული ფაილი"}
                            </button>
                          )}

                          {feedbackItems.length > 0 && (
                            <div className="assignment-feedback-list">
                              <h5>მასწავლებლის კომენტარები</h5>

                              {feedbackItems.map((feedback) => (
                                <div
                                  className="assignment-feedback-item"
                                  key={feedback.id}
                                >
                                  <p>{feedback.comment || feedback.body}</p>
                                  <small>
                                    {displayName(
                                      profilesById[feedback.author_id]
                                    )}
                                    {" · "}
                                    {formatDate(feedback.created_at)}
                                  </small>
                                </div>
                              ))}
                            </div>
                          )}

                          {isReviewedStatus(getStatus(submission)) &&
                            feedbackItems.length === 0 && (
                              <p className="assignment-muted-note">
                                მასწავლებლის კომენტარი ჯერ დამატებული არ არის.
                              </p>
                            )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {isAdmin && (
              <div className="assignment-review">
                <SectionHeader
                  title="სტუდენტების ნამუშევრები"
                  count={assignmentSubmissions.length}
                  description="გახსენი ნამუშევარი, მიანიჭე ქულა და დატოვე კომენტარი."
                />

                {assignmentSubmissions.length === 0 ? (
                  <div className="assignment-empty">
                    <p>ამ დავალებაზე ნამუშევარი ჯერ არ ჩაუბარებიათ.</p>
                  </div>
                ) : (
                  <div className="assignment-review-list">
                    {assignmentSubmissions.map(renderAdminSubmission)}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </article>
    );
  };

  function renderAdminSubmission(submission) {
    const assignment = assignments.find(
      (item) => item.id === submission.assignment_id
    );

    const student = profilesById[submission.student_id];

    const feedbackItems = comments.filter(
      (item) => item.submission_id === submission.id
    );

    const expanded = expandedSubmissionIds[submission.id] !== false;

    return (
      <article className="assignment-admin-submission" key={submission.id}>
        <button
          type="button"
          className="assignment-admin-submission__toggle"
          onClick={() => toggleSubmission(submission.id)}
        >
          <div className="assignment-admin-submission__identity">
            <span className="assignment-admin-submission__avatar">
              {displayName(student).slice(0, 1).toUpperCase()}
            </span>

            <span>
              <strong>{displayName(student)}</strong>
              <small>{assignment?.title || "დავალება"}</small>
            </span>
          </div>

          <div className="assignment-admin-submission__summary">
            <StatusBadge status={getStatus(submission)} />
            <span>{expanded ? "−" : "+"}</span>
          </div>
        </button>

        {expanded && (
          <div className="assignment-admin-submission__body">
            <div className="assignment-admin-submission__meta">
              <div>
                <span>ჩაბარების თარიღი</span>
                <strong>{formatDate(submission.submitted_at)}</strong>
              </div>

              <div>
                <span>ვერსია</span>
                <strong>{submission.version || 1}</strong>
              </div>

              <div>
                <span>ქულა</span>
                <strong>
                  {submission.grade !== null &&
                  submission.grade !== undefined
                    ? `${submission.grade}/100`
                    : "შეუფასებელია"}
                </strong>
              </div>
            </div>

            {submission.content && (
              <div className="assignment-submission-content">
                <h5>სტუდენტის კომენტარი</h5>
                <p>{submission.content}</p>
              </div>
            )}

            {submission.video_url && (
              <a
                className="assignment-external-link"
                href={submission.video_url}
                target="_blank"
                rel="noreferrer"
              >
                ვიდეოს ნახვა ↗
              </a>
            )}

            {submission.file_path && (
              <button
                type="button"
                className="assignment-file-link"
                onClick={() =>
                  openStorageFile(SUBMISSION_BUCKET, submission.file_path)
                }
              >
                ↧ {submission.file_name || "სტუდენტის ფაილი"}
              </button>
            )}

            <div className="assignment-review-editor">
              <label className="assignment-field">
                <span>ნამუშევრის სტატუსი</span>
                <select
                  value={getStatus(submission)}
                  disabled={Boolean(updatingStatus[submission.id])}
                  onChange={(event) =>
                    reviewSubmission(submission, event.target.value)
                  }
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="assignment-field">
                <span>ქულა (0–100)</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={
                    reviewGrades[submission.id] ?? submission.grade ?? ""
                  }
                  onChange={(event) =>
                    setReviewGrades((prev) => ({
                      ...prev,
                      [submission.id]: event.target.value,
                    }))
                  }
                  placeholder="მაგ. 85"
                />
              </label>

              <label className="assignment-field">
                <span>მასწავლებლის კომენტარი</span>
                <textarea
                  rows={4}
                  value={reviewNotes[submission.id] || ""}
                  onChange={(event) =>
                    setReviewNotes((prev) => ({
                      ...prev,
                      [submission.id]: event.target.value,
                    }))
                  }
                  placeholder="დაწერე უკუკავშირი და რეკომენდაციები..."
                />
              </label>

              <button
                type="button"
                className="assignment-primary-button"
                disabled={Boolean(savingFeedback[submission.id])}
                onClick={() => saveFeedback(submission)}
              >
                {savingFeedback[submission.id]
                  ? "ინახება..."
                  : "შეფასების შენახვა"}
              </button>
            </div>

            {feedbackItems.length > 0 && (
              <div className="assignment-feedback-list">
                <h5>შენახული კომენტარები</h5>

                {feedbackItems.map((feedback) => (
                  <div className="assignment-feedback-item" key={feedback.id}>
                    <p>{feedback.comment || feedback.body}</p>
                    <small>
                      {displayName(profilesById[feedback.author_id])}
                      {" · "}
                      {formatDate(feedback.created_at)}
                    </small>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </article>
    );
  }

  const renderSubmissionSection = (title, items, description) => (
    <section className="assignment-section" key={title}>
      <SectionHeader
        title={title}
        count={items.length}
        description={description}
      />

      {items.length === 0 ? (
        <div className="assignment-empty">
          <p>ამ სექციაში ნამუშევრები ჯერ არ არის.</p>
        </div>
      ) : (
        <div className="assignment-review-list">
          {items.map(renderAdminSubmission)}
        </div>
      )}
    </section>
  );

  if (loading) {
    return (
      <section className="assignment-center assignment-center--loading">
        <div className="assignment-loading-indicator" />
        <h2>დავალებები იტვირთება</h2>
        <p>მონაცემებს ვამზადებთ...</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="assignment-center">
        <div className="assignment-empty assignment-login-prompt">
          <span className="assignment-eyebrow">EDITOLOGIA LEARNING HUB</span>
          <h1>დავალებები</h1>
          <p>დავალებების სანახავად ანგარიშში შესვლა აუცილებელია.</p>

          <button
            type="button"
            className="assignment-primary-button"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            ანგარიშში შესვლა
          </button>
        </div>
      </section>
    );
  }

  const publishedAssignments = filteredAssignments.filter(
    (item) => item.is_published
  );

  const hiddenAssignments = filteredAssignments.filter(
    (item) => !item.is_published
  );

  return (
    <section className="assignment-center">
      <header className="assignment-center__header">
        <div className="assignment-center__intro">
          <span className="assignment-eyebrow">
            EDITOLOGIA / LEARNING HUB
          </span>

          <h1>{isAdmin ? "დავალებების მართვა" : "ჩემი დავალებები"}</h1>

          <p>
            {isAdmin
              ? "მართე სასწავლო დავალებები, შეამოწმე ნამუშევრები და მიეცი სტუდენტებს უკუკავშირი."
              : "ყველა დავალება ერთ სივრცეში — ჩაბარება, შეფასებები და მასწავლებლის კომენტარები."}
          </p>
        </div>

        <div className="assignment-center__header-actions">
          <button
            type="button"
            className="assignment-secondary-button"
            disabled={refreshing}
            onClick={() => loadData(true)}
          >
            <span aria-hidden="true">{refreshing ? "…" : "↻"}</span>
            {refreshing ? "განახლება..." : "განახლება"}
          </button>

          {isAdmin && (
            <button
              type="button"
              className="assignment-primary-button"
              onClick={() => {
                if (showForm) {
                  resetForm();
                } else {
                  setEditingAssignment(null);
                  setForm(EMPTY_FORM);
                  setMaterialFiles([]);
                  setShowForm(true);
                }

                setError("");
                setSuccess("");
              }}
            >
              {showForm ? "ფორმის დახურვა" : "+ ახალი დავალება"}
            </button>
          )}
        </div>
      </header>

      {error && (
        <div
          className="assignment-alert assignment-alert--error"
          role="alert"
        >
          <span>!</span>
          <p>{error}</p>
          <button
            type="button"
            aria-label="შეტყობინების დახურვა"
            onClick={() => setError("")}
          >
            ×
          </button>
        </div>
      )}

      {success && (
        <div
          className="assignment-alert assignment-alert--success"
          role="status"
        >
          <span>✓</span>
          <p>{success}</p>
          <button
            type="button"
            aria-label="შეტყობინების დახურვა"
            onClick={() => setSuccess("")}
          >
            ×
          </button>
        </div>
      )}

      {!isAdmin && (
        <div className="assignment-student-overview">
          <div className="assignment-overview-card">
            <span className="assignment-overview-card__label">
              ჩასაბარებელი
            </span>
            <strong>{pendingAssignments.length}</strong>
            <span className="assignment-overview-card__note">
              დავალება
            </span>
          </div>

          <div className="assignment-overview-card">
            <span className="assignment-overview-card__label">
              მოლოდინში
            </span>
            <strong>{submittedAssignments.length}</strong>
            <span className="assignment-overview-card__note">
              შესამოწმებელი
            </span>
          </div>

          <div className="assignment-overview-card assignment-overview-card--accent">
            <span className="assignment-overview-card__label">
              შეფასებული
            </span>
            <strong>{reviewedAssignments.length}</strong>
            <span className="assignment-overview-card__note">
              დავალება
            </span>
          </div>
        </div>
      )}

      {isAdmin && showForm && (
        <form className="assignment-form" onSubmit={handleSaveAssignment}>
          <div className="assignment-form__heading">
            <div>
              <span className="assignment-eyebrow">დავალების მართვა</span>
              <h2>
                {editingAssignment
                  ? "დავალების რედაქტირება"
                  : "ახალი დავალების შექმნა"}
              </h2>
              <p>შეავსე ძირითადი ინფორმაცია და გამოაქვეყნე დავალება.</p>
            </div>

            <button
              type="button"
              className="assignment-icon-button"
              onClick={resetForm}
              aria-label="ფორმის დახურვა"
            >
              ×
            </button>
          </div>

          <div className="assignment-form__grid">
            <label className="assignment-field assignment-field--full">
              <span>დავალების სათაური *</span>
              <input
                required
                value={form.title}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, title: event.target.value }))
                }
                placeholder="მაგ. ვიდეოს მონტაჟის პრაქტიკული დავალება"
              />
            </label>

            <label className="assignment-field assignment-field--full">
              <span>მოკლე აღწერა</span>
              <textarea
                rows={3}
                value={form.description}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    description: event.target.value,
                  }))
                }
                placeholder="დავალების მოკლე აღწერა..."
              />
            </label>

            <label className="assignment-field assignment-field--full">
              <span>დეტალური ინსტრუქცია</span>
              <textarea
                rows={5}
                value={form.instructions}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    instructions: event.target.value,
                  }))
                }
                placeholder="რა უნდა გააკეთოს სტუდენტმა? რა კრიტერიუმებით შეფასდება?"
              />
            </label>

            <label className="assignment-field">
              <span>ჩაბარების ვადა</span>
              <input
                type="datetime-local"
                value={form.due_date}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    due_date: event.target.value,
                  }))
                }
              />
            </label>

            <label className="assignment-field">
              <span>კურსის ნაკადი</span>
              <select
                value={form.batch_id}
                onChange={(event) => {
                  const selected = batches.find(
                    (item) => item.id === event.target.value
                  );

                  setForm((prev) => ({
                    ...prev,
                    batch_id: event.target.value,
                    course_id: selected?.course_id || prev.course_id || "",
                  }));
                }}
              >
                <option value="">ყველა ნაკადისთვის</option>
                {batches.map((batch) => (
                  <option key={batch.id} value={batch.id}>
                    ნაკადი {batch.batch_number} —{" "}
                    {batch.format || "ფორმატი მითითებული არ არის"}
                  </option>
                ))}
              </select>
            </label>

            <label className="assignment-field assignment-field--full">
              <span>კურსის ID (არასავალდებულო)</span>
              <input
                value={form.course_id}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    course_id: event.target.value,
                  }))
                }
                placeholder="კურსის UUID"
              />
            </label>

            <label className="assignment-field assignment-field--full">
              <span>სასწავლო მასალები</span>
              <input
                type="file"
                multiple
                onChange={(event) =>
                  setMaterialFiles(Array.from(event.target.files || []))
                }
              />
              <small>მაქსიმუმ 50 MB თითო ფაილზე.</small>
            </label>
          </div>

          {materialFiles.length > 0 && (
            <ul className="assignment-selected-files">
              {materialFiles.map((file, index) => (
                <li key={`${file.name}-${index}`}>
                  <span>{file.name}</span>
                  <small>
                    {(file.size / (1024 * 1024)).toFixed(1)} MB
                  </small>
                </li>
              ))}
            </ul>
          )}

          <div className="assignment-form__settings">
            <label className="assignment-checkbox">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    is_published: event.target.checked,
                  }))
                }
              />
              <span>
                <strong>გამოქვეყნება</strong>
                <small>სტუდენტებს შეეძლებათ დავალების ნახვა.</small>
              </span>
            </label>

            <label className="assignment-checkbox">
              <input
                type="checkbox"
                checked={form.allow_resubmission}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    allow_resubmission: event.target.checked,
                  }))
                }
              />
              <span>
                <strong>ხელახლა ჩაბარება</strong>
                <small>
                  შესწორების მოთხოვნის შემდეგ სტუდენტს ხელახლა გაგზავნა
                  შეეძლება.
                </small>
              </span>
            </label>
          </div>

          <div className="assignment-form__actions">
            <button
              type="button"
              className="assignment-secondary-button"
              onClick={resetForm}
            >
              გაუქმება
            </button>

            <button
              type="submit"
              className="assignment-primary-button"
              disabled={savingAssignment}
            >
              {savingAssignment
                ? "ინახება..."
                : editingAssignment
                  ? "ცვლილებების შენახვა"
                  : "დავალების შექმნა"}
            </button>
          </div>
        </form>
      )}

      {!isAdmin && (
        <>
          <section className="assignment-section">
            <SectionHeader
              title="ჩასაბარებელი დავალებები"
              count={pendingAssignments.length}
              description="დავალებები, რომლებზეც ნამუშევარი ჯერ არ გაგიგზავნია."
            />

            {pendingAssignments.length === 0 ? (
              <div className="assignment-empty">
                <span className="assignment-empty__icon">✓</span>
                <h3>ყველა დავალება ჩაბარებულია</h3>
                <p>ახალი დავალების გამოქვეყნების შემდეგ აქ გამოჩნდება.</p>
              </div>
            ) : (
              <div className="assignment-list">
                {pendingAssignments.map(renderAssignmentCard)}
              </div>
            )}
          </section>

          <section className="assignment-section">
            <SectionHeader
              title="შემოწმების მოლოდინში"
              count={submittedAssignments.length}
              description="ჩაბარებული ნამუშევრები, რომლებსაც მასწავლებელი ჯერ ამოწმებს."
            />

            {submittedAssignments.length === 0 ? (
              <div className="assignment-empty">
                <h3>მოლოდინში ნამუშევრები არ არის</h3>
                <p>გაგზავნილი დავალებები აქ გამოჩნდება შემოწმებამდე.</p>
              </div>
            ) : (
              <div className="assignment-list">
                {submittedAssignments.map(renderAssignmentCard)}
              </div>
            )}
          </section>

          <section className="assignment-section assignment-section--reviewed">
            <SectionHeader
              title="შემოწმებული დავალებები"
              count={reviewedAssignments.length}
              description="აქ ნახავ მიღებულ შეფასებებს, ქულებსა და მასწავლებლის კომენტარებს."
            />

            {reviewedAssignments.length === 0 ? (
              <div className="assignment-empty">
                <h3>შეფასებული დავალებები ჯერ არ გაქვს</h3>
                <p>
                  როგორც კი მასწავლებელი ნამუშევარს შეაფასებს, შედეგი აქ
                  გამოჩნდება.
                </p>
              </div>
            ) : (
              <div className="assignment-list">
                {reviewedAssignments.map(renderAssignmentCard)}
              </div>
            )}
          </section>
        </>
      )}

      {isAdmin && (
        <>
          <div className="assignment-admin-toolbar">
            <div>
              <h2>ყველა დავალება</h2>
              <p>მოძებნე, მართე და განაახლე გამოქვეყნებული დავალებები.</p>
            </div>

            <label className="assignment-search">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="დავალების ძიება..."
              />
            </label>
          </div>

          <section className="assignment-section">
            <SectionHeader
              title="აქტიური დავალებები"
              count={publishedAssignments.length}
              description="სტუდენტებისთვის გამოქვეყნებული დავალებები."
            />

            {publishedAssignments.length === 0 ? (
              <div className="assignment-empty">
                <p>აქტიური დავალებები ვერ მოიძებნა.</p>
              </div>
            ) : (
              <div className="assignment-list">
                {publishedAssignments.map(renderAssignmentCard)}
              </div>
            )}
          </section>

          <section className="assignment-section">
            <SectionHeader
              title="დამალული დავალებები"
              count={hiddenAssignments.length}
              description="დავალებები, რომლებიც სტუდენტებისთვის ჯერ არ ჩანს."
            />

            {hiddenAssignments.length === 0 ? (
              <div className="assignment-empty">
                <p>დამალული დავალებები არ არის.</p>
              </div>
            ) : (
              <div className="assignment-list">
                {hiddenAssignments.map(renderAssignmentCard)}
              </div>
            )}
          </section>

          {renderSubmissionSection(
            "შესამოწმებელი ნამუშევრები",
            submittedWork,
            "ახალი ჩაბარებები, რომლებსაც შეფასება სჭირდება."
          )}

          {renderSubmissionSection(
            "შესასწორებელი ნამუშევრები",
            revisionWork,
            "ნამუშევრები, რომლებზეც სტუდენტს შესწორება მოეთხოვა."
          )}

          {renderSubmissionSection(
            "მიღებული ნამუშევრები",
            acceptedWork,
            "ნამუშევრები, რომლებიც მიღებულია."
          )}

          {renderSubmissionSection(
            "შემოწმებული ნამუშევრები",
            reviewedWork,
            "უკვე შემოწმებული და შეფასებული ნამუშევრები."
          )}
        </>
      )}
    </section>
  );
}