import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #1DB954;
  margin: 0;
`;

const Logo = styled.img`
  width: 450px;
  height: 200px;
  margin: 0;
`;

const Button = styled.button`
  padding: 15px 30px;
  background-color: black;
  color: #1DB954;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  margin: 20px 0;
  transition: all 0.3s ease-in-out;

  &:hover {
    padding: 16px 32px;
  }
`;

function Login() {
  return (
    <Container>
      <Logo src="https://i.redd.it/pfc670j9loha1.png" alt="Spotify Logo" />
      <Button>Login with Spotify</Button>
    </Container>
  );
}

export default Login;
