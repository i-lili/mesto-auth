import { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

import api from "../utils/Api";

import "../index.css";

function App() {
  // Состояние для выбранной карточки
  const [selectedCard, setSelectedCard] = useState(null);

  // Состояния для контроля отображения попапов (true - открыт, false - закрыт)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  // Функция для открытия попапа редактирования аватара
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  // Функция для открытия попапа редактирования профиля
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  // Функция для открытия попапа добавления нового места
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  // Функция для закрытия всех попапов и сброса выбранной карточки
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  // Функция для обработки клика на карточку
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  return (
    <div className="page__container">
      <div className="page">
        <Header />
        <Main
          // передаем функции-обработчики событий в компонент Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        {/* popups */}
        {/* avatar-popup */}
        <PopupWithForm
          title="Обновить аватар"
          name="avatar"
          id="avatar-popup"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          buttonText="Сохранить"
        >
          <input
            type="url"
            id="avatar"
            className="popup__input popup__input_item_avatar"
            name="avatar"
            placeholder="Ссылка на аватар"
            required
          />
          <span id="avatar-error" className="popup__error"></span>
        </PopupWithForm>

        {/* edit-popup */}
        <PopupWithForm
          title="Редактировать профиль"
          name="edit"
          id="edit-popup"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          buttonText="Сохранить"
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
          />
          <span id="about-error" className="popup__error"></span>
        </PopupWithForm>

        {/* add-popup */}
        <PopupWithForm
          title="Новое место"
          name="add"
          id="add-popup"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          buttonText="Создать"
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
          />
          <span id="title-error" className="popup__error"></span>
          <input
            type="url"
            id="link"
            className="popup__input popup__input_item_link"
            name="link"
            placeholder="Ссылка на картинку"
            required
          />
          <span id="link-error" className="popup__error"></span>
        </PopupWithForm>

        {/* delete-popup */}
        <PopupWithForm
          title="Вы уверены?"
          name="delete"
          id="delete-popup"
          onClose={closeAllPopups}
          buttonText="Да"
        ></PopupWithForm>

        {/* image-popup */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </div>
  );
}

export default App;
