import { ThemeProvider } from "styled-components/macro";
import { COLOR, GlobalStyle, ResetStyle } from "./components/GlobalStyle";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components/macro";
import { AuthContext } from "./contexts/AuthContext";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Login from "./views/Login";

function App() {
  return (
    <>
      <ThemeProvider theme={COLOR.light}>
        <GlobalStyle />
        <ResetStyle />
      </ThemeProvider>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    </>
  );
}

export default App;
