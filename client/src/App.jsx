import React, { useState, useContext, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components/macro";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { COLOR, GlobalStyle, ResetStyle } from "./components/GlobalStyle";
import { AuthContext } from "./contexts/AuthContext";
import UserService from "./services/UserService";
import { RestaurantsContext } from "./contexts/RestaurantsContext";
import RestaurantsService from "./services/RestaurantsService";
import Login from "./views/Login";
import Place from "./views/Place";
import FavPlaces from "./views/FavPlaces";
import Home from "./views/Home";
import NotFound from "./views/NotFound";
import Loader from "./components/Loader";
import Navigation from "./components/Navigation";
import Admin from "./views/Admin";
function App() {
  const { auth, setAuth } = useContext(AuthContext);
  const { setRestaurants } = useContext(RestaurantsContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    TimeAgo.addDefaultLocale(en);
  }, []);

  // Initiallize/ fetching data
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
        {!loading && auth && (
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/favplaces">
              <FavPlaces />
            </Route>
            <Route path="/place/:id">
              <Place />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        )}
        {loading && <Loader />}
        {!auth && (
          <Route exact path="/">
            <Login setShowSidebar={setShowSidebar} />
          </Route>
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
