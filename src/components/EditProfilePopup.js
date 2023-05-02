import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Использование хуков состояния, для управления полями ввода в попапе
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Получение текущего пользователя из контекста
  const currentUser = useContext(CurrentUserContext);

  // Обновление управляемых компонентов при изменении текущего пользователя
  useEffect(() => {
    if (currentUser && isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    } else if (!isOpen && currentUser) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  // Обработчики изменения полей ввода
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();

    // Вызов функции onUpdateUser для обновления профиля
    onUpdateUser({
      name,
      about: description,
    });
  };

  // Компонент PopupWithForm с управляемыми компонентами и обработчиком отправки формы
  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      id="edit-popup"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="name"
        className="popup__input popup__input_item_name"
        name="name"
        placeholder="Жак-Ив Кусто"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={handleNameChange}
      />
      <span id="name-error" className="popup__error"></span>
      <input
        type="text"
        id="about"
        className="popup__input popup__input_item_about"
        name="about"
        placeholder="Исследователь океана"
        minLength="2"
        maxLength="200"
        required
        value={description}
        onChange={handleDescriptionChange}
      />
      <span id="about-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
