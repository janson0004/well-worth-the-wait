import React, { useState, useContext } from "react";
import Navigation from "../components/Navigation";
import styled from "styled-components/macro";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { TextField } from "@material-ui/core";
import { AuthContext } from "../contexts/AuthContext";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

const Login = (setLoading) => {
  const [usernames, setUsernames] = useState({
    username: "",
  });
  const [passwords, setPasswords] = useState({
    password: "",
  });
  const { setAuth } = useContext(AuthContext);
  const history = useHistory();
  const Login = (usernames, passwords) => {
    axios
      .post(
        "/user/login",
        { password: passwords, username: usernames },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // If user successfully logged in, setAuth to save the user information and redirect to the home page
        setAuth(response.data);
        history.push("/");
      })
      .catch((error) => {
        //If the email / password is wrong, pop up an alert
        alert("Login Failed. Try Again.");
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(usernames.username);
    console.log(passwords.password);
    Login(usernames.username, passwords.password);
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
                onChange={(e) =>
                  setUsernames({ ...usernames, username: e.target.value })
                }
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
                onChange={(e) =>
                  setPasswords({ ...passwords, password: e.target.value })
                }
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
  font-family: "Roboto";
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
