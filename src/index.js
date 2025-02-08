import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, likeCard } from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const profileTitle = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description');

const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

const formProfile = document.forms['edit-profile'];
const nameInput = formProfile.name;
const jobInput = formProfile.description;
const formNewCard = document.forms['new-place'];
const placeInput = formNewCard['place-name'];
const linkInput = formNewCard.link;

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescr.textContent = jobInput.value;
  closeModal(popupEdit);
}

function addNewCard(evt) {
  evt.preventDefault();
  cardsList.prepend(createCard(placeInput.value, linkInput.value, deleteCard, likeCard, openImagePopup));
  placeInput.value = '';
  linkInput.value = '';
  closeModal(popupAdd);
}

function openImagePopup(imageCaption, imageLink) {
  const image = popupImage.querySelector('.popup__image');
  const caption = popupImage.querySelector('.popup__caption');
  image.src = imageLink;
  image.alt = imageCaption;
  caption.textContent = imageCaption;
  openModal(popupImage);
}

formProfile.addEventListener('submit', handleFormSubmit);

formNewCard.addEventListener('submit', addNewCard);

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescr.textContent;
  openModal(popupEdit);
});

cardAddButton.addEventListener('click', () => {
  placeInput.value = '';
  linkInput.value = '';
  openModal(popupAdd);
});

document.querySelectorAll('.popup').forEach((popup) => {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
      closeModal(popup);
    }
  });
});

initialCards.forEach((card) => {
  cardsList.append(createCard(card.name, card.link, deleteCard, likeCard, openImagePopup));
});








export { cardTemplate };