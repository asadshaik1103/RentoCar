import "./../../App.css";

// MUI imports
import Box from "@mui/material/Box";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useTheme } from '@mui/material/styles';

// Component imports
import NavBar from "./../../components/common/nav-bar";
import FabMenu from "./fab-menu/fab-menu";
import axios from "axios";
import { CardHeader } from "reactstrap";

function InventoryHome() {
  const theme = useTheme();

  const getFabMenuPositionStyles = () => {
    return {
      position: "fixed",
      bottom: "20px",
      right: "20px",
    };
  };

  const [vehicles, setVehicles] = React.useState([]);
  const [stations, setStations] = React.useState([]);
  
  // function to get all vehicles
  const getVehicles = () => {
    axios.get('/vehicles', {}).then((response) => {
      setVehicles([...response.data]);
    });
  }

  // function to get all stations
  const getStations = () => {
    axios.get('/stations', {}).then((response) => {
      setStations([...response.data]);
    }
    , (error) => {
      console.log("error: ", error);
    }
    );
  }

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // tab content
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  React.useEffect(() => {
    getVehicles();
    getStations();
  }, []);
  return (
    // <div className="App">
    <div>
      <NavBar />
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Vehicles" />
          <Tab label="Stations" />
        </Tabs>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Box sx={{ display: "flex", flexFlow: 'row wrap', justifyContent: "center", alignItems: 'center', margin: '10px' }}>
            {vehicles && vehicles.map((vehicle, i) => {
              return <CarCard key={i} vehicle={vehicle} getVehicles={getVehicles}></CarCard>
            })}
            {
              vehicles.length === 0 &&
              <Box sx={{ display: "flex", flexFlow: 'row wrap', justifyContent: "center", alignItems: 'center', margin: '10px' }}>
                <Typography variant="h5">No vehicles found</Typography>
              </Box>
            }
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Box sx={{ display: "flex", flexFlow: 'row wrap', justifyContent: "center", alignItems: 'center', margin: '10px' }}>
            {stations && stations.map((station, i) => {
              return <StationCard key={i} station={station} getStations={getStations}></StationCard>
            })}
            {
              stations.length === 0 &&
              <Box sx={{ display: "flex", flexFlow: 'row wrap', justifyContent: "center", alignItems: 'center', margin: '10px' }}>
                <Typography variant="h5" component="h3">
                  No stations found.
                </Typography>
              </Box>
            }
          </Box>
        </TabPanel>
        <Box sx={getFabMenuPositionStyles()}>
          <FabMenu getVehicles={getVehicles}
            setVehicles={setVehicles}
            getStations={getStations}
            selectedTab={value}
            setStations={setStations}></FabMenu>
        </Box>
      </Box>
    </div>
  );
}

// vehicle card component
const CarCard = ({vehicle, getVehicles}) => {

  const deleteVehicle = (vehicleId) => {
    axios.delete('/vehicles/' + vehicleId, {}).then((response) => {
      getVehicles();
    });
  }

  const [placeholderImage, setPlaceholderImage] = React.useState('https://www.bmwgroup.com/content/dam/grpw/websites/bmwgroup_com/brands/einstiegsseite/Marken_Einstieg_BMW_M.jpg.grp-transform/xxlarge/Marken_Einstieg_BMW_M.jpg');
  return (
    <Card sx={{ maxWidth: 345, width: 345, margin: '10px' }}>
      <CardMedia
        component="img"
        height="140"
        image={(!vehicle.image || vehicle.image === '/suv.webp') ? placeholderImage : vehicle.image}
        alt="bmv"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {vehicle.name}
        </Typography>
        <Box sx={{ display: "flex", flexFlow: 'column', justifyContent: "center", alignItems: 'center' }}>
          <Typography variant="body2" color="textSecondary" component="p"
            sx={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-between', width: '100%' }}>
            <span> Type : </span>
            <span>{vehicle.type}</span>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p"
            sx={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-between', width: '100%' }}>
            <span>
              Seats : 
            </span>
            <span>
              {vehicle.seats}
            </span>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p"
            sx={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-between', width: '100%' }}>
            <span>
              Door : 
            </span>
            <span>
              {vehicle.door ? 'Available' : 'Not Available'}
            </span> 
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p"
            sx={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-between', width: '100%' }}>
            <span>
              Status : 
            </span>
            <span>
              {vehicle.available ? 'Available' : 'Not Available'}
            </span> 
          </Typography>
          
        </Box>
        <Typography variant="body2" color="text.secondary">
          
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{ color: '#00d2d3' }} size="small" onClick={() => {deleteVehicle(vehicle._id)}}>Delete</Button>
      </CardActions>
    </Card>
  );
}

// station card component
const StationCard = ({station, getStations}) => {
  const deleteStation = (stationId) => {
    axios.delete('/stations/' + stationId, {}).then((response) => {
      getStations();
    });
  }

  const titleEle = () => {
    return (
      <>
        Test ele
      </>
    )
  }
  
  return (
    <Card sx={{ maxWidth: 345, width: 345, margin: '10px' }}>
      {/* <CardMedia
        component="img"
        height="140"
        image="https://www.bmwgroup.com/content/dam/grpw/websites/bmwgroup_com/brands/einstiegsseite/Marken_Einstieg_BMW_M.jpg.grp-transform/xxlarge/Marken_Einstieg_BMW_M.jpg"
        alt="bmv"
      /> */}
      <CardHeader component="h5" title={station.stationName}>
        <Typography height={40} variant="h5" component="h3">
        {station.stationName}
        </Typography>
      </CardHeader>
      <CardContent>
        {/* <Typography gutterBottom variant="h5" component="div">
          {station.stationName}
        </Typography> */}
        <Box sx={{ display: "flex", flexFlow: 'column', justifyContent: "center", alignItems: 'center' }}>
          <Typography variant="body2" color="textSecondary" component="p"
            sx={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-between', width: '100%' }}>
            <span> Code: </span>
            <span>{station.stationCode}</span>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p"
            sx={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-between', width: '100%' }}>
            <span> Capacity: </span>
            <span>{station.capacity}</span>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p"
            sx={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-between', width: '100%' }}>
            <span> Address: </span>
            <span>{station.address}</span>
          </Typography>
          
        </Box>
        <Typography variant="body2" color="text.secondary">
          
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{ color: '#00d2d3' }} size="small" onClick={() => {deleteStation(station._id)}}>Delete</Button>
      </CardActions>
    </Card>
  );
}
export default InventoryHome;
