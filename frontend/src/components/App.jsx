import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRouteElement from '../utils/ProtectedRoute';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Register from './Register';
import Login from './Login';
import Footer from './Footer';
import mestoApi from '../utils/api';
import mestoApiAuth from '../utils/apiAuth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      isRegisterPopupOpen: false,
      isLoggedIn: false,
      isSuccesRegister: false,
      userEmail: '',
      selectedCard: {},
      currentUser: {},
      cards: [],
    }
  }

  componentDidMount() {
    this.verificationUser();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isLoggedIn === true && prevState.isLoggedIn === false) {
      this.getUserAndCardInformation();
    }
  }

  getUserAndCardInformation() {
    Promise.all([mestoApi.getUserInfo(), mestoApi.getFirstCards()])
      .then(([newUserInfo, firstCards]) => {
        this.setState({cards: firstCards.data.reverse()})
        this.setState({currentUser: newUserInfo.data})
      })
      .catch(console.error)
  }

  verificationUser() {
    if (this.state.isLoggedIn) {
      mestoApiAuth.verification()
        .then((data) => {
          if(data) {
            this.setState({
              isLoggedIn: true,
              userEmail: data.data.email,
            })
          }
        })
        .catch(console.error)
    }
  }

  handleEditAvatarClick = () => {
    this.setState({isEditAvatarPopupOpen: true});
  }

  handleEditProfileClick = () => {
    this.setState({isEditProfilePopupOpen: true});
  }

  handleAddPlaceClick = () => {
    this.setState({isAddPlacePopupOpen: true});
  }

  handleCardClick = (cardInfo) => {
    this.setState({selectedCard: cardInfo});
  }

  closeAllPopups = () => {
    this.setState({
      isEditAvatarPopupOpen: false,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isRegisterPopupOpen: false,
      selectedCard: {},
    })
  }

  handleCardLike = (cardInfo) => {
    const isLiked = cardInfo.likes.some(i => i === this.state.currentUser._id);
    if (isLiked) {
      mestoApi.deleteLike(cardInfo._id)
        .then((newCard) => {this.setState((state) => {
          return {cards: state.cards.map((card) => card._id === cardInfo._id ? newCard.data : card)}
        })})
        .catch(console.error)
    } else {
      mestoApi.putLike(cardInfo._id)
        .then((newCard) => {this.setState((state) => {
          return {cards: state.cards.map((card) => card._id === cardInfo._id ? newCard.data : card)}
        })})
        .catch(console.error)
    }
  }

  handleCardDelete = (cardInfo) => {
    mestoApi.deleteCard(cardInfo._id)
      .then(() => {this.setState((state) => {
        return {cards: state.cards.filter((card) => card._id !== cardInfo._id)}
      })})
      .catch(console.error)
  }

  handleUpdateUser(newUserValue) {
    mestoApi.patchUserInfo(newUserValue)
      .then((userInfo) => {this.setState({currentUser: userInfo.data})})
      .then(() => {this.closeAllPopups()})
      .catch(console.error)
  }

  handleUpdateAvatar(newAvatarValue) {
    mestoApi.changeAvatar(newAvatarValue)
      .then((newAvatar) => {this.setState({currentUser: newAvatar.data})})
      .then(() => {this.closeAllPopups()})
      .catch(console.error)
  }

  handleAddPlaceSubmit(newPlace) {
    mestoApi.postNewCard(newPlace)
      .then((place) => {this.setState({cards: [place.data, ...this.state.cards]})})
      .then(() => {this.closeAllPopups()})
      .catch(console.error)
  }

  handleAuthorizationUser(dataUser) {
    mestoApiAuth.signin(dataUser)
      .then(() => {
        this.setState({
          userEmail: dataUser.email,
          isLoggedIn: true,
        });
      })
      .catch(console.error)
  }

  handleRegister(newUser) {
    mestoApiAuth.signup(newUser)
      .then((res) => {
        if(res) {
          this.setState({isSuccesRegister: true})
        }
      })
      .catch((error) => {
        console.log(error)
        this.setState({isSuccesRegister: false})
      })
    this.setState({isRegisterPopupOpen: true})
  }

  handleSignOut() {
    this.setState({
      isLoggedIn: false,
      userEmail: '',
    })
  }

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <Header
          isLoggedIn={this.state.isLoggedIn}
          userEmail={this.state.userEmail}
          handleSignOut={this.handleSignOut.bind(this)}
        />
        <Routes>
          <Route path="/" element={<ProtectedRouteElement 
            element={Main} 
            isLoggedIn={this.state.isLoggedIn}
            openEditProfilePopup={this.handleEditProfileClick}
            openAddPlacePopup={this.handleAddPlaceClick}
            openEditAvatarPopup={this.handleEditAvatarClick}
            onCardClick={this.handleCardClick}
            onCardLike={this.handleCardLike}
            onCardDelete={this.handleCardDelete}
            cards={this.state.cards}
            isEditProfilePopupOpen={this.state.isEditProfilePopupOpen}
            onUpdateUser={this.handleUpdateUser.bind(this)}
            isAddPlacePopupOpen={this.state.isAddPlacePopupOpen}
            onAddPlace={this.handleAddPlaceSubmit.bind(this)}
            isEditAvatarPopupOpen={this.state.isEditAvatarPopupOpen}
            onUpdateAvatar={this.handleUpdateAvatar.bind(this)}
            card={this.state.selectedCard}
            onClose={this.closeAllPopups}
          />} /> 
          <Route path="/sign-up" element={<Register
            onRegister={this.handleRegister.bind(this)}
            onClose={this.closeAllPopups}
            isSucces={this.state.isSuccesRegister}
            isOpen={this.state.isRegisterPopupOpen}
          />} />
          <Route path="*" element={
            <Login
              onAuthorizationUser={this.handleAuthorizationUser.bind(this)}
              verificationUser={this.verificationUser.bind(this)}
              isLoggedIn={this.state.isLoggedIn}
            />}
          />
        </Routes>
        <Footer />
      </CurrentUserContext.Provider>
    )
  }
}

export default App;