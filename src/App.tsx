import {  useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./pages/Auth/Auth";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { DespesasHome } from "./pages/Despesas/Home";
import { DespesasCadastrar } from "./pages/Despesas/Cadastrar";
import { Layout } from "./components/layout";
import { useEffect } from "react";
import { activateAccount } from "./redux-toolkit/auth/auth-thunks";
import { selectUserStatus } from "./redux-toolkit/auth/auth-selector";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const userStatus = useSelector(selectUserStatus);

  useEffect(() => {
     const pathname = location.pathname;
     const match = pathname.match(/\/activate\/(.+)/);
     const code = match ? match[1] : null;

    if (code) {
      dispatch(activateAccount(code));
    }

  }, [dispatch, location.pathname]);


  return (
    <>
      {userStatus ? (
        <Layout>
          <div>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transacao" element={<DespesasHome />} />
              <Route
                path="/transacao/cadastrar"
                element={<DespesasCadastrar />}
              />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </Layout>
      ) : (
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
      )}
    </>
  );
}

export default App;
