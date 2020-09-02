import React, { useState, useEffect } from "react";
import { Button, FormGroup, FormControl, ControlLabel, Form, FormLabel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom';
import '../css/SignUp.css'



function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [member, setMember] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    function validateForm() {
        return email.length > 7 && password.length > 8;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    function onClick() {
        setSubmit(true);
    }

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "http://localhost:3000"
            },
            body: JSON.stringify(
                {
                    email: email,
                    name: password,
                    member: member
                }
            )
        };
        if (submit) {
            fetch("http://localhost:8080/customer/signUp", requestOptions)
                .then(setSubmit(false))
                .then(response => response.json())
                .then((result) => {
                    setEmailSent(result)
                })
        }



    }, [submit]);


    if (emailSent) {
        return (
            <script>
                function myFunction() {
                    alert("Email Was Sent!")
                }
            </script>
        );
    } else {
        return (
            <div className="Login">
                <form onSubmit={handleSubmit}>
                    <FormGroup controlId="email">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" >
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                    </FormGroup>

                    <FormGroup controlId="member">
                        <FormLabel>Member</FormLabel>
                        <FormControl
                            value={member}
                            type="checkbox"
                            onChange={e => setMember(!(member))}
                        />
                    </FormGroup>

                    <Button block disabled={!validateForm()} onClick={onClick}>
                        Login
                    </Button>
                </form>
            </div>
        );
    }

}




ReactDOM.render(
    <SignUp />,
    document.getElementById('root')
);
export default SignUp
