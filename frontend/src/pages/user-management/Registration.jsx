import { Button, Grid, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import Input from "../../components/common/input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoginNavBar from "../../components/common/nav-bar-login";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const account = { ...user };
    account[input.name] = input.value;
    setUser(account);
  };

  const validate = () => {
    const allErrors = {};

    // Validate First Name
    if (user.userName === "") {
      allErrors.userName = " Username cannot be empty";
    } else if (!user.userName.match(/^[a-zA-Z]*$/)) {
      allErrors.userName = "Username can only contain letters";
    }

    // Validate Last Name
    if (user.firstName === "") {
      allErrors.firstName = "First Name cannot be empty";
    } else if (!user.firstName.match(/^[a-zA-Z]*$/)) {
      allErrors.firstName = "First Name can only contain letters";
    }

    // Validate Last Name
    if (user.lastName === "") {
      allErrors.lastName = "Last Name cannot be empty";
    } else if (!user.lastName.match(/^[a-zA-Z]*$/)) {
      allErrors.lastName = "Last Name can only contain letters";
    }

    // TODO: Validate Email
    if (user.email === "") {
      allErrors.email = "Email cannot be empty";
    } else if (!user.email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
      allErrors.email = "Email format is not valid";
    }

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
    "Content-Type": "application/json",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allErrors = validate();
    setErrors(allErrors);
    if (Object.keys(allErrors).length !== 0) {
      return;
    }

    let requestBody = {
      firstname: user.firstName,
      lastname: user.lastName,
      username: user.userName,
      email: user.email,
      password: user.password,
    };
    console.log(requestBody);
    axios
      .post("/users/register", JSON.stringify(requestBody), {
        headers: headers,
      })
      .then(
        (response) => {
          toast.success("Registered successfuly");
        },
        (err) => {
          const message = err.response.data.message;
          toast.error(message);
        }
      );
    navigate("/");
  };

  return (
    <div>
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
              <Box
                component="img"
                sx={{
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                  marginBottom: "20px",
                }}
                alt="RentoCar."
                src="/logo200x50.png"
              />
              <Input
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
              />
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
                Register
              </Button>
              <Typography variant="span" component="span" style={{}}>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "#00d2d3" }}
                >
                  Already have an account?
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
