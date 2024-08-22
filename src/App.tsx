import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Sidebar } from "./components/sidebar";
import Auth from "./pages/Auth/Auth";
import { getUser } from "../src/Redux/Auth/Action";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { cn } from "./lib/utils";
import { useStore } from "./hooks/use-store";
import { useSidebarToggle } from "./hooks/use-sidebar-toggle";
import { DespesasHome } from "./pages/Despesas/Home";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      {auth.user ? (
        <div>
          <Sidebar />
          <main
            className={cn(
              "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
              sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
            )}
          >
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/despesas/home" element={<DespesasHome />} />
            </Routes>
          </main>
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
