/*
* @author: Maan Mandaliya (B00903171 | mn638205@dal.ca)
* @description: This file fetches existing reservations from database and shows in card format with option to modify and cancel.
*/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { TextField } from "@mui/material";
import { CardActions, Button } from "@mui/material";
import NavBar from "../../components/common/nav-bar";
import { styled } from "@mui/material";
import { getReservations } from "../../services/reservationService";
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

const ViewReservations = ({ user }) => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [search, setSearch] = useState();

  useEffect(() => {
    if (user === null) {
      navigate("/");
      return;
    }
    const getReservationsData = async () => {
      const { data: newReservations } = await getReservations();
      if (user.username === "admin") {
        setReservations(newReservations);
        setFilteredReservations(newReservations);
      }
      else {
        const newFilteredReservations = newReservations.filter((newReservation) => {
          return newReservation.username === user.username;
        });
        setReservations(newFilteredReservations);
        setFilteredReservations(newFilteredReservations);
      }
    };
    getReservationsData()
  }, [navigate]);

  const handleSearchChange = (event) => {
    const value = event.target.value
    setSearch(value);
    if (search !== null) {
      const filteredReservationsData = reservations.filter((reservation) => {
        return reservation.number.toLowerCase().startsWith(value.toLowerCase())
      });
      setFilteredReservations(filteredReservationsData)
    }
    else {
      setFilteredReservations(reservations)
    }
  };

  const enableCardActions = (pickupDate) => {
    // Reservation Cancellation and Modification is not possible within 24 hours of Car Pickup
    pickupDate = new Date(pickupDate)
    const today = new Date()
    const dayDifference = Math.ceil((pickupDate.getTime() - today.getTime()) / (1000 * 3600 * 24))
    return dayDifference > 1;
  };

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
          <Grid item xs={12} sm={4} md={4}>
            <Typography variant="h4" gutterBottom>
              Reservations
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <TextField
              name="Search"
              label="Search by Reservation Number"
              type="text"
              value={search || ""}
              onChange={handleSearchChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            {/* Reference: https://mui.com/material-ui/react-button */}
            <StyledButton
              variant="contained"
              size="large"
              color="success"
              onClick={() => {
                navigate("/makereservation");
              }}
            >
              Make a Reservation
            </StyledButton>
          </Grid>
          {/* Reference: https://mui.com/material-ui/react-grid/ */}
          {filteredReservations.map((reservation) => (
            <Grid item key={Math.random()} xs={12} sm={3} md={3}>
              {/* Reference: https://mui.com/material-ui/react-card/ */}
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="150"
                  image={reservation.vehicleImage}
                  alt={reservation.carType}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Reservation: {reservation.number}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Pickup
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {reservation.pickupPostal}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {
                      moment(new Date(reservation.pickupDate).toISOString().replace(/T/, " ").replace(/\..+/, "")).format("MMMM DD, YYYY")
                    }, {reservation.pickupTime}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Drop
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {reservation.dropPostal}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {
                      moment(new Date(reservation.dropDate).toISOString().replace(/T/, " ").replace(/\..+/, "")).format("MMMM DD, YYYY")
                    }, {reservation.dropTime}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Age: {reservation.age}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Nationality: {reservation.nationality}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Car Type: {reservation.carType}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    C$ {reservation.price} Total
                  </Typography>
                </CardContent>
                {
                  enableCardActions(reservation.pickupDate) ?
                    <CardActions>
                      <StyledButton
                        size="small"
                        onClick={() => {
                          navigate("/modifyreservation", { state: reservation })
                        }}
                      >
                        Modify
                      </StyledButton>
                      <StyledButton
                        size="small"
                        onClick={() => {
                          navigate("/cancelreservation", { state: reservation });
                        }}
                      >
                        Cancel
                      </StyledButton>
                    </CardActions>
                    : null
                }
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </React.Fragment>
  );
};


export default ViewReservations;
