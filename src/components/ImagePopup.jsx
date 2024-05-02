import React from 'react';

function ImagePopup (props) {
  const popupOpen = Object.is(JSON.stringify(props.card), JSON.stringify({})) ? ("") : ("popup_opened");

  return (
    <section className={`popup popup_background_black popup_type_picture ${popupOpen}`}>
      <div className="popup__image-frame">
        <img className="popup__image" src={props.card.link} alt={props.card.name}/>
        <button type="button" className="popup__close-icon" onClick={props.onClose} />
        <h2 className="popup__description">{props.card.name}</h2>
      </div>
    </section>
  )
}

export default ImagePopup;