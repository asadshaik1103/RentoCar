/* Author: @104 Shaik Asaduddin (sh465111@dal.ca) - Maintainer */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { IconButton, Typography } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const EmployeeActionModal = ({ open, handleClose, setOpen, title, fields, addEntity, getVehicles, getStations, openToastSnackBar }) => {
    const [scroll, setScroll] = React.useState('paper'); // eslint-disable-line no-unused-vars
    const [modalFields, setModalFields] = React.useState(fields);
    const [disabledAdd, setDisabledAdd] = React.useState(false);
    const [didLoad, setDidLoad] = React.useState(false);

    const [loading, setLoading] = React.useState(false);
    const [toast, setToast] = React.useState("");
    const [toastMessage, setToastMessage] = React.useState("");
    const [severity, setSeverity] = React.useState("");
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const handleSnackbarClose = () => setSnackbarOpen(false);

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    React.useEffect(() => {
        setModalFields(fields);
    }, [fields]);

    React.useEffect(() => {
        isAddDisabled();
    }, []);

    React.useEffect(() => {
        isAddDisabled();
    }, [modalFields]);

    // add either a vehicle or station
    const addEntityInInventory = (entityType, modalFields) => {
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
                const message = `Car with ${registrationNoField} registration number added successfully`;
                openToastSnackBar(message, 'success');
                setLoading(false);
                setOpen(false);
                // update the list of cars
                getVehicles();
            }, (err) => {
                console.error("err: ", err);
                setLoading(false);
                const message = `Failed to add car with ${registrationNoField} registration number added successfully`;
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
                const message = `Station with ${stationNameField} name added successfully`;
                openToastSnackBar(message, 'success');
                setLoading(false);
                setOpen(false);
                // update the list of stations
                getStations();
            }, (err) => {
                console.error("err: ", err);
                setLoading(false);
                const message = `Failed to add station with ${stationNameField} name added successfully`;
                setToastMessage(message);
                setSnackbarOpen(true);
                setSeverity('error');
            });
        }
    }

    const inputChanged = (event, field) => {
        const fieldsDuplicate = JSON.parse(JSON.stringify(modalFields));
        fieldsDuplicate.map((fieldProp) => {
            if (fieldProp.name === field.name && fieldProp.type !== 'select') {
                fieldProp.value = event.target.value;
                
            }
            return fieldProp;
        });
        fieldsDuplicate.map(fieldProp => {
            if (fieldProp.name === field.name) {
                if (!event.target.value) {
                    fieldProp.error = true;
                    fieldProp.errorMessage = field.errorMessageRequired;
                } else {
                    fieldProp.error = false;
                    fieldProp.errorMessage = '';
                }
            }
            return fieldProp;
        });
        
        if (field.id === 'addCar-model') {
            if (event.target.value) {
                const isSpecialCharsPresent = specialChars.split('').some(char => event.target.value.includes(char));
                    fieldsDuplicate.map(fieldProp => {
                        if (fieldProp.name === field.name) {
                            if (isSpecialCharsPresent) {
                                fieldProp.error = true;
                                fieldProp.errorMessage = field.errorMessageNoSpecialChars;
                            } else {
                                fieldProp.error = false;
                            }
                        }
                        return fieldProp;
                    });
            }
        } else if (field.id === 'addCar-color') {
            if (event.target.value) {
                const isValid = numbersAndSpecialChars.test(event.target.value);
                if (!isValid) {
                    fieldsDuplicate.map(fieldProp => {
                        if (fieldProp.name === field.name) {
                            fieldProp.error = true;
                            fieldProp.errorMessage = field.errorMessageNoSpecialCharsOrNumbers;
                        }  else {
                            fieldProp.error = false;
                        }
                        return fieldProp;
                    });
                }
            }
        }
        setModalFields(fieldsDuplicate);
    }

    const getSelectOptions = (field) => {
        if (field.id === 'addCar-makeYear') {
            return Array.from(Array(123)).map((option, index) => {
                return <MenuItem key={index + 1900} value={index + 1900}>{index + 1900}</MenuItem>
            });
        }
        return (
            (field.validators && field.validators.options) ? field.validators.options.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
            )) : null
        );
    }

    const specialChars = `/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;`;
    const numbersAndSpecialChars = /^[a-zA-Z]+$/;

    const selectFieldChanged = (event, field) => {
        const fieldsDuplicate = JSON.parse(JSON.stringify(modalFields));
        fieldsDuplicate.map(fieldProp => {
            if (fieldProp.name === field.name) {
                fieldProp.value = event.target.value
            }
            return fieldProp;
        });
        setModalFields([...fieldsDuplicate]);
    }

    const validatetTextField = (event, field) => {
        
        const fieldsDuplicate = JSON.parse(JSON.stringify(modalFields));
        fieldsDuplicate.map(fieldProp => {
            if (fieldProp.name === field.name) {
                if (!event.target.value) {
                    fieldProp.error = true;
                    fieldProp.errorMessage = field.errorMessageRequired;
                } else {
                    fieldProp.error = false;
                    fieldProp.errorMessage = '';
                }
            }
            return fieldProp;
        });
        setModalFields([...fieldsDuplicate]);
        
        if (field.id === 'addCar-model') {
            if (event.target.value) {
                const isSpecialCharsPresent = specialChars.split('').some(char => event.target.value.includes(char));
                    const fieldsDuplicate = JSON.parse(JSON.stringify(modalFields));
                    fieldsDuplicate.map(fieldProp => {
                        if (fieldProp.name === field.name) {
                            if (isSpecialCharsPresent) {
                                fieldProp.error = true;
                                fieldProp.errorMessage = field.errorMessageNoSpecialChars;
                            } else {
                                fieldProp.error = false;
                            }
                        }
                        return fieldProp;
                    });
                    setModalFields([...fieldsDuplicate]);
                // }
            }
        } else if (field.id === 'addCar-color') {
            if (event.target.value) {
                const isValid = numbersAndSpecialChars.test(event.target.value);
                if (!isValid) {
                    const fieldsDuplicate = JSON.parse(JSON.stringify(modalFields));
                    fieldsDuplicate.map(fieldProp => {
                        if (fieldProp.name === field.name) {
                            fieldProp.error = true;
                            fieldProp.errorMessage = field.errorMessageNoSpecialCharsOrNumbers;
                        }  else {
                            fieldProp.error = false;
                        }
                        return fieldProp;
                    });
                    setModalFields([...fieldsDuplicate]);
                }
            }
        }
        isAddDisabled();
    }

    // check if all fields are valid
    const isAddDisabled = () => {
        let isDisabled = modalFields.some(field => field.error || !field.value);
        setDisabledAdd(isDisabled);
        return isDisabled;
    }

    const changeListener = (event) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0])
        fileReader.onload = () => {
            if (fileReader.result) {
                const fieldsDuplicate = JSON.parse(JSON.stringify(modalFields));
                fieldsDuplicate.map(fieldProp => {
                    if (fieldProp.id === 'addCar-image') {
                        fieldProp.value = fileReader.result;
                        fieldProp.fileName = event.target.files[0].name;
                    }
                    return fieldProp;
                });
                setModalFields([...fieldsDuplicate]);
            }
        }
        fileReader.onerror = (error) => {
            // reject(error);
            console.log("error: ", error);
        }

    }

    return (
        <div>
            {/* [Code Attribution 2 for MUI Dialog] */}
            {/* [URL: https://mui.com/material-ui/react-dialog/#scrolling-long-content] */}
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="add-entities-dialog"
                aria-describedby="add-entities-dialog-description"
            >
                <DialogTitle id="add-entities-dialog-title">{title}</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: '100%'
                        }}
                        >
                        {modalFields.map((field) => (
                            (field.type === 'select') ?
                                <FormControl sx={{ minWidth: '100%', marginTop: '10px' }} error={field.error}>
                                    <InputLabel id={field.id + 'input-label'}>{field.name}</InputLabel>
                                    {/* [Code Attribution 4 for MUI Select] */}
                                    {/* [URL: https://mui.com/material-ui/react-select/#basic-select] */}
                                    <Select
                                        labelId={field.id}
                                        id={field.id}
                                        value={field.value}
                                        label={field.name}
                                        onChange={(event) => {
                                            selectFieldChanged(event, field);
                                        }}
                                    >
                                        {getSelectOptions(field)}
                                    </Select>
                                </FormControl>
                                :
                                (field.type === 'image') ?
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'end', color: '#a9a9a9' }}>
                                        <Typography variant="div" gutterBottom color={field.fileName ? '#161616' : '#a9a9a9'}>
                                            {field.fileName ? field.fileName : 'No image selected'}
                                        </Typography>
                                        <IconButton color="primary" component="label">
                                            <input type="file" accept="image/*" onChange={changeListener} hidden />
                                            <AddPhotoAlternateIcon fontSize="medium" />
                                        </IconButton>
                                    </Box>
                                :
                                <>
                                {/* [Code Attribution 3 for MUI TextField] */}
                                {/* [URL: https://mui.com/material-ui/react-text-field/#full-width] */}
                                    <TextField 
                                        required
                                        key={field.id}
                                        id={field.id}
                                        label={field.name}
                                        type={field.type}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        onChange={(event) => { inputChanged(event, field); }}
                                        onBlur={(event) => { validatetTextField(event, field) }}
                                        error={field.error}
                                        helperText={field.error ? field.errorMessage: null}
                                    />
                                </>
                        ))}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        disabled={disabledAdd}
                        onClick={() => { addEntityInInventory((title === 'Add car' ? 'car' : 'station'), modalFields); }}>
                            Add
                    </Button>
                </DialogActions>
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
            </Dialog>
        </div>
    );
}
export default EmployeeActionModal;