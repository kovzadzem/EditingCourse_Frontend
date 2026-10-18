
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

function App() {
  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((response) => response.text())
      .then((data) => {
        console.log("BACKEND RESPONSE:", data);
      })
      .catch((error) => {
        console.error("BACKEND ERROR:", error);
      });
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
