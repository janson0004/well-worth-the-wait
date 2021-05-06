import React from "react";
import Navigation from "../components/Navigation";
import styled from "styled-components/macro";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { TextField } from "@material-ui/core";

const Login = () => {
  return (
    <Container>
      <Navigation />
      <Wrapper>
        <CenterDiv>
          <LoginForm method="POST">
            <Title>Login</Title>
            <BlockDiv>
              <CustomTextField
                required
                id="username"
                name="Username "
                label="Username"
                InputProps={{ disableUnderline: true }}
              />
            </BlockDiv>
            <BlockDiv>
              <CustomTextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                InputProps={{ disableUnderline: true }}
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
  color: #000000;
  font-size: 30px;
  font-weight: 700;
  font-family: "roboto";
  margin-bottom: 17px;
`;
const LoginForm = styled.form`
  display: block;
`;

const LoginBar = styled.button`
  width: 76px;
  height: 37px;
  background-color: #7d68ff;
  color: #ffffff;
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
  background-color: #eff0f1;
  width: 246px;
  color: #787878;
  border-radius: 12px;
  margin-top: 8px;
`;

const BlockDiv = styled.div`
  margin-bottom: 8px;
  background-color: #eff0f1;
  padding-left: 17px;
  padding-right: 17px;
`;
