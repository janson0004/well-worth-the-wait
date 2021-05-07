import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import Overlay from "./Overlay";
import TextField from "@material-ui/core/TextField";
import AdminService from "../services/AdminService";

const EditUserModal = ({
  showModal,
  setShowModal,
  selectedUser,
  userInfo,
  setUserInfo,
}) => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  useEffect(() => {
    setUsernameInput(selectedUser.username);
    setPasswordInput(selectedUser.password);
  }, [selectedUser]);

  const saveEditHandler = () => {
    const data = {
      username: usernameInput,
      password: passwordInput,
    };
    AdminService.editUser(selectedUser._id, {
      ...data,
      userId: selectedUser._id,
    })
      .then((res) => {
        console.log(res.data);
        setUserInfo(
          userInfo.map((user) => {
            if (user._id === selectedUser._id) {
              return { ...user, ...data };
            }
            return user;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
    setShowModal(false);
  };

  return (
    <>
      <Overlay showModal={showModal} setShowModal={setShowModal} />
      <Wrapper showModal={showModal}>
        <Card showModal={showModal}>
          <Title>Edit user</Title>
          <CustomTextField
            small={false}
            variant="filled"
            label="New username"
            InputProps={{ disableUnderline: true }}
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
          <CustomTextField
            small={false}
            variant="filled"
            label="New password"
            InputProps={{ disableUnderline: true }}
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />

          <Button onClick={saveEditHandler}>Save</Button>
        </Card>
      </Wrapper>
    </>
  );
};

export default EditUserModal;

const Wrapper = styled.div`
  position: absolute;
  bottom: 50%;
  left: 50%;
  z-index: 3000;
  width: 100%;
  transform: translate(-50%, 50%);
  padding: 20px;
  opacity: ${(props) => (props.showModal ? "100%" : "0%")};
  pointer-events: none;
  transition: all 300ms cubic-bezier(0.18, 0.89, 0.43, 1.19);
`;

const Card = styled.div`
  max-width: 370px;
  background-color: ${({ theme }) => theme.bg.tinted};
  border-radius: 12px;
  padding: 40px 30px;
  margin-left: auto;
  margin-right: auto;
  pointer-events: ${(props) => (props.showModal ? "all" : "none")};
`;

const Title = styled.span`
  display: block;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 30px;
  color: ${({ theme }) => theme.mono.primary};
`;

const Button = styled.button`
  display: block;
  padding: 8px 15px;
  background-color: ${({ theme }) => theme.theme.main};
  border: none;
  outline: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  margin-top: 10px;
  margin-left: auto;
  margin-right: left;
  color: white;
  cursor: pointer;
`;

const CustomTextField = styled(TextField)`
  width: ${(props) => (props.small ? "48%" : "100%")};

  .MuiInputBase-root.MuiFilledInput-root.MuiInputBase-formControl {
    border-radius: 12px;
    margin-bottom: 8px;
  }

  .MuiInputBase-input.MuiFilledInput-input.MuiInputBase-inputMultiline.MuiFilledInput-inputMultiline {
    color: ${({ theme }) => theme.mono.secondary};
  }
`;
