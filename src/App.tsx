import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { User } from "./types/user";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation";
import { WelcomeModal } from "./components/WelcomeModal/WelcomeModal";
import { ToDoList } from "./components/ToDoList/ToDoList";
import { Category } from "./components/Category/Category";
import { SignIn } from "./components/SignIn/SignIn";
import { SignUp } from "./components/SignUp/SignUp";

function App() {

  const [showWelcome, setShowWelcome] = useState(false);
  const [isAuthRoute, setIsAuthRoute] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const name = localStorage.getItem("username");
    console.log(name);
    // if (!name) {
    //   setShowWelcome(true)
    // }
    const token = localStorage.getItem("token");
    const rememberMe = localStorage.getItem("rememberMe");

    if ((token && rememberMe)) {
      navigate("/tasks/all");
      return;
    }

    navigate("signup");
  }, []);

  useEffect(() => {
    // console.log(isAuthRoute);
    if (
      location.pathname.includes("signup") ||
      location.pathname.includes("signin")
    ) {
      setIsAuthRoute(true);
    } else {
      setIsAuthRoute(false);
    }
  }, [location]);

  return (
    <div className="App">
      {!isAuthRoute && <Navigation setShow={setShowWelcome} />}
      <WelcomeModal show={showWelcome} setShow={setShowWelcome} />
      <Routes>
        <Route path="/tasks/:category" element={<ToDoList />} />
        <Route path="categories" element={<Category />} />
        <Route path="signup" element={<SignUp/>} />
        <Route path="signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
