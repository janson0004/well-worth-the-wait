import React from "react";
import styled from "styled-components/macro";
import Container from "@material-ui/core/Container";

const NotFound = () => {
  return (
    <Wrapper>
      <CustomContainer>
        <TextWrapper>
          <Title>Oh no! Get lost?</Title>
          <Desc>
            The page that you are looking for does not exist. We suggest going
            back to the previous page or home page
          </Desc>
        </TextWrapper>
      </CustomContainer>
    </Wrapper>
  );
};

export default NotFound;

const Wrapper = styled.div``;

const CustomContainer = styled(Container)`
  height: calc(100vh - 64px);

  &.MuiContainer-root {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const TextWrapper = styled.div``;

const Title = styled.h2`
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Desc = styled.p`
  font-size: 16px;
  font-weight: 500;
`;
