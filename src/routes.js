import React, { Component } from 'react'
import Cake from './componets/Cake'
import Donut from './componets/Donut'
import Bread from './componets/Bread'
import Cookie from './componets/Cookie'
import Customer from './componets/Customer'
import SignUp from './componets/SignUp'
import Verified from './componets/Verifed'
const routes = {
    "/Cake": () => <Cake />,
    "/Donut": () => <Donut />,
    "/Bread":() => <Bread />,
    "/Cookie":() => <Cookie />,
    "/Customer":() => <Customer />,
    "/SignUp":() => <SignUp />,
    "/Verified/:id" :()=> <Verified />

  };
  export default routes;