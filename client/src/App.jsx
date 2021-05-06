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
import Navigation from "./components/Navigation";

function App() {
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
          <Route path="/place">
            <Place />
          </Route>
          <Route path="/favplace">
            <FavPlaces />
          </Route>
        </Switch>
      </ThemeProvider>
    </>
  );
}

export default App;
