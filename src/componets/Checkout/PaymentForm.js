import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import Checkbox from "@material-ui/core/Checkbox";
import {
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import ValidateLohnMod10 from "./CardValidation";
import { useForm } from "react-hook-form";
export default function PaymentForm(props) {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const [cardType, setCardType] = useState(null);

  const handlePress = (e) => {
    if (cardType != null) {
      let cardNum = e;
      if (
        cardType === parseInt(cardNum.substring(0, 2), 10) ||
        cardType === parseInt(cardNum.charAt(0), 10)
      ) {
        return ValidateLohnMod10(cardNum);
      }
    }
    return false;
  };

  const onCheckSave = (data) => {
    if (data.saveCard === true) {
      console.log(data);
    }
    props.handleNext();
  };

  const selectCardType = (e) => {
    e.preventDefault();
    setCardType(e.target.value);
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <form onSubmit={handleSubmit((data) => onCheckSave(data))}>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                name="cardHolder"
                required
                id="cardName"
                label="Name on card"
                fullWidth
                error={errors?.cardHolder?.message}
                helperText={errors?.cardHolder?.message}
                inputRef={register({
                  minLength: { value: 4, message: "Too Short" },
                })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel> Card Type</InputLabel>
                <Select
                  fullWidth
                  name="card Type"
                  inputRef={register}
                  required
                  onChange={(e) => selectCardType(e)}
                  defaultValue="Select a Card"
                >
                  <MenuItem value={4}>VISA</MenuItem>
                  <MenuItem value={5}>Master</MenuItem>
                  <MenuItem value={37}>American Express</MenuItem>
                  <MenuItem value={6}>Discover</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                name="cardNumber"
                label="Card number"
                fullWidth
                error={errors.cardNumber}
                helperText={errors.cardNumber && "Invalid Card Number"}
                autoComplete="cc-number"
                // onKeyDown={(e) => handlePress(e)}
                inputRef={register({
                  validate: {
                    goodNum: (value) => handlePress(value) === true,
                  },
                })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                inputRef={register}
                name="exp"
                required
                id="expDate"
                label="Expiry date"
                fullWidth
                autoComplete="cc-exp"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="ccv"
                required
                id="cvv"
                label="CVV"
                helperText="Last three digits on signature strip"
                fullWidth
                autoComplete="cc-csc"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    inputRef={register}
                    color="secondary"
                    name="saveCard"
                  />
                }
                label="Remember credit card details for next time"
              />
            </Grid>
          </Grid>

          <div className={props.style.buttons}>
            <Button onClick={props.handleBack}>Back</Button>

            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
}
