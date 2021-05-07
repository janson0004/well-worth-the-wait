import React from "react";
import styled from "styled-components/macro";
import ReactTimeAgo from "react-time-ago";

const Comment = ({ comment }) => {
  return (
    <Wrapper>
      <FlexWrapper>
        <Name>{comment.username}</Name>
        <Timespan>
          <ReactTimeAgo date={new Date(comment.created_time)} locale="en-US" />
        </Timespan>
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

const Timespan = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.mono.secondary};
`;

const Content = styled.span``;
