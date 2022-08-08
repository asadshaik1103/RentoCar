/* Author: @104 Shaik Asaduddin (sh465111@dal.ca) - Maintainer */
import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import EmployeeActionModal from '../employee-action-modal/employee-action-modal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import { Search } from '@mui/icons-material';
import AdvancedSearchModal from '../../advanced-search-modal/advanced-search-modal';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

const fabActions = [
    { icon: <CarRepairIcon />, name: 'Add car', actionId: 'addCar' },
    { icon: <EmojiTransportationIcon />, name: 'Add station', actionId: 'addStation' },
    { icon: <Search />, name: 'Search', actionId: 'searchCarAction' },
    { icon: <CloseIcon />, name: 'Clear search', actionId: 'clearAction' }
];

const FabMenu = ({getVehicles, setVehicles, setStations, getStations, selectedTab}) => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const [title, setTitle] = React.useState("");
    const [actionType, setActionType] = React.useState("");

    const [loading, setLoading] = React.useState(false);
    const [toast, setToast] = React.useState("");
    const [toastMessage, setToastMessage] = React.useState("");
    const [severity, setSeverity] = React.useState("");
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const handleSnackbarClose = () => setSnackbarOpen(false);

    const [showClearButton, setShowClearButton] = React.useState(false);

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const openToastSnackBar = (message, severity) => {
        setToastMessage(message);
        setSeverity(severity);
        setSnackbarOpen(true);
    }

    const getFieldsBasedOnAction = (actionTypeVal) => {
        if (actionTypeVal === "addCar") {
            return [
                {
                    name: "Registration No.", type: "number", id: 'addCar-registrationNo',
                    error: false,
                    errorMessageRequired: 'Registration no. is required',
                    errorMessageLength: 'Registration no. should be of length 8',
                    requestProp: 'regnNo',
                    validators: {
                        required: true
                    }
                },
                {
                    name: "Make year", type: "select", id: 'addCar-makeYear',
                    error: false,
                    errorMessageRequired: 'Make year is required',
                    errorMessageMinLength: 'Make year should be greater than or equal to 1900',
                    errorMessageMaxLength: 'Make year should be less than or equal to 2020',
                    requestProp: 'makeYear',
                    validators: {
                        required: true,
                        min: 1900,
                        max: 2022
                    },
                    value: 1900
                },
                {
                    name: "Model", type: "text", id: 'addCar-model',
                    error: false,
                    errorMessageRequired: 'Model is required',
                    errorMessageNoSpecialChars: 'Model should not contain special characters',
                    requestProp: 'name',
                    validators: {
                        required: true
                    },
                    errorMessage: ''
                },
                {
                    name: "Price", type: "number", id: 'addCar-price',
                    error: false,
                    errorMessageRequired: 'Price is required',
                    requestProp: 'price',
                    validators: {
                        required: true,
                        min: 0,
                        max: 1000000
                    }
                },
                {
                    name: "Image", type: "image", id: 'addCar-image',
                    error: false,
                    errorMessageRequired: 'Image is required',
                    requestProp: 'image',
                    validators: {
                        required: true
                    }
                },
                {
                    name: "Color", type: "text", id: 'addCar-color',
                    error: false,
                    errorMessageRequired: 'Color is required',
                    errorMessageNoSpecialCharsOrNumbers: 'Color should not contain special characters or numbers',
                    requestProp: 'color',
                    validators: {
                        required: true
                    }
                },
                {
                    name: "Condition", type: "select", id: 'addCar-condition',
                    error: false,
                    errorMessageRequired: 'Condition is required',
                    requestProp: 'condition',
                    validators: {
                        required: true,
                        options: ["New", "Used"]
                    },
                    value: "New",
                    searchAvaillity: true,
                },
                {
                    name: "Mileage", type: "number", id: 'addCar-mileage',
                    error: false,
                    errorMessageRequired: 'Mileage is required',
                    requestProp: 'mileage',
                    validators: {
                        required: true,
                        min: 0,
                        max: 1000000
                    }
                },
                {
                    name: "Vehicle type", type: "select", id: 'addCar-vehicleType',
                    error: false,
                    errorMessageRequired: 'Vehicle type is required',
                    requestProp: 'type',
                    validators: {
                        required: true,
                        options: ["Car", "Van", "Bus", "Truck"]
                    },
                    value: "Car",
                    searchAvaillity: true,
                },
                {
                    name: "Station code", type: "number", id: 'addCar-stationCode',
                    error: false,
                    errorMessageRequired: 'Station code is required',
                    requestProp: 'stationCode',
                    validators: {
                        required: true
                    }
                },
                {
                    name: "Number of seats", type: "number", id: 'addCar-seats',
                    error: false,
                    errorMessageRequired: 'Number of seats is required',
                    requestProp: 'seats',
                    validators: {
                        required: true
                    }
                },
                {
                    name: "Door", type: "select", id: 'addCar-door',
                    error: false,
                    errorMessageRequired: 'Door is required',
                    requestProp: 'door',
                    validators: {
                        required: true,
                        options: ["Yes", "No"]
                    },
                    value: "Yes",
                    searchAvaillity: true,
                },
                {
                    name: "Available", type: "select", id: 'addCar-available',
                    error: false,
                    errorMessageRequired: 'Availability is required',
                    requestProp: 'available',
                    validators: {
                        required: true,
                        options: ["Yes", "No"]
                    },
                    value: "Yes",
                    searchAvaillity: true,
                },
                {
                    name: "Automatic", type: "select", id: 'addCar-automatic',
                    error: false,
                    errorMessageRequired: 'Automatic field is required',
                    requestProp: 'automatic',
                    validators: {
                        required: true,
                        options: ["Yes", "No"]
                    },
                    value: "Yes",
                    searchAvaillity: true,
                },
                {
                    name: "AC mode", type: "select", id: 'addCar-ac-mode',
                    error: false,
                    errorMessageRequired: 'AC mode field is required',
                    requestProp: 'ac',
                    validators: {
                        required: true,
                        options: ["Yes", "No"]
                    },
                    value: "Yes",
                    searchAvaillity: true,
                },
                {
                    name: "Sports mode", type: "select", id: 'addCar-sports-mode',
                    error: false,
                    errorMessageRequired: 'Sports mode field is required',
                    requestProp: 'sportsMode',
                    validators: {
                        required: true,
                        options: ["Yes", "No"]
                    },
                    value: "Yes",
                    searchAvaillity: true,
                },
                {
                    name: "Cruise control", type: "select", id: 'addCar-cruise-control-mode',
                    error: false,
                    errorMessageRequired: 'Cruise control mode field is required',
                    requestProp: 'cruiseControl',
                    validators: {
                        required: true,
                        options: ["Yes", "No"]
                    },
                    value: "Yes",
                    searchAvaillity: true,
                },
                {
                    name: "Child car seat", type: "select", id: 'addCar-child-car-seat',
                    error: false,
                    errorMessageRequired: 'Child car seat field is required',
                    requestProp: 'childCarSeat',
                    validators: {
                        required: true,
                        options: ["Yes", "No"]
                    },
                    value: "Yes",
                    searchAvaillity: true,
                },
                {
                    name: "Large bag", type: "number", id: 'addCar-large-bag',
                    error: false,
                    errorMessageRequired: 'Large bag field is required',
                    requestProp: 'largeBag',
                    validators: {
                        required: true
                    }
                },
                {
                    name: "Small bag", type: "number", id: 'addCar-small-bag',
                    error: false,
                    errorMessageRequired: 'Small bag field is required',
                    requestProp: 'smallBag',
                    validators: {
                        required: true
                    }
                }
            ];
        } else {
            return [
                {
                    name: "Station code", type: "number", id: 'addStation-stationCode',
                    error: false,
                    errorMessageRequired: 'Station code is required',
                    requestProp: 'stationCode',
                    validators: {
                        required: true
                    },
                    searchAvaillity: true,
                },
                {
                    name: "Station name", type: "text", id: 'addStation-stationName',
                    error: false,
                    errorMessageRequired: 'Station name is required',
                    requestProp: 'stationName',
                    validators: {
                        required: true,
                        minLength: 3,
                        maxLength: 20
                    },
                    searchAvaillity: true,
                },
                {
                    name: "Station address", type: "text", id: 'addStation-stationAddress',
                    error: false,
                    errorMessageRequired: 'Station address is required',
                    errorMessageMinLength: 'Station address should be greater than or equal to 3',
                    errorMessageMaxLength: 'Station address should be less than or equal to 20',
                    requestProp: 'address',
                    validators: {
                        required: true,
                        minLength: 3,
                        maxLength: 20
                    }
                },
                {
                    name: "Station capacity", type: "number", id: 'addStation-stationCapacity',
                    error: false,
                    errorMessageRequired: 'Station capacity is required',
                    errorMessageMinLength: 'Station capacity should be greater than or equal to 1',
                    requestProp: 'capacity',
                    validators: {
                        required: true,
                        min: 1
                    },
                    searchAvaillity: true,
                },
            ];
        }
    }

    const addEntity = (entityType, modalFields) => {
        setLoading(true);
        let requestBody = {};
        if (entityType == "car") {
            modalFields.forEach(field => {
                if (field.requestProp === 'door' ||
                field.requestProp === 'available' ||
                field.requestProp === 'automatic' ||
                field.requestProp === 'ac' ||
                field.requestProp === 'sportsMode' ||
                field.requestProp === 'cruiseControl' ||
                field.requestProp === 'childCarSeat') {
                    requestBody[field.requestProp] = (field.value === 'Yes') ? true : false;
                } else {
                    requestBody[field.requestProp] = field.value;
                }
            });
            // Adding new car
            const registrationNoField = modalFields.find(field => field.id === 'addCar-registrationNo').value;
            axios.post('/vehicles', { ...requestBody }).then((response) => {
                setLoading(false);
                setOpen(false);
                const message = `Car with ${registrationNoField} added successfully`;
                setToastMessage(message);
                setSnackbarOpen(true);
                setSeverity('success');
                // update the list of cars
                getVehicles();
            }, (err) => {
                console.error("err: ", err);
                setLoading(false);
                const message = `Failed to add car with ${registrationNoField} added successfully`;
                setToastMessage(message);
                setSnackbarOpen(true);
                setSeverity('error');
            });
        } else {
            const stationNameField = modalFields.find(field => field.id === 'addStation-stationName').value;
            // const message = `Station with ${stationNameField} added successfully`;
            // setToastMessage(message);
            modalFields.forEach(field => {
                requestBody[field.requestProp] = field.value;
            });

            // Adding new station
            axios.post('/stations', { ...requestBody }).then((response) => {
                setLoading(false);
                setOpen(false);
                const message = `Station with ${stationNameField} added successfully`;
                setToastMessage(message);
                setSnackbarOpen(true);
                setSeverity('success');
                // update the list of stations
                getStations();
            }, (err) => {
                console.error("err: ", err);
                setLoading(false);
                const message = `Failed to add station with ${stationNameField} added successfully`;
                setToastMessage(message);
                setSnackbarOpen(true);
                setSeverity('error');
            });
        }
    }

    const [isSearchModalOpen, setIsSearchModalOpen] = React.useState(false);
    const handleSearchDialogClose = () => {
        setIsSearchModalOpen(false);
    }

    const searchForVehicles = (requestParams) => {
        // axios.post('/vehicles/search', {)
        setShowClearButton(true);
        // search for vehicles
        axios.post('/vehicles/filterAllVehicles', {...requestParams}).then((response) => {
            setVehicles(response.data);
            setIsSearchModalOpen(false);
        }, (err) => {
            console.error("err: ", err);
        });
    }

    const searchForStations = (requestParams) => {
        setShowClearButton(true);
        axios.post('/stations/search', {...requestParams}).then((response) => {
            setStations(response.data);
            setIsSearchModalOpen(false);
        }, (err) => {
            console.error("err: ", err);
        }
        );
    }

    React.useEffect(() => {
        if (showClearButton === false) {
            getVehicles();
            getStations();
        }
    }, [showClearButton]);


    return (
        <>
            <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
                {/* [Code Attribution 1 for SpeedDial] */}
                {/* [URL: https://mui.com/material-ui/react-speed-dial/#persistent-action-tooltips] */}
                <SpeedDial
                    ariaLabel="Employee actions"
                    FabProps={{
                        sx: {
                            bgcolor: '#00d2d3',
                            '&:hover': {
                                bgcolor: '#00d2d3',
                            }
                        }
                    }}
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                >
                    {fabActions.slice(0, showClearButton ? (fabActions.length) : (fabActions.length - 1)).map((fabAction) => (
                        <SpeedDialAction
                            key={fabAction.name}
                            icon={fabAction.icon}
                            aria-label={fabAction.name}
                            tooltipTitle={fabAction.name}
                            tooltipOpen
                            onClick={() => {
                                if (fabAction.actionId === "searchCarAction") {
                                    setIsSearchModalOpen(true);
                                    setOpen(false);
                                } else if (fabAction.actionId === "clearAction") {
                                    setShowClearButton(false);
                                } else {
                                    setOpen(true);
                                    setTitle(fabAction.name);
                                    setActionType(fabAction.actionId);
                                }
                                }
                            }/>
                        ))}
                </SpeedDial>
                <EmployeeActionModal open={open}
                    handleClose={handleClose}
                    addEntity={addEntity}
                    title={title}
                    fields={getFieldsBasedOnAction(actionType)}
                    setToastMessage={setToastMessage}
                    getVehicles={getVehicles}
                    getStations={getStations}
                    setOpen={setOpen}
                    openToastSnackBar={openToastSnackBar}>
                </EmployeeActionModal>
                <AdvancedSearchModal fields={getFieldsBasedOnAction()} isOpen={isSearchModalOpen} 
                    searchForVehicles={searchForVehicles} 
                    handleDialogClose={handleSearchDialogClose}
                    selectedTab={selectedTab}
                    searchForStations={searchForStations}></AdvancedSearchModal>
            </Box>

            <Box sx={{ position: 'fixed', top: '49%', right: '49%', height: 40 }}>
                <Fade
                in={loading}
                style={{
                    transitionDelay: loading ? '100ms' : '0ms',
                }}
                unmountOnExit
                >
                <CircularProgress />
                </Fade>
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert
                onClose={handleSnackbarClose}
                severity={severity}
                sx={{ width: '100%' }}
                >
                {toastMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default FabMenu;