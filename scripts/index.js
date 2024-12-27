// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardName, cardLink) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = cardLink;
  cardElement.querySelector('.card__image').alt = cardName;
  cardElement.querySelector('.card__title').textContent = cardName;
  
  cardDeleteButton.addEventListener('click', deleteCard);

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  cardsList.append(createCard(card.name, card.link));
});
