import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Navbar, Nav, Form, FormControl, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useSelector } from "react-redux";
import { persistor } from "../app/persist";
import { Redirect, useHistory } from "react-router-dom";
import { StickyContainer, Sticky } from "react-sticky";
import { AppBar, IconButton } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { grey, blueGrey } from "@material-ui/core/colors";
import FastfoodIcon from "@material-ui/icons/Fastfood";

function Navigation() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [categories, setCategories] = useState([]);

  const userAccount = useSelector((state) => state.token.userAccount);

  useEffect(() => {
    fetch("http://localhost:8080/store")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCategories(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <AppBar position="static">
        <Navbar bg="dark" expand="lg" variant="dark">
          <Nav className="mr-auto">
            <Nav.Link href="/">KiKi's Bakery</Nav.Link>
          </Nav>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="Treats" id="basic-nav-dropdown">
                <Nav className="mr-auto">
                  {categories.map((item) => (
                    <li key={item.rel}>
                      <NavDropdown.Item href={item.href}>
                        {item.href}
                      </NavDropdown.Item>
                    </li>
                  ))}
                </Nav>
              </NavDropdown>
            </Nav>
            {userAccount.length > 0 ? (
              <Nav className="ml-auto">
                <Nav className="mr-auto">
                  <IconButton href="/ShoppingCart">
                    <ShoppingCartIcon style={{ color: grey[500] }} />
                  </IconButton>
                </Nav>
                <NavDropdown title={userAccount}>
                  <NavDropdown.Item href="">Settings</NavDropdown.Item>
                  <NavDropdown.Item href="/" onClick={() => persistor.purge()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <></>
            )}
          </Navbar.Collapse>
        </Navbar>
      </AppBar>
    );
  }
}
export default Navigation;
