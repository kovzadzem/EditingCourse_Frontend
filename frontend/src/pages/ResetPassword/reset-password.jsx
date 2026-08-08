import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { supabase } from "../../supabase";
import "./reset-password.css";

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    const handleRecovery = async () => {
      try {
        // Supabase recovery link-ის მონაცემები
        const hash = window.location.hash;

        if (hash) {
          const params = new URLSearchParams(
            hash.substring(1)
          );

          const accessToken =
            params.get("access_token");

          const refreshToken =
            params.get("refresh_token");

          const type = params.get("type");

          if (
            type === "recovery" &&
            accessToken &&
            refreshToken
          ) {
            const { error } =
              await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
              });

            if (error) {
              throw error;
            }
          }
        }

        // ვამოწმებთ session-ს
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          setHasSession(true);
        } else {
          setHasSession(false);
        }
      } catch (error) {
        console.error(
          "RECOVERY SESSION ERROR:",
          error
        );

        setHasSession(false);
      } finally {
        setChecking(false);
      }
    };

    handleRecovery();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(
          "AUTH EVENT:",
          event
        );

        if (
          event === "PASSWORD_RECOVERY" &&
          session
        ) {
          setHasSession(true);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert(
        "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს."
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("პაროლები არ ემთხვევა!");
      return;
    }

    setLoading(true);

    try {
      const { error } =
        await supabase.auth.updateUser({
          password,
        });

      if (error) {
        throw error;
      }

      alert(
        "პაროლი წარმატებით შეიცვალა!"
      );

      await supabase.auth.signOut();

      navigate("/login");
    } catch (error) {
      console.error(
        "UPDATE PASSWORD ERROR:",
        error
      );

      alert(
        error.message ||
          "პაროლის შეცვლა ვერ მოხერხდა."
      );
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="reset-password-page">
        <div className="reset-password-card">
          <h1>
            იტვირთება...
          </h1>

          <p>
            მოწმდება პაროლის აღდგენის ბმული.
          </p>
        </div>
      </div>
    );
  }

  if (!hasSession) {
    return (
      <div className="reset-password-page">
        <div className="reset-password-card">

          <h1>
            პაროლის აღდგენა
          </h1>

          <p>
            პაროლის აღდგენის სესია ვერ მოიძებნა.
          </p>

          <div className="reset-login-link">
            <Link to="/forgot-password">
              ახალი ბმულის მოთხოვნა
            </Link>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-page">
      <div className="reset-password-card">

        <h1>
          ახალი პაროლი
        </h1>

        <p>
          შეიყვანე ახალი პაროლი შენი
          ანგარიშისთვის.
        </p>

        <form onSubmit={handleSubmit}>

          {/* PASSWORD */}

          <div className="reset-input-group">

            <label>
              ახალი პაროლი
            </label>

            <div className="reset-input-box">

              <FaLock />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="ახალი პაროლი"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="reset-eye-btn"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          {/* CONFIRM PASSWORD */}

          <div className="reset-input-group">

            <label>
              გაიმეორე ახალი პაროლი
            </label>

            <div className="reset-input-box">

              <FaLock />

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="გაიმეორე პაროლი"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                required
              />

              <button
                type="button"
                className="reset-eye-btn"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          <button
            type="submit"
            className="reset-btn"
            disabled={loading}
          >
            {loading
              ? "იცვლება..."
              : "პაროლის შეცვლა"}
          </button>

          <div className="reset-login-link">

            <Link to="/login">
              ავტორიზაციაზე დაბრუნება
            </Link>

          </div>

        </form>

      </div>
    </div>
  );
}

export default ResetPassword;