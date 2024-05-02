import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const inputAvatarRef = React.useRef();

  React.useEffect(() => {
    inputAvatarRef.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputAvatarRef.current.value,
    })
  }

  return (
    <PopupWithForm name="change-avatar" title="Обновить аватар" buttonName="Сохранить" isMedium={true} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input type="url" name="link" placeholder="Ссылка на картинку" className="popup__input popup__input_value_image" ref={inputAvatarRef} required />
      <span className="popup__input-error popup__input-error_value_link"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;