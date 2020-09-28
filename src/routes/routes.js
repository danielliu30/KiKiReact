import React, { Component } from 'react'
import Cake from '../componets/Cake'

import Customer from '../componets/Customer'
import SignUp from '../componets/SignUp'
import Verified from '../componets/Verifed'
import AddItemForm from '../componets/AddItemForm'

const routes = {
  "/Cake": () => <Cake />,
  "/Donut": () => <Cake />,
  "/Bread":() => <Cake />,
  "/Cookie":() => <Cake />,
  "/Customer":() => <Customer />,
  "/SignUp": () => <SignUp />,
  "/Verified/:id": () => <Verified />,
  "/AddItemForm/:id": () => <AddItemForm />
};


export default routes;
