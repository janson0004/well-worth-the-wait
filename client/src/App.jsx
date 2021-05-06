import React, { useState, useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components/macro";
import { COLOR, GlobalStyle, ResetStyle } from "./components/GlobalStyle";
import { AuthContext } from "./contexts/AuthContext";
import UserService from "./services/UserService";
import { RestaurantsContext } from "./contexts/RestaurantsContext";
import RestaurantsService from "./services/RestaurantsService";
import Login from "./views/Login";
import Place from "./views/Place";
import FavPlaces from "./views/FavPlaces";
import Home from "./views/Home";
import Loader from "./components/Loader";
import Navigation from "./components/Navigation";

function App() {
  const { auth, setAuth } = useContext(AuthContext);
  const { setRestaurants } = useContext(RestaurantsContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, [setRestaurants]);

  useEffect(() => {
    // Get user data
    UserService.getUser()
      .then((response) => {
        setAuth(response.data);
        setShowSidebar(true);

        // Get restaurants data
        RestaurantsService.getAll()
          .then((res) => {
            setRestaurants(res.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error.response.data.message);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setLoading(false);
      });
  }, [setAuth, setRestaurants]);

  return (
    <>
      <ThemeProvider theme={COLOR.light}>
        <ResetStyle />
        <GlobalStyle />
        <Navigation showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <Switch>
          {!loading && auth && (
            <>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/favplaces">
                <FavPlaces />
              </Route>
              <Route path="/place/:id">
                <Place />
              </Route>
            </>
          )}
          {loading && <Loader />}
          {!auth && (
            <Route exact path="/">
              <Login setShowSidebar={setShowSidebar} />
            </Route>
          )}
        </Switch>
      </ThemeProvider>
    </>
  );
}

export default App;
