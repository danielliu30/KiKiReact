import React from 'react'
import Cake from './componets/Cake'
import Donut from './componets/Donut'
import Bread from './componets/Bread'
import Cookie from './componets/Cookie'
import Customer from './componets/Customer'
const routes = {
    "/Cake": () => <Cake />,
    "/Donut": () => <Donut />,
    "/Bread":() => <Bread />,
    "/Cookie":() => <Cookie />,
    "/Customer":() => <Customer />
  };
  export default routes;