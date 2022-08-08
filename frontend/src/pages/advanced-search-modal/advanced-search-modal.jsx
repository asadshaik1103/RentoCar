/* Author: @104 Shaik Asaduddin (sh465111@dal.ca) - Maintainer */
import * as React from 'react';

import { Box, Button, Select } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const AdvancedSearchModal = ({ isOpen, handleDialogClose, searchForVehicles, searchForStations, selectedTab }) => {
    const [scroll, setScroll] = React.useState('paper'); // eslint-disable-line no-unused-vars

    const title = "Search for a car";

    const [sameDropOff, setSameDropOff] = React.useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSameDropOff(value);
    }

    const [fromLocation, setFromLocation] = React.useState('');
    const [fromLocationError, setFromLocationError] = React.useState({
        value: false,
        message: ''
    });

    const [condition, setCondition] = React.useState('');
    const [vehicleType, setVehicleType] = React.useState('');
    const [door, setDoor] = React.useState('');
    const [available, setAvailable] = React.useState('');
    const [ac, setAC] = React.useState('');
    const [sportsMode, setSportsMode] = React.useState('');
    const [cruiseControl, setCruiseControl] = React.useState('');
    const [childCarSeat, setChildCarSeat] = React.useState('');
    const [regnNo, setRegnNo] = React.useState('');

    const [stationCode, setStationCode] = React.useState();
    const [stationName, setStationName] = React.useState();
    const [stationCapacity, setStationCapacity] = React.useState();

    const validateAndSetLocation = (event) => {
        const { value } = event.target;
        if (value.length === 0) {
            setFromLocationError({
                value: true,
                message: 'From location is required'
            });
        }
        // validate value with regex to check for special characters
        else if (value.match(/[^a-zA-Z0-9]/g)) {
            setFromLocationError({
                value: true,
                message: 'From location should not contain special characters'
            });
        }
        else {
            setFromLocationError({
                value: false,
                message: ''
            });
        }
        setFromLocation(value);
    };

    const [toLocation, setToLocation] = React.useState('');
    const [toLocationError, setToLocationError] = React.useState({
        value: false,
        message: ''
    });
    const validateAndSetToLocation = (event) => {
        const { value } = event.target;
        if (value.length === 0) {
            setToLocationError({
                value: true,
                message: 'To location is required'
            });
        } else if (value.match(/[^a-zA-Z0-9]/g)) {
            setToLocationError({
                value: true,
                message: 'To location should not contain special characters'
            });
        }
        else {
            setToLocationError({
                value: false,
                message: ''
            });
        }
        setToLocation(value);
    }

    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());

    const [startDateError, setStartDateError] = React.useState({
        value: false,
        message: ''
    });

    const [endDateError, setEndDateError] = React.useState({
        value: false,
        message: ''
    });

    const validateAndSetStartDate = (startDate) => {
        if (endDate === null) {
            setStartDateError({
                value: true,
                message: 'Start date is required'
            });
        } else if (!(startDate instanceof Date && !isNaN(startDate))) {
            setStartDateError({
                value: true,
                message: 'Invalid Start date'
            });
        } else if (startDate.length === 0) {
            setStartDateError({
                value: true,
                message: 'Start date is required'
            });
        } else if (startDate > endDate) {
            setStartDateError({
                value: true,
                message: 'Start date should be before end date'
            });
        } else {
            setStartDateError({
                value: false,
                message: ''
            });
            setEndDateError({
                value: false,
                message: ''
            });
        }
        setStartDate(startDate);
    }

    const validateAndSetEndDate = (endDate) => {
        if (endDate === null) {
            setEndDateError({
                value: true,
                message: 'End date is required'
            });
        } else if (!(endDate instanceof Date && !isNaN(endDate))) {
            setEndDateError({
                value: true,
                message: 'Invalid End date'
            });
        } else if (endDate.length === 0) {
            setEndDateError({
                value: true,
                message: 'End date is required'
            });
        } else if (startDate > endDate) {
            setEndDateError({
                value: true,
                message: 'End date should be greater than start date'
            });
        } else {
            setEndDateError({
                value: false,
                message: ''
            });
            setStartDateError({
                value: false,
                message: ''
            });
        }
        setEndDate(endDate);
    }

    const [driverAge, setDriverAge] = React.useState(18);
    const [driverAgeError, setDriverAgeError] = React.useState({
        value: false,
        message: ''
    });

    const validateAndSetDriverAge = (event) => {
        const { value } = event.target;
        if (value.length === 0) {
            setDriverAgeError({
                value: true,
                message: 'Driver age is required'
            });
        }
        else if (value < 18 || value > 100) {
            setDriverAgeError({
                value: true,
                message: 'Driver age should be between 18 and 100'
            });
        }
        else {
            setDriverAgeError({
                value: false,
                message: ''
            });
        }
        setDriverAge(value);
    }
    const [searchButtonDisabled, setSearchButtonDisabled] = React.useState(true);

    React.useEffect(() => {
        if (selectedTab === 0) {
            if ((regnNo === null || regnNo === '') && condition === null
                && vehicleType === null && door === null
                && available === null && ac === null
                && sportsMode === null && cruiseControl === null
                && childCarSeat === null) {
                setSearchButtonDisabled(true);
            } else {
                setSearchButtonDisabled(false);
            }
        } else if (selectedTab === 1) {
            if ((stationCode === null || stationCode === '') && (stationName === null || stationName === '')
                && (stationCapacity === null || stationCapacity === '')) {
                setSearchButtonDisabled(true);
            } else {
                setSearchButtonDisabled(false);
            }
        }
    }, [regnNo, condition, vehicleType, door, available, ac, sportsMode, cruiseControl, childCarSeat, stationCode, stationName, stationCapacity]);

    const handleSearch = () => {
        if (selectedTab === 0) {
            // take the properties if present and call searchForVehicles

            let searchProperties = {};
            if (regnNo !== null && regnNo !== '') {
                searchProperties.regnNo = regnNo;
            }
            if (condition !== null && condition !== '') {
                searchProperties.condition = condition;
            }
            if (vehicleType !== null && vehicleType !== '') {
                searchProperties.type = vehicleType;
            }
            if (door !== null && door !== '') {
                searchProperties.door = door;
            }
            if (available !== null && available !== '') {
                searchProperties.available = available === "Yes" ? true : false;
            }
            if (ac !== null && ac !== '') {
                searchProperties.ac = ac === "Yes" ? true : false;
            }
            if (sportsMode !== null && sportsMode !== '') {
                searchProperties.sportsMode = sportsMode === "Yes" ? true : false;
            }
            if (cruiseControl !== null && cruiseControl !== '') {
                searchProperties.cruiseControl = cruiseControl === "Yes" ? true : false;
            }
            if (childCarSeat !== null && childCarSeat !== '') {
                searchProperties.childCarSeat = childCarSeat === "Yes" ? true : false;
            }
            searchForVehicles({
                ...searchProperties
            });
        } else {
            searchForStations({
                stationCode: stationCode,
                stationName: stationName,
                stationCapacity: stationCapacity
            })
        }
    }

    const getSelectOptions = (options) => {

        return (
            (options && options.length > 0) ? options.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
            )) : null
        );
    }

    return <Dialog
        open={isOpen}
        // onClose={handleClose}
        scroll={scroll}
        aria-labelledby="advanced-search-dialog"
        aria-describedby="advanced-search-dialog">
        <DialogTitle id="advanced-search-dialog-title">{selectedTab === 0 ? title : 'Search for a station'}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
            {selectedTab === 0 && <Box sx={{
                width: 500,
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TextField
                    key='regnNo'
                    id='regnNo'
                    label='Regn No'
                    type='number'
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={regnNo}
                    onChange={(event) => { setRegnNo(event.target.value); }}
                />
                
                <FormControl sx={{ minWidth: '100%', marginTop: '10px' }}>
                    <InputLabel id='input-label'>Condition</InputLabel>
                    <Select
                        labelId='Condition'
                        id='Condition'
                        value={condition}
                        label='Condition'
                        onChange={(event) => {
                            setCondition(event.target.value);
                        }}
                    >
                        {getSelectOptions(["New", "Used"])}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: '100%', marginTop: '10px' }}>
                    <InputLabel id='input-label-vehicleType'>Vehicle type</InputLabel>
                    <Select
                        labelId='vehicleType'
                        id='vehicleType'
                        value={vehicleType}
                        label='Vehicle type'
                        onChange={(event) => {
                            setVehicleType(event.target.value);
                        }}
                    >
                        {getSelectOptions(["Car", "Van", "Bus", "Truck"])}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: '100%', marginTop: '10px' }}>
                    <InputLabel id='input-label-Door'>Door</InputLabel>
                    <Select
                        labelId='Door'
                        id='Door'
                        value={door}
                        label='Door'
                        onChange={(event) => {
                            setDoor(event.target.value);
                        }}
                    >
                        {getSelectOptions(["Yes", "No"])}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: '100%', marginTop: '10px' }}>
                    <InputLabel id='input-label-Available'>Available</InputLabel>
                    <Select
                        labelId='Available'
                        id='Available'
                        value={available}
                        label='Available'
                        onChange={(event) => {
                            setAvailable(event.target.value);
                        }}
                    >
                        {getSelectOptions(["Yes", "No"])}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: '100%', marginTop: '10px' }}>
                    <InputLabel id='input-label-ac'>AC mode</InputLabel>
                    <Select
                        labelId='ac'
                        id='ac'
                        value={ac}
                        label='AC mode'
                        onChange={(event) => {
                            setAC(event.target.value);
                        }}
                    >
                        {getSelectOptions(["Yes", "No"])}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: '100%', marginTop: '10px' }}>
                    <InputLabel id='input-label-sportsMode'>Sports mode</InputLabel>
                    <Select
                        labelId='sportsMode'
                        id='sportsMode'
                        value={sportsMode}
                        label='Sports mode'
                        onChange={(event) => {
                            setSportsMode(event.target.value);
                        }}
                    >
                        {getSelectOptions(["Yes", "No"])}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: '100%', marginTop: '10px' }}>
                    <InputLabel id='input-label-sportsMode'>Cruise control</InputLabel>
                    <Select
                        labelId='cruiseControl'
                        id='cruiseControl'
                        value={cruiseControl}
                        label='Cruise control'
                        onChange={(event) => {
                            setCruiseControl(event.target.value);
                        }}
                    >
                        {getSelectOptions(["Yes", "No"])}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: '100%', marginTop: '10px' }}>
                    <InputLabel id='input-label-sportsMode'>Child car seat</InputLabel>
                    <Select
                        labelId='childCarSeat'
                        id='childCarSeat'
                        value={childCarSeat}
                        label='Child car seat'
                        onChange={(event) => {
                            setChildCarSeat(event.target.value);
                        }}
                    >
                        {getSelectOptions(["Yes", "No"])}
                    </Select>
                </FormControl>
            </Box>}
            {selectedTab === 1 && <Box sx={{
                width: 500,
                maxWidth: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TextField
                    key='stationCode'
                    id='stationCode'
                    label='Station code'
                    type='number'
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={stationCode}
                    onChange={(event) => { setStationCode(event.target.value); }}
                />
                <TextField
                    key='stationName'
                    id='stationName'
                    label='Station name'
                    type='text'
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={stationName}
                    onChange={(event) => { setStationName(event.target.value); }}
                />
                <TextField
                    key='capacity'
                    id='capacity'
                    label='Station capacity'
                    type='number'
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={stationCapacity}
                    onChange={(event) => { setStationCapacity(event.target.value); }}
                />
            </Box>
            }
        </DialogContent>
        <DialogActions>
            <Button onClick={handleDialogClose} color="primary">Cancel</Button>
            <Button onClick={() => {handleSearch()}} disabled={searchButtonDisabled} color="primary">Search</Button>
        </DialogActions>
    </Dialog>
};

export default AdvancedSearchModal;