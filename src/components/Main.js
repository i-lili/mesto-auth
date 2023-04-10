import React, { useState, useEffect } from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  // Объявляем состояния для имени пользователя, описания, аватара и карточек
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  // Хук useEffect для получения информации о пользователе и карточек при монтировании компонента
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
      ([userInfo, initialCards]) => {
        // Обновляем состояние с информацией о пользователе
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);

        // Обновляем состояние с карточками
        setCards(initialCards);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <main className="content">
      {/* profile */}
      <section className="profile">
        <div className="profile__wrapper">
          <div className="profile__avatar-wrapper">
            <img
              className="profile__avatar"
              src={userAvatar}
              alt="Аватар пользователя"
              style={{ backgroundImage: `url(${userAvatar})` }}
            />
            <button
              type="button"
              className="profile__avatar-edit-button"
              onClick={onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__inner-wrapper">
              <h1 className="profile__name">{userName}</h1>
              <button
                type="button"
                className="profile__edit-button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__about">{userDescription}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      {/* elements */}
      <section className="elements">
        {cards.map((card) => (
          // Для каждой карточки создаем компонент Card с уникальным ключом и передаем данные карточки и обработчик клика
          <Card key={card._id} card={card} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
