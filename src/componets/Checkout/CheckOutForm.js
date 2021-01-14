import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
// import AddressForm from './AddressForm';
// import PaymentForm from './PaymentForm';
// import Review from './Review';
import ShoppingCart from "./ShoppingCart";
import PaymentForm from "./PaymentForm";
import FinalOrder from "./SubmitOrder";
import { useSelector } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(step) {}

export default function Checkout() {
  const classes = useStyles();
  const [orderNumber, setOrderNumber] = useState(
    Math.floor(100000 + Math.random() * 900000)
  );
  const [activeStep, setActiveStep] = useState(0);
  const [failedOrder, setFailedOrder] = useState(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(true);
  const cart = useSelector((state) => state.token.shoppingCart);
  const user = useSelector((state) => state.token.userAccount);
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ShoppingCart style={classes} handleNext={handleNext} />;
      case 1:
        return (
          <PaymentForm
            style={classes}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 2:
        return (
          <FinalOrder
            style={classes}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  };
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleCompletedOrder = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
      body: JSON.stringify({
        userName: user,
        orderList: cart,
        orderID: orderNumber,
      }),
    };
    fetch("http://localhost:8080/customer/purchaseItem", requestOptions)
      .then((res) => res.json())
      .then(
        (response) => {
          setPurchaseSuccess(response);
        },
        (error) => {
          setFailedOrder(error);
        }
      );
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                {handleCompletedOrder()}
                {purchaseSuccess ? (
                  <div>
                    <Typography variant="h5" gutterBottom>
                      Thank you {user} for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                      Your order number is #{orderNumber}. We have emailed your
                      order confirmation, and will send you an update when your
                      order has shipped.
                    </Typography>
                  </div>
                ) : (
                  <div>
                    <Typography variant="h5" gutterBottom>
                      Error with completing purchase.
                    </Typography>
                    <Typography variant="subtitle1">
                      One of the items selected may have already been purchased.
                      {failedOrder}
                    </Typography>
                  </div>
                )}
              </React.Fragment>
            ) : (
              <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
