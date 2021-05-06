import React, { useState, useContext, useEffect } from "react";
import { ThemeProvider } from "styled-components/macro";
import { COLOR, GlobalStyle, ResetStyle } from "./components/GlobalStyle";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components/macro";
import { AuthContext } from "./contexts/AuthContext";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Login from "./views/Login";
import FavPlaces from "./views/FavPlaces";
import Home from "./views/Home";
import Loader from "./components/Loader";
import Navigation from "./components/Navigation";

function App() {
  const { auth, setAuth, authLoading, setAuthLoading } = useContext(
    AuthContext
  );
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    //axios.get used GET request to fetch user data from MongoDB
    axios
      .get("/user", { withCredentials: true })
      .then((response) => {
        setAuth(response.data);
        setAuthLoading(false);
        setShowSidebar(true);
      })
      .catch((error) => {
        setAuthLoading(false);
      });
  }, []);

  return (
    <>
      <ThemeProvider theme={COLOR.light}>
        <ResetStyle />
        <GlobalStyle />

        <Switch>
          {!authLoading && auth && (
            <>
              <Navigation
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
              />
              <Wrapper>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/favplaces">
                  <FavPlaces />
                </Route>
              </Wrapper>
            </>
          )}
          {authLoading && <Loader />}
          {!auth && (
            <>
              <Navigation />
              <Route exact path="/">
                <Login
                  showSidebar={showSidebar}
                  setShowSidebar={setShowSidebar}
                />
              </Route>
            </>
          )}
        </Switch>
      </ThemeProvider>
    </>
  );
}

export default App;

const Wrapper = styled(Row)`
  height: 100vh;
  width: 100%;
  background-color: white;
  overflow: auto;

  @media (min-width: 992px) {
    overflow: hidden;
  }
`;
