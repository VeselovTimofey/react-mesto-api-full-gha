import React from 'react';

function LogForm(props) {

  return(
    <div className={"log"}>
      <h1 className={"log__title"}>{props.title}</h1>
      <form className={"log__form"} onSubmit={props.onSubmit}>
        <input className={"log__form-input log__form-input_value_email"} type='email' placeholder='Email' name='email' value={props.valueEmail} onChange={props.onChange} required />
        <input className={"log__form-input log__form-input_value_password"} type='password' placeholder='Пароль' name='password' value={props.valuePassword} onChange={props.onChange} required />
        <button className={"log__form-button"} type='submit'>{props.buttonName}</button>
      </form>
    </div>
  )
}

export default LogForm;