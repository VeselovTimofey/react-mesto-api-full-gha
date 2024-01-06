import React from 'react';
import PopupWithForm from './PopupWithForm';

class AddPlacePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      link: '',
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      this.setState({
        name: '',
        link: '',
      })
    }
  }

  handleChange(e) {
    const target = e.target.name;
    this.setState({[target]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.onAddPlace({
      name: this.state.name,
      link: this.state.link,
    })
  }

  render() {
    return (
      <PopupWithForm name="add-card" title="Новое место" buttonName="Создать" isOpen={this.props.isOpen} onClose={this.props.onClose} onSubmit={this.handleSubmit.bind(this)}>
        <input type="text" name="name" placeholder="Название" className="popup__input popup__input_value_place" value={this.state.name} onChange={this.handleChange.bind(this)} required />
        <span className="popup__input-error popup__input-error_value_name"></span>
        <input type="url" name="link" placeholder="Ссылка на картинку" className="popup__input popup__input_value_image" value={this.state.link} onChange={this.handleChange.bind(this)} required />
        <span className="popup__input-error popup__input-error_value_link"></span>
      </PopupWithForm>
    )
  }
}

export default AddPlacePopup;