import React, { useState, useContext } from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { FaHeart, FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import UserService from "../services/UserService";

const Navigation = ({ showSidebar, setShowSidebar }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [showDropDown, setShowDropDown] = useState(false);
  const history = useHistory();

  const Logout = () => {
    // Send a delete request to clear the cookie and the information
    UserService.logout()
      .then((response) => {
        history.push("/");
        setShowSidebar(false);
        setAuth(null);
      })
      .catch((error) => {
        alert("Logout Failed. Try Again.");
      });
  };

  const DropDownHandler = (showDropDown) => {
    setShowDropDown(!showDropDown);
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    setShowDropDown(!showDropDown);
    // setShowSidebar(false);
    Logout();
  };

  const IconOnClick = () => {
    history.push("/");
  };
  return (
    <Wrapper>
      <CustomNavbar expand="lg">
        <CustomContainer>
          <Navbar.Brand onClick={IconOnClick}>
            <Brand>Restaurants</Brand>
          </Navbar.Brand>
          {showSidebar && (
            <>
              <FlexDiv>
                <IconItem>
                  <FaHeart />
                </IconItem>
                <OutDropDown>
                  <FlexDiv onClick={() => DropDownHandler(showDropDown)}>
                    <Name>{auth ? auth.username : ""}</Name>
                    <CustomFaChevronDown />
                  </FlexDiv>
                  <DownWrapper showDropDown={showDropDown}>
                    <BlockWrapper>
                      <LogoutWrapper onClick={onClickHandler}>
                        <CustomFaSignOutAlt />
                        <LoginDropDownText>Logout</LoginDropDownText>
                      </LogoutWrapper>
                    </BlockWrapper>
                  </DownWrapper>
                </OutDropDown>
              </FlexDiv>
            </>
          )}
        </CustomContainer>
      </CustomNavbar>
    </Wrapper>
  );
};

export default Navigation;

const Wrapper = styled.div`
  background-color: white;
`;

const CustomNavbar = styled(Navbar)`
  padding-top: 20px;
  padding-bottom: 10px;
  position: relative;
  z-index: 1000;
  box-shadow: 0 2px 2px -2px ${({ theme }) => theme.divider.main};

  .navbar-brand {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .navbar-toggler {
    color: white;
    border: none;
  }
  .navbar-nav {
    padding-left: 10px;
  }
  .navbar-con .navbar-toggler-icon {
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

const IconItem = styled.span`
  font-size: 20px;
  color: #4b4b4b;
`;
const OutDropDown = styled.div``;

const CustomFaChevronDown = styled(FaChevronDown)`
  color: #4b4b4b;
  width: 18px;
  height: 23px;
  margin-right: 14px;
  margin-left: 12px;
  cursor: pointer;
`;

const DownWrapper = styled.div`
  background-color: white;
  position: absolute;
  right: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  width: 204px;
  height: 67px;
  justify-content: center;
  margin-top: 12px;
  pointer-events: ${(props) => (props.showDropDown ? "all" : "none")};
  transform: ${(props) => (props.showDropDown ? "scale(1.15)" : "scale(1)")};
  opacity: ${(props) => (props.showDropDown ? "1" : "0")};
  transition: all 200ms cubic-bezier(0.87, 0, 0.11, 1.2);
`;

const BlockWrapper = styled.div`
  cursor: pointer;
  user-select: none;
  display: flex;
`;
const LogoutWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CustomFaSignOutAlt = styled(FaSignOutAlt)`
  width: 20px;
  height: 23px;
  color: #4b4b4b;
  cursor: pointer;
  position: relative;
  z-index: 100;
`;

const LoginDropDownText = styled.span`
  font-family: "Roboto";
  color: #4b4b4b;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  z-index: 100;
  margin-left: 12px;
  :hover {
    text-decoration: none;
  }
`;

const Name = styled.span`
  color: #4b4b4b;
  font-size: 20px;
  font-weight: 700;
  font-family: "Roboto";
  margin-left: 47px;
`;

const FlexDiv = styled.div`
  display: flex;
`;
