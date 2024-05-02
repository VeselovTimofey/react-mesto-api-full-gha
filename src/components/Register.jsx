import React from 'react';
import { Link } from 'react-router-dom';
import LogForm from './LogForm';
import InfoTooltip from './InfoTooltip';
import SuccessIcon from "../images/svg/success.svg";
import NotSuccessIcon from "../images/svg/notSuccess.svg";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  handleChange(e) {
    const target = e.target.name;
    this.setState({[target]: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    const newUser = {
      password: this.state.password,
      email: this.state.email
    }

    this.props.onRegister(newUser);
  }

  render() {
    return(
      <div>
        <LogForm 
          title="Регистрация"
          buttonName="Зарегистрироваться"
          valueEmail={this.state.email}
          valuePassword={this.state.password}
          onChange={this.handleChange.bind(this)}
          onSubmit={this.handleSubmit.bind(this)}
        />
        <Link to="/sign-in" className={"log__link"}>Уже зарегистрированы? Войти</Link>
        <InfoTooltip
          isOpen={this.props.isOpen}
          isSucces={this.props.isSucces}
          title={this.props.isSucces ? ("Вы успешно зарегистрировались!") : ("Что-то пошло не так! Попробуйте ещё раз.")}
          image={this.props.isSucces ? (SuccessIcon) : (NotSuccessIcon)}
          closePopup={this.props.onClose}
        />
      </div>
    )
  }
}

export default Register;