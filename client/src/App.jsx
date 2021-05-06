import { useContext, useEffect } from "react";
import { ThemeProvider } from "styled-components/macro";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Login from "./views/Login";
import Place from "./views/Place";
import Navigation from "./components/Navigation";
import { COLOR, GlobalStyle, ResetStyle } from "./components/GlobalStyle";
import { AuthContext } from "./contexts/AuthContext";
import RestaurantsService from "./services/RestaurantsService";
import { RestaurantsContext } from "./contexts/RestaurantsContext";

function App() {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  useEffect(() => {
    RestaurantsService.getAll().then((res) => {
      setRestaurants(res.data);
    });
  }, [setRestaurants]);

  return (
    <>
      <ThemeProvider theme={COLOR.light}>
        <ResetStyle />
        <GlobalStyle />
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/place/:id">
            <Place />
          </Route>
        </Switch>
      </ThemeProvider>
    </>
  );
}

export default App;
