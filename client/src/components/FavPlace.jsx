import React from "react";
import styled from "styled-components/macro";

const FavPlace = ({ restaurant }) => {
  return (
    <Wrapper>
      <Name>{restaurant.name}</Name>
      <Address>{restaurant.address}</Address>
      <Button>View more</Button>
    </Wrapper>
  );
};

export default FavPlace;

const Wrapper = styled.div`
  padding: 30px;
  background-color: ${({ theme }) => theme.bg.main};
  border-radius: 12px;
  max-width: 384px;
  margin: 10px 20px;
`;

const Name = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
`;

const Address = styled.span`
  font-size: 16px;
  font-weight: 500;
  display: block;
  margin-bottom: 12px;
  margin-bottom: 30px;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.theme.main};
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.mono.contrast};
  padding: 9px 16px;
  border: none;
  border-radius: 12px;
`;
