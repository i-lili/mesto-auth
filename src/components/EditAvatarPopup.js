import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  // Создаем ссылку на элемент <input> для аватара, используя хук useRef()
  const avatarInputRef = useRef();

  // Обработчик отправки формы
  function handleSubmit(e) {
    e.preventDefault();

    // Вызываем функцию onUpdateAvatar из пропсов и передаем ей объект с новым значением аватара
    onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  }
  
  // Возвращаем разметку компонента PopupWithForm с полем ввода ссылки на аватар
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      id="avatar-popup"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarInputRef}
        type="url"
        id="avatar"
        className="popup__input popup__input_item_avatar"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
      />
      <span id="avatar-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
