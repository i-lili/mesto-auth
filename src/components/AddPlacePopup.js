import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

// Создание функционального компонента AddPlacePopup
function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  // Использование хуков useRef для получения доступа к значению полей ввода
  const titleRef = useRef();
  const linkRef = useRef();

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращение обновления страницы при отправке формы

    // Вызов функции onAddPlace с объектом, содержащим название и ссылку на изображение
    onAddPlace({
      name: titleRef.current.value,
      link: linkRef.current.value,
    });
  };

  // Рендер компонента PopupWithForm с пропсами и дочерними элементами
  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      id="add-popup"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <input
        ref={titleRef}
        type="text"
        id="title"
        className="popup__input popup__input_item_title"
        name="title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span id="title-error" className="popup__error"></span>
      <input
        ref={linkRef}
        type="url"
        id="link"
        className="popup__input popup__input_item_link"
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="link-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
