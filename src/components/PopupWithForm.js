import { useEffect } from "react";

function PopupWithForm(props) {
  const resetForm = (formElement) => {
    if (formElement) {
      formElement.reset();
    }
  };

  // Обработчик клика на кнопку закрытия попапа
  const handleCloseButtonClick = (event) => {
    if (event.target.classList.contains("popup__close")) {
      resetForm(event.target.closest(".popup__form"));
      props.onClose();
    }
  };

  // Обработчик клика на оверлей попапа
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      resetForm(event.target.querySelector(".popup__form"));
      props.onClose();
    }
  };

  // useEffect для добавления и удаления обработчика нажатия клавиши Esc
  useEffect(() => {
    if (props.isOpen) {
      const handleEscPress = (event) => {
        if (event.key === "Escape") {
          props.onClose();
        }
      };
      
      document.addEventListener("keydown", handleEscPress);
      // Удаление обработчика события при размонтировании компонента
      return () => {
        document.removeEventListener("keydown", handleEscPress);
      };
    }
  }, [props.isOpen, props.onClose]);

  return (
    // Рендерим разметку попапа с динамическими классами и идентификатором
    <section
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_is-opened" : ""
      }`}
      id={props.id}
      onClick={handleOverlayClick}
    >
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <button
          type="button"
          className="popup__close"
          onClick={handleCloseButtonClick}
        ></button>
        {/* Рендерим форму с динамическим именем и передаем вложенные компоненты через props.children */}
        <form
          className="popup__form"
          name={props.name}
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button type="submit" className="popup__button">
            {props.buttonText || "Сохранить"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
