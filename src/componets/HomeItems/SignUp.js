import React, { useState } from "react";
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
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";

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
}));

function SignUp(props) {
  const [signUpError, setSignUpError] = useState(null);
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const classes = useStyles();
  const onSignUp = (data) => {
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
    fetch("http://localhost:8080/customer/signUp", requestOptions)
      .then((response) => response.json())
      .then(
        (result) => {
          // dispatch(
          //     setJWTToken(result)
          // )
          // dispatch(
          //     setUserAccount(data.email)
          // )
        },
        (error) => {
          setSignUpError(error);
          setTimeout(() => {
            setSignUpError(null);
          }, 2000);
        }
      );
  };
  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      {signUpError !== null && (
        <Alert severity="error">Error creating new Account</Alert>
      )}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit((data) => onSignUp(data))}
          noValidate
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            name="Username"
            error={!!errors.name}
            label="Username"
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
            helperText={"Can't be blank or only White Spaces"}
            inputRef={register({
              required: "Required",
              pattern: {
                value: /\S/,
                message: "Not Only WhiteSpaces",
              },
            })}
            fullWidth
          ></TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link onClick={() => props.signInUp(true)} variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Grid>
  );
}
export default SignUp;
