import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useSelector } from 'react-redux';
import {persistor} from '../app/persist'




function Navigation() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [categories, setCategories] = useState([]);
    const userAccount = useSelector(state => state.userAccount);

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
                <Navbar bg="dark" expand="lg" variant="dark">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title="Categories" id="basic-nav-dropdown">
                                <Nav className="mr-auto">
                                    {categories.map(item => (
                                        <li key={item.rel}>
                                            <NavDropdown.Item href={item.href}>
                                                {item.href}
                                            </NavDropdown.Item>
                                        </li>
                                    ))}

                                </Nav>
                            </NavDropdown>

                        </Nav>
                        {
                            JSON.stringify(userAccount).length > 2 ?
                                <Nav className="ml-auto">
                                    <NavDropdown title={userAccount}>
                                        <NavDropdown.Item href="">
                                            Profile
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="">
                                            Settings
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/" onClick={()=>persistor.purge()}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                                :

                                <Nav className="ml-auto">
                                    <Nav.Link href="/SignUp">Log In</Nav.Link>
                                </Nav>

                        }

                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            {/* <Button variant="outline-success">Search</Button> */}
                        </Form>
                    </Navbar.Collapse>

                </Navbar>
            </div>
        );
    }
}
export default Navigation;
