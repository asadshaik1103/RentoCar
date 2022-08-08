import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


export default function AddressForm() {
  
const [fname, setfname] = useState();
const [lname, setlname] = useState();
const [address, setaddress] = useState();
const [city, setcity] = useState();
const [state, setstate] = useState();
const [zip, setzip] = useState();
const [country, setcountry] = useState();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Billing address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={fname}
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            helperText={fname === ""? "Required!" : ""}
            onChange={(event) => setfname(event.target.value)}
            onBlur={(event) => setfname(event.target.value)}
            error={fname===""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={lname}
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            helperText={lname === ""? "Required!" : ""}
            onChange={(event) => setlname(event.target.value)}
            onBlur={(event) => setlname(event.target.value)}
            error={lname===""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            value={address}
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            helperText={address === ""? "Required" : ""}
            onChange={(event) => setaddress(event.target.value)}
            onBlur={(event) => setaddress(event.target.value)}
            error={address===""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={city}
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            helperText={city === ""? "Required" : ""}
            onChange={(event) => setcity(event.target.value)}
            onBlur={(event) => setcity(event.target.value)}
            error={city===""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={state}
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            helperText={state === ""? "Required" : ""}
            onChange={(event) => setstate(event.target.value)}
            onBlur={(event) => setstate(event.target.value)}
            error={state===""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={zip}
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            helperText={zip === ""? "Required" : ""}
            onChange={(event) => setzip(event.target.value)}
            onBlur={(event) => setzip(event.target.value)}
            error={zip===""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={country}
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            helperText={country === ""? "Required" : ""}
            onChange={(event) => setcountry(event.target.value)}
            onBlur={(event) => setcountry(event.target.value)}
            error={country===""}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="addInsurance" id="addInsurance" value="yes" />}
            label="Add Insurance"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}