import React, { useState, useContext, useEffect } from "react";
import { ThemeProvider } from "styled-components/macro";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Login from "./views/Login";
import Place from "./views/Place";
import FavPlaces from "./views/FavPlaces";
import Home from "./views/Home";
import Loader from "./components/Loader";
import Navigation from "./components/Navigation";
import { COLOR, GlobalStyle, ResetStyle } from "./components/GlobalStyle";
import { AuthContext } from "./contexts/AuthContext";
import RestaurantsService from "./services/RestaurantsService";
import { RestaurantsContext } from "./contexts/RestaurantsContext";

function App() {
  const { auth, setAuth } = useContext(AuthContext);
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, [setRestaurants]);

  useEffect(() => {
    //axios.get used GET request to fetch user data from MongoDB
    axios
      .get("/user", { withCredentials: true })
      .then((response) => {
        setAuth(response.data);
        setShowSidebar(true);

        RestaurantsService.getAll()
          .then((res) => {
            setRestaurants(res.data);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
          });
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <ThemeProvider theme={COLOR.light}>
        <ResetStyle />
        <GlobalStyle />

        <Switch>
          {!loading && auth && (
            <>
              <Navigation
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
                auth={auth}
              />
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
