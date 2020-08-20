import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, Navbar, Nav, Form, FormControl, NavbarBrand } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useRoutes } from "hookrouter";
import routes from "./routes";

function Store() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const routeResult = useRoutes(routes);
  
  useEffect(() => {
    fetch("http://localhost:8080/store")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCategories(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <NavbarBrand>Home</NavbarBrand>
          <Nav className="mr-auto">
            {categories.map(item => (
              <li key={item.ItemVariation}>
                <Nav.Link href={item.href}>{item.href}</Nav.Link>
              </li>
            ))}
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
        {routeResult}
      </div>
    );
  }
}

ReactDOM.render(
  <Store />,
  document.getElementById('root')
);
