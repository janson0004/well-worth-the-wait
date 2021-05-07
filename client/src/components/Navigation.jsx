import React, { useState, useContext } from "react";
import styled from "styled-components/macro";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { FaHeart, FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
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

  const dropDownHandler = () => {
    setShowDropDown(!showDropDown);
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    setShowDropDown(!showDropDown);
    // setShowSidebar(false);
    Logout();
  };

  return (
    <Wrapper expand="lg">
      <CustomContainer>
        <NavItem to="/">
          <Navbar.Brand>
            <Brand>Restaurants</Brand>
          </Navbar.Brand>
        </NavItem>
        {showSidebar && (
          <FlexDiv>
            {auth.role === "Admin" ? (
              <NavItem to="/admin">
                <RiAdminFill />
              </NavItem>
            ) : (
              <NavItem to="/favplace">
                <FaHeart />
              </NavItem>
            )}

            <DropDownItem>
              <DropDown onClick={dropDownHandler}>
                <Name>{auth ? auth.username : ""}</Name>
                <CustomFaChevronDown />
              </DropDown>
              <DownWrapper showDropDown={showDropDown}>
                <LogoutWrapper onClick={onClickHandler}>
                  <CustomFaSignOutAlt />
                  <LoginDropDownText>Logout</LoginDropDownText>
                </LogoutWrapper>
              </DownWrapper>
            </DropDownItem>
          </FlexDiv>
        )}
      </CustomContainer>
    </Wrapper>
  );
};

export default Navigation;

const Wrapper = styled(Navbar)`
  background-color: ${({ theme }) => theme.bg.tinted};
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
    color: ${({ theme }) => theme.mono.contrast};
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
  color: ${({ theme }) => theme.theme.main};
  font-family: "roboto";
`;

const NavItem = styled(Link)`
  font-size: 20px;
  color: ${({ theme }) => theme.mono.secondary};
  text-decoration: none;

  :hover,
  :focus,
  :visited {
    color: ${({ theme }) => theme.mono.secondary};
  }
`;

const DropDownItem = styled.div`
  margin-left: 30px;
  position: relative;
`;

const DropDown = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Name = styled.span`
  color: ${({ theme }) => theme.mono.secondary};
  font-size: 18px;
  font-weight: 700;
`;

const CustomFaChevronDown = styled(FaChevronDown)`
  color: ${({ theme }) => theme.mono.secondary};
  width: 16px;
  height: 21px;
  margin-left: 12px;
`;

const DownWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg.tinted};
  position: absolute;
  right: 0;
  z-index: 9999;
  width: 150px;
  padding: 12px;
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
  box-shadow: 2px 2px 2px -2px ${({ theme }) => theme.divider.main};
  pointer-events: ${(props) => (props.showDropDown ? "all" : "none")};
  transform: ${(props) => (props.showDropDown ? "scale(1.15)" : "scale(1)")};
  opacity: ${(props) => (props.showDropDown ? "1" : "0")};
  transition: all 200ms cubic-bezier(0.87, 0, 0.11, 1.2);
`;

const LogoutWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 100;
`;

const CustomFaSignOutAlt = styled(FaSignOutAlt)`
  width: 16px;
  height: 20px;
  color: ${({ theme }) => theme.mono.secondary};
  position: relative;
  z-index: 100;
`;

const LoginDropDownText = styled.span`
  color: ${({ theme }) => theme.mono.secondary};
  font-size: 14px;
  font-weight: 500;
  margin-left: 10px;

  :hover {
    text-decoration: none;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`;
