import React from 'react';

function PopupWithForm (props) {
  const containerSize = `${props.isMedium ? ("popup__container_size_medium") : ("")}
                         ${props.isSmall ? ("popup__container_size_small") : ("")}`;
  const titleSize = `${props.isMedium ? ("popup__title_size_medium") : ("")}
                     ${props.isSmall ? ("popup__title_size_small") : ("")}`;
  const classOpen = props.isOpen ? ("popup_opened") : ("");

  return (
    <section className={`popup popup_type_${props.name} ${classOpen}`}>
      <div className={`popup__container ${containerSize}`}>
        <button type="button" className="popup__close-icon" onClick={props.onClose} />
        <h2 className={`popup__title  ${titleSize}`}>{props.title}</h2>
        <form name={props.name} className="popup__form" onSubmit={props.onSubmit}>
          {props.children}
          <button type="submit" className="popup__button">{props.buttonName}</button>
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm;