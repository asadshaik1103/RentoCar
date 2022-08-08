/*
* @author: Maan Mandaliya (B00903171 | mn638205@dal.ca)
* @description: This file helps user to apply for a job posting through form.
*/
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NavBar from "../../components/common/nav-bar";
import { applyApplication } from "../../services/jobApplicationService";
import { styled } from "@mui/material";

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

const ApplyPosting = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [posting, setPosting] = useState()
    const [jobApplication, setJobApplication] = useState({
        name: {
            value: "",
            errorMessage: ""
        },
        contact: {
            value: "",
            errorMessage: ""
        },
        email: {
            value: "",
            errorMessage: ""
        }
    });

    useEffect(() => {
        if (!location.state) {
            navigate("/viewuserpostings")
            return;
        }
        setPosting(location.state)
    }, [location, posting])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setJobApplication({
            ...jobApplication,
            [name]: { ...jobApplication[name], value },
        });
    };

    const validate = async (event) => {
        let isSubmittable = true;
        let errorMessage = jobApplication.name.value === "" ? "Name is required." : ""
        isSubmittable &= errorMessage === "";
        setJobApplication((jobApplication) => ({
            ...jobApplication,
            name: {
                value: jobApplication.name.value,
                errorMessage: errorMessage
            }
        }));

        let errorMessage2 = jobApplication.contact.value === "" ? "Contact is required." : jobApplication.contact.value.length !== 10 ? "Contact must be of 10 digits" : ""
        isSubmittable &= errorMessage2 === "";
        setJobApplication((jobApplication) => ({
            ...jobApplication,
            contact: {
                value: jobApplication.contact.value,
                errorMessage: errorMessage2
            }
        }));

        // Reference: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
        let emailRegex = (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        let errorMessage3 = jobApplication.email.value === "" ? "Email is required." : emailRegex.test(jobApplication.email.value) ? "" : "Email is invalid"
        isSubmittable &= errorMessage3 === "";
        setJobApplication((jobApplication) => ({
            ...jobApplication,
            email: {
                value: jobApplication.email.value,
                errorMessage: errorMessage3
            }
        }));

        if (isSubmittable) {
            const applyPostingFunc = async () => {
                const { data: result } = await applyApplication(jobApplication, posting);
                if (result.status === "not-selected") {
                    navigate("/viewuserpostings")
                }
            }
            applyPostingFunc();
        }
    };

    return (
        <React.Fragment>
            <NavBar />
            <div style={{ textAlign: "center" }}>
                {/* Reference: https://mui.com/material-ui/react-box */}
                <Box sx={{ flexGrow: 1 }} m={10} mb={5} bgcolor="#e8e8e8" style={{ padding: '15px' }}>
                    {/* Reference: https://mui.com/material-ui/react-grid/ */}
                    {/* Reference: https://mui.com/material-ui/react-typography */}
                    <Typography variant="h4" gutterBottom>Apply Job Posting</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={12}>
                            {/* Reference: https://mui.com/material-ui/react-text-field/ */}
                            <TextField
                                required
                                id="name"
                                name="name"
                                label="Name"
                                type="text"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                                error={
                                    jobApplication.name.errorMessage === ""
                                        ? false
                                        : true
                                }
                                helperText={jobApplication.name.errorMessage}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            {/* Reference: https://mui.com/material-ui/react-text-field/ */}
                            <TextField
                                required
                                id="contact"
                                name="contact"
                                label="Contact"
                                type="text"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                                error={
                                    jobApplication.contact.errorMessage === ""
                                        ? false
                                        : true
                                }
                                helperText={jobApplication.contact.errorMessage}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            {/* Reference: https://mui.com/material-ui/react-text-field/ */}
                            <TextField
                                required
                                id="email"
                                name="email"
                                label="Email"
                                type="text"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                                error={
                                    jobApplication.email.errorMessage === ""
                                        ? false
                                        : true
                                }
                                helperText={jobApplication.email.errorMessage}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            {/* Reference: https://mui.com/material-ui/react-button */}
                            <StyledButton variant="contained" size="large" color="success" onClick={validate}>Submit</StyledButton>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </React.Fragment>
    )
}

export default ApplyPosting;