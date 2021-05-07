import React from "react";
import styled from "styled-components/macro";

const Comment = ({ comment }) => {
  return (
    <Wrapper>
      <FlexWrapper>
        <Name>{comment.username}</Name>
        <Timespan>5 mins ago</Timespan>
      </FlexWrapper>
      <Content>{comment.message}</Content>
    </Wrapper>
  );
};

export default Comment;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bg.main};
  padding: 20px 20px;
  border-radius: 12px;
  margin-bottom: 10px;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Name = styled.span`
  display: block;
  font-size: 18px;
  font-weight: 600;
  margin-right: 16px;
`;

const Timespan = styled.span``;

const Content = styled.span``;
