
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import { supabase } from "../../supabase";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // მომხმარებლის როლის შემოწმება და შესაბამის გვერდზე გადაყვანა
  const redirectByRole = async (user) => {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("id, first_name, last_name, phone, role")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      console.error("PROFILE ERROR:", error);
      throw new Error(
        "პროფილის ჩატვირთვა ვერ მოხერხდა. სცადე ხელახლა."
      );
    }

    if (!profile) {
      throw new Error(
        "მომხმარებლის პროფილი ვერ მოიძებნა. " +
          "შეამოწმე Supabase-ის profiles ცხრილი და trigger."
      );
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        id: user.id,
        email: user.email,
        profile,
      })
    );

    if (profile.role === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/profile", { replace: true });
    }
  };

  // ელფოსტითა და პაროლით შესვლა
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const email = formData.email.trim().toLowerCase();

      const { data, error } =
        await supabase.auth.signInWithPassword({
          email,
          password: formData.password,
        });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error("მომხმარებლის მონაცემები ვერ მოიძებნა.");
      }

      // არ ვამოწმებთ email_confirmed_at-ს აქ.
      // Supabase-ის Email provider-ში Confirm email უნდა იყოს გამორთული.
      await redirectByRole(data.user);
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      const message = (error.message || "").toLowerCase();

      if (
        message.includes("invalid login credentials") ||
        message.includes("invalid email or password")
      ) {
        alert("ელფოსტა ან პაროლი არასწორია.");
      } else if (message.includes("email not confirmed")) {
        alert(
          "Supabase-ში ელფოსტის დადასტურება ჯერ კიდევ ჩართულია. " +
            "გახსენი Authentication → Sign In / Providers → Email " +
            "და გამორთე Confirm email."
        );
      } else if (message.includes("profiles")) {
        alert(
          "პროფილის ჩატვირთვა ვერ მოხერხდა. " +
            "შეამოწმე Supabase-ის profiles ცხრილი."
        );
      } else {
        alert(error.message || "ავტორიზაცია ვერ მოხერხდა.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Google / Facebook ავტორიზაცია
  const handleOAuth = async (provider) => {
    if (loading) return;

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/profile`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(`${provider.toUpperCase()} LOGIN ERROR:`, error);

      alert(error.message || "ავტორიზაცია ვერ მოხერხდა.");
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>შესვლა</h1>
        <p>კეთილი იყოს შენი დაბრუნება!</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="login-email">ელ. ფოსტა</label>

            <div className="input-box">
              <FaEnvelope />

              <input
                id="login-email"
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="login-password">პაროლი</label>

            <div className="input-box">
              <FaLock />

              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="პაროლი"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                aria-label={
                  showPassword
                    ? "პაროლის დამალვა"
                    : "პაროლის ჩვენება"
                }
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="forgot-password">
            <Link to="/forgot-password">
              პაროლი დაგავიწყდა?
            </Link>
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "მიმდინარეობს შესვლა..." : "შესვლა"}
          </button>

          <div className="divider">
            <span></span>
            <p>ან</p>
            <span></span>
          </div>

          <button
            type="button"
            className="social-btn"
            onClick={() => handleOAuth("google")}
            disabled={loading}
          >
            <FaGoogle />
            Google-ით შესვლა
          </button>

          <button
            type="button"
            className="social-btn"
            onClick={() => handleOAuth("facebook")}
            disabled={loading}
          >
            <FaFacebook />
            Facebook-ით შესვლა
          </button>

          <div className="register-link">
            არ გაქვს ანგარიში?
            <Link to="/register"> რეგისტრაცია</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
