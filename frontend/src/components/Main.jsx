import React from 'react';
import editButtonPath from '../images/svg/edit-button.svg';
import addButtonPath from '../images/svg/add-button.svg';
import Card from './Card.jsx';
import EditProfilePopup from './EditProfilePopup';
import PopupWithForm from './PopupWithForm';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

class Main extends React.Component {
  static contextType = CurrentUserContext;

  render() {
    return (
      <main className="content">
        <section className="profile">
          <button className="profile__avatar-button" onClick={this.props.openEditAvatarPopup} />
          <img className="profile__avatar" alt="Аватар пользователя." src={this.context.avatar ? this.context.avatar : undefined} />
          <div className="profile__info">
            <h1 className="profile__name">{this.context.name}</h1>
            <p className="profile__profession">{this.context.about}</p>
            <button className="profile__edit-button" type="button" onClick={this.props.openEditProfilePopup}>
              <img className="profile__edit-vector" src={editButtonPath} alt="Кнопка изменения параметров пользователя." />
            </button>
          </div>
          <button className="profile__add-button" type="button" onClick={this.props.openAddPlacePopup}>
            <img className="profile__add-vector" src={addButtonPath} alt="Кнопка добавления элемента." />
          </button>
        </section>
        <section className="elements" aria-label="Карточки мест.">
          {this.props.cards.map((cardInfo, i) => (
            <Card
             cardInfo={cardInfo}
             onCardClick={this.props.onCardClick}
             onCardLike={this.props.onCardLike}
             onCardDelete={this.props.onCardDelete}
             key={cardInfo._id}
            />
          ))}
        </section>
        <EditProfilePopup
          isOpen={this.props.isEditProfilePopupOpen}
          onClose={this.props.onClose}
          onUpdateUser={this.props.onUpdateUser}
        />
        <AddPlacePopup 
          isOpen={this.props.isAddPlacePopupOpen}
          onClose={this.props.onClose}
          onAddPlace={this.props.onAddPlace}
        />
        <EditAvatarPopup
          isOpen={this.props.isEditAvatarPopupOpen}
          onClose={this.props.onClose}
          onUpdateAvatar={this.props.onUpdateAvatar}
        />
        <ImagePopup
          card={this.props.card}
          onClose={this.props.onClose}
        />
        <PopupWithForm 
          name="delete-card" 
          title="Вы уверены?" 
          buttonName="Да" 
          isSmall={true} 
          onClose={this.props.onClose}
        />
      </main>
    )
  }
}

export default Main;