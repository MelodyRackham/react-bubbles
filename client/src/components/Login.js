import React from 'react';
import { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import styled from 'styled-components';

const Login = props => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const onChangeHandler = e => {
    return setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('http://localhost:5000/api/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('bubbles');
      })
      .catch(err => console.log(err));
  };
  return (
    <LoginPage>
      <h1> Login to see the Bubbles!! </h1>
      <LoginForm onSubmit={handleSubmit}>
        <input type='text' name='username' placeholder='username' onChange={onChangeHandler} />
        <input type='password' name='password' placeholder='password' onChange={onChangeHandler} />
        <LoginButton type='submit'>Log in</LoginButton>
      </LoginForm>
    </LoginPage>
  );
};

export default Login;

// styled components:

const LoginPage = styled.div`
  margin: 0 auto;
  background-color: lightblue;
`;

const LoginForm = styled.form`
  margin: 0 auto;
  padding-left: 150px;
`;

const LoginButton = styled.button`
  width: 40%;
  border-radius: 20px;
  margin-top: 20px;
`;
