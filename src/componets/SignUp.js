import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom';
import { useDispatch, connect } from 'react-redux'
import { Grid, Button, TextField } from "@material-ui/core";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { useForm } from 'react-hook-form'
import { resetStateToken, setJWTToken, setUserAccount } from '../Security/JWTSlice'
import Customer from "./Customer";
import AddItemForm from "./AddItemForm";
import Cake from './Cake'

function SignUp() {

    const [submit, setSubmit] = useState(false);
    const [loginPass, setLoginPass] = useState("");
    const [createAcc, setCreateAcc] = useState(false);
    const [signInAcc, setSignInAcc] = useState(false);

    const { register, handleSubmit, errors } = useForm();
    const dispatch = useDispatch();

    const onLogIn = (data) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "http://localhost:3000"
            },
            body: JSON.stringify(
                {
                    "email": data.email,
                    "name": data.password,
                    
                }
            )
        };
        fetch("http://localhost:8080/customer/signIn", requestOptions)
            .then(setSubmit(false))
            .then(response => response.json())
            .then((result) => {
                setLoginPass(result)
                dispatch(
                    setJWTToken(result)
                    
                )
                dispatch(
                    setUserAccount(data.email)
                )
            })
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
                    
                }
            )
        };
        // if (submit) {
        //     fetch("http://localhost:8080/customer/signUp", requestOptions)
        //         .then(setSubmit(false))
        //         .then(response => response.json())
        //         .then((result) => {
        //             setEmailSent(result)
        //         })
        // }
        if (createAcc) {
            dispatch(resetStateToken())
        }
        
    }, [createAcc, signInAcc]);



    if (!createAcc && !signInAcc) {
        return (
            <Grid
                container
                spacing={3}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddBoxIcon />}
                        onClick={() => setCreateAcc(true)}
                    >
                        Create Account
                        </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<LockOpenIcon />}
                        onClick={() => setSignInAcc(true)}
                    >
                        Log In
                        </Button>
                </Grid>
            </Grid>
        )
    }
  
    else if (signInAcc) {
        return (
            <div>
                <form onSubmit={handleSubmit(data => onLogIn(data))}>
                    <Grid
                        container
                        spacing={4}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: '100vh' }}
                    >

                        <Grid item xs={12}>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                name="email"
                                error={!!errors.name}
                                label="Email"
                                helperText={"Can't be blank or only White Spaces"}
                                inputRef={
                                    register({
                                        required: "Required",
                                        pattern: {
                                            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                            message: "Not Only WhiteSpaces"
                                        }
                                    })
                                }
                            >

                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                name="password"
                                error={!!errors.name}
                                label="Password"
                                type="password"
                                inputRef={
                                    register({
                                        required: "Required",
                                        pattern: {
                                            value: /\S/,
                                            message: "Not Only WhiteSpaces"
                                        }
                                    })
                                }
                            >

                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                            >
                                Log In
                        </Button>
                        </Grid>


                    </Grid>
                </form>
            </div >
        )
    }

}

export default SignUp
