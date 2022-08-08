import React, { useState, useEffect, useContext } from "react";
import auth from "./../../services/authService";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import LinkMUI from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import NavBar from "../../components/common/nav-bar";
import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import OfferContext from "../../context/offerContext";
import { LinkedCameraOutlined } from "@mui/icons-material";
import { postReservation } from "../../services/reservationService";
import { toast } from "react-toastify";
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <LinkMUI color="inherit" href="#">
        RentoCar
      </LinkMUI>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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

const steps = ["Billing address", "Payment details", "Review your order"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

const theme = createTheme();

export default function Checkout({user}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = React.useState(0);
  const [fetcheduser,setFetcheduser] = useState([]);
  const [reservationData, setReservationData] = useState({});
  const context = useContext(OfferContext);
  
  useEffect(() => {
    
    if (!location.state) {
      navigate('/makereservation');
    }
    setReservationData(location.state)
    loadUser();
  }, [])

  const loadUser = () =>{
    const headers = {
        'x-auth-token': auth.getJwt(),
      }
    axios.get('/auth/me', {headers: headers}).then((response) => {
        setFetcheduser(response.data.user)
      }, (err) => {
        const message = err.response.data.message;    
      });
    }

  const handleNext = () => {
      var fname, lname, address, city, state, country, zip, insurance;
      var cname, cnumber, exp,cvv;
      var data=reservationData;

    
      var error=false;

      localStorage.setItem("car_name",data['name']);
      localStorage.setItem("car_image",data['image']);
      localStorage.setItem("pickupDate", data['pickupDate']);
      localStorage.setItem("pickupTime", data['pickupTime']);
      
      

    if(activeStep === steps.length - 3){
     
      fname=document.querySelector("#firstName").value
      localStorage.setItem("fname",fname);
      lname=document.querySelector("#lastName").value
      localStorage.setItem("lname",lname);
      address=document.querySelector("#address1").value
      if(document.querySelector("#address2").value!=null){
        address=address+" "+document.querySelector("#address2").value
      }
      localStorage.setItem("address",address);
      city=document.querySelector("#city").value
      localStorage.setItem("city",city);
      state=document.querySelector("#state").value
      localStorage.setItem("state",state);
      country=document.querySelector("#country").value
      localStorage.setItem("country",country);
      zip=document.querySelector("#zip").value
      localStorage.setItem("zip",zip);
      localStorage.setItem("price",data['price'])
      if(document.querySelector("#addInsurance").checked){
        insurance=true
    }
    else{
      insurance=false
    }
    localStorage.setItem("offer_percentage",context.offer);
    var cost=data['price']-data['price']*context.offer/100

    var insurance_cost=0
    if(insurance){
      insurance_cost=data['price']*0.1
      setReservationData({...reservationData,price:cost+insurance_cost})
      
    }
    else{
      setReservationData({...reservationData,price:cost})
    }

    localStorage.setItem("insurance",insurance);
    localStorage.setItem("insurance_cost",insurance_cost);  

    if(fname===""){
      toast.error("first name should not be Empty");
      error=true;
    }
    if(lname===""){
      toast.error("Last name should not be Empty");
      error=true;
    }
    if(address===""){
      toast.error("Address should not be Empty");
      error=true;
    }
    if(city===""){
      toast.error("City should not be Empty");
      error=true;
    }
    if(city.length<3){
      toast.error("City name length should not be less than 3");
      error=true;
    }
    if(state===""){
      toast.error("State/Province should not be Empty");
      error=true;
    }
    if(state.length<3){
      toast.error("State/Province name length should not be less than 3");
      error=true;
    }
    if(zip===""){
      toast.error("zip should not be Empty");
      error=true;
    }
    if(zip.length!==6){
      toast.error("zip length should be of 6 characters");
      error=true;
    }
    if(country===""){
      toast.error("Country should not be Empty");
      error=true;
    }
    if(country.length<3){
      toast.error("Country name length should not be less than 3");
      error=true;
    }


    localStorage.setItem("error","test_error"); 
  }
    if(activeStep === steps.length - 2){
      cname=document.querySelector("#cardName").value
      cnumber=document.querySelector("#cardNumber").value
      exp=document.querySelector("#expDate").value
      cvv=document.querySelector("#cvv").value
      localStorage.setItem("cardName",cname)
      localStorage.setItem("cardNumber",cnumber)
      localStorage.setItem("expDate",exp)
      localStorage.setItem("total_price",data['price'])
      if(cname===""){
        toast.error("card name should not be Empty");
        error=true;
      }
      if(cnumber===""){
        toast.error("card number should not be Empty");
        error=true;
      }
      if(cvv===""){
        toast.error("cvv should not be Empty");
        error=true;
      }
      if(cname.length<3){
        toast.error("Name on Card should not be less than 3 characters");
        error=true;
      }
      if(cnumber.length!==16){
        toast.error("card number should be of 16 digits");
        error=true;
      }
      if(cvv.length!==3){
        toast.error("cvv should be of 3 digits");
        error=true;
      }




    }

    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    function generateString(length) {
      let result = ' ';
      const charactersLength = characters.length;
      for ( let i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
  
      return result;
  }

    if(activeStep === steps.length - 1){
      
      var booking=generateString(6);
      data['bookingID']=booking.trim()
      data['username']=fetcheduser.username
     // setReservationData({...reservationData,bookingID:booking})

      localStorage.setItem("bookingID",booking)
      axios.post('/payment', {
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        bookingID: booking,
        paymentID: localStorage.getItem("cardName")+generateString(7),
        username: fetcheduser.username,
        address: localStorage.getItem('address'),
        city: localStorage.getItem('city'),
        state: localStorage.getItem('state'),
        country: localStorage.getItem('country'),
        zip: localStorage.getItem('zip'),
        insurance: localStorage.getItem('insurance')
      })
      .then(function (response) {
        //axios.post('/')
       
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
        const postReservationData = async() => {
        const result = await postReservation(data);
        if (result.number === booking) {
          console.log("Reservation Added succefully")
        }
      };
      postReservationData()

    }
    if(error===false){
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your booking confirmation number is #{localStorage.getItem("bookingID")}. We have emailed
                  your booking confirmation. Please bring this number to station
                  to pick up the car
                </Typography>
                <Link
                  style={{ textDecoration: "none", color: "#00d2d3" }}
                  to="/viewreservations"
                >
                  View Reservations
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <StyledButton onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </StyledButton>
                  )}

                  <StyledButton
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1, backgroundColor: "#00d2d3" }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </StyledButton>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
