// Author: Aditya Mahale(ad619659@dal.ca)

import { Button, Rating, Stack, TextField } from "@mui/material";
import React from "react";

const ReviewForm = ({ reviewFields, onChange, onReviewPost, errors }) => {
  return (
    <React.Fragment>
      <Stack>
        <Rating
          name="rating"
          value={parseInt(reviewFields.rating)}
          onChange={onChange}
          size="large"
        />
        <TextField
          id="outlined-basic"
          label="Title"
          name="title"
          variant="outlined"
          value={reviewFields.title}
          onChange={onChange}
          helperText={errors.title}
          error={"title" in errors}
          sx={[{ margin: "15px 0px 15px 0px" }]}
        />
        <TextField
          placeholder="Description"
          label="Description"
          variant="outlined"
          multiline
          name="description"
          rows={6}
          value={reviewFields.description}
          onChange={onChange}
          helperText={errors.description}
          error={"description" in errors}
        />
        <Button
          type="submit"
          onClick={onReviewPost}
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
          Post Review
        </Button>
      </Stack>
    </React.Fragment>
  );
};

export default ReviewForm;
