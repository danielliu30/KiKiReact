import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useRoutes } from "hookrouter";
import routes from "./routes/routes";
import { Provider } from 'react-redux';
import {store} from './app/persist';
import Navigation from './routes/Navigation';
import persistor from './app/persist'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import SignUp from './componets/SignUp';
import Cake from './componets/Cake';
import { PersistGate } from 'redux-persist/integration/react'


ReactDOM.render(
  <Provider store={store}>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/SignUp" component={SignUp} />
          <Route path="/:id" component={Cake} />
        </Switch>
      </Router>
  </Provider>
  ,
  document.getElementById('root')
);


