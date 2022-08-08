/*
* @author: Maan Mandaliya (B00903171 | mn638205@dal.ca)
* @description: This file fetches available cars according to customer requirements taken from /makereservation
*               and shows details on Frontend to reseve the car
*/
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import NavBar from "../../components/common/nav-bar";
import { styled } from "@mui/material";
import { getSpecificVehicles } from "../../services/vehicleService";

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

const AvailableCars = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [vehicles, setVehicles] = useState([]);
  const [allVehicles, setAllVehicles] = useState([]);
  const [reservationData, setReservationData] = useState({});
  const [filter, setFilter] = useState("Any");
  const [sortBy, setSortBy] = useState("Price-L2H");
  const [dateDiff, setDateDiff] = useState(0);

  useEffect(() => {
    if (!location.state) {
      navigate('/makereservation');
      return;
    }
    setReservationData(location.state);
    const getVehicles = async () => {
      const { data: newVehicles } = await getSpecificVehicles(location.state);
      setAllVehicles(newVehicles);
      setVehicles(newVehicles);
    };
    getVehicles()
    const setDateDifference = () => {
      var pickupDateObject = new Date(location.state.pickupDate)
      var dropDateObject = new Date(location.state.dropDate)
      if (dropDateObject.getTime() !== pickupDateObject.getTime()) {
        let difference = dropDateObject.getTime() - pickupDateObject.getTime()
        setDateDiff(Math.ceil(difference / (1000 * 3600 * 24)))
      }
    }
    setDateDifference()
  }, [location, navigate, reservationData]);

  const handleFilterChange = (event) => {
    const { value } = event.target;
    setFilter(value)
    if (value !== "Any") {
      const filteredVehicles = allVehicles.filter(vehicle => {
        return vehicle.type === value;
      })
      setVehicles(filteredVehicles);
    }
    else {
      setVehicles(allVehicles);
    }
  };

  const handleSortChange = (event) => {
    const { value } = event.target;
    setSortBy(value)
    if (value === "Price-L2H") {
      const l2hVehicles = [...vehicles].sort((a, b) => a.price - b.price)
      setVehicles(l2hVehicles)
    }
    else {
      const h2lvehicles = [...vehicles].sort((a, b) => b.price - a.price)
      setVehicles(h2lvehicles)
    }
  };

  const handleReserve = (vehicle) => {
    vehicle.price = dateDiff > 0 ? vehicle.price * dateDiff : vehicle.price
    navigate(`/vehicles/${vehicle._id}`, {
      state: { ...vehicle, ...reservationData, vehicleImage: vehicle.image }
    });
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
        <Box>
          {/* Reference: https://mui.com/material-ui/react-grid/ */}
          <Grid container spacing={3} margin="auto">
            <Grid item xs={12} sm={6} md={6}>
              {/* Reference: https://mui.com/material-ui/react-typography */}
              <Typography variant="body1" gutterBottom>
                Pickup
              </Typography>
              <Typography variant="body1" gutterBottom>
                {reservationData.pickupPostal}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {reservationData.pickupDate}, {reservationData.pickupTime}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} margin="auto">
              <Typography variant="body1" gutterBottom>
                Drop
              </Typography>
              <Typography variant="body1" gutterBottom>
                {reservationData.dropPostal}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {reservationData.dropDate}, {reservationData.dropTime}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              {/* Reference: https://mui.com/material-ui/react-divider */}
              <Divider
                orientation="horizontal"
                variant="inset"
                flexItem
                style={{ marginLeft: "-1px" }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container spacing={3} margin="auto">
            <Grid item xs={12} sm={6} md={6} margin="auto">
              {/* Reference: https://mui.com/material-ui/api/form-control */}
              {/* Reference: https://mui.com/material-ui/react-select/ */}
              <FormControl fullWidth>
                <InputLabel id="filter">Filter</InputLabel>
                <Select
                  labelId="filter-label"
                  id="filter"
                  label="filter"
                  value={filter}
                  onChange={handleFilterChange}
                >
                  <MenuItem value={"Any"}>Any</MenuItem>
                  <MenuItem value={"SUV"}>SUV</MenuItem>
                  <MenuItem value={"Sedan"}>Sedan</MenuItem>
                  <MenuItem value={"Hatchback"}>Hatchback</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={6} margin="auto">
              <FormControl fullWidth>
                <InputLabel id="sort">Sort</InputLabel>
                <Select
                  labelId="sort-label"
                  id="sort"
                  label="sort"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <MenuItem value={"Price-L2H"}>Price (Low to High)</MenuItem>
                  <MenuItem value={"Price-H2L"}>Price (High to Low)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Divider
                orientation="horizontal"
                variant="inset"
                flexItem
                style={{ marginLeft: "-1px" }}
              />
            </Grid>
          </Grid>
        </Box>
        {vehicles.map((vehicle) => (
          <Box key={vehicle._id}>
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "auto",
                }}
              >
                <img
                  alt="suv"
                  src={vehicle.image}
                  style={{
                    height: "150px",
                    width: "250px",
                    alignSelf: "center",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4} margin="auto">
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    gutterBottom
                    textAlign={"center"}
                    sx={{ fontFamily: "monospace" }}
                  >
                    {vehicle.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    gutterBottom
                    textAlign={"center"}
                    sx={{ fontFamily: "monospace" }}
                  >
                    {vehicle.type}
                  </Typography>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {renderIcon(vehicle.door, "4 Door")}
                  {renderIcon(vehicle.seats, vehicle.seats + "Seats")}
                  {renderIcon(vehicle.automatic, "Automatic")}
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {renderIcon(vehicle.ac, "A/C")}
                  {renderIcon(vehicle.sportsMode, "Sports Mode")}
                  {renderIcon(vehicle.cruiseControl, "Cruise Control")}
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {renderIcon(vehicle.largeBag > 0, vehicle.largeBag + "Large Bags")}
                  {renderIcon(vehicle.smallBag > 0, vehicle.smallBag + "Small Bags")}
                  {renderIcon(vehicle.childCarSeat, "Child Car Seat")}
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                md={4}
                textAlign="center"
                margin={"auto"}
              >
                <h2>C$ {dateDiff > 0 ? vehicle.price * dateDiff : vehicle.price} Total </h2>
                <StyledButton
                  variant="contained"
                  size="large"
                  color="success"
                  onClick={() => handleReserve(vehicle)}
                >
                  Reserve
                </StyledButton>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Divider
                  orientation="horizontal"
                  variant="inset"
                  flexItem
                  style={{ marginLeft: "-1px" }}
                />
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </React.Fragment>
  );
};

const renderIcon = (status, text) => {
  if (status)
    return (
      <>
        {/* Reference: https://mui.com/material-ui/material-icons */}
        <CheckIcon sx={{ display: { md: "flex" }, mr: 1 }} color="success" />
        <Typography variant="div" gutterBottom>
          {text}
        </Typography>
      </>
    );
  else
    return (
      <>
        <CloseIcon sx={{ display: { md: "flex", color: "red" }, mr: 1 }} />
        <Typography variant="div" gutterBottom>
          {text}
        </Typography>
      </>
    );
};

export default AvailableCars;
