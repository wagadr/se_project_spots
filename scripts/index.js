const initialCards = [
  {

  name: "Golden Gate Bridge",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
{
  name: "Val Thorens",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
},
{
  name: "Restaurant terrace",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
},
{
  name: "An outdoor cafe",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
},
{
  name: "A very long bridge, over the forest and through the trees",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
},
{
  name: "Tunnel with morning light",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
},
{
  name: "Mountain house",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
}
];

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(".modal__close-button");
const profileFormElement = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector("#profile-name-input");
const editProfileDescriptionInput = editProfileModal.querySelector("#profile-description-input");

const newPostButton = document.querySelector(".profile__post-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
const addCardFormElement = newPostModal.querySelector(".modal__form");
const newPostNameInput = newPostModal.querySelector("#card-caption-input");
const newPostLinkInput = newPostModal.querySelector("#card-image-input");


const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(".profile__description");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseButton = previewModal.querySelector(".modal__close-button");
const previewImageElement = previewModal.querySelector(".modal__image");
const previewCaptionElement = previewModal.querySelector(".modal__caption");

const cardTemplate = document
 .querySelector("#card-template")
 .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");

   cardImageElement.src = data.link;
   cardTitleElement.alt = data.name;
   cardTitleElement.textContent = data.name;

  const cardLikedElement = cardElement.querySelector(".card__like-button");
  cardLikedElement.addEventListener("click", () => {
    cardLikedElement.classList.toggle("card__like-button_clicked")
  });

  const cardDeleteElement = cardElement.querySelector(".card__delete-button");
  cardDeleteElement.addEventListener("click", () => {
      cardElement.remove();
  });

  cardImageElement.addEventListener("click", () => {
    previewImageElement.src = data.link;
    previewCaptionElement.alt = data.name;
    previewCaptionElement.textContent = data.name;
    openModal(previewModal);
  });

  previewModalCloseButton.addEventListener("click", () => {
    closeModal(previewModal);
  });

  return cardElement;
};

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

newPostButton.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseButton.addEventListener("click", function () {
  closeModal(newPostModal);
});

editProfileButton.addEventListener("click", function () {
  editProfileNameInput.value = profileNameElement.textContent;
  editProfileDescriptionInput.value = profileDescriptionElement.textContent;
  openModal(editProfileModal);
});

editProfileCloseButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = editProfileNameInput.value;
  profileDescriptionElement.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
};

profileFormElement.addEventListener("submit", handleEditProfileSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  console.log(newPostNameInput.value, newPostLinkInput.value);
  const inputValues = getCardElement(data);
  const cardElmt = getCardElement(inputValues);
  cardsList.prepend(cardElmt);

  closeModal(newPostModal);

  evt.target.reset();
};

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach(function (item) {
  const cardElmt = getCardElement(item);
  cardsList.append(cardElmt);
});