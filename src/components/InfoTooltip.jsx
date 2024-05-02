import React from "react";
import { useNavigate } from 'react-router-dom';

function InfoTooltip(props) {
  const navigate = useNavigate();
  let classOpen = props.isOpen ? ("popup_opened") : ("");

  function closedPopup() {
    if(props.isSucces) {
      props.closePopup();
      navigate('/sign-in', {replace: true})
    } else {
      props.closePopup();
    }
  }

  return(
    <section className={`popup popup_type_register ${classOpen}`}>
      <div className={"popup__container"}>
        <button type="button" className={"popup__close-icon"} onClick={closedPopup}/> 
        <img src={props.image} className={"popup__log-icon"} alt="Иконка регистрации"/>
        <h2 className={"log__title log__title_color_black"}>
          {props.title}
        </h2>
      </div>
    </section>
  )
}

export default InfoTooltip;