import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoPath from '../images/svg/logo.svg';

function Header(props) {
  const navigate = useNavigate();
  const path = window.location.pathname;

  function onSignOut() {
    props.handleSignOut();
    navigate('/sign-in', {replace: true});
  }

  return (
    <header className="header">
      <img className="header__logo" src={logoPath} alt="Логотип 'место'." />
      {(path !== "/sign-in" && !props.isLoggedIn) && (<Link to="/sign-in" className="header__link">Войти</Link>)}
      {path === "/sign-in" && (<Link to="/sign-up" className="header__link">Регистрация</Link>)}
      {props.isLoggedIn && (<p className="header__email">{props.userEmail}</p>)}
      {props.isLoggedIn && (<button className="header__button" onClick={onSignOut}>Выйти</button>)}
    </header>
  )
}

export default Header;