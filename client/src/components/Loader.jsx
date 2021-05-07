import React, { useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled, { ThemeContext } from "styled-components/macro";

// Loader animation
const Loader = () => {
  const theme = useContext(ThemeContext);

  return (
    <Wrapper>
      <ClipLoader color={theme.theme.main} />
    </Wrapper>
  );
};

export default Loader;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
