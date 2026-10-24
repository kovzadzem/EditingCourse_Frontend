
import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../supabase";
import "./FileManager.css";

const BUCKET = "learning-files";
const MAX_SIZE = 50 * 1024 * 1024;

export default function FileManager() {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [folder, setFolder] = useState("");
  const [folders, setFolders] = useState([]);
  const [search, setSearch] = useState("");
  const [newFolder, setNewFolder] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const basePath = user ? user.id : "";

  const notifyError = (err) => {
    setError(err?.message || "ოპერაცია ვერ შესრულდა.");
    setSuccess("");
  };

  const loadFiles = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const { data: auth, error: authError } =
        await supabase.auth.getUser();

      if (authError) throw authError;
      if (!auth.user) throw new Error("გაიარე ავტორიზაცია.");

      setUser(auth.user);

      const prefix = [auth.user.id, folder]
        .filter(Boolean)
        .join("/");

      const { data, error: listError } = await supabase.storage
        .from(BUCKET)
        .list(prefix, {
          limit: 200,
          sortBy: { column: "name", order: "asc" },
        });

      if (listError) throw listError;

      const entries = data || [];

      setFolders(
        entries.filter(
          (item) =>
            !item.id &&
            item.name &&
            !item.name.startsWith(".")
        )
      );

      setFiles(
        entries.filter(
          (item) =>
            item.id &&
            !item.name.startsWith(".")
        )
      );
    } catch (err) {
      notifyError(err);
    } finally {
      setLoading(false);
    }
  }, [folder]);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const visibleFiles = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return files;

    return files.filter((file) =>
      file.name.toLowerCase().includes(query)
    );
  }, [files, search]);

  const fullPath = (name) =>
    [basePath, folder, name].filter(Boolean).join("/");

  const uploadFiles = async () => {
    if (!selectedFiles.length || busy) return;

    setBusy(true);
    setError("");
    setSuccess("");

    try {
      for (const file of selectedFiles) {
        if (file.size > MAX_SIZE) {
          throw new Error(
            `${file.name}: ფაილი 50 MB-ზე დიდია.`
          );
        }

        const path = fullPath(
          `${crypto.randomUUID()}-${file.name.replace(
            /[^a-zA-Z0-9._-]/g,
            "_"
          )}`
        );

        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(path, file, {
            upsert: false,
            contentType: file.type || "application/octet-stream",
          });

        if (uploadError) throw uploadError;
      }

      setSelectedFiles([]);
      setSuccess("ფაილები წარმატებით აიტვირთა.");
      await loadFiles();
    } catch (err) {
      notifyError(err);
    } finally {
      setBusy(false);
    }
  };

  const createFolder = async (event) => {
    event.preventDefault();

    const name = newFolder.trim();

    if (!name) return;

    if (/[\/\\]/.test(name) || name === "." || name === "..") {
      setError("საქაღალდის სახელი არასწორია.");
      return;
    }

    setBusy(true);
    setError("");
    setSuccess("");

    try {
      const path = fullPath(`${name}/.keep`);

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(
          path,
          new Blob(["folder"], { type: "text/plain" }),
          { upsert: false, contentType: "text/plain" }
        );

      if (uploadError) throw uploadError;

      setNewFolder("");
      setSuccess("საქაღალდე შეიქმნა.");
      await loadFiles();
    } catch (err) {
      notifyError(err);
    } finally {
      setBusy(false);
    }
  };

  const downloadFile = async (file) => {
    try {
      const { data, error: downloadError } = await supabase.storage
        .from(BUCKET)
        .download(fullPath(file.name));

      if (downloadError) throw downloadError;

      const url = URL.createObjectURL(data);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = file.name;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      notifyError(err);
    }
  };

  const deleteFile = async (file) => {
    if (!window.confirm(`წავშალოთ "${file.name}"?`)) return;

    setBusy(true);
    setError("");
    setSuccess("");

    try {
      const { error: deleteError } = await supabase.storage
        .from(BUCKET)
        .remove([fullPath(file.name)]);

      if (deleteError) throw deleteError;

      setSuccess("ფაილი წაიშალა.");
      setPreview(null);
      await loadFiles();
    } catch (err) {
      notifyError(err);
    } finally {
      setBusy(false);
    }
  };

  const openPreview = async (file) => {
    const path = fullPath(file.name);
    const { data, error: urlError } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(path, 300);

    if (urlError) {
      notifyError(urlError);
      return;
    }

    setPreview({
      name: file.name,
      url: data.signedUrl,
      isImage: /\.(png|jpe?g|gif|webp|svg)$/i.test(file.name),
      isVideo: /\.(mp4|mov|webm)$/i.test(file.name),
    });
  };

  const formatSize = (bytes) => {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024)
      return `${(bytes / 1024).toFixed(1)} KB`;

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const isImage = (name) =>
    /\.(png|jpe?g|gif|webp|svg)$/i.test(name);

  if (loading && !user) {
    return <section className="fm"><p>იტვირთება...</p></section>;
  }

  return (
    <section className="fm">
      <header className="fm-header">
        <div>
          <span className="fm-eyebrow">EDITOLOGIA STORAGE</span>
          <h2>ფაილები და საქაღალდეები</h2>
          <p>მართე შენი ფოტოები, დოკუმენტები, ვიდეოები და სხვა მასალები.</p>
        </div>

        <button className="fm-button" onClick={loadFiles} type="button">
          განახლება
        </button>
      </header>

      {error && <p className="fm-message fm-error">{error}</p>}
      {success && <p className="fm-message fm-success">{success}</p>}

      <div className="fm-breadcrumb">
        <button type="button" onClick={() => setFolder("")}>
          ჩემი ფაილები
        </button>
        {folder.split("/").filter(Boolean).map((part, index, parts) => (
          <span key={`${part}-${index}`}>
            <span> / </span>
            <button
              type="button"
              onClick={() => setFolder(parts.slice(0, index + 1).join("/"))}
            >
              {part}
            </button>
          </span>
        ))}
      </div>

      <div className="fm-toolbar">
        <form className="fm-folder-form" onSubmit={createFolder}>
          <input
            value={newFolder}
            onChange={(event) => setNewFolder(event.target.value)}
            placeholder="ახალი საქაღალდის სახელი"
            maxLength={60}
          />
          <button className="fm-button" disabled={busy} type="submit">
            + საქაღალდე
          </button>
        </form>

        <input
          className="fm-search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="ფაილის ძებნა..."
        />
      </div>

      <div className="fm-upload">
        <label className="fm-drop">
          <span className="fm-upload-icon">↑</span>
          <strong>აირჩიე ფაილები ასატვირთად</strong>
          <span>შეგიძლია რამდენიმე ფაილი ერთდროულად მონიშნო · მაქს. 50 MB თითო ფაილზე</span>
          <input
            type="file"
            multiple
            accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.zip,.txt"
            onChange={(event) =>
              setSelectedFiles(Array.from(event.target.files || []))
            }
          />
        </label>

        {selectedFiles.length > 0 && (
          <div className="fm-selected">
            <strong>ასატვირთია: {selectedFiles.length}</strong>
            {selectedFiles.map((file, index) => (
              <span key={`${file.name}-${index}`}>
                {file.name} · {formatSize(file.size)}
              </span>
            ))}
            <button
              type="button"
              className="fm-button fm-button-primary"
              disabled={busy}
              onClick={uploadFiles}
            >
              {busy ? "იტვირთება..." : "ატვირთვა"}
            </button>
          </div>
        )}
      </div>

      {folders.length > 0 && (
        <div className="fm-folder-grid">
          {folders.map((item) => (
            <button
              type="button"
              className="fm-folder"
              key={item.name}
              onClick={() =>
                setFolder([folder, item.name].filter(Boolean).join("/"))
              }
            >
              <span>📁</span>
              <strong>{item.name}</strong>
              <span>საქაღალდის გახსნა →</span>
            </button>
          ))}
        </div>
      )}

      <div className="fm-files-heading">
        <h3>ფაილები</h3>
        <span>{visibleFiles.filter((file) => file.name !== ".keep").length} ფაილი</span>
      </div>

      {loading ? (
        <p>იტვირთება...</p>
      ) : visibleFiles.filter((file) => file.name !== ".keep").length === 0 ? (
        <div className="fm-empty">აქ ჯერ ფაილები არ არის.</div>
      ) : (
        <div className="fm-grid">
          {visibleFiles
            .filter((file) => file.name !== ".keep")
            .map((file) => (
              <article className="fm-file" key={file.id || file.name}>
                <button
                  type="button"
                  className="fm-preview"
                  onClick={() => openPreview(file)}
                  title="ფაილის ნახვა"
                >
                  {isImage(file.name) ? (
                    <span className="fm-image-placeholder">🖼️</span>
                  ) : (
                    <span className="fm-file-icon">
                      {file.name.toLowerCase().endsWith(".pdf")
                        ? "📕"
                        : /\.(mp4|mov|webm)$/i.test(file.name)
                        ? "🎬"
                        : /\.(zip|rar)$/i.test(file.name)
                        ? "🗜️"
                        : "📄"}
                    </span>
                  )}
                </button>

                <div className="fm-file-info">
                  <strong title={file.name}>{file.name}</strong>
                  <span>{formatSize(file.metadata?.size)}</span>
                </div>

                <div className="fm-file-actions">
                  <button type="button" onClick={() => openPreview(file)}>
                    ნახვა
                  </button>
                  <button type="button" onClick={() => downloadFile(file)}>
                    ჩამოტვირთვა
                  </button>
                  <button
                    type="button"
                    className="fm-delete"
                    disabled={busy}
                    onClick={() => deleteFile(file)}
                  >
                    წაშლა
                  </button>
                </div>
              </article>
            ))}
        </div>
      )}

      {preview && (
        <div className="fm-modal" onClick={() => setPreview(null)}>
          <div
            className="fm-modal-content"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="fm-modal-header">
              <strong>{preview.name}</strong>
              <button type="button" onClick={() => setPreview(null)}>
                ✕
              </button>
            </div>

            {preview.isImage ? (
              <img src={preview.url} alt={preview.name} />
            ) : preview.isVideo ? (
              <video src={preview.url} controls />
            ) : (
              <div className="fm-document-preview">
                ამ ფაილის გადახედვა ბრაუზერში ვერ ხერხდება.
                <a href={preview.url} target="_blank" rel="noreferrer">
                  გახსნა ახალ ჩანართში ↗
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
