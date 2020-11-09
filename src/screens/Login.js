import React, { useState } from "react";
import "../styles/index.css";

export default function Login({ email, setEmail, pass, setPass, handleLogin }) {
  const [error, setError] = useState(null);

  return (
    <div className="login">
      <h1 className="title">
        App<b>Title</b>
      </h1>
      <p className="error" style={{ color: "red" }}>
        {error}
      </p>
      <input
        type="text"
        placeholder="E-mail"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        style={{ margin: "20px 0 50px" }}
        value={pass}
        onChange={(event) => {
          setPass(event.target.value);
        }}
      />
      <button className="loginButton" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
