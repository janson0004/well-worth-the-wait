import React, { useState, useContext, useEffect } from "react";
import { ThemeProvider } from "styled-components/macro";
import { COLOR, GlobalStyle, ResetStyle } from "./components/GlobalStyle";
import Place from "./views/Place";
import { Switch, Route } from "react-router-dom";
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

          </Route>
          {!authLoading && auth && (
            <>
              <Navigation
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
                auth={auth}
              />

              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/place">
            <Place />
          </Route>
              <Route exact path="/favplaces">
                <FavPlaces />
              </Route>
            </>
          )}
          {authLoading && <Loader />}
          {!auth && (
            <>
              <Navigation />
              <Route exact path="/">
                <Login setShowSidebar={setShowSidebar} />
              </Route>
            </>
          )}
        </Switch>
      </ThemeProvider>
    </>
  );
}

export default App;
