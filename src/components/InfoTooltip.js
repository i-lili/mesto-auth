import React from "react";
import SuccessIcon from "../images/success-icon.svg";
import ErrorIcon from "../images/error-icon.svg";

// Создаем компонент InfoTooltip, который принимает три пропа: isOpen, onClose и isSuccess
function InfoTooltip({ isOpen, onClose, isSuccess }) {
  // Возвращаем разметку
  return (
    <section
      // Динамически меняем классы в зависимости от состояния isOpen
      className={`popup popup_type_infoTooltip ${
        isOpen ? "popup_is-opened" : ""
      }`}
      onClick={onClose}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        {/* В зависимости от значения isSuccess показываем сообщение об успехе или об ошибке */}
        {isSuccess ? (
          <>
            <img
              src={SuccessIcon}
              alt="success"
              className="auth__tooltip-icon"
            />
            <p className="auth__tooltip-text">Вы успешно зарегистрировались!</p>
          </>
        ) : (
          <>
            <img src={ErrorIcon} alt="error" className="auth__tooltip-icon" />
            <p className="auth__tooltip-text">
              Что-то пошло не так! Попробуйте ещё раз.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export default InfoTooltip;
