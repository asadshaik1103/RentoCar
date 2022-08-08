import { Button, Grid, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import Input from "../../components/common/input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginNavBar from "../../components/common/nav-bar-login";
import axios from 'axios';
import userService from "./../../services/userService";
import auth from "./../../services/authService";

const UpdatePassword = ({userObj}) => {
    const [fetcheduser,setFetcheduser] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = ({ currentTarget: input }) => {
    const account = { ...user };
    account[input.name] = input.value;
    setUser(account);
  };

    useEffect(() => {
        loadUserProfile();
    }, [])

    const loadUserProfile = () =>{
        const headers = {
            'x-auth-token': auth.getJwt(),
        }
        axios.get('/auth/me', {headers: headers}).then((response) => {
            setFetcheduser(response.data.user)
        }, (err) => {
            const message = err.response.data.message;    
            console.log(message);
        });
    }

  const validate = () => {
    const allErrors = {};

    // TODO: Validate Password
    if (user.password.length < 8) {
      allErrors.password =
        "Password should contain minimum of eight characters";
    } else if (!user.password.match(/^[a-zA-Z0-9!@#$&()\\-`.+,/"]*$/)) {
      allErrors.password =
        "Password can only contain alpha-numeric and special characters";
    }

    // TODO: Validate Confirm Password
    if (user.confirmPassword.length < 8) {
      allErrors.confirmPassword =
        "Confirm Password should contain minimum of eight characters";
    } else if (!user.confirmPassword.match(/^[a-zA-Z0-9!@#$&()\\-`.+,/"]*$/)) {
      allErrors.confirmPassword =
        "Confirm Password can only contain alpha-numeric and special characters";
    } else if (user.confirmPassword !== user.password) {
      allErrors.confirmPassword = "Passwords do not match";
    }

    return allErrors;
  };

  const headers = {
    'Content-Type': 'application/json',
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const allErrors = validate();
    setErrors(allErrors);
    if (Object.keys(allErrors).length !== 0) {
      return;
    }
    let requestBody = {
      "email": fetcheduser.email,
      "password" : user.password
    }
    toast.success("Password Updated Successfully.Logging out");
    let response = userService.updatePassword(requestBody)
    console.log(response)
    
    auth.logout();
    window.location="/";
  };

  return (
    <div>
    <LoginNavBar/>
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
             {/* <Input
              label="First Name"
              name="firstName"
              type="text"
              value={user.firstName}
              onChange={handleChange}
              errors={errors}
            />
            <Input
              label="Last Name"
              name="lastName"
              type="text"
              value={user.lastName}
              onChange={handleChange}
              errors={errors}
            />
            <Input
              label="Username"
              name="userName"
              type="text"
              value={user.userName}
              onChange={handleChange}
              errors={errors}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              errors={errors}
            /> */}
             <Typography variant="span" component="span" style={{}}>
              <Link to="" style={{ textDecoration: "none", color: "#00d2d3" }}>
                Enter new password below
              </Link>
            </Typography>
            <Input
              label="Password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              errors={errors}
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={user.confirmPassword}
              onChange={handleChange}
              errors={errors}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={{ minHeight: "40px", backgroundColor: "#00d2d3" }}
            >
              Update Password
            </Button>
           
          </Stack>
        </Box>
      </Grid>
    </Grid>
    </div>
  );
};

export default UpdatePassword;
