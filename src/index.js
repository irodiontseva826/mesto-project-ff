import './pages/index.css';
import { createCard, deleteCard, likeCard } from './scripts/card.js';
import { openModal, closeModal } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getInitialCards, getUserInfo, postNewCard, updateAvatar, updateUserInfo } from './scripts/api.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

const popupEditInfo = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');

const profileTitle = document.querySelector('.profile__title');
const profileDescr = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

const formProfile = document.forms['edit-profile'];
const nameInput = formProfile.name;
const jobInput = formProfile.description;

const formNewCard = document.forms['new-place'];
const placeInput = formNewCard['place-name'];
const linkInput = formNewCard.link;

const formNewAvatar = document.forms['new-avatar'];
const avatarInput = formNewAvatar.avatar;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

function openImagePopup(imageCaption, imageLink) {
  const image = popupImage.querySelector('.popup__image');
  const caption = popupImage.querySelector('.popup__caption');
  image.src = imageLink;
  image.alt = imageCaption;
  caption.textContent = imageCaption;
  openModal(popupImage);
}

function openEditInfoPopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescr.textContent;
  clearValidation(formProfile, validationConfig);
  openModal(popupEditInfo);
}

function openAddPopup() {
  formNewCard.reset();
  clearValidation(formNewCard, validationConfig);
  openModal(popupAdd);
}

function openEditAvatarPopup() {
  formNewAvatar.reset();
  clearValidation(formNewAvatar, validationConfig);
  openModal(popupEditAvatar);
}

function renderSaving(isSaving, button) {
  if(isSaving) {
    button.textContent = 'Сохранение...';
  }
  else {
    button.textContent = 'Сохранить';
  }
}

function formProfileSubmit(evt) {
  evt.preventDefault();
  const saveProfileButton = formProfile.querySelector('.popup__button');
  renderSaving(true, saveProfileButton);
  updateUserInfo(nameInput.value, jobInput.value)
    .then((userInfo) => {
      profileTitle.textContent = userInfo.name;
      profileDescr.textContent = userInfo.about;
      closeModal(popupEditInfo);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderSaving(false, saveProfileButton));
}

function formNewCardSubmit(evt) {
  evt.preventDefault();
  const saveNewCardButton = formNewCard.querySelector('.popup__button');
  renderSaving(true, saveNewCardButton);
  postNewCard(placeInput.value, linkInput.value)
    .then((card) => {
      cardsList.prepend(createCard(card, deleteCard, likeCard, openImagePopup, card.owner._id));
      formNewCard.reset();
      closeModal(popupAdd);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderSaving(false, saveNewCardButton));
}

function formNewAvatarSubmit(evt) {
  evt.preventDefault();
  const saveNewAvatarButton = formNewAvatar.querySelector('.popup__button');
  renderSaving(true, saveNewAvatarButton);
  updateAvatar(avatarInput.value)
    .then((data) => {
      profileAvatar.style = `background-image: url(${data.avatar});`;
      closeModal(popupEditAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderSaving(false, saveNewAvatarButton));
}

profileEditButton.addEventListener('click', openEditInfoPopup);
formProfile.addEventListener('submit', formProfileSubmit);

cardAddButton.addEventListener('click', openAddPopup);
formNewCard.addEventListener('submit', formNewCardSubmit);

profileAvatar.addEventListener('click', openEditAvatarPopup);
formNewAvatar.addEventListener('submit', formNewAvatarSubmit)

document.querySelectorAll('.popup').forEach((popup) => {
  popup.classList.add('popup_is-animated');
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
      closeModal(popup);
    }
  });
});

const setUserInfo = (user) => {
  profileTitle.textContent = user.name;
  profileDescr.textContent = user.about;
  profileAvatar.style = `background-image: url(${user.avatar});`;
};

const setCards = (cards, userId) => {
  cards.forEach((card) => {
    cardsList.append(createCard(card, deleteCard, likeCard, openImagePopup, userId));
  });
};

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, cards]) => {
    setUserInfo(userInfo);
    setCards(cards, userInfo._id);
  })
  .catch((err) => {
    console.log(err);
  });

export { cardTemplate };