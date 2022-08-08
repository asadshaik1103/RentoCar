import { TextField } from "@mui/material";
import React from "react";

const Input = ({ label, name, type, value, onChange, errors }) => {
  return (
    <TextField
      error={name in errors}
      label={label}
      variant="outlined"
      name={name}
      type={type}
      fullWidth
      value={value}
      onChange={onChange}
      helperText={errors[name]}
    />
  );
};

export default Input;
