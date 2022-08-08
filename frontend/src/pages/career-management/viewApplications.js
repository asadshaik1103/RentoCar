/*
* @author: Maan Mandaliya (B00903171 | mn638205@dal.ca)
* @description: This file fetches all job applications for specific job posting.
*/
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
import { Card } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import { TextField } from "@mui/material";
import NavBar from "../../components/common/nav-bar";
import { getApplications } from "../../services/jobApplicationService";


const ViewApplications = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [search, setSearch] = useState();
    const [position, setPosition] = useState();

    useEffect(() => {
        if (!location.state) {
            navigate("/viewpostings");
            return;
        }
        const { positionName } = location.state
        setPosition(positionName)
        const getApplicationsFunc = async () => {
            const { data: applicationsData } = await getApplications(positionName);
            setApplications(applicationsData);
            setFilteredApplications(applicationsData)
        };
        getApplicationsFunc()
    }, [navigate, location]);

    const handleSearchChange = (event) => {
        const value = event.target.value
        setSearch(value);
        if (value !== null) {
            const filteredApplicationsData = applications.filter((application) => {
                return application.name.toLowerCase().startsWith(value.toLowerCase())
            });
            setFilteredApplications(filteredApplicationsData)
        }
        else {
            setFilteredApplications(applications)
        }
    };

    return (
        <React.Fragment>
            <NavBar />
            {/* Reference: https://mui.com/material-ui/react-box */}
            <Box sx={{ flexGrow: 1 }} mt={10} bgcolor="white" style={{ padding: '15px' }} >
                {/* Reference: https://mui.com/material-ui/react-grid/ */}
                {/* Reference: https://mui.com/material-ui/react-typography */}
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4} md={4}>
                        <Typography variant="h4" gutterBottom>Job Posting Applications</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        <Typography variant="h5" gutterBottom>Position: {position}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        <TextField
                            name="Search"
                            label="Search Applicant by Name"
                            type="text"
                            value={search || ""}
                            onChange={handleSearchChange}
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>

                    {/* Reference: https://mui.com/material-ui/react-grid/ */}
                    {filteredApplications.map((application) => (
                        <Grid item key={application._id} xs={12} sm={3} md={3}>
                            {/* Reference: https://mui.com/material-ui/react-card/ */}
                            <Card sx={{ maxWidth: 345 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Name: {application.name}</Typography>
                                    <Typography variant="body1" gutterBottom>Contact: {application.contact}</Typography>
                                    <Typography variant="body1" gutterBottom>Email: {application.email}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </React.Fragment>
    )
}

export default ViewApplications;