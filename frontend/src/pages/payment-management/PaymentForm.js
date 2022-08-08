import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function PaymentForm() {
  const [CNerror,setCNerror]=useState()
  const [dateError,setDateError]=useState()

  const handleCardNumber = (e) => {
    if (e.target.value.length !== 16) {
      setCNerror("error");
    }
    else{
      setCNerror("");
    }
  } 
  let dateRegex = /^((0[1-9])|(1[0-2]))\/((2021)|(20[2-3][0-9]))$/;
  const handleDate = (e) => {
    var inputDate= e.target.value
    if (inputDate.match(dateRegex)) {
      setDateError("");
    }
    else{
      setDateError("error");
    }
  } 


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            onChange={handleCardNumber}
            error={CNerror==="error"}
            helperText={CNerror === "error"? "Card Number should be of 16 digits" : ""}
            inputProps={{ maxLength: 16 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            OnChange={handleDate}
            error={dateError==="error"}
            helperText={dateError === "error"? "Date invalid" : ""}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            type="password"
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            inputProps={{ maxLength: 3 }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}