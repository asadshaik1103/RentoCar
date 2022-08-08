import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import { Grid, Stack } from "@mui/material";
import Typography from '@mui/material/Typography';
import { Button } from 'primereact/button';
import axios from 'axios';

import NavBar from "../../components/common/nav-bar";
import userimage from '../../assets/images/userimage.jpg'
import auth from "./../../services/authService";
import { useNavigate } from "react-router-dom";

function UserProfile({ user })  {
    const [fetcheduser,setFetcheduser] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        loadUserProfile();
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/updatepassword");
      };
      

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
        return (
            <div>
                <div>
                <NavBar/>
                <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ marginTop: "40px" }}>
                    <Grid item xs={3} width={{ xs: "80%", md: "60%", lg: "35%" }}>
                        <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
                            <Stack spacing={1.5} alignItems="center">
                                <div className="avatar">
                                    <img  src={userimage}  className="card-img-top"  alt=""/>
                                </div>
                            </Stack>
                            <Typography variant="span" component="span" style={{}}>
                            <h2>User Profile</h2>
                            Username : {fetcheduser?.username}
                            <br></br>
                            First Name : {fetcheduser?.firstname}
                            <br></br>
                            Fast Name : {fetcheduser?.lastname}
                            <br></br>
                            Email Id : {fetcheduser?.email}
                            </Typography>
                            <br/><br/>
                            <Button type="submit" variant="contained" style={{ minHeight: "40px", backgroundColor: "#00d2d3" }}> 
                                Change Password
                            </Button>
                            </Box>
                    </Grid>
                </Grid>
                </div>
            </div>
        )
}
export default UserProfile;