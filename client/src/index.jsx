import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { RestaurantsContextProvider } from "./contexts/RestaurantsContext";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

import "bootstrap/dist/css/bootstrap.min.css";

TimeAgo.addDefaultLocale(en);

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RestaurantsContextProvider>
        <Router>
          <App />
        </Router>
      </RestaurantsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
