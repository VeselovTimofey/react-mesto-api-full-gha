import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

 class EditProfilePopup extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        name: '',
        profession: '',
        oldContext: this.context,
    }
  }

  static contextType = CurrentUserContext;

  componentDidUpdate(prevProps, prevState) {
    if (this.context !== prevState.oldContext || this.props.isOpen !== prevProps.isOpen) {
      this.setState({
        name: this.context.name,
        profession: this.context.about,
        oldContext: this.context,
      })
    } 
  } 

  handleChange(e) {
    const target = e.target.name;
    this.setState({[target]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.onUpdateUser({
      name : this.state.name,
      profession: this.state.profession, 
    })
  }

  render() {
    return (
      <PopupWithForm name="profile" title="Редактировать профиль" buttonName="Сохранить" isOpen={this.props.isOpen} onClose={this.props.onClose} onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" name="name" className="popup__input popup__input_value_name" value={this.state.name} onChange={this.handleChange.bind(this)} required />
        <span className="popup__input-error popup__input-error_value_name"></span>
        <input type="text" name="profession" className="popup__input popup__input_value_profession" value={this.state.profession} onChange={this.handleChange.bind(this)} required />
        <span className="popup__input-error popup__input-error_value_profession"></span>
      </PopupWithForm>
    )
  }
}

export default EditProfilePopup;