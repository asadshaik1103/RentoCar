/*
* @author: Maan Mandaliya (B00903171 | mn638205@dal.ca)
* @description: This file is used to cancel the reservation with mandatory reason.
*/
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import NavBar from "../../components/common/nav-bar";
import { styled } from "@mui/material";
import { cancelReservation } from "../../services/reservationService";
import moment from "moment";

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

const CancelReservation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [reservationData, setReservationData] = useState([]);
  const [cancellationValues, setCancellationValues] = React.useState({
    reason: {
      value: "",
      errorMessage: ""
    }
  });

  useEffect(() => {
    if (!location.state) {
      navigate('/viewreservations');
      return;
    }
    setReservationData(location.state);
  }, [location, navigate, reservationData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCancellationValues({
      ...cancellationValues,
      [name]: { ...cancellationValues[name], value }
    })
  };

  const handleCancelReservation = async (event) => {
    const id = reservationData._id;
    const { data: result } = await cancelReservation(id, cancellationValues.reason.value);
    if (result.isCancelled) {
      navigate("/viewreservations")
    }
  }

  const validate = (event) => {
    let isSubmittable = true;
    let errorMessage = cancellationValues.reason.value === "" ? "Cancellation Reason is required." : ""
    isSubmittable &= errorMessage === "";
    setCancellationValues((cancellationValues) => ({
      ...cancellationValues,
      reason: {
        value: cancellationValues.reason.value,
        errorMessage: errorMessage
      }
    }));

    if (isSubmittable) {
      handleCancelReservation()
    }
  }

  return (
    <React.Fragment>
      <NavBar />
      {/* Reference: https://mui.com/material-ui/react-box */}
      <Box
        sx={{ flexGrow: 1 }}
        mt={10}
        bgcolor="white"
        style={{ padding: "15px" }}
      >
        {/* Reference: https://mui.com/material-ui/react-grid/ */}
        {/* Reference: https://mui.com/material-ui/react-typography */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="h4" gutterBottom>
              Cancel Reservation
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "auto",
            }}
          >
            <img
              alt="suv"
              src={reservationData.vehicleImage}
              style={{ height: "150px", width: "250px", alignSelf: "center" }}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={3}>
            {/* Reference: https://mui.com/material-ui/react-typography */}
            <Typography variant="body1" gutterBottom>
              Pickup
            </Typography>
            <Typography variant="body1" gutterBottom>
              {reservationData.pickupPostal}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {
                reservationData.pickupDate && moment(new Date(reservationData.pickupDate).toISOString().replace(/T/, " ").replace(/\..+/, "")).format("MMMM DD, YYYY")
              }, {reservationData.pickupTime}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3} md={3} margin="auto">
            <Typography variant="body1" gutterBottom>
              Drop
            </Typography>
            <Typography variant="body1" gutterBottom>
              {reservationData.dropPostal}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {
                reservationData.dropDate && moment(new Date(reservationData.dropDate).toISOString().replace(/T/, " ").replace(/\..+/, "")).format("MMMM DD, YYYY")
              },{reservationData.dropTime}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3} md={3} margin="auto">
            <Typography variant="body1" gutterBottom>
              Age: {reservationData.age}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Nationality: {reservationData.nationality}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Car Type: {reservationData.carType}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {/* Reference: https://mui.com/material-ui/react-text-field/ */}
            <TextField
              required
              id="reason"
              name="reason"
              label="Cancellation Reason"
              type="text"
              value={cancellationValues.reason.value}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              error={cancellationValues.reason.errorMessage === "" ? false : true}
              helperText={cancellationValues.reason.errorMessage}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} margin="auto">
            {/* Reference: https://mui.com/material-ui/react-button */}
            <StyledButton
              variant="contained"
              size="large"
              color="warning"
              onClick={() => navigate('/viewreservations')}
            >
              Cancel
            </StyledButton>
            <StyledButton
              variant="contained"
              size="large"
              color="success"
              onClick={validate}
            >
              Submit
            </StyledButton>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default CancelReservation;
