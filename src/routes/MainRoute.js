import React, { Component } from "react";
import Cake from "../componets/BakedItem/Cake";
import ShoppingCart from "../componets/Checkout/ShoppingCart";
import HomePage from "../componets/HomeItems/HomePage";
import Customer from "../componets/Customer";
import SignUp from "../componets/HomeItems/SignUp";
import Verified from "../componets/Verifed";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Checkout from "../componets/Checkout/CheckOutForm";

function MainRoute() {
  let logged = useSelector((state) => state.token.loggedIn);
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/Verified/:id" component={Verified} />
      <Route path="/ShoppingCart" component={Checkout} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/Customer" component={Customer} />
      <Route path="/:id" component={Cake} />
    </Switch>
  );
}

export default MainRoute;
