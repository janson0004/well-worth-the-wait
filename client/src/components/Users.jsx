import React from "react";
import styled from "styled-components/macro";
import AdminService from "../services/AdminService";

const Users = ({ user }) => {
  const onClickDelete = (userId) => {
    AdminService.deletePlace(userId)
      .then((res) => {
        alert("Deteled successfully");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <Wrapper>
      <Name>{user.username}</Name>
      <FlexDiv>
        <Button>Edit</Button>
        <DeleteButton onClick={() => onClickDelete(user._id)}>
          Delete
        </DeleteButton>
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
