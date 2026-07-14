import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <header>
        <h2>Navbar</h2>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <h2>Footer</h2>
      </footer>
    </>
  );
}

export default MainLayout;