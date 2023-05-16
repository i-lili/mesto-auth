import React, { useState } from "react";
import { Link } from "react-router-dom";

// Определение функционального компонента Register, который принимает функцию onRegister в качестве пропса
function Register({ onRegister }) {
  // Инициализация состояний для email и password с помощью хука useState.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Обработчик события для формы, который будет вызываться при нажатии кнопки "submit"
  const handleSubmit = (event) => {
    // Предотвращение стандартного поведения формы.
    event.preventDefault();
    // Вызов функции onRegister с введенными email и password в качестве аргументов
    onRegister(email, password);

    // Установка состояний email и password обратно в пустые строки.
    setEmail("");
    setPassword("");
  };

  // Возвращение JSX разметки
  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
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
          Зарегистрироваться
        </button>
        <p className="auth__alternative">
          Уже зарегистрированы?{" "}
          <Link to="/sign-in" className="auth__alternative-link">
            Войти
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
