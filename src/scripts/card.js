import { cardTemplate } from '../index.js';

function createCard(cardName, cardLink, deleteCardHandler, likeCardHandler, openImageHandler) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardLink;
  cardImage.alt = cardName;
  cardTitle.textContent = cardName;
  
  cardDeleteButton.addEventListener('click', deleteCardHandler);
  cardLikeButton.addEventListener('click', likeCardHandler);
  cardImage.addEventListener('click', () => openImageHandler(cardName, cardLink));

  return cardElement;
}

function deleteCard(evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

function likeCard(evt) {
  const card = evt.target.closest('.card');
  const likeButton = card.querySelector('.card__like-button');
  likeButton.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeCard };