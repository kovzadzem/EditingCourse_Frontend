import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "../supabase";

export default function RoleRoute({ allowedRole, children }) {
  const [status, setStatus] = useState("loading");
  const [role, setRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let active = true;

    async function checkAccess() {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        if (active) setStatus("unauthenticated");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .maybeSingle();

      if (!active) return;

      if (error || !profile) {
        setStatus("error");
        return;
      }

      setRole(profile.role);
      setStatus("ready");
    }

    checkAccess();

    return () => {
      active = false;
    };
  }, []);

  if (status === "loading") {
    return <div>იტვირთება...</div>;
  }

  if (status === "unauthenticated") {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  if (status === "error") {
    return (
      <div>
        პროფილის ჩატვირთვა ვერ მოხერხდა. სცადე ხელახლა შესვლა.
      </div>
    );
  }

  if (role !== allowedRole) {
    return (
      <Navigate
        to={role === "admin" ? "/admin" : "/profile"}
        replace
      />
    );
  }

  return children;
}