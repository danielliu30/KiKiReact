import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.css";
import HomePage from "./componets/HomeItems/HomePage";
import { Provider } from "react-redux";
import { store } from "./app/persist";
import Navigation from "./routes/Navigation";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainRoute from "./routes/MainRoute";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Navigation />
      <MainRoute />
    </Router>
  </Provider>,
  document.getElementById("root")
);
