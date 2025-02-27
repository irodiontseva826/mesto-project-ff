import { cardTemplate } from '../index.js';
import { deleteLike, deleteUserCard, putLike } from './api.js';

function createCard(card, deleteCardHandler, likeCardHandler, openImageHandler, userId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardLikeCounter.textContent = card.likes.length;

  if(card.owner._id !== userId) {
    cardDeleteButton.style.display = 'none';
  }

  if(card.likes.some((user) => user._id === userId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }
  
  cardDeleteButton.addEventListener('click', () => deleteCardHandler(cardElement, card._id));
  cardLikeButton.addEventListener('click', () => likeCardHandler(cardLikeButton, cardLikeCounter, card._id));
  cardImage.addEventListener('click', () => openImageHandler(card.name, card.link));

  return cardElement;
}

function deleteCard(cardElement, cardId) {
  deleteUserCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function likeCard(likeButton, likeCounter, cardId) {
  if(!likeButton.classList.contains('card__like-button_is-active')) {
    putLike(cardId)
      .then((card) => {
        likeButton.classList.add('card__like-button_is-active');
        likeCounter.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  else {
    deleteLike(cardId)
      .then((card) => {
        likeButton.classList.remove('card__like-button_is-active');
        likeCounter.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export { createCard, deleteCard, likeCard };