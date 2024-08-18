import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import { Sidebar } from './components/sidebar';
import Auth from './pages/Auth/Auth';
import { getUser } from "../src/Redux/Auth/Action";
import { useEffect } from "react";
import { Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
    {auth.user ? (
        <div>
          <Sidebar />
          <Routes>
          </Routes>
        </div>
      ) : (
        <Auth />
      )}
    </>

  )
}

export default App
