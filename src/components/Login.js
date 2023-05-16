import React, { useState } from "react";

// Создаем функциональный компонент Login, который принимает функцию onLogin в качестве пропса
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(email, password);
  };

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form onSubmit={handleSubmit} className="auth__form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="auth__input"
        />
        <input
          type="password"
          className="auth__form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          required
          className="auth__input"
        />
        <button type="submit" className="auth__submit-button">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
