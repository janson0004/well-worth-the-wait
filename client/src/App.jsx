import React, { useState, useContext, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
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
import NotFound from "./views/NotFound";
import Loader from "./components/Loader";
import Navigation from "./components/Navigation";

function App() {
  const history = useHistory();
  const { auth, setAuth } = useContext(AuthContext);
  const { setRestaurants } = useContext(RestaurantsContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);

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
            console.log(error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        history.push("/");
      });
  }, [setAuth, setRestaurants, history]);

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
            <Route path="/favplace">
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
