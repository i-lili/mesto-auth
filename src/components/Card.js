import React from "react";

// Создаем функциональный компонент Card, который принимает объект card и функцию onCardClick
function Card({ card, onCardClick }) {
  // Функция для обработки клика по изображению карточки
  const handleClick = () => {
    onCardClick(card);
  };

  // Функция для обработки ошибки загрузки изображения карточки
  const handleImageError = (event) => {
    event.target.src =
      "https://via.placeholder.com/282x282.png?text=Image+not+found";
  };

  // Возвращаем JSX разметку для карточки
  return (
    <article className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
        onError={handleImageError}
      />
      <button
        type="button"
        className="element__trash"
        aria-label="Удалить"
      ></button>
      <div className="element__wrapper">
        <h2 className="element__name">{card.name}</h2>
        <div>
          <button
            type="button"
            className="element__like"
            aria-label="Лайк"
          ></button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
