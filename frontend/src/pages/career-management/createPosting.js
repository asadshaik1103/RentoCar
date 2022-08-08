/*
* @author: Maan Mandaliya (B00903171 | mn638205@dal.ca)
* @description: This file is used to create job posting from admin side.
*/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormHelperText } from "@mui/material";
import NavBar from "../../components/common/nav-bar";
import { createPosting } from "../../services/jobPostingService";
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

const CreatePosting = ({ user }) => {
    const navigate = useNavigate();
    const [jobPosting, setJobPosting] = useState({
        position: {
            value: "",
            errorMessage: ""
        },
        location: {
            value: "",
            errorMessage: ""
        },
        pay: {
            value: null,
            errorMessage: ""
        },
        jobType: {
            value: "",
            errorMessage: ""
        },
        expiryDate: {
            value: new Date(),
            errorMessage: ""
        }
    });

    useEffect(() => {
        if (user === null) {
            navigate("/");
            return;
        }
        else if (user.isAdmin === null) {
            navigate('/');
            return;
        }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setJobPosting({
            ...jobPosting,
            [name]: { ...jobPosting[name], value },
        });
    };

    const validate = async (event) => {
        let isSubmittable = true;
        let errorMessage = jobPosting.position.value === "" ? "Position is required." : ""
        isSubmittable &= errorMessage === "";
        setJobPosting((jobPosting) => ({
            ...jobPosting,
            position: {
                value: jobPosting.position.value,
                errorMessage: errorMessage
            }
        }));

        let errorMessage2 = jobPosting.location.value === "" ? "Location is required." : ""
        isSubmittable &= errorMessage2 === "";
        setJobPosting((jobPosting) => ({
            ...jobPosting,
            location: {
                value: jobPosting.location.value,
                errorMessage: errorMessage2
            }
        }));

        let errorMessage3 = jobPosting.pay.value === null ? "Pay is required." : jobPosting.pay.value < 0 ? "Pay must be positive" : ""
        isSubmittable &= errorMessage3 === "";
        setJobPosting((jobPosting) => ({
            ...jobPosting,
            pay: {
                value: jobPosting.pay.value,
                errorMessage: errorMessage3
            }
        }));

        let errorMessage4 = jobPosting.jobType.value === "" ? "Job Type is required." : ""
        isSubmittable &= errorMessage4 === "";
        setJobPosting((jobPosting) => ({
            ...jobPosting,
            jobType: {
                value: jobPosting.jobType.value,
                errorMessage: errorMessage4
            }
        }));

        let today = new Date();
        let errorMessage5 = jobPosting.expiryDate.value === null ? "Expiry Date is required" :
            jobPosting.expiryDate.value.getDate() < today.getDate() ? "Expiry Date is before today" : ""
        isSubmittable &= errorMessage5 === "";
        setJobPosting((jobPosting) => ({
            ...jobPosting,
            expiryDate: {
                value: jobPosting.expiryDate.value,
                errorMessage: errorMessage5
            }
        }));

        if (isSubmittable) {
            const createPostingsFunc = async () => {
                const { data: result } = await createPosting(jobPosting);
                if (result.status === "enable") {
                    navigate("/viewpostings")
                }
            }
            createPostingsFunc();
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
                    <Typography variant="h4" gutterBottom>Create Job Posting</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={12} md={12}>
                            {/* Reference: https://mui.com/material-ui/react-text-field/ */}
                            <TextField
                                required
                                id="position"
                                name="position"
                                label="Position"
                                type="text"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                                error={
                                    jobPosting.position.errorMessage === ""
                                        ? false
                                        : true
                                }
                                helperText={jobPosting.position.errorMessage}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            {/* Reference: https://mui.com/material-ui/react-text-field/ */}
                            <TextField
                                required
                                id="location"
                                name="location"
                                label="Location"
                                type="text"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                                error={
                                    jobPosting.location.errorMessage === ""
                                        ? false
                                        : true
                                }
                                helperText={jobPosting.location.errorMessage}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            {/* Reference: https://mui.com/material-ui/react-text-field/ */}
                            <TextField
                                required
                                id="pay"
                                name="pay"
                                label="Pay"
                                type="text"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                                error={
                                    jobPosting.pay.errorMessage === ""
                                        ? false
                                        : true
                                }
                                helperText={jobPosting.pay.errorMessage}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <FormControl
                                fullWidth
                                error={
                                    jobPosting.jobType.errorMessage === "" ? false : true
                                }
                            >
                                <InputLabel id="jobType">Job Type *</InputLabel>
                                <Select
                                    labelId="jobType-label"
                                    id="jobType"
                                    value={jobPosting.jobType.value}
                                    label="Job Type"
                                    name="jobType"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"Part-time"}>Part-time</MenuItem>
                                    <MenuItem value={"Full-time"}>Full-time</MenuItem>
                                </Select>
                            </FormControl>
                            <FormHelperText>
                                {jobPosting.jobType.errorMessage}
                            </FormHelperText>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            {/* Reference: https://mui.com/x/react-date-pickers/date-picker/ */}
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    fullWidth
                                    id="expiry-date"
                                    label="Expiry Date *"
                                    value={jobPosting.expiryDate.value}
                                    onChange={(newValue) => {
                                        const name = "expiryDate";
                                        const value = newValue;
                                        setJobPosting({
                                            ...jobPosting,
                                            [name]: { ...jobPosting[name], value },
                                        });
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            fullWidth
                                            {...params}
                                            error={
                                                jobPosting.expiryDate.errorMessage === ""
                                                    ? false
                                                    : true
                                            }
                                            helperText={jobPosting.expiryDate.errorMessage}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
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

export default CreatePosting;