import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { supabase } from "../../supabase";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCamera,
  FaSignOutAlt,
  FaEdit,
} from "react-icons/fa";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();

    // თუ Login/Logout მოხდება, ავტომატურად განახლდეს
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          navigate("/login");
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadProfile = async () => {
    try {
      // მიმდინარე მომხმარებელი
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        navigate("/login");
        return;
      }

      setUser(user);

      // Profile ცხრილიდან ინფორმაციის წამოღება
      const {
        data: profileData,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        console.error(
          "PROFILE ERROR:",
          profileError
        );

        // თუ profile ჯერ არ არსებობს,
        // შევქმნით ავტომატურად
        if (profileError.code === "PGRST116") {
          const { data: newProfile, error } =
            await supabase
              .from("profiles")
              .insert({
                id: user.id,
                first_name:
                  user.user_metadata?.first_name || "",
                last_name:
                  user.user_metadata?.last_name || "",
                phone:
                  user.user_metadata?.phone || "",
                avatar: null,
              })
              .select()
              .single();

          if (error) {
            throw error;
          }

          setProfile(newProfile);
        } else {
          throw profileError;
        }
      } else {
        setProfile(profileData);
      }
    } catch (error) {
      console.error(
        "LOAD PROFILE ERROR:",
        error
      );

      alert(
        error.message ||
          "პროფილის ჩატვირთვა ვერ მოხერხდა."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = async () => {
    const { error } =
      await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">
          პროფილი იტვირთება...
        </div>
      </div>
    );
  }

  // =========================
  // PROFILE
  // =========================

  return (
    <div className="profile-page">

      <div className="profile-card">

        {/* HEADER */}

        <div className="profile-header">

          <h1>ჩემი პროფილი</h1>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            გასვლა
          </button>

        </div>

        {/* AVATAR */}

        <div className="profile-avatar-wrapper">

          <div className="profile-avatar">

            {profile?.avatar ? (
              <img
                src={profile.avatar}
                alt="Profile"
              />
            ) : (
              <FaUser />
            )}

          </div>

          <button
            className="avatar-edit"
            type="button"
          >
            <FaCamera />
          </button>

        </div>

        {/* NAME */}

        <div className="profile-name">

          <h2>
            {profile?.first_name || "მომხმარებელი"}{" "}
            {profile?.last_name || ""}
          </h2>

          <p>
            {user?.email}
          </p>

        </div>

        {/* INFORMATION */}

        <div className="profile-info">

          {/* FIRST NAME */}

          <div className="profile-field">

            <div className="field-icon">
              <FaUser />
            </div>

            <div className="field-content">

              <span>სახელი</span>

              <strong>
                {profile?.first_name ||
                  "არ არის მითითებული"}
              </strong>

            </div>

          </div>

          {/* LAST NAME */}

          <div className="profile-field">

            <div className="field-icon">
              <FaUser />
            </div>

            <div className="field-content">

              <span>გვარი</span>

              <strong>
                {profile?.last_name ||
                  "არ არის მითითებული"}
              </strong>

            </div>

          </div>

          {/* EMAIL */}

          <div className="profile-field">

            <div className="field-icon">
              <FaEnvelope />
            </div>

            <div className="field-content">

              <span>ელ. ფოსტა</span>

              <strong>
                {user?.email}
              </strong>

            </div>

          </div>

          {/* PHONE */}

          <div className="profile-field">

            <div className="field-icon">
              <FaPhone />
            </div>

            <div className="field-content">

              <span>
                ტელეფონის ნომერი
              </span>

              <strong>
                {profile?.phone ||
                  "არ არის მითითებული"}
              </strong>

            </div>

          </div>

        </div>

        {/* EDIT BUTTON */}

        <button
          className="edit-profile-btn"
          onClick={() =>
            navigate("/profile/edit")
          }
        >
          <FaEdit />
          პროფილის რედაქტირება
        </button>

      </div>

    </div>
  );
}

export default Profile;