/*
* @author: Maan Mandaliya (B00903171 | mn638205@dal.ca)
* @description: This file takes requirements from customer to select a car and sends that information to /availablecars
*/
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { FormHelperText } from "@mui/material";
import NavBar from "../../components/common/nav-bar";
import { styled } from "@mui/material";
import authService from "../../services/authService";

const StyledButton = styled(Button)({
  color: "#fff",
  backgroundColor: "#00d2d3",
  padding: "15px",
  "&:active": {
    backgroundColor: "#00d2d3",
  },
  "&:hover": {
    backgroundColor: "#00d2d3",
  },
});

const MakeReservation = ({ user }) => {
  const navigate = useNavigate();
  const [reservationValues, setReservationValues] = useState({
    pickupPostal: {
      value: "",
      errorMessage: "",
    },
    pickupDate: {
      value: new Date(),
      errorMessage: "",
    },
    pickupTime: {
      value: "",
      errorMessage: "",
    },
    dropPostal: {
      value: "",
      errorMessage: "",
    },
    dropDate: {
      value: new Date(),
      errorMessage: "",
    },
    dropTime: {
      value: "",
      errorMessage: "",
    },
    age: {
      value: "",
      errorMessage: "",
    },
    nationality: {
      value: "",
      errorMessage: "",
    },
    carType: {
      value: "",
      errorMessage: "",
    }
  });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (user === null && currentUser === null) {
      navigate("/");
      return;
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReservationValues({
      ...reservationValues,
      [name]: { ...reservationValues[name], value },
    });
  };

  const validate = (event) => {
    let isSubmittable = true;
    let errorMessage =
      reservationValues.pickupPostal.value === ""
        ? "Pickup Postal is required."
        : /^[A-Za-z0-9]{6}$/.test(reservationValues.pickupPostal.value)
          ? ""
          : "Pickup Postal is invalid";
    isSubmittable &= errorMessage === "";
    setReservationValues((reservationValues) => ({
      ...reservationValues,
      pickupPostal: {
        value: reservationValues.pickupPostal.value,
        errorMessage: errorMessage,
      },
    }));

    let errorMessage2 =
      reservationValues.dropPostal.value === ""
        ? "Drop Postal is required."
        : /^[A-Za-z0-9]{6}$/.test(reservationValues.dropPostal.value)
          ? ""
          : "Drop Postal is invalid";
    isSubmittable &= errorMessage2 === "";
    setReservationValues((reservationValues) => ({
      ...reservationValues,
      dropPostal: {
        value: reservationValues.dropPostal.value,
        errorMessage: errorMessage2,
      },
    }));

    let today = new Date();
    let errorMessage3 =
      reservationValues.pickupDate.value === null
        ? "Pickup Date is Required"
        : reservationValues.pickupDate.value.getDate() < today.getDate()
          ? "Pickup Date is before today."
          : reservationValues.dropDate.value != null &&
            reservationValues.pickupDate.value != null &&
            reservationValues.dropDate.value.getDate() <
            reservationValues.pickupDate.value.getDate()
            ? "Pickup Date is after Drop Date"
            : "";
    isSubmittable &= errorMessage3 === "";
    setReservationValues((reservationValues) => ({
      ...reservationValues,
      pickupDate: {
        value: reservationValues.pickupDate.value,
        errorMessage: errorMessage3,
      },
    }));

    let errorMessage4 =
      reservationValues.dropDate.value === null
        ? "Drop Date is Required"
        : reservationValues.dropDate.value.getDate() <
          reservationValues.pickupDate.value.getDate()
          ? "Drop Date is before Pickup Date."
          : reservationValues.dropDate.value.getDate() < today.getDate()
            ? "Drop Date is before today"
            : reservationValues.dropDate.value.getDate() > today.getDate() + 7
              ? "Drop Date is after a week"
              : "";
    isSubmittable &= errorMessage4 === "";
    setReservationValues((reservationValues) => ({
      ...reservationValues,
      dropDate: {
        value: reservationValues.dropDate.value,
        errorMessage: errorMessage4,
      },
    }));

    let errorMessage5 =
      reservationValues.pickupTime.value === ""
        ? "Pickup Time is required."
        : "";
    isSubmittable &= errorMessage5 === "";
    setReservationValues((reservationValues) => ({
      ...reservationValues,
      pickupTime: {
        value: reservationValues.pickupTime.value,
        errorMessage: errorMessage5,
      },
    }));

    let errorMessage6 =
      reservationValues.dropTime.value === "" ? "Drop Time is required." : "";
    isSubmittable &= errorMessage6 === "";
    setReservationValues((reservationValues) => ({
      ...reservationValues,
      dropTime: {
        value: reservationValues.dropTime.value,
        errorMessage: errorMessage6,
      },
    }));

    let errorMessage7 =
      reservationValues.age.value === "" ? "Age is required." : "";
    isSubmittable &= errorMessage7 === "";
    setReservationValues((reservationValues) => ({
      ...reservationValues,
      age: {
        value: reservationValues.age.value,
        errorMessage: errorMessage7,
      },
    }));

    let errorMessage8 =
      reservationValues.nationality.value === ""
        ? "Nationality is required."
        : "";
    isSubmittable &= errorMessage8 === "";
    setReservationValues((reservationValues) => ({
      ...reservationValues,
      nationality: {
        value: reservationValues.nationality.value,
        errorMessage: errorMessage8,
      },
    }));

    let errorMessage9 =
      reservationValues.carType.value === "" ? "Car Type is required." : "";
    isSubmittable &= errorMessage9 === "";
    setReservationValues((reservationValues) => ({
      ...reservationValues,
      carType: {
        value: reservationValues.carType.value,
        errorMessage: errorMessage9,
      },
    }));

    var pickupDateObject = new Date(reservationValues.pickupDate.value)
    var dropDateObject = new Date(reservationValues.dropDate.value)
    if (pickupDateObject.getTime() === dropDateObject.getTime()) {
      const dateArr = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM"]
      let errorMessage10 = dateArr.indexOf(reservationValues.dropTime.value) <= dateArr.indexOf(reservationValues.pickupTime.value) ? "Pickup Time is after or same as Drop Time" : ""
      let errorMessage11 = errorMessage10 === "" ? "" : "Drop Time is before or same as Pickup Time"
      isSubmittable &= errorMessage10 === "";
      isSubmittable &= errorMessage11 === "";
      setReservationValues((reservationValues) => ({
        ...reservationValues,
        pickupTime: {
          value: reservationValues.pickupTime.value,
          errorMessage: errorMessage10,
        },
      }));
      setReservationValues((reservationValues) => ({
        ...reservationValues,
        dropTime: {
          value: reservationValues.dropTime.value,
          errorMessage: errorMessage11,
        },
      }));
    }

    if (isSubmittable) {
      const reservationDataTemp = {
        pickupPostal: reservationValues.pickupPostal.value,
        dropPostal: reservationValues.dropPostal.value,
        pickupDate: reservationValues.pickupDate.value.toDateString(),
        dropDate: reservationValues.dropDate.value.toDateString(),
        pickupTime: reservationValues.pickupTime.value,
        dropTime: reservationValues.dropTime.value,
        age: reservationValues.age.value,
        nationality: reservationValues.nationality.value,
        carType: reservationValues.carType.value
      }
      navigate("/availablecars", { state: reservationDataTemp });
    }
  };

  const background = '/bgimage.jpg';

  return (
    <React.Fragment>
      <NavBar />
      <div style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1
      }}></div>
      <div style={{ 
        textAlign: "center" }}>
        {/* Reference: https://mui.com/material-ui/react-box */}
        <Box
          sx={{ flexGrow: 1 }}
          m={10}
          mb={5}
          bgcolor="#ffffff"
          style={{ padding: "15px" }}
        >
          {/* Reference: https://mui.com/material-ui/react-grid/ */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} md={4}>
              {/* Reference: https://mui.com/material-ui/react-text-field/ */}
              <TextField
                required
                id="pickup-postal-code"
                name="pickupPostal"
                label="Pickup Postal Code"
                type="text"
                value={reservationValues.pickupPostal.value}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={
                  reservationValues.pickupPostal.errorMessage === ""
                    ? false
                    : true
                }
                helperText={reservationValues.pickupPostal.errorMessage}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              {/* Reference: https://mui.com/x/react-date-pickers/date-picker/ */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  fullWidth
                  id="pickup-date"
                  label="Pickup Date *"
                  value={reservationValues.pickupDate.value}
                  onChange={(newValue) => {
                    const name = "pickupDate";
                    const value = newValue;
                    setReservationValues({
                      ...reservationValues,
                      [name]: { ...reservationValues[name], value },
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      error={
                        reservationValues.pickupDate.errorMessage === ""
                          ? false
                          : true
                      }
                      helperText={reservationValues.pickupDate.errorMessage}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              {/* Reference: https://mui.com/material-ui/api/form-control */}
              {/* Reference: https://mui.com/material-ui/react-select/ */}
              <FormControl
                fullWidth
                error={
                  reservationValues.pickupTime.errorMessage === "" ? false : true
                }
              >
                <InputLabel id="pickup-time-slot">Pickup Time *</InputLabel>
                <Select
                  labelId="pickup-time-label"
                  id="pickup-time"
                  name="pickupTime"
                  value={reservationValues.pickupTime.value}
                  label="Pickup Time"
                  onChange={handleChange}
                >
                  <MenuItem value={"9 AM"}>9 AM</MenuItem>
                  <MenuItem value={"10 AM"}>10 AM</MenuItem>
                  <MenuItem value={"11 AM"}>11 AM</MenuItem>
                  <MenuItem value={"12 PM"}>12 PM</MenuItem>
                  <MenuItem value={"1 PM"}>1 PM</MenuItem>
                  <MenuItem value={"2 PM"}>2 PM</MenuItem>
                  <MenuItem value={"3 PM"}>3 PM</MenuItem>
                  <MenuItem value={"4 PM"}>4 PM</MenuItem>
                  <MenuItem value={"5 PM"}>5 PM</MenuItem>
                  <MenuItem value={"6 PM"}>6 PM</MenuItem>
                </Select>
              </FormControl>
              <FormHelperText>
                {reservationValues.pickupTime.errorMessage}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <TextField
                required
                id="drop-postal-code"
                label="Drop Postal Code"
                type="text"
                variant="outlined"
                name="dropPostal"
                value={reservationValues.dropPostal.value}
                onChange={handleChange}
                error={
                  reservationValues.dropPostal.errorMessage === "" ? false : true
                }
                helperText={reservationValues.dropPostal.errorMessage}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  fullWidth
                  id="drop-date"
                  label="Drop Date *"
                  value={reservationValues.dropDate.value}
                  onChange={(newValue) => {
                    const name = "dropDate";
                    const value = newValue;
                    setReservationValues({
                      ...reservationValues,
                      [name]: { ...reservationValues[name], value },
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      {...params}
                      error={
                        reservationValues.dropDate.errorMessage === ""
                          ? false
                          : true
                      }
                      helperText={reservationValues.dropDate.errorMessage}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <FormControl
                fullWidth
                error={
                  reservationValues.dropTime.errorMessage === "" ? false : true
                }
              >
                <InputLabel id="drop-time-slot">Drop Time *</InputLabel>
                <Select
                  labelId="drop-time-label"
                  id="drop-time"
                  value={reservationValues.dropTime.value}
                  label="Drop Time"
                  name="dropTime"
                  onChange={handleChange}
                >
                  <MenuItem value={"9 AM"}>9 AM</MenuItem>
                  <MenuItem value={"10 AM"}>10 AM</MenuItem>
                  <MenuItem value={"11 AM"}>11 AM</MenuItem>
                  <MenuItem value={"12 PM"}>12 PM</MenuItem>
                  <MenuItem value={"1 PM"}>1 PM</MenuItem>
                  <MenuItem value={"2 PM"}>2 PM</MenuItem>
                  <MenuItem value={"3 PM"}>3 PM</MenuItem>
                  <MenuItem value={"4 PM"}>4 PM</MenuItem>
                  <MenuItem value={"5 PM"}>5 PM</MenuItem>
                  <MenuItem value={"6 PM"}>6 PM</MenuItem>
                </Select>
              </FormControl>
              <FormHelperText>
                {reservationValues.dropTime.errorMessage}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <FormControl
                fullWidth
                error={reservationValues.age.errorMessage === "" ? false : true}
              >
                <InputLabel id="age">Age *</InputLabel>
                <Select
                  labelId="age-label"
                  id="age"
                  value={reservationValues.age.value}
                  label="Age"
                  name="age"
                  onChange={handleChange}
                >
                  <MenuItem value={"25+"}>25+</MenuItem>
                  <MenuItem value={"24"}>24</MenuItem>
                  <MenuItem value={"23"}>23</MenuItem>
                  <MenuItem value={"22"}>22</MenuItem>
                  <MenuItem value={"21"}>21</MenuItem>
                  <MenuItem value={"20"}>20</MenuItem>
                  <MenuItem value={"19"}>19</MenuItem>
                  <MenuItem value={"18"}>18</MenuItem>
                </Select>
              </FormControl>
              <FormHelperText>
                {reservationValues.age.errorMessage}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <FormControl
                fullWidth
                error={
                  reservationValues.nationality.errorMessage === ""
                    ? false
                    : true
                }
              >
                <InputLabel id="nationality">Nationality *</InputLabel>
                <Select
                  labelId="nationality-label"
                  id="nationality"
                  value={reservationValues.nationality.value}
                  label="Nationality"
                  name="nationality"
                  onChange={handleChange}
                >
                  <MenuItem value={"Canadian"}>Canadian</MenuItem>
                  <MenuItem value={"Non-Canadian"}>Non-Canadian</MenuItem>
                </Select>
              </FormControl>
              <FormHelperText>
                {reservationValues.nationality.errorMessage}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <FormControl
                fullWidth
                error={
                  reservationValues.carType.errorMessage === "" ? false : true
                }
              >
                <InputLabel id="carType">Car Type *</InputLabel>
                <Select
                  labelId="carType-label"
                  id="carType"
                  value={reservationValues.carType.value}
                  label="Car Type"
                  name="carType"
                  onChange={handleChange}
                >
                  <MenuItem value={"SUV"}>SUV</MenuItem>
                  <MenuItem value={"Sedan"}>Sedan</MenuItem>
                  <MenuItem value={"Hatchback"}>Hatchback</MenuItem>
                  <MenuItem value={"Any"}>Any</MenuItem>
                </Select>
              </FormControl>
              <FormHelperText>
                {reservationValues.carType.errorMessage}
              </FormHelperText>
            </Grid>
          </Grid>
        </Box>
        {/* Reference: https://mui.com/material-ui/react-button */}
        <StyledButton
          variant="contained"
          size="large"
          color="success"
          onClick={validate}
        >
          Select Car
        </StyledButton>
      </div>
    </React.Fragment>
  );
};

export default MakeReservation;
