import React from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Navigation = () => {
  return (
    <Wrapper>
      <CustomNavbar expand="lg">
        <CustomContainer>
          <Navbar.Brand>
            <Brand>Restaurants</Brand>
          </Navbar.Brand>
        </CustomContainer>
      </CustomNavbar>
    </Wrapper>
  );
};

export default Navigation;

const Wrapper = styled.div``;

const CustomNavbar = styled(Navbar)`
  padding-top: 20px;
  padding-bottom: 10px;
  position: relative;
  z-index: 1000;
  box-shadow: 0 2px 2px -2px ${({ theme }) => theme.divider.main};

  .navbar-brand {
    display: flex;
    align-items: center;
  }

  .navbar-toggler {
    color: white;
    border: none;
  }

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 1)' stroke-linecap='square' stroke-miterlimit='10' stroke-width='3' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  }
`;

const CustomContainer = styled(Container)`
  position: relative;
  max-width: 1256px;
`;

const Brand = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #7d68ff;
  font-family: "roboto";
`;
