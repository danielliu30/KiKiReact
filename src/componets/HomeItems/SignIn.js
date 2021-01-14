import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import {
  setGoogAnalyt,
  setJWTToken,
  setUserAccount,
} from "../Security/JWTSlice";
import ProfileHome from "./ProfileHome";
import { Alert } from "@material-ui/lab";
import ReactGA from "react-ga";
const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  displayName: {
    marginTop: theme.spacing(4),
  },
}));

function SignIn(props) {
  const [loginError, setLoginError] = useState(false);
  const user = useSelector((state) => state.token.userAccount);
  const onLogIn = (data) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    };
    fetch("http://localhost:8080/customer/signIn", requestOptions)
      .then((response) => response.json())
      .then(
        (result) => {
          dispatch(setJWTToken(result));
          dispatch(setUserAccount(data.email));
          ReactGA.initialize("UA-000000-01");
          ReactGA.set({ page: window.location.pathname });
          dispatch(setGoogAnalyt(ReactGA));
        },
        (error) => {
          setLoginError(true);
          setTimeout(() => {
            setLoginError(false);
          }, 2000);
        }
      );
  };
  const { register, handleSubmit, errors } = useForm();
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      {loginError && <Alert severity="error">Error logging into account</Alert>}
      {!user ? (
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit((data) => onLogIn(data))}
          >
            <TextField
              id="outlined-basic"
              variant="outlined"
              name="email"
              error={!!errors.name}
              label="Email"
              helperText={"Can't be blank or only White Spaces"}
              inputRef={register({
                required: "Required",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Not Only WhiteSpaces",
                },
              })}
              fullWidth
            ></TextField>

            <TextField
              id="outlined-basic"
              variant="outlined"
              name="password"
              error={!!errors.name}
              label="Password"
              type="password"
              inputRef={register({
                required: "Required",
                pattern: {
                  value: /\S/,
                  message: "Not Only WhiteSpaces",
                },
              })}
              fullWidth
            ></TextField>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={() => props.signInUp(false)} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      ) : (
        <div className={classes.paper}>
          <ProfileHome></ProfileHome>
          <Typography
            className={classes.displayName}
            component="h1"
            variant="h5"
          >
            {user}
          </Typography>
        </div>
      )}
    </Grid>
  );
}

export default SignIn;
