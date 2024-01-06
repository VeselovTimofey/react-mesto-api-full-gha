import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogForm from './LogForm';

function Login(props) {
  const navigate = useNavigate();
  const [logInfo, setLogInfo] = React.useState({
    email: '',
    password: '',
  });

  React.useEffect(() => {
    if(props.isLoggedIn) {
      navigate("/", {replace: true})
    }
  }, [props.isLoggedIn])

  function handleChange(e) {
    const {name, value} = e.target;
    setLogInfo({
      ...logInfo,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAuthorizationUser({
      password: logInfo.password,
      email: logInfo.email
    })
  }
  
  return(
    <LogForm
      title="Вход"
      buttonName="Войти"
      valueEmail={logInfo.email}
      valuePassword={logInfo.password}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  )
}

export default Login;