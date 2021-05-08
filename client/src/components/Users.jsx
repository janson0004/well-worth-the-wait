import React from "react";
import styled from "styled-components/macro";
import AdminService from "../services/AdminService";

const Users = ({
  user,
  setShowModal,
  setSelectedUser,
  userInfo,
  setUserInfo,
}) => {
  const onClickDelete = () => {
    AdminService.deleteUser(user._id)
      .then((res) => {
        setUserInfo(userInfo.filter((item) => item._id !== user._id));
        console.log(res.data);
        alert("Deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editHandler = () => {
    setShowModal((prev) => !prev);
    setSelectedUser(user);
  };

  return (
    <Wrapper>
      <Name>{user.username}</Name>
      <FlexDiv>
        <Button onClick={editHandler}>Edit</Button>
        <DeleteButton onClick={onClickDelete}>Delete</DeleteButton>
      </FlexDiv>
    </Wrapper>
  );
};

export default Users;

const Wrapper = styled.div`
  padding: 30px;
  background-color: ${({ theme }) => theme.bg.main};
  border-radius: 12px;
  width: 384px;
  margin: 10px 20px;
  height: 211px;
`;

const Name = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 80px;
`;

const Button = styled.button`
  background-color: #4b4b4b;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.mono.contrast};
  padding: 9px 16px;
  border: none;
  border-radius: 12px;
`;

const DeleteButton = styled.button`
  background-color: #ff6868;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.mono.contrast};
  padding: 9px 16px;
  border: none;
  border-radius: 12px;
  margin-left: 10px;
`;

const FlexDiv = styled.div`
  display: flex;
`;
