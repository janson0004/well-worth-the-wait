import React, { useState, useContext } from "react";
import styled from "styled-components/macro";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { TextField } from "@material-ui/core";
import { AuthContext } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import UserService from "../services/UserService";

const Login = ({ setShowSidebar }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useContext(AuthContext);
  const history = useHistory();
  const Login = () => {
    UserService.login({ username, password })
      .then((response) => {
        // If user successfully logged in, setAuth to save the user information and redirect to the home page
        setAuth(response.data);
        setShowSidebar(true);
        history.push("/");
      })
      .catch((error) => {
        //If the email / password is wrong, pop up an alert
        alert("Login Failed. Try Again.");
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    Login();
  };
  return (
    <Container>
      <Wrapper>
        <CenterDiv>
          <LoginForm method="POST" onSubmit={submitHandler}>
            <Title>Login</Title>
            <BlockDiv>
              <CustomTextField
                required
                id="username"
                name="username "
                label="Username"
                variant="filled"
                InputProps={{ disableUnderline: true }}
                onChange={(e) => setUsername(e.target.value)}
              />
            </BlockDiv>
            <BlockDiv>
              <CustomTextField
                required
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="filled"
                InputProps={{ disableUnderline: true }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </BlockDiv>

            <LoginBar>Login</LoginBar>
          </LoginForm>
        </CenterDiv>
      </Wrapper>
    </Container>
  );
};

export default Login;

const Wrapper = styled(Row)`
  height: 80vh;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenterDiv = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.mono.primary};
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 17px;
`;
const LoginForm = styled.form`
  display: block;
`;

const LoginBar = styled.button`
  width: 76px;
  height: 37px;
  background-color: ${({ theme }) => theme.theme.main};
  color: ${({ theme }) => theme.mono.contrast};
  border: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  margin-top: 17px;
`;

const CustomTextField = styled(TextField)`
  .MuiInputBase-root.MuiFilledInput-root.MuiInputBase-formControl {
    background-color: ${({ theme }) => theme.bg.shaded};
    color: ${({ theme }) => theme.mono.secondary};
    border-radius: 14px;
    width: 246px;
  }
`;

const BlockDiv = styled.div`
  display: block;
  margin-bottom: 8px;
`;
