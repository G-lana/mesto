import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { api } from '../components/Api.js';
import {
  cardsList,
  popupProfileForm,
  popupCardForm,
  popupAvatarOpenButton,
  popupAvatarForm,
  popupProfileOpenButton,
  popupCardOpenButton,
  popupNameInputElement,
  popupJobInputElement,
  config,
} from '../utils/constants.js';

let userId;

Promise.all([api.getProfile(), api.getInitialCards()])

  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    userId = userData._id;
    renderCards.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });

const renderCards = new Section(cardsList, {
  renderer: (data) => {
    const card = new Card(
      {
        title: data.name,
        image: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id,
      },
      '.card-template',
      handleCardClick,
      (id) => {
        confirmPopup.open();
        confirmPopup.changeSubmitHandler(() => {
          api
            .deleteCard(id)
            .then(() => {
              card.deleteCard();
              confirmPopup.close();
            })
            .catch((err) => console.log(err));
        });
      },
      (id) => {
        if (card.isLiked()) {
          api
            .deleteLike(id)
            .then((res) => {
              card.setLikes(res.likes);
            })
            .catch((err) => console.log(err));
        } else {
          api
            .addLike(id)
            .then((res) => {
              card.setLikes(res.likes);
            })
            .catch((err) => console.log(err));
        }
      }
    );
    return card.generateCard();
  },
});

const popupAddCard = new PopupWithForm('#addCard', (data) => {
  popupAddCard.isLoading(true);
  api
    .addCard(data.title, data.image)
    .then((data) => {
      renderCards.addItem(data);
      popupAddCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAddCard.isLoading(false);
    });
});

const userInfo = new UserInfo({
  profileName: '.profile__title',
  profileJob: '.profile__job',
  profileAvatar: '.profile__avatar',
});

const popupEditProfile = new PopupWithForm('#editProfile', (data) => {
  popupEditProfile.isLoading(true);
  api
    .editProfile(data.name, data.job)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      popupEditProfile.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupEditProfile.isLoading(false);
    });
});
const popupEditAvatar = new PopupWithForm('#profileAvatar', (data) => {
  popupEditAvatar.isLoading(true);
  api
    .editAvatar(data.link)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      popupEditAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupEditAvatar.isLoading(false);
    });
});

const popupWithImage = new PopupWithImage('#cardImage');
popupWithImage.setEventListeners();
function handleCardClick(title, image) {
  popupWithImage.open(title, image);
}

const confirmPopup = new PopupWithForm('#deletionConfirmation');

popupProfileOpenButton.addEventListener('click', () => {
  popupEditProfile.open();
  const data = userInfo.getUserInfo();
  popupNameInputElement.value = data.name;
  popupJobInputElement.value = data.job;
  profileFormValidation.resetValidation();
});

popupCardOpenButton.addEventListener('click', () => {
  popupAddCard.open();
  cardFormValidation.resetValidation();
});

popupAvatarOpenButton.addEventListener('click', () => {
  popupEditAvatar.open();
  avatarFormValidation.resetValidation();
});

popupAddCard.setEventListeners();
popupEditProfile.setEventListeners();
confirmPopup.setEventListeners();
popupEditAvatar.setEventListeners();

const profileFormValidation = new FormValidator(config, popupProfileForm);
const cardFormValidation = new FormValidator(config, popupCardForm);
const avatarFormValidation = new FormValidator(config, popupAvatarForm);
profileFormValidation.enableValidation();
cardFormValidation.enableValidation();
avatarFormValidation.enableValidation();
