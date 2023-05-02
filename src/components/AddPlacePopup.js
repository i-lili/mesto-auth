import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

// Создание функционального компонента AddPlacePopup
function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  // Инициализация состояний для значений инпутов
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращение обновления страницы при отправке формы

    // Вызов функции onAddPlace с объектом, содержащим название и ссылку на изображение
    onAddPlace({
      name: title,
      link: link,
    });
  };

  // Обработчики изменения инпутов
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  // Очистка значений инпутов при открытии попапа
  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setLink("");
    }
  }, [isOpen]);

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
        type="text"
        id="title"
        className="popup__input popup__input_item_title"
        name="title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={title}
        onChange={handleTitleChange}
      />
      <span id="title-error" className="popup__error"></span>
      <input
        type="url"
        id="link"
        className="popup__input popup__input_item_link"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span id="link-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
