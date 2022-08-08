  import { Button, Grid, Stack, Select,InputLabel,MenuItem, FormControl} from "@mui/material";
  import Box from "@mui/material/Box";
  import React, { useState, useEffect } from "react";
  import Input from "../../components/common/input";
  import { useNavigate } from "react-router-dom";
  import { toast } from "react-toastify";
  import NavBar from "../../components/common/nav-bar";
  import auth from "./../../services/authService";
  import axios from "axios";
  
  const NewTicket = ({ users }) => {
    const [fetcheduser, setFetcheduser] = useState([]);
    useEffect(() => {
      loadUserProfile();
    }, []);
  
    const navigate = useNavigate();
    const [type, setType] = useState("");
    const [user, setUser] = useState({
      ticketDescription: "",
      ticketType: "",
      status: "",
      raisedBy: "",
      modifiedBy: "",
    });
    const [errors, setErrors] = useState({});
  
    const handleChange = ({ currentTarget: input }) => {
      const account = { ...user };
      account[input.name] = input.value;
      setUser(account);
    };
  
    const handleTypeChange = (event) => {
      console.log(event.target.value);
      setType(event.target.value);
    };
    const loadUserProfile = () => {
      const headers = {
        "x-auth-token": auth.getJwt(),
      };
      axios.get("/auth/me", { headers: headers }).then(
        (response) => {
          setFetcheduser(response.data.user);
        },
        (err) => {
          const message = err.response.data.message;
          console.log(message);
        }
      );
    };
    //   const handleChange = event => {
    //     console.log(event.target.value);
    //     setSelected(event.target.value);
    //   };
    const validate = () => {
      const allErrors = {};
      if (user.ticketDescription === "") {
        allErrors.ticketDescription = " Description cannot be empty";
      }
      return allErrors;
    };
  
    const headers = {
      "Content-Type": "application/json",
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const allErrors = validate();
      setErrors(allErrors);
      if (Object.keys(allErrors).length !== 0) {
        return;
      }
  
      console.log(users);
  
      let requestBody = {
        ticketDescription: user.ticketDescription,
        ticketType: type,
        status: "NEW",
        raisedBy: fetcheduser?.username,
        modifiedBy: fetcheduser?.username,
      };
      console.log(requestBody);
      axios
        .post("/support", JSON.stringify(requestBody), { headers: headers })
        .then(
          (response) => {
            toast.success("New Ticket Created");
          },
          (err) => {
            const message = err.response.data.message;
            toast.error(message);
          }
        );
      navigate("/userprofile");
    };
  
    return (
      <div>
        <NavBar />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ marginTop: "40px" }}
        >
          <Grid item xs={3} width={{ xs: "80%", md: "60%", lg: "35%" }}>
            <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
              <Stack spacing={1.5} alignItems="center">
                <Input
                  label="Ticket Description"
                  name="ticketDescription"
                  type="text"
                  value={user.ticketDescription}
                  onChange={handleChange}
                  errors={errors}
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Ticket Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    name="ticketType"
                    id="demo-simple-select"
                    value={type}
                    onChange={handleTypeChange}
                  >
                    <MenuItem value={"Payment"}>Payment</MenuItem>
                    <MenuItem value={"Reservation"}>Reservation</MenuItem>
                    <MenuItem value={"Account"}>Account</MenuItem>
                    <MenuItem value={"Availability"}>Availability</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  style={{ minHeight: "40px", backgroundColor: "#00d2d3" }}
                >
                  Create Ticket
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </div>
    );
  };
  
  export default NewTicket;
  