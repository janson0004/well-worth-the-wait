import { ThemeProvider } from "styled-components/macro";
import { COLOR, GlobalStyle, ResetStyle } from "./components/GlobalStyle";
import Place from "./views/Place";
import { Switch, Route } from "react-router-dom";
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
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="place">
            <Place />
          </Route>
        </Switch>
      </ThemeProvider>
    </>
  );
}

export default App;
