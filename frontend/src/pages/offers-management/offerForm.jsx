// Author: Aditya Mahale(ad619659@dal.ca)

import { Button, Stack, TextField } from "@mui/material";
import React from "react";

const OfferForm = ({
  offerFields,
  onChange,
  onOfferPost,
  errors,
  selectedOffer,
}) => {
  return (
    <React.Fragment>
      <Stack>
        <TextField
          id="outlined-basic"
          label="Title"
          name="title"
          variant="outlined"
          value={offerFields.title}
          onChange={onChange}
          helperText={errors.title}
          error={"title" in errors}
          sx={[{ margin: "15px 0px 15px 0px" }]}
        />
        <TextField
          label="Discount"
          variant="outlined"
          placeholder="Discount"
          name="discount"
          value={offerFields.discount}
          onChange={onChange}
          helperText={errors.discount}
          error={"discount" in errors}
          sx={[{ margin: "15px 0px 15px 0px" }]}
        />
        <TextField
          label="Description"
          placeholder="Description"
          variant="outlined"
          multiline
          name="description"
          rows={6}
          value={offerFields.description}
          onChange={onChange}
          helperText={errors.description}
          error={"description" in errors}
          sx={[{ margin: "15px 0px 15px 0px" }]}
        />
        <Button
          type="submit"
          onClick={onOfferPost}
          variant="contained"
          sx={[
            {
              color: "#fff",
              marginTop: "15px",
              backgroundColor: "#00d2d3",
            },
            {
              "&:active": {
                backgroundColor: "#00d2d3",
              },
            },
            {
              "&:hover": {
                backgroundColor: "#00d2d3",
              },
            },
          ]}
        >
          Add Offer
        </Button>
      </Stack>
    </React.Fragment>
  );
};

export default OfferForm;
