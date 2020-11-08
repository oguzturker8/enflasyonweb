import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./screens/Home";
import Login from "./screens/Login";
import fire from "./helpers/firebase";

export default function App() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = () => {
    fire
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  if (user) {
    return <Home handleLogout={handleLogout} />;
  } else {
    return (
      <Login
        email={email}
        setEmail={setEmail}
        pass={pass}
        setPass={setPass}
        setUser={setUser}
        handleLogin={handleLogin}
      />
    );
  }
}
