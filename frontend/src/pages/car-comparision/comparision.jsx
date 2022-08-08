import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./comparision.css";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import NavBar from "../../components/common/nav-bar";
import { getVehicles } from "../../services/vehicleService";

const ExpandMore = styled((props) => {
const { expand, ...other } = props;
return <IconButton {...other} />;

})
(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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

export default function Comparision() {
  const [expanded, setExpanded] = React.useState(false);
  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [MongoCarData , SetMongoCarData] = useState([]);
  const [showDifferences, setShowDifferences] = useState(false);

  const [features, setFeatures] = React.useState([

    {key : 'sportsMode',label: 'sportsMode'},
    {key : 'automatic',label: 'automatic'},
    {key : 'largeBag',label: 'largeBag'},
    {key : 'smallBag',label: 'smallBag'},
    {key : 'price',label: 'price'},
    {key : 'seats',label: 'seats'},
    {key: 'ac', label: 'AC'}
  ]);

  const [diffFeatures, setDiffFeatures] = React.useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data: vehicles } = await getVehicles();
        SetMongoCarData( vehicles );
        console.log("vehicles: ", vehicles);
    };
    getData();
  },[]);

  const [carCompareOne, setCarCompareOne] = React.useState({
    id: 1,
    name: "",
    image:
      "https://previews.123rf.com/images/tatianasun/tatianasun1705/tatianasun170500026/77826883-looking-for-car-selling-icon-magnifying-glass-search-car-vector-logo-illustration-.jpg",
    ac : false,
    automatic:false,
    largeBag:0,
    price : 0,
    seats:0,
    smallBag:0,
    sportsMode:false
    });

  const [carCompareTwo, setCarCompareTwo] = React.useState({
    id: 1,
    name: "",
    image:
      "https://previews.123rf.com/images/tatianasun/tatianasun1705/tatianasun170500026/77826883-looking-for-car-selling-icon-magnifying-glass-search-car-vector-logo-illustration-.jpg",
    ac : false,
    automatic:false,
    largeBag:0,
    price : 0,
    seats:0,
    smallBag:0,
    sportsMode:false
  });
  
  const [carCompareThree, setCarCompareThree] = React.useState({
    id: 1,
    name: "",
    image:
      "https://previews.123rf.com/images/tatianasun/tatianasun1705/tatianasun170500026/77826883-looking-for-car-selling-icon-magnifying-glass-search-car-vector-logo-illustration-.jpg",
    ac : false,
    automatic:false,
    largeBag:0,
    price : 0,
    seats:0,
    smallBag:0,
    sportsMode:false
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleExpandClick1 = () => {
    setExpanded1(!expanded1);
  };
  const handleExpandClick2 = () => {
    setExpanded2(!expanded2);
  };

  const [search1, setSearch1] = useState();
  const [search2, setSearch2] = useState();
  const [search3, setSearch3] = useState();

  const handleSearch = () => {
    const car = MongoCarData.find(c => c.name.toLowerCase().includes(search1.toLowerCase()));
    console.log(MongoCarData);
    if(car !== undefined){
      setCarCompareOne(car);
    }
  };

  React.useEffect(() => {
    console.log("carCompares: ", MongoCarData);
    let diffFeatures = [];
    if (showDifferences && (carCompareOne || carCompareTwo || carCompareThree)) {
      Object.keys(carCompareOne).forEach(carInfo => {
        if (carCompareTwo[carInfo] && carCompareOne[carInfo] && carCompareTwo[carInfo] !== carCompareOne[carInfo]) {
          diffFeatures.push(carInfo);
        }
        else if(carCompareOne[carInfo] &&carCompareThree[carInfo] && carCompareOne[carInfo] !== carCompareThree[carInfo]){
          diffFeatures.push(carInfo);
        }
        else if(carCompareThree[carInfo] && carCompareTwo[carInfo] && carCompareThree[carInfo] !== carCompareTwo[carInfo]){
          diffFeatures.push(carInfo);
        }
      });
      console.log("difffeatures: ", diffFeatures);
      setDiffFeatures(diffFeatures);
    }
  },[carCompareOne,carCompareTwo,carCompareThree,showDifferences]);

  const handleSearch2 = () => {
    const car = MongoCarData.find(c => c.name.toLowerCase().includes(search2.toLowerCase()));
    if(car !== undefined){
      setCarCompareTwo(car);
    }
  };

  const handleSearch3 = () => {
    const car = MongoCarData.find(c => c.name.toLowerCase().includes(search3.toLowerCase()));
    if(car !== undefined){
      setCarCompareThree(car);
    }
  };

  const rows = [];



  const getTableStyles = (featKey) => {
    let feat = diffFeatures.find(feature => {
      return feature === featKey;
    });
    if (diffFeatures.length > 0 && feat) {
      return {marginTop:"7px", border: '2px solid #000'}
    }
    return {marginTop:"7px"};
  }

  return (
    <>
      <NavBar />
      <Grid xs={12} sm={6} md={4}>
        <div className="inside-car-component">
          {/* <div className = 'search-bars'> */}
          <div className="single-Component">
            <div className="search-bars">
              <TextField
                id="outlined-textarea"
                label="ENTER HYUNDAI TO CHECK"
                placeholder="Search car name"
                multiline
                onChange={(event) => {
                  setSearch1(event.target.value);
                }}
                sx={{
                  margin: 1,
                  fontWeight: "bold",
                  width: 300,
                  background: "#fff",
                  borderRadius: "7px",
                }}
              />
              <div className="search-button">
                <StyledButton
                  variant="contained"
                  size="small"
                  onClick={handleSearch}
                  sx={{ height: 55 }} >
                  Search
                </StyledButton>
              </div>
            </div>
            <Card sx={{ maxWidth: 400 }}>
              <a>
                <h3 className="car-name" sx = {{display : 'block'}}> {carCompareOne.name} </h3>
                <br></br>
              </a>
              <CardMedia
                component="img"
                height="194"
                image={carCompareOne.image}
                alt="No Image Found"
                sx={{
                  width: "95%",
                  border: "linear-gradient(to right bottom, #260B3C, #a053df)",
                  paddingTop: "5%",
                  paddingLeft: "5%",
                  paddingRight: "5%",
                  borderRadius: "15%",
                }}
              />
              <CardContent>
                <Typography color="text.secondary"></Typography>
              </CardContent>
              <CardActions disableSpacing>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more" >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell
                              sx={{
                                textAlign: "center",
                                fontWeight: "bold",
                                fontSize: "20px",
                                width: "40%",
                                background:"#00D2D3"
                                }} >
                              FEATURES
                          </StyledTableCell>
                          <StyledTableCell
                              sx={{
                                textAlign: "center",
                                fontWeight: "bold",
                                fontSize: "20px",
                                background:"#00D2D3",
                                backgroundColor: "#00D2D3"
                                }} >
                              AVAILABILITY
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody sx={{margin:"10px"}}>
                      {features.map((feat) => (
                          <StyledTableRow key={feat.key} sx = {getTableStyles(feat.key)}>
                            <StyledTableCell  sx={{
                            textAlign: "center",
                            fontSize: "10px",
                            borderRadius: "15%",
                            justifyContent: "space-between",
                            
                            }} component="th" scope="row">
                           <strong> {feat.label.toUpperCase()}</strong>
                            </StyledTableCell>
                            <StyledTableCell sx = {{backgroundColor:"#00D2D3", textAlign: "center", color:"white", fontWeight:"bold"}}>
                               { JSON.stringify(carCompareOne[feat.key]).toUpperCase() }
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Collapse>
            </Card>
          </div>
          <div className="single-Component">
            <div className="search-bars">
              <TextField
                id="outlined-textarea"
                label="ENTER BMW TO CHECK"
                placeholder="Search car name"
                multiline
                onChange={(event) => {
                  setSearch2(event.target.value);
                }}
                sx={{
                  margin: 1,
                  fontWeight: "bold",
                  width: 300,
                  background: "#fff",
                  borderRadius: "7px",
                }}
              />
              <div className="search-button">
                <StyledButton
                  variant="contained"
                  size="small"
                  onClick={handleSearch2}
                  sx={{ height: 55 }} >
                  Search
                </StyledButton>
              </div>
            </div>
            <Card sx={{ maxWidth: 400 }}>
              <a>
                <h3 className="car-name"  sx = {{display : 'block'}}>{carCompareTwo.name} </h3>
                <br></br>
              </a>
              <></>
              <CardMedia
                component="img"
                height="194"
                image={carCompareTwo.image}
                alt="No Image Found"
                sx={{
                  width: "95%",
                  border: "linear-gradient(to right bottom, #260B3C, #a053df)",
                  paddingTop: "5%",
                  paddingLeft: "5%",
                  paddingRight: "5%",
                  borderRadius: "15%",
                }}
              />
              <CardContent>
                <Typography color="text.secondary"></Typography>
              </CardContent>
              <CardActions disableSpacing>
                <ExpandMore
                  expand1={expanded1}
                  onClick={handleExpandClick1}
                  aria-expanded={expanded1}
                  aria-label="show more" >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded1} timeout="auto" unmountOnExit>
                <CardContent>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell
                            sx={{
                              textAlign: "center",
                              fontWeight: "bold",
                              fontSize: "20px",
                              width: "40%"
                            }} >
                            FEATURES
                          </StyledTableCell>
                          <StyledTableCell
                              sx={{
                                textAlign: "center",
                                fontWeight: "bold",
                                fontSize: "20px",
                                background:"#00D2D3",
                                backgroundColor: "#00D2D3"
                                }} >
                              AVAILABILITY
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {features.map((feat) => (
                          <StyledTableRow key={feat.key} sx = {getTableStyles(feat.key)}>
                            <StyledTableCell  sx={{
                            textAlign: "center",
                            fontSize: "10px",
                            borderRadius: "15%",
                            justifyContent: "space-between",
                            
                            }} component="th" scope="row">
                           <strong> {feat.label.toUpperCase()}</strong>
                            </StyledTableCell>
                            <StyledTableCell sx = {{backgroundColor:"#00D2D3", textAlign: "center", color:"white", fontWeight:"bold"}}>
                               { JSON.stringify(carCompareTwo[feat.key]).toUpperCase() }
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Collapse>
            </Card>
          </div>
          <div className="single-Component">
            <div className="search-bars">
              <TextField
                id="outlined-textarea"
                label="ENTER CADILLAC TO CHECK"
                placeholder="Search car name"
                multiline
                onChange={(event) => {
                  setSearch3(event.target.value);
                }}
                sx={{
                  margin: 1,
                  fontWeight: "bold",
                  width: 300,
                  background: "#fff",
                  borderRadius: "7px",
                }}
              />
              <div className="search-button">
                <StyledButton
                  variant="contained"
                  size="small"
                  onClick={handleSearch3}
                  sx={{ height: 55 }} >
                  Search
                </StyledButton>
              </div>
            </div>
            <Card sx={{ maxWidth: 400 }}>
              <a>
                <h3 className="car-name">{carCompareThree.name} </h3>
                <br></br>
              </a>
              <CardMedia
                component="img"
                height="194"
                image={carCompareThree.image}
                alt="No Image Found"
                sx={{
                  width: "95%",
                  border: "linear-gradient(to right bottom, #260B3C, #a053df)",
                  paddingTop: "5%",
                  paddingLeft: "5%",
                  paddingRight: "5%",
                  borderRadius: "15%",
                }}/>
              <CardContent>
                <Typography color="text.secondary"></Typography>
              </CardContent>
              <CardActions disableSpacing>
                <ExpandMore
                  expand2={expanded2}
                  onClick={handleExpandClick2}
                  aria-expanded={expanded2}
                  aria-label="show more">
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded2} timeout="auto" unmountOnExit>
                <CardContent>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell
                            sx={{
                              textAlign: "center",
                              fontWeight: "bold",
                              fontSize: "20px",
                              width:"40%"
                            }} >
                            FEATURES
                          </StyledTableCell>
                          <StyledTableCell
                              sx={{
                                textAlign: "center",
                                fontWeight: "bold",
                                fontSize: "20px",
                                background:"#00D2D3",
                                backgroundColor: "#00D2D3"
                                }} >
                              AVAILABILITY
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {features.map((feat) => (
                          <StyledTableRow key={feat.key} sx = {getTableStyles(feat.key)}>
                            <StyledTableCell  sx={{
                            textAlign: "center",
                            fontSize: "10px",
                            borderRadius: "15%",
                            justifyContent: "space-between",
                            
                            }} component="th" scope="row">
                           <strong> {feat.label.toUpperCase()}</strong>
                            </StyledTableCell>
                            <StyledTableCell sx = {{backgroundColor:"#00D2D3", textAlign: "center", color:"white", fontWeight:"bold"}}>
                               { JSON.stringify(carCompareThree[feat.key]).toUpperCase() }
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Collapse>
            </Card>
          </div>
        </div>
      </Grid>
      <div>
        <StyledButton
          variant="contained"
          size="small"
          onClick={() => {
            if(showDifferences === false) {
              setShowDifferences(true)
            }else{ setShowDifferences(false) }
          }}
          sx={{ height: 55 }}>
          SEE COMPARISION
        </StyledButton>
      </div>
    </>
  );
}
