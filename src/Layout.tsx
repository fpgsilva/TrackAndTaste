import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import MainScreen from "./components/MainScreen";

export function Layout() {
  return (
    <>
      <Navbar />
      <MainScreen />
      <main>
        <Outlet />
      </main>
    </>
  );
}
