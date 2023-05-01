import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/Api";

import "../index.css";

// Основной компонент приложения
function App() {
  // Объявление состояния для выбранной карточки
  const [selectedCard, setSelectedCard] = useState(null);

  // Объявление состояний для открытия и закрытия попапов (true - открыт, false - закрыт)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  // Объявление состояния для хранения данных текущего пользователя
  const [currentUser, setCurrentUser] = useState(null);

  // Объявление состояния для хранения списка карточек
  const [cards, setCards] = useState([]);

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

  // Эффект для получения информации о пользователе с помощью api.getUserInfo
  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Эффект для получения списка карточек с помощью api.getCardList
  useEffect(() => {
    api
      .getCardList()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Функция для обработки лайка и дизлайка карточки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  // Функция для удаления карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.error(err));
  }

  // Функция для обновления информации о пользователе
  const handleUpdateUser = (userInfo) => {
    api
      .editUserInfo(userInfo)
      .then((updatedUserInfo) => {
        setCurrentUser(updatedUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Функция для обновления аватара пользователя
  const handleUpdateAvatar = (newAvatar) => {
    api
      .updateAvatar(newAvatar.avatar)
      .then((updatedUserInfo) => {
        setCurrentUser(updatedUserInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  
  // Функция для добавления нового места
  const handleAddPlaceSubmit = (newPlace) => {
    api
      .addCard(newPlace)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    // Обертка корневого компонента в провайдер контекста
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <div className="page">
          <Header />
          <Main
            // передаем функции-обработчики событий в компонент Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            setCards={setCards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
          {/* popups */}
          {/* avatar-popup */}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          {/* edit-popup */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          {/* add-popup */}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

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
    </CurrentUserContext.Provider>
  );
}

export default App;
